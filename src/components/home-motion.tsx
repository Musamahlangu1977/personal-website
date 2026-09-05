"use client";

import { useEffect } from "react";

export function HomeMotion() {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>(".cinematic-home");
    const hero = document.querySelector<HTMLElement>(".hero");
    const scenes = document.querySelectorAll<HTMLElement>("[data-scene]");
    const reveals = document.querySelectorAll<HTMLElement>("[data-reveal]");
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

    const onPointerMove = (event: PointerEvent) => {
      page?.style.setProperty("--pointer-x", `${event.clientX}px`);
      page?.style.setProperty("--pointer-y", `${event.clientY}px`);
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      observer.disconnect();
      sceneObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}
