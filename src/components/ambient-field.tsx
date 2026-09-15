"use client";

import { useEffect, useRef } from "react";
import { startAmbientField } from "@/lib/ambient-field";

export function AmbientField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    return startAmbientField(canvasRef.current);
  }, []);

  return <canvas ref={canvasRef} className="ambient-field" aria-hidden="true" />;
}
