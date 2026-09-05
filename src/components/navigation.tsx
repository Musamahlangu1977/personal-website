"use client";

import Link from "next/link";
import { MessageCircle, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/content/navigation";
import { actions, whatsappUrl } from "@/content/site";
import { Logo } from "./logo";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return <header className="site-header">
    <div className="nav-shell">
      <Logo light />
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map((item) => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}
      </nav>
      <Link className="button button-primary desktop-cta" href="/contact">{actions.start}</Link>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</button>
    </div>
    <button className={`menu-backdrop ${open ? "is-open" : ""}`} type="button" tabIndex={open ? 0 : -1} aria-label="Close menu" onClick={() => setOpen(false)} />
    <div id="mobile-navigation" className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <nav aria-label="Mobile navigation">
        {navigation.map((item, index) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}><span>{String(index + 1).padStart(2, "0")}</span>{item.label}</Link>)}
      </nav>
      <div className="mobile-actions">
        <Link className="button button-primary" href="/contact" onClick={() => setOpen(false)}>{actions.start}</Link>
        <Link className="button button-outline" href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle size={18}/>{actions.whatsapp}</Link>
      </div>
    </div>
    <style>{`
      .site-header { position: fixed; z-index: 50; inset: 0 0 auto; padding: 1rem clamp(1rem, 3vw, 3rem); background: transparent; pointer-events: none; }
      .nav-shell { position: relative; z-index: 4; width: min(100%, 92rem); margin: auto; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 1.25rem; pointer-events: none; }
      .nav-shell > * { pointer-events: auto; }
      .site-header .logo { justify-self: start; padding: .52rem .72rem; border: 1px solid rgb(255 255 255 / .16); border-radius: .55rem; background: linear-gradient(135deg, rgb(255 255 255 / .1), rgb(0 0 0 / .58) 55%, rgb(255 255 255 / .045)); box-shadow: inset 0 1px rgb(255 255 255 / .1), 0 10px 32px rgb(0 0 0 / .24); backdrop-filter: blur(18px); }
      .desktop-nav { justify-self: center; display: flex; align-items: center; gap: .42rem; }
      .desktop-nav a { position: relative; min-height: 2.55rem; display: inline-flex; align-items: center; padding: 0 .9rem; overflow: hidden; color: rgb(250 248 242 / .86); border: 1px solid rgb(255 255 255 / .16); border-radius: .45rem; background: linear-gradient(105deg, rgb(3 3 3 / .92), rgb(32 32 32 / .84) 52%, rgb(72 72 72 / .66)); box-shadow: inset 0 1px rgb(255 255 255 / .08); backdrop-filter: blur(16px); font-size: .78rem; font-weight: 600; transition: border-color .35s ease, box-shadow .35s ease, color .35s ease; }
      .desktop-nav a::before { content: ""; position: absolute; inset: 0; background: linear-gradient(115deg, transparent 30%, rgb(255 255 255 / .14) 50%, transparent 70%); transform: translateX(-125%); transition: transform .65s ease; }
      .desktop-nav a:hover::before, .desktop-nav a[aria-current="page"]::before { transform: translateX(125%); }
      .desktop-nav a:hover, .desktop-nav a[aria-current="page"] { color: var(--cream-50); border-color: rgb(255 255 255 / .48); box-shadow: 0 0 20px rgb(255 255 255 / .11), inset 0 1px rgb(255 255 255 / .12); }
      .desktop-cta { justify-self: end; min-height: 2.6rem; border-radius: .45rem; background: linear-gradient(180deg, #fff, #cfcfcf); color: var(--forest-950); border-color: #fff; box-shadow: inset 0 1px #fff, 0 10px 30px rgb(0 0 0 / .2); }
      .menu-toggle { display: none; justify-self: end; place-items: center; width: 2.75rem; height: 2.75rem; padding: 0; color: var(--cream-50); border: 1px solid rgb(255 255 255 / .2); border-radius: .45rem; background: linear-gradient(135deg, rgb(255 255 255 / .1), rgb(0 0 0 / .62)); box-shadow: inset 0 1px rgb(255 255 255 / .1); backdrop-filter: blur(18px); }
      .menu-backdrop { position: fixed; z-index: 1; inset: 0; display: block; padding: 0; opacity: 0; visibility: hidden; border: 0; background: rgb(0 0 0 / .82); backdrop-filter: blur(28px); transition: opacity .28s ease, visibility .28s ease; pointer-events: none; }
      .menu-backdrop.is-open { opacity: 1; visibility: visible; pointer-events: auto; }
      .mobile-menu { display: none; }

      @media (max-width: 1050px) {
        .nav-shell { grid-template-columns: 1fr auto; }
        .desktop-nav, .desktop-cta { display: none; }
        .menu-toggle { display: grid; }
        .mobile-menu { position: fixed; z-index: 2; inset: 0; display: flex; flex-direction: column; justify-content: center; gap: 1rem; padding: max(6rem, calc(env(safe-area-inset-top) + 5.5rem)) clamp(1rem, 4vw, 2.5rem) 2rem; opacity: 0; visibility: hidden; transform: translateY(-10px); transition: opacity .28s ease, visibility .28s ease, transform .28s ease; pointer-events: none; }
        .mobile-menu.is-open { opacity: 1; visibility: visible; transform: none; pointer-events: auto; }
        .mobile-menu nav { display: grid; gap: .65rem; width: min(100%, 48rem); margin: auto; }
        .mobile-menu nav a { display: flex; align-items: center; gap: 1rem; min-height: 3.7rem; padding: .8rem 1rem; color: var(--cream-50); border: 1px solid rgb(255 255 255 / .2); border-radius: .65rem; background: linear-gradient(105deg, rgb(3 3 3 / .98), rgb(48 48 48 / .94)); box-shadow: inset 0 1px rgb(255 255 255 / .1), 0 12px 30px rgb(0 0 0 / .24); font: 550 clamp(1.15rem, 4vw, 1.7rem) / 1.2 var(--font-display); }
        .mobile-menu nav span { font: 600 .65rem / 1 var(--font-body); color: var(--gold-400); }
        .mobile-actions { display: grid; grid-template-columns: 1fr 1fr; gap: .65rem; width: min(100%, 48rem); margin: 0 auto; }
        .site-header .logo, .menu-toggle { position: relative; z-index: 4; }
      }
      @media (max-width: 520px) {
        .site-header { padding: .65rem; }
        .site-header .logo { padding: .42rem .55rem; }
        .mobile-actions { grid-template-columns: 1fr; }
      }
      @media (prefers-reduced-motion: no-preference) {
        .site-header .logo { animation: nav-in .8s .08s both cubic-bezier(.16,1,.3,1); }
        .desktop-nav a:nth-child(1) { animation: nav-in .8s .16s both cubic-bezier(.16,1,.3,1); }
        .desktop-nav a:nth-child(2) { animation: nav-in .8s .24s both cubic-bezier(.16,1,.3,1); }
        .desktop-nav a:nth-child(3) { animation: nav-in .8s .32s both cubic-bezier(.16,1,.3,1); }
        .desktop-nav a:nth-child(4) { animation: nav-in .8s .4s both cubic-bezier(.16,1,.3,1); }
        .desktop-nav a:nth-child(n+5) { animation: nav-in .8s .48s both cubic-bezier(.16,1,.3,1); }
        .desktop-cta, .menu-toggle { animation: nav-in .8s .28s both cubic-bezier(.16,1,.3,1); }
      }
      @keyframes nav-in { from { opacity: 0; transform: translateY(-12px) scale(.94); } }
    `}</style>
  </header>;
}

