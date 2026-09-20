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
    const wideScreen = window.matchMedia("(min-width: 901px)").matches;
    if (!wideScreen || slowConnection) return;
    video.src = src;
    video.load();
    const play = video.play();
    if (play) play.catch(() => {});
  }, [src]);

  return <video ref={videoRef} className="hero-video" autoPlay muted loop playsInline preload="none" poster={poster} />;
}
