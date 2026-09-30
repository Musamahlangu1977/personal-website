"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X } from "lucide-react";
import { contact } from "@/content/contact";
import { MessageComposer } from "./message-composer";

const copy = contact.composer;

/** Floating "Message us" button that opens the composer in a dialog on every page. */
export function MessageLauncher() {
  const dialog = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  // Remembers which page hid the button, so moving to another page brings it back.
  const [hiddenOn, setHiddenOn] = useState<string | null>(null);
  const hidden = hiddenOn === pathname;

  // Step aside while a page's own composer is on screen, so there is only ever one way in.
  useEffect(() => {
    const targets = document.querySelectorAll("[data-hide-launcher]");
    if (!targets.length) return;
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => (entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target)));
      setHiddenOn(visible.size > 0 ? pathname : null);
    }, { threshold: 0.2 });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  return <>
    <button type="button" className={`message-fab${hidden ? " is-hidden" : ""}`} aria-haspopup="dialog" tabIndex={hidden ? -1 : undefined} onClick={() => dialog.current?.showModal()}>
      <MessageCircle aria-hidden="true"/><span>{copy.launcher}</span>
    </button>
    <dialog ref={dialog} className="message-dialog" aria-labelledby="message-dialog-title" onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="message-dialog-panel">
        <header>
          <div><span className="eyebrow">{copy.dialogEyebrow}</span><h2 id="message-dialog-title">{copy.dialogTitle}</h2></div>
          <button type="button" className="message-dialog-close" aria-label={copy.close} onClick={() => dialog.current?.close()}><X size={18} aria-hidden="true"/></button>
        </header>
        <MessageComposer compact/>
      </div>
    </dialog>
  </>;
}
