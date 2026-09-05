import Link from "next/link"; import { ArrowUpRight } from "lucide-react";
export function ButtonLink({ href, children, variant = "primary", external = false }: { href: string; children: React.ReactNode; variant?: "primary" | "outline" | "dark"; external?: boolean }) {
  return <Link className={`button button-${variant}`} href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>{children}<ArrowUpRight size={17} aria-hidden="true" /></Link>;
}
