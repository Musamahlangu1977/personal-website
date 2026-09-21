"use client";

import { useEffect, useRef } from "react";
import { startAmbientField } from "@/lib/ambient-field";

/*
 * The canvas redraws the full viewport every frame, so it runs on wide screens
 * only. Phones keep the CSS ribbons, which the compositor handles on its own.
 */
export function AmbientField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const wideScreen = window.matchMedia("(min-width: 901px)");
    let stop: (() => void) | undefined;
    const sync = () => {
      if (wideScreen.matches && !stop) stop = startAmbientField(canvas);
      else if (!wideScreen.matches && stop) {
        stop();
        stop = undefined;
      }
    };
    sync();
    wideScreen.addEventListener("change", sync);
    return () => {
      wideScreen.removeEventListener("change", sync);
      stop?.();
    };
  }, []);

  return <canvas ref={canvasRef} className="ambient-field" aria-hidden="true" />;
}
