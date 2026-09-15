// Preview-only port of src/components/home-motion.tsx plus the mobile menu toggle.
(function () {
  startAmbientField(document.querySelector(".ambient-field"));

  const page = document.querySelector(".cinematic-home");
  const hero = document.querySelector(".hero");
  const halo = document.querySelector(".cursor-halo");
  const scenes = document.querySelectorAll("[data-scene]");
  const reveals = document.querySelectorAll("[data-reveal]");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(pointer: fine)").matches;

  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
  }), { threshold: 0.14 });
  reveals.forEach((el) => observer.observe(el));

  const sceneObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    entry.target.classList.toggle("is-scene-active", entry.isIntersecting);
  }), { rootMargin: "-24% 0px -24% 0px", threshold: 0.08 });
  scenes.forEach((s) => sceneObserver.observe(s));

  const countUp = (el) => {
    const target = parseInt(el.textContent, 10);
    const start = performance.now();
    el.classList.add("is-counting");
    const tick = (now) => {
      const p = Math.min(1, (now - start) / 1600);
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      el.textContent = Math.round(target * eased) + "+";
      if (p < 1) requestAnimationFrame(tick); else el.classList.remove("is-counting");
    };
    requestAnimationFrame(tick);
  };
  const countObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    countObserver.unobserve(entry.target);
    countUp(entry.target);
  }), { threshold: 0.6 });
  if (!reduceMotion) document.querySelectorAll(".experience-stats strong").forEach((s) => {
    if (/^\d{1,3}\+$/.test(s.textContent)) countObserver.observe(s);
  });

  let frame = 0;
  const updateScroll = () => {
    const heroProgress = Math.min(1, Math.max(0, scrollY / Math.max(hero.offsetHeight, 1)));
    const pageProgress = Math.min(1, Math.max(0, scrollY / Math.max(document.documentElement.scrollHeight - innerHeight, 1)));
    hero.style.setProperty("--hero-progress", heroProgress.toFixed(3));
    page.style.setProperty("--page-progress", pageProgress.toFixed(4));
    scenes.forEach((scene) => {
      const rect = scene.getBoundingClientRect();
      const sp = (innerHeight * 0.5 - (rect.top + rect.height * 0.5)) / Math.max(rect.height, 1);
      scene.style.setProperty("--scene-y", (Math.max(-1, Math.min(1, sp)) * 48).toFixed(2) + "px");
    });
    frame = 0;
  };
  addEventListener("scroll", () => { if (!frame) frame = requestAnimationFrame(updateScroll); }, { passive: true });

  const pointer = { x: innerWidth / 2, y: innerHeight / 2, tx: innerWidth / 2, ty: innerHeight / 2 };
  let pointerFrame = 0;
  const renderPointer = () => {
    const ease = reduceMotion ? 1 : 0.18;
    pointer.x += (pointer.tx - pointer.x) * ease;
    pointer.y += (pointer.ty - pointer.y) * ease;
    page.style.setProperty("--pointer-x", pointer.x.toFixed(1) + "px");
    page.style.setProperty("--pointer-y", pointer.y.toFixed(1) + "px");
    hero.style.setProperty("--pointer-nx", ((pointer.x / innerWidth) * 2 - 1).toFixed(3));
    hero.style.setProperty("--pointer-ny", ((pointer.y / innerHeight) * 2 - 1).toFixed(3));
    halo.style.translate = pointer.x.toFixed(1) + "px " + pointer.y.toFixed(1) + "px";
    const settled = Math.abs(pointer.tx - pointer.x) + Math.abs(pointer.ty - pointer.y) < 0.4;
    pointerFrame = settled ? 0 : requestAnimationFrame(renderPointer);
  };
  addEventListener("pointermove", (event) => {
    pointer.tx = event.clientX; pointer.ty = event.clientY;
    if (event.pointerType === "mouse") {
      halo.classList.add("is-active");
      halo.classList.toggle("is-hovering", Boolean(event.target.closest && event.target.closest("a, button, [data-tilt]")));
    }
    if (!pointerFrame) pointerFrame = requestAnimationFrame(renderPointer);
  }, { passive: true });
  document.addEventListener("pointerout", (e) => { if (!e.relatedTarget) halo.classList.remove("is-active"); });

  if (finePointer && !reduceMotion) {
    document.querySelectorAll("[data-tilt]").forEach((el) => {
      el.addEventListener("pointermove", (event) => {
        const r = el.getBoundingClientRect();
        const px = (event.clientX - r.left) / r.width, py = (event.clientY - r.top) / r.height;
        el.style.setProperty("--tilt-x", ((0.5 - py) * 7).toFixed(2) + "deg");
        el.style.setProperty("--tilt-y", ((px - 0.5) * 9).toFixed(2) + "deg");
        el.style.setProperty("--glare-x", (px * 100).toFixed(1) + "%");
        el.style.setProperty("--glare-y", (py * 100).toFixed(1) + "%");
        el.classList.add("is-tilting");
      });
      el.addEventListener("pointerleave", () => { el.classList.remove("is-tilting"); el.style.removeProperty("--tilt-x"); el.style.removeProperty("--tilt-y"); });
    });
    document.querySelectorAll(".hero-actions .button, .final-cta .button").forEach((el) => {
      el.addEventListener("pointermove", (event) => {
        const r = el.getBoundingClientRect();
        el.style.translate = ((event.clientX - (r.left + r.width / 2)) * 0.16).toFixed(1) + "px " + ((event.clientY - (r.top + r.height / 2)) * 0.3).toFixed(1) + "px";
      });
      el.addEventListener("pointerleave", () => { el.style.translate = ""; });
    });
  }
  updateScroll();

  // Mobile menu
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("mobile-navigation");
  const backdrop = document.querySelector(".menu-backdrop");
  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", open);
    menu.classList.toggle("is-open", open);
    backdrop.classList.toggle("is-open", open);
  };
  toggle.addEventListener("click", () => setOpen(!menu.classList.contains("is-open")));
  backdrop.addEventListener("click", () => setOpen(false));
})();
