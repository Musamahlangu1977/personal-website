export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  const lines = title.split(/\n|\\n/g);

  return <section className="page-hero dark">
    <div className="page-orbit" aria-hidden="true"><i /><i /><i /></div>
    <div className="page-grid" aria-hidden="true" />
    <div className="container">
      <span className="eyebrow">{eyebrow}</span>
      <h1 className="page-title">
        {lines.map((line, index) => <span key={line} style={{ display: "block" }}>{index === lines.length - 1 && lines.length > 1 ? <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400 }}>{line}</em> : line}</span>)}
      </h1>
      <div className="page-hero-foot">
        <span>Scroll to explore</span>
        <p className="lede">{intro}</p>
      </div>
    </div>
    <style>{`
      .page-hero{position:relative;min-height:min(86svh,58rem);display:flex;align-items:flex-end;padding:clamp(9rem,14vw,13rem) 0 clamp(4rem,7vw,6.5rem);overflow:hidden;border-bottom:1px solid rgb(255 255 255/.12);background:radial-gradient(circle at 70% 36%,rgb(255 255 255/.12),transparent 9%),radial-gradient(ellipse at 72% 45%,rgb(255 255 255/.08),transparent 28%),#000}
      .page-hero::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent 49.92%,rgb(255 255 255/.08) 50%,transparent 50.08%),linear-gradient(transparent 49.9%,rgb(255 255 255/.055) 50%,transparent 50.1%);background-size:25% 100%,100% 25%;mask-image:linear-gradient(to bottom,transparent,#000 20%,#000 82%,transparent);pointer-events:none}
      .page-hero>.container{position:relative;z-index:2;width:min(100% - 2rem,92rem)}
      .page-hero .eyebrow{padding:.62rem .8rem;border:1px solid rgb(255 255 255/.18);border-radius:999px;background:linear-gradient(115deg,rgb(255 255 255/.1),rgb(0 0 0/.35));backdrop-filter:blur(14px)}
      .page-hero .eyebrow::before{display:none}
      .page-hero .page-title{max-width:13.5ch;margin:clamp(2rem,5vw,4.5rem) 0;font-size:clamp(3.7rem,9.2vw,9.2rem);font-weight:620;line-height:.84;letter-spacing:-.075em}
      .page-hero .page-title>span{display:block}
      .page-hero .page-title em{font-family:var(--font-serif);font-style:italic;font-weight:400;letter-spacing:-.035em}
      .page-hero-foot{display:grid;grid-template-columns:1fr minmax(18rem,38rem);gap:3rem;align-items:end;border-top:1px solid rgb(255 255 255/.14);padding-top:1.4rem}
      .page-hero-foot>span{color:#777;font-size:.66rem;letter-spacing:.18em;text-transform:uppercase}
      .page-hero .lede{margin:0;color:rgb(255 255 255/.66)}
      .page-orbit{position:absolute;right:-8vw;top:4%;width:min(58vw,48rem);aspect-ratio:1;opacity:.85;filter:drop-shadow(0 0 45px rgb(255 255 255/.05));animation:orbit-float 9s ease-in-out infinite}
      .page-orbit i{position:absolute;border:1px solid rgb(255 255 255/.18);border-radius:50%;inset:8%}
      .page-orbit i:nth-child(2){inset:22%;border-color:rgb(255 255 255/.28);transform:rotateX(68deg) rotateZ(18deg)}
      .page-orbit i:nth-child(3){inset:35%;background:radial-gradient(circle at 38% 30%,#ddd,#171717 23%,#000 64%);border-color:rgb(255 255 255/.42);box-shadow:inset -24px -20px 55px #000,0 0 50px rgb(255 255 255/.08)}
      .page-grid{position:absolute;inset:0;opacity:.18;background-image:linear-gradient(rgb(255 255 255/.08) 1px,transparent 1px),linear-gradient(90deg,rgb(255 255 255/.08) 1px,transparent 1px);background-size:4rem 4rem;mask-image:radial-gradient(circle at 72% 42%,#000,transparent 56%)}
      @keyframes orbit-float{50%{transform:translateY(1.2rem) rotate(3deg)}}
      @media(max-width:700px){.page-hero{min-height:82svh}.page-hero .page-title{font-size:clamp(3.15rem,15vw,5.3rem);line-height:.88}.page-hero-foot{grid-template-columns:1fr;gap:1rem}.page-orbit{right:-44%;top:16%;width:115vw;opacity:.52}.page-grid{background-size:2.5rem 2.5rem}}
      @media(prefers-reduced-motion:reduce){.page-orbit{animation:none}}
    `}</style>
  </section>;
}


