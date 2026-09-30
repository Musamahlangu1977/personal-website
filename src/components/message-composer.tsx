"use client";

import { type FormEvent, useRef, useState } from "react";
import { ArrowUpRight, Check, Mail, MessageCircle } from "lucide-react";
import { contact } from "@/content/contact";
import { serviceGroups, services } from "@/content/services";
import { site, whatsappUrl } from "@/content/site";
import { emailBody, emailSubject, generalEnquiry, messageLimits, type MessageChannel, whatsappText } from "@/lib/message";

type Status = "idle" | "sending" | "opened" | "sent" | "invalid" | "fallback";
const copy = contact.composer;

export function MessageComposer({ title = copy.title, compact = false, initialService = "" }: { title?: string; compact?: boolean; initialService?: string }) {
  const [channel, setChannel] = useState<MessageChannel>("whatsapp");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<string[]>([]);
  const [links, setLinks] = useState({ whatsapp: whatsappUrl(), mail: `mailto:${site.email}` });
  const [sentTo, setSentTo] = useState("");
  const startedAt = useRef(0);
  const service = services.some((item) => item.id === initialService) ? initialService : generalEnquiry.id;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const text = (key: string) => String(data.get(key) ?? "").trim();
    const message = { name: text("name"), email: text("email"), phone: text("phone"), service: text("service"), message: text("message") };
    const whatsapp = whatsappUrl(whatsappText(message));
    setLinks({ whatsapp, mail: `mailto:${site.email}?subject=${encodeURIComponent(emailSubject(message))}&body=${encodeURIComponent(emailBody(message))}` });

    if (channel === "whatsapp") {
      // Opened inside the submit handler so browsers treat it as a user action, not a pop-up.
      window.open(whatsapp, "_blank", "noopener,noreferrer");
      setStatus("opened");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...message, channel, website: text("website"), startedAt: startedAt.current }),
      });
      if (response.ok) {
        setSentTo(message.email);
        setStatus("sent");
        return;
      }
      if (response.status === 400) {
        const body = await response.json().catch(() => ({}));
        setErrors(Array.isArray(body.errors) ? body.errors : []);
        setStatus("invalid");
        return;
      }
    } catch {
      // Network failure: fall through to the manual options below.
    }
    setStatus("fallback");
  }

  function reset() {
    startedAt.current = 0;
    setErrors([]);
    setStatus("idle");
  }

  if (status === "opened" || status === "sent") {
    const opened = status === "opened";
    return <div className="composer composer-done" role="status">
      <span className="composer-done-mark" aria-hidden="true">{opened ? <MessageCircle size={22} strokeWidth={1.6}/> : <Check size={22} strokeWidth={1.8}/>}</span>
      <h3>{opened ? copy.openedTitle : copy.sentTitle}</h3>
      <p>{opened ? copy.openedBody : <>{copy.sentBody} <b>{sentTo}</b>.</>}</p>
      <div className="composer-actions">
        {opened && <a className="button button-primary" href={links.whatsapp} target="_blank" rel="noreferrer">{copy.openAgain}<ArrowUpRight size={17} aria-hidden="true"/></a>}
        <button type="button" className="button button-outline" onClick={reset}>{copy.another}</button>
      </div>
    </div>;
  }

  const email = channel === "email";
  return <form className="composer" data-compact={compact || undefined} onSubmit={submit} onFocusCapture={() => { if (!startedAt.current) startedAt.current = Date.now(); }}>
    {!compact && <div className="composer-head"><span className="eyebrow">{copy.eyebrow}</span><h3>{title}</h3></div>}

    <fieldset className="composer-channels">
      <legend className="sr-only">{copy.channelLegend}</legend>
      <label><input type="radio" name="channel" value="whatsapp" checked={!email} onChange={() => { setChannel("whatsapp"); setStatus("idle"); }}/><span><MessageCircle size={17} aria-hidden="true"/>WhatsApp</span></label>
      <label><input type="radio" name="channel" value="email" checked={email} onChange={() => { setChannel("email"); setStatus("idle"); }}/><span><Mail size={17} aria-hidden="true"/>Email</span></label>
    </fieldset>

    <div className="composer-grid">
      <label>{copy.labels.name}<input name="name" autoComplete="name" required minLength={2} maxLength={messageLimits.name}/></label>
      {email && <label>{copy.labels.email}<input name="email" type="email" autoComplete="email" required maxLength={messageLimits.email}/></label>}
      {email && <label>{copy.labels.phone} <small>{contact.optional}</small><input name="phone" type="tel" autoComplete="tel" maxLength={messageLimits.phone}/></label>}
      <label>{copy.labels.service}
        <select name="service" defaultValue={service}>
          <option value={generalEnquiry.id}>{generalEnquiry.title}</option>
          {serviceGroups.map((group) => <optgroup key={group} label={group}>{services.filter((item) => item.group === group).map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</optgroup>)}
        </select>
      </label>
      <label className="composer-full">{copy.labels.message}<textarea name="message" rows={compact ? 4 : 5} required minLength={messageLimits.minMessage} maxLength={messageLimits.message} placeholder={copy.placeholder}/></label>
      <label className="composer-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label>
    </div>

    {status === "invalid" && <div className="composer-alert" role="alert"><ul>{errors.map((error) => <li key={error}>{error}</li>)}</ul></div>}
    {status === "fallback" && <div className="composer-alert" role="alert">
      <p>{copy.fallback}</p>
      <div className="composer-actions">
        <a className="button button-outline" href={links.mail}>{copy.mailApp}<ArrowUpRight size={17} aria-hidden="true"/></a>
        <a className="button button-outline" href={links.whatsapp} target="_blank" rel="noreferrer">{copy.whatsappInstead}<ArrowUpRight size={17} aria-hidden="true"/></a>
      </div>
    </div>}

    <div className="composer-foot">
      <button type="submit" className="button button-primary" disabled={status === "sending"}>
        {email ? <Mail size={17} aria-hidden="true"/> : <MessageCircle size={17} aria-hidden="true"/>}
        {status === "sending" ? copy.sending : email ? copy.emailSubmit : copy.whatsappSubmit}
      </button>
      <p>{email ? copy.emailNote : copy.whatsappNote}<br/>{copy.privacy}</p>
    </div>
  </form>;
}
