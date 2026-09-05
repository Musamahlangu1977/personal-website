import type { Metadata } from "next";
import { site } from "./site";
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const indexable = process.env.SITE_INDEXABLE === "true" && !siteUrl.includes("localhost") && !siteUrl.includes("your-verified-domain");
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return { title, description, alternates: { canonical: path }, openGraph: { title: `${title} | ${site.name}`, description, url: path, type: "website", locale: "en_ZA", siteName: site.name }, twitter: { card: "summary", title, description } };
}
export const seo = {
  home: { title: "Career & Personal Branding Studio in Pretoria", description: "Professional CV writing, LinkedIn optimisation, brand identity and website design in Pretoria. Mahlangu Online Solutions serves clients across South Africa." },
  services: { title: "CV Writing, Brand & Digital Services South Africa", description: "Explore professional resume services, application support, LinkedIn optimisation, graphic design and website design from our Pretoria studio." },
  work: { title: "Selected Work — Career Documents & Brand Identity", description: "Explore Mahlangu Online Solutions’ brand identity, graphic design and career document portfolio." },
  about: { title: "About Musa Mahlangu & the Studio", description: "Meet Musa Njabulo Mahlangu, founder of Mahlangu Online Solutions, a career and personal branding studio in Pretoria." },
  process: { title: "Our Process — From Conversation to Finished Work", description: "Discovery, strategy, design and handover. A collaborative process for your career documents, brand and digital presence." },
  pricing: { title: "Services & Pricing — Accessible Premium Service", description: "Explore career, brand and digital services with tailored quotations and clearly agreed scope." },
  resources: { title: "CV, LinkedIn & Personal Branding Resources", description: "Practical guidance on CV writing in South Africa, LinkedIn profiles, portfolio websites and personal branding." },
  contact: { title: "Contact — Start Your Project", description: "Speak to Mahlangu Online Solutions in Pretoria about your CV, personal brand, design or website. Serving clients across South Africa." },
};
