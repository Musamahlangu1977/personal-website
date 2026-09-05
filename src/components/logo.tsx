import Link from "next/link";
export function Logo({ light = false }: { light?: boolean }) {
  return <Link href="/" className="logo" aria-label="Mahlangu Online Solutions home">
    <span className="logo-mark" aria-hidden="true">M</span><span><b>Mahlangu</b><b>Online Solutions</b><small>Career & personal branding</small></span>
    <style>{`.logo{display:inline-flex;align-items:center;gap:.7rem;line-height:1}.logo-mark{display:grid;place-items:center;width:2.4rem;height:2.4rem;border:1px solid var(--gold-500);border-radius:.55rem;color:var(--gold-500);font-family:var(--font-display);font-size:1.45rem;font-weight:700}.logo b{display:block;font-family:var(--font-display);font-size:.73rem;text-transform:uppercase;letter-spacing:.025em;color:${light ? "var(--cream-50)" : "var(--forest-950)"}}.logo small{display:block;margin-top:.25rem;font-size:.47rem;letter-spacing:.18em;text-transform:uppercase;color:var(--gold-600)}@media(max-width:430px){.logo small{display:none}}`}</style>
  </Link>;
}
