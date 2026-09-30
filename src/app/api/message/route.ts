import { NextResponse } from "next/server";
import { site } from "@/content/site";
import { emailBody, emailSubject, toMessage, validateMessage, whatsappAlert, type Message } from "@/lib/message";

// Delivery is switched on by Vercel environment variables (see ENV-SETUP.txt):
//   RESEND_API_KEY     email to the inbox, with Reply-To set to the visitor
//   CALLMEBOT_API_KEY  a WhatsApp alert to the owner's own number
//   ENQUIRY_WEBHOOK_URL optional JSON webhook, kept from the earlier enquiry form

// Best-effort flood guard. Serverless instances do not share memory, so this only slows a burst down.
const recent = new Map<string, number[]>();
function tooMany(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((time) => now - time < 10 * 60_000);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > 5;
}

async function sendEmail(m: Message, apiKey: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: process.env.MESSAGE_FROM_EMAIL || "Mahlangu Website <onboarding@resend.dev>",
      to: [process.env.MESSAGE_TO_EMAIL || site.email],
      reply_to: m.email,
      subject: emailSubject(m),
      text: emailBody(m),
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`Email rejected (${response.status})`);
}

async function sendWhatsAppAlert(m: Message, apiKey: string) {
  const url = new URL("https://api.callmebot.com/whatsapp.php");
  url.search = new URLSearchParams({ phone: process.env.CALLMEBOT_PHONE || `+${site.whatsappNumber}`, text: whatsappAlert(m), apikey: apiKey }).toString();
  const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error(`WhatsApp alert rejected (${response.status})`);
}

async function sendWebhook(m: Message, url: string) {
  const token = process.env.ENQUIRY_WEBHOOK_TOKEN;
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json", ...(token ? { authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify({ ...m, source: "mahlangu-online-solutions-website", receivedAt: new Date().toISOString() }),
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`Webhook rejected (${response.status})`);
}

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") || 0) > 15000) return NextResponse.json({ ok: false, error: "Request too large" }, { status: 413 });

  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const errors = validateMessage(data);
  if (!errors.length && (data as Record<string, unknown>).channel !== "email") errors.push("WhatsApp messages are sent from the visitor’s own WhatsApp");
  if (errors.length) return NextResponse.json({ ok: false, errors }, { status: 400 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (tooMany(ip)) return NextResponse.json({ ok: false, error: "Too many messages" }, { status: 429 });

  const message = toMessage(data as Record<string, unknown>);
  const deliveries: Promise<void>[] = [];
  if (process.env.RESEND_API_KEY) deliveries.push(sendEmail(message, process.env.RESEND_API_KEY));
  if (process.env.CALLMEBOT_API_KEY) deliveries.push(sendWhatsAppAlert(message, process.env.CALLMEBOT_API_KEY));
  if (process.env.ENQUIRY_WEBHOOK_URL) deliveries.push(sendWebhook(message, process.env.ENQUIRY_WEBHOOK_URL));
  if (!deliveries.length) return NextResponse.json({ ok: false, error: "Messaging is not configured" }, { status: 503 });

  const results = await Promise.allSettled(deliveries);
  results.forEach((result) => {
    if (result.status === "rejected") console.error("Message delivery failed:", result.reason);
  });
  if (results.some((result) => result.status === "fulfilled")) return NextResponse.json({ ok: true });
  return NextResponse.json({ ok: false, error: "Delivery failed" }, { status: 502 });
}
