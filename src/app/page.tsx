import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, GraduationCap } from "lucide-react";
import "./home.css";
import "./home-motion.css";
import { ButtonLink } from "@/components/button-link";
import { HeroVideo } from "@/components/hero-video";
import { HomeMotion } from "@/components/home-motion";
import { MessageComposer } from "@/components/message-composer";
import { ProjectGrid } from "@/components/project-grid";
import { ServiceIcon } from "@/components/service-icon";
import { coreServices, services } from "@/content/services";
import { projects } from "@/content/portfolio";
import { pageMetadata, seo } from "@/content/seo";
import { actions, home, process, site, whatsappUrl } from "@/content/site";

export const metadata = pageMetadata(seo.home.title, seo.home.description, "/");

export default function Home() {
  const digital = services.filter((service) => !service.core);

  return <main id="main-content" className="cinematic-home experience-home">
    <HomeMotion />

    <section className="hero dark">
      <div className="home-guides" aria-hidden="true"><i/><i/><i/><i/></div>
      <div className="hero-beams" aria-hidden="true"><i/><i/><i/></div>
      <div className="hero-portal" aria-hidden="true"><i/><i/><i/><i/><i/></div>
      <figure className="hero-art" aria-hidden="true">
        <HeroVideo src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4" poster="/images/hero-doors-v2.webp"/>
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
          <article className="hero-credentials">
            <span>Qualifications</span>
            <ul>{site.degrees.awards.map((degree) => <li key={degree.award}><GraduationCap size={16} strokeWidth={1.7} aria-hidden="true"/><b>{degree.award}</b>{degree.field}</li>)}</ul>
            <p>{site.degrees.institution}</p>
          </article>
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
          {coreServices.map((service, index) => <Link key={service.id} href={`/services#${service.id}`} className="service-tile" data-panel data-tilt>
            <span className="panel-glare" aria-hidden="true"/>
            <span className="service-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="service-sigil" aria-hidden="true"><i/><i/><b className="service-core"><ServiceIcon id={service.id}/></b><i/></span>
            <h3>{service.title}</h3>
            <p>{service.outcome}</p>
            <ArrowUpRight className="service-arrow" size={18}/>
          </Link>)}
        </div>
        <p className="service-swipe-hint" aria-hidden="true">Swipe to see all {coreServices.length} <ArrowRight size={15}/></p>
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

    <section id="message" className="final-cta message-cta dark" data-hide-launcher>
      <div className="container" data-reveal>
        <div className="message-cta-copy">
          <span className="eyebrow">Your next move</span>
          <h2>{home.ctaHeading}</h2>
          <p>{home.ctaBody}</p>
          <dl className="message-cta-lines">
            <div><dt>WhatsApp</dt><dd><a href={whatsappUrl()} target="_blank" rel="noreferrer">{site.phone}</a></dd></div>
            <div><dt>Email</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd></div>
            <div><dt>Studio</dt><dd>{site.location}</dd></div>
          </dl>
        </div>
        <MessageComposer />
      </div>
    </section>
  </main>;
}
