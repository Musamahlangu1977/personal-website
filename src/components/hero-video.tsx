"use client";

import { useEffect, useRef } from "react";

/*
 * The hero film is a large streamed file. Phones, narrow screens and
 * data-saver connections keep the poster image instead, which removes the
 * biggest first-load cost and the per-frame video filtering while scrolling.
 */
export function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const slowConnection = Boolean(connection?.saveData) || /2g/.test(connection?.effectiveType ?? "");
    if (slowConnection) return;
    const wideScreen = window.matchMedia("(min-width: 901px)");
    // Also runs when a narrow window is widened later, and when the tab comes
    // back into view, because browsers pause video playing in a hidden tab.
    const start = () => {
      if (!wideScreen.matches || document.hidden) return;
      if (!video.getAttribute("src")) {
        video.src = src;
        video.load();
      }
      const play = video.play();
      if (play) play.catch(() => {});
    };
    start();
    wideScreen.addEventListener("change", start);
    document.addEventListener("visibilitychange", start);
    return () => {
      wideScreen.removeEventListener("change", start);
      document.removeEventListener("visibilitychange", start);
    };
  }, [src]);

  return <video ref={videoRef} className="hero-video" autoPlay muted loop playsInline preload="none" poster={poster} />;
}
