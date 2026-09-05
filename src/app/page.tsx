import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import "./home.css";
import { ButtonLink } from "@/components/button-link";
import { FinalCta } from "@/components/final-cta";
import { HomeMotion } from "@/components/home-motion";
import { ProjectGrid } from "@/components/project-grid";
import { coreServices, services } from "@/content/services";
import { projects } from "@/content/portfolio";
import { startingPrice } from "@/content/pricing";
import { pageMetadata, seo } from "@/content/seo";
import { actions, home, process, site } from "@/content/site";

export const metadata = pageMetadata(seo.home.title, seo.home.description, "/");

export default function Home() {
  const digital = services.filter((service) => !service.core);

  return <main id="main-content" className="cinematic-home experience-home">
    <HomeMotion />

    <section className="hero dark">
      <div className="home-guides" aria-hidden="true"><i/><i/><i/><i/></div>
      <figure className="hero-art" aria-hidden="true">
        <video className="hero-video" autoPlay muted loop playsInline preload="metadata" poster="/images/hero-doors-v2.webp">
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4" type="video/mp4"/>
        </video>
        <span className="hero-glow"/>
      </figure>
      <div className="container hero-stage">
        <span className="eyebrow hero-eyebrow">{home.eyebrow}</span>
        <p className="hero-aside">{home.location}</p>
        <h1 className="display hero-title"><span>{home.headline[0]}</span><span>{home.headline[1]}</span><em>{home.headline[2]} {home.headline[3]}</em></h1>
        <p className="hero-lede">{home.intro}</p>
        <nav className="hero-actions"><ButtonLink href="/contact">{actions.start}</ButtonLink><ButtonLink href="/work" variant="outline">{actions.work}</ButtonLink></nav>
        <div className="hero-bottom">
          <article><span>Who we are</span><p>A South African studio for people and businesses ready to be seen clearly.</p></article>
          <article><span>Based in Pretoria</span><p>Supporting career growth and small businesses across South Africa.</p></article>
          <article><span>Proof in practice</span><strong>{site.clients}</strong><p>clients served nationwide since 2023.</p></article>
        </div>
      </div>
    </section>

    <section className="stats experience-stats" aria-label="Studio statistics">
      <div className="container">{site.stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
    </section>

    <section className="experience-manifesto dark" data-scene>
      <div className="home-guides" aria-hidden="true"><i/><i/><i/><i/></div>
      <span className="scene-mark" aria-hidden="true">01 / Positioning</span>
      <div className="container" data-reveal>
        <div className="manifesto-title">
          <span className="eyebrow">Who we are</span>
          <h2>{home.experienceHeading}</h2>
        </div>
        <figure className="manifesto-visual">
          <Image src="/images/author.webp" alt="Author brand and publishing system designed by Mahlangu Online Solutions" fill sizes="(max-width: 800px) 100vw, 48vw"/>
          <figcaption>Strategy made visible.</figcaption>
        </figure>
        <div className="manifesto-copy">
          <p>{home.experienceIntro}</p>
          <Link href="/about">Meet the studio <ArrowUpRight size={17}/></Link>
        </div>
      </div>
    </section>

    <section className="service-experience" data-scene>
      <span className="scene-mark" aria-hidden="true">02 / Capabilities</span>
      <div className="container" data-reveal>
        <header className="experience-heading">
          <span className="eyebrow">What we shape</span>
          <h2>{home.serviceExperienceHeading}</h2>
          <Link href="/services">Explore all services <ArrowRight size={17}/></Link>
        </header>
        <div className="service-deck">
          {coreServices.map((service, index) => <Link key={service.id} href={`/services#${service.id}`} className="service-tile" data-panel>
            <span className="service-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="service-sigil" aria-hidden="true"><i/><i/><i/></span>
            <h3>{service.title}</h3>
            <p>{service.outcome}</p>
            <ArrowUpRight className="service-arrow" size={18}/>
          </Link>)}
        </div>
      </div>
    </section>

    <section className="work-experience dark" data-scene>
      <span className="scene-mark" aria-hidden="true">03 / Selected work</span>
      <div className="container" data-reveal>
        <header className="experience-heading split-heading">
          <div><span className="eyebrow">Selected work</span><h2>{home.workHeading}</h2></div>
          <p>{home.workIntro}</p>
        </header>
        <ProjectGrid items={projects.slice(0, 4)}/>
        <Link className="experience-link" href="/work">View the full portfolio <ArrowRight size={17}/></Link>
      </div>
    </section>

    <section className="capability-rail" aria-label="Digital and design capabilities">
      <div className="rail-heading"><span>{home.capabilityHeading}</span></div>
      <div className="rail-track">
        <div>{digital.map((service) => <Link key={service.id} href={`/services#${service.id}`}>{service.title}<i>✦</i></Link>)}</div>
        <div aria-hidden="true">{digital.map((service) => <Link key={`repeat-${service.id}`} tabIndex={-1} href={`/services#${service.id}`}>{service.title}<i>✦</i></Link>)}</div>
      </div>
    </section>

    <section className="process-experience dark" data-scene>
      <span className="scene-mark" aria-hidden="true">04 / Process</span>
      <div className="container" data-reveal>
        <header className="experience-heading split-heading">
          <div><span className="eyebrow">How it works</span><h2>{process.heading}</h2></div>
          <p>{process.intro}</p>
        </header>
        <ol>{process.steps.map((step, index) => <li key={step.title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h3>{step.title}</h3>
          <p>{step.body}</p>
        </li>)}</ol>
        <ButtonLink href="/process" variant="outline">See the process</ButtonLink>
      </div>
    </section>

    <section className="founder-experience" data-scene>
      <span className="scene-mark" aria-hidden="true">05 / Founder</span>
      <div className="container" data-reveal>
        <div className="founder-signal" aria-hidden="true">
          <span>Independent studio · Pretoria</span>
          <b>M</b>
          <i>{site.clients}<small>clients served</small></i>
        </div>
        <div className="founder-copy">
          <span className="eyebrow">The person behind the work</span>
          <h2>{home.founderHeading}</h2>
          <h3>{site.founder}</h3>
          <p>{home.founderIntro}</p>
          <div className="founder-proof"><span>{site.founded}</span><span>{site.location}</span><span>{site.founderRole}</span></div>
          <Link href="/about">More about Musa <ArrowUpRight size={17}/></Link>
        </div>
      </div>
    </section>

    <section className="access-experience">
      <div className="container" data-reveal>
        <span>Accessible premium career support</span>
        <strong>Starting from {startingPrice()}</strong>
        <Link href="/pricing">View services and pricing <ArrowRight size={17}/></Link>
      </div>
    </section>

    <FinalCta />
  </main>;
}
