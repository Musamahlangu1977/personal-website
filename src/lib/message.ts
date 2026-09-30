// Relative (not "@/") so the node:test build in tsconfig.tests.json can resolve it.
import { services } from "../content/services";

export type MessageChannel = "whatsapp" | "email";
export type Message = { name: string; email: string; phone: string; service: string; message: string };

export const messageLimits = { name: 100, email: 160, phone: 40, service: 60, message: 2000, minMessage: 10 } as const;
export const generalEnquiry = { id: "general", title: "A general question" } as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

export function serviceLabel(id: string) {
  return services.find((service) => service.id === id)?.title ?? generalEnquiry.title;
}

/** Returns what is wrong with a submitted message; an empty list means it can be delivered. */
export function validateMessage(value: unknown) {
  if (!value || typeof value !== "object") return ["Invalid request"];
  const v = value as Record<string, unknown>;
  const errors: string[] = [];
  if (v.channel !== "whatsapp" && v.channel !== "email") errors.push("Choose WhatsApp or email");
  if (typeof v.name !== "string" || v.name.trim().length < 2 || v.name.length > messageLimits.name) errors.push("Enter your name");
  if (v.channel === "email" && (typeof v.email !== "string" || !emailPattern.test(v.email.trim()) || v.email.length > messageLimits.email)) errors.push("Enter a valid email address");
  if (v.phone !== undefined && (typeof v.phone !== "string" || v.phone.length > messageLimits.phone)) errors.push("Enter a valid WhatsApp number");
  if (typeof v.service !== "string" || v.service.length > messageLimits.service) errors.push("Choose what we can help with");
  if (typeof v.message !== "string" || v.message.trim().length < messageLimits.minMessage || v.message.length > messageLimits.message) errors.push(`Write a message of at least ${messageLimits.minMessage} characters`);
  if (typeof v.website === "string" && v.website) errors.push("Invalid request");
  if (typeof v.startedAt === "number" && Date.now() - v.startedAt < 2500) errors.push("Please try again");
  return errors;
}

/** Normalises a message that has already passed validateMessage. */
export function toMessage(value: Record<string, unknown>): Message {
  const text = (key: string) => (typeof value[key] === "string" ? (value[key] as string).trim() : "");
  return { name: text("name"), email: text("email"), phone: text("phone"), service: text("service"), message: text("message") };
}

export function whatsappText(m: Pick<Message, "name" | "service" | "message">) {
  return `Hi Musa, I'm ${oneLine(m.name)}.\nService: ${serviceLabel(m.service)}\n\n${m.message.trim()}`;
}

export function emailSubject(m: Pick<Message, "name" | "service">) {
  return `Website message from ${oneLine(m.name)} · ${serviceLabel(m.service)}`;
}

export function emailBody(m: Message) {
  const details = [
    `Name: ${oneLine(m.name)}`,
    m.email && `Email: ${oneLine(m.email)}`,
    m.phone && `WhatsApp: ${oneLine(m.phone)}`,
    `Service: ${serviceLabel(m.service)}`,
  ].filter(Boolean);
  return `${details.join("\n")}\n\n${m.message.trim()}\n\n— Sent from the message form on the Mahlangu Online Solutions website.`;
}

/** A short notification for the owner's own WhatsApp when an email message arrives. */
export function whatsappAlert(m: Message) {
  const contact = [m.email, m.phone].filter(Boolean).map(oneLine).join(" · ");
  const body = m.message.trim();
  return `New website message\nFrom: ${oneLine(m.name)} (${contact})\nService: ${serviceLabel(m.service)}\n\n${body.length > 700 ? `${body.slice(0, 700)}…` : body}`;
}
