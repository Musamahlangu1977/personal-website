"use client";

import { useEffect, useRef } from "react";

export function HomeMotion() {
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = document.querySelector<HTMLElement>(".cinematic-home");
    const hero = document.querySelector<HTMLElement>(".hero");
    const halo = haloRef.current;
    const scenes = document.querySelectorAll<HTMLElement>("[data-scene]");
    const reveals = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.14 },
    );
    reveals.forEach((element) => observer.observe(element));

    const sceneObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        entry.target.classList.toggle("is-scene-active", entry.isIntersecting);
      }),
      { rootMargin: "-24% 0px -24% 0px", threshold: 0.08 },
    );
    scenes.forEach((scene) => sceneObserver.observe(scene));

    // Count up "150+" style statistics the first time they appear.
    const countFrames = new Set<number>();
    const countUp = (element: HTMLElement) => {
      const target = Number.parseInt(element.textContent ?? "", 10);
      const start = performance.now();
      element.classList.add("is-counting");
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / 1600);
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        element.textContent = `${Math.round(target * eased)}+`;
        if (progress < 1) {
          const id = window.requestAnimationFrame(tick);
          countFrames.add(id);
        } else {
          element.classList.remove("is-counting");
        }
      };
      countFrames.add(window.requestAnimationFrame(tick));
    };
    const countObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        countObserver.unobserve(entry.target);
        countUp(entry.target as HTMLElement);
      }),
      { threshold: 0.6 },
    );
    if (!reduceMotion) {
      document.querySelectorAll<HTMLElement>(".experience-stats strong").forEach((stat) => {
        if (/^\d{1,3}\+$/.test(stat.textContent ?? "")) countObserver.observe(stat);
      });
    }

    let frame = 0;
    const updateScroll = () => {
      const heroProgress = hero
        ? Math.min(1, Math.max(0, window.scrollY / Math.max(hero.offsetHeight, 1)))
        : 0;
      const pageProgress = Math.min(
        1,
        Math.max(0, window.scrollY / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)),
      );
      hero?.style.setProperty("--hero-progress", heroProgress.toFixed(3));
      page?.style.setProperty("--page-progress", pageProgress.toFixed(4));
      scenes.forEach((scene) => {
        const rect = scene.getBoundingClientRect();
        const sceneProgress = (window.innerHeight * 0.5 - (rect.top + rect.height * 0.5)) / Math.max(rect.height, 1);
        const shift = Math.max(-1, Math.min(1, sceneProgress)) * 48;
        scene.style.setProperty("--scene-y", `${shift.toFixed(2)}px`);
      });
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScroll);
    };

    // Eased pointer: spotlight, hero parallax and cursor halo.
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2, tx: window.innerWidth / 2, ty: window.innerHeight / 2 };
    let pointerFrame = 0;
    const renderPointer = () => {
      const ease = reduceMotion ? 1 : 0.18;
      pointer.x += (pointer.tx - pointer.x) * ease;
      pointer.y += (pointer.ty - pointer.y) * ease;
      page?.style.setProperty("--pointer-x", `${pointer.x.toFixed(1)}px`);
      page?.style.setProperty("--pointer-y", `${pointer.y.toFixed(1)}px`);
      hero?.style.setProperty("--pointer-nx", ((pointer.x / window.innerWidth) * 2 - 1).toFixed(3));
      hero?.style.setProperty("--pointer-ny", ((pointer.y / window.innerHeight) * 2 - 1).toFixed(3));
      if (halo) halo.style.translate = `${pointer.x.toFixed(1)}px ${pointer.y.toFixed(1)}px`;
      const settled = Math.abs(pointer.tx - pointer.x) + Math.abs(pointer.ty - pointer.y) < 0.4;
      pointerFrame = settled ? 0 : window.requestAnimationFrame(renderPointer);
    };
    const onPointerMove = (event: PointerEvent) => {
      pointer.tx = event.clientX;
      pointer.ty = event.clientY;
      if (halo && event.pointerType === "mouse") {
        halo.classList.add("is-active");
        const target = event.target instanceof Element ? event.target : null;
        halo.classList.toggle("is-hovering", Boolean(target?.closest("a, button, [data-tilt]")));
      }
      if (!pointerFrame) pointerFrame = window.requestAnimationFrame(renderPointer);
    };
    const onPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) halo?.classList.remove("is-active");
    };

    // 3D tilt with glare on cards.
    const tiltables = document.querySelectorAll<HTMLElement>("[data-tilt]");
    const onTiltMove = (event: PointerEvent) => {
      const element = event.currentTarget as HTMLElement;
      const rect = element.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      element.style.setProperty("--tilt-x", `${((0.5 - py) * 7).toFixed(2)}deg`);
      element.style.setProperty("--tilt-y", `${((px - 0.5) * 9).toFixed(2)}deg`);
      element.style.setProperty("--glare-x", `${(px * 100).toFixed(1)}%`);
      element.style.setProperty("--glare-y", `${(py * 100).toFixed(1)}%`);
      element.classList.add("is-tilting");
    };
    const onTiltLeave = (event: PointerEvent) => {
      const element = event.currentTarget as HTMLElement;
      element.classList.remove("is-tilting");
      element.style.removeProperty("--tilt-x");
      element.style.removeProperty("--tilt-y");
    };

    // Magnetic buttons.
    const magnets = document.querySelectorAll<HTMLElement>(".hero-actions .button, .final-cta .button");
    const onMagnetMove = (event: PointerEvent) => {
      const element = event.currentTarget as HTMLElement;
      const rect = element.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      element.style.translate = `${(dx * 0.16).toFixed(1)}px ${(dy * 0.3).toFixed(1)}px`;
    };
    const onMagnetLeave = (event: PointerEvent) => {
      (event.currentTarget as HTMLElement).style.translate = "";
    };

    const interactive = finePointer && !reduceMotion;
    if (interactive) {
      tiltables.forEach((element) => {
        element.addEventListener("pointermove", onTiltMove);
        element.addEventListener("pointerleave", onTiltLeave);
      });
      magnets.forEach((element) => {
        element.addEventListener("pointermove", onMagnetMove);
        element.addEventListener("pointerleave", onMagnetLeave);
      });
    }

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerout", onPointerOut);
    return () => {
      observer.disconnect();
      sceneObserver.disconnect();
      countObserver.disconnect();
      countFrames.forEach((id) => window.cancelAnimationFrame(id));
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerout", onPointerOut);
      if (interactive) {
        tiltables.forEach((element) => {
          element.removeEventListener("pointermove", onTiltMove);
          element.removeEventListener("pointerleave", onTiltLeave);
        });
        magnets.forEach((element) => {
          element.removeEventListener("pointermove", onMagnetMove);
          element.removeEventListener("pointerleave", onMagnetLeave);
        });
      }
      if (frame) window.cancelAnimationFrame(frame);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
    };
  }, []);

  return <>
    <div className="scroll-progress" aria-hidden="true" />
    <div ref={haloRef} className="cursor-halo" aria-hidden="true" />
  </>;
}
