import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { AmbientField } from "@/components/ambient-field";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { MessageLauncher } from "@/components/message-launcher";
import { indexable, siteUrl } from "@/content/seo";
import { site } from "@/content/site";

// Self-hosted and preloaded: no round trip to Google, and the generated
// fallback metrics stop headings from reflowing when the fonts arrive.
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", display: "swap", variable: "--font-instrument-serif" });

export const metadata: Metadata = { metadataBase: new URL(siteUrl), title: { default: `${site.name} | ${site.descriptor}`, template: `%s | ${site.name}` }, description: "Strategic career documents, personal brand systems and digital experiences from Pretoria, South Africa.", robots: indexable ? { index: true, follow: true } : { index: false, follow: false }, alternates: { canonical: "/" }, formatDetection: { telephone: false } };
const schema={"@context":"https://schema.org","@type":"ProfessionalService",name:site.name,description:"Career and personal branding studio offering career documents, brand identity and digital services.",email:site.email,telephone:site.phone,address:{"@type":"PostalAddress",addressLocality:"Pretoria",addressRegion:"Gauteng",addressCountry:"ZA"},founder:{"@type":"Person",name:site.founder},areaServed:{"@type":"Country",name:"South Africa"},url:siteUrl};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en-ZA" className={`${inter.variable} ${instrumentSerif.variable}`}><body><a className="skip-link" href="#main-content">Skip to main content</a><Navigation/><div className="site-ambient-motion" aria-hidden="true"><i/><i/><i/><i/><i/></div><div className="night-sky" aria-hidden="true"><i/><i/><i/><i/></div><AmbientField/>{children}<Footer/><MessageLauncher/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/></body></html>}
