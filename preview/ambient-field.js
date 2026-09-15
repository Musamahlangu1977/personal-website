/*
 * Ambient light field: drifting dust in three depths, a pointer-led
 * constellation and occasional light streaks. Monochrome, canvas-based,
 * paused while the tab is hidden and static for reduced-motion users.
 */


const TAU = Math.PI * 2;
const LINK_RADIUS = 170;
const PAIR_RADIUS = 110;

function startAmbientField(canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  let width = 0;
  let height = 0;
  let motes = [];
  const streaks = [];
  const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false, touchUntil: 0 };
  let lastScroll = window.scrollY;
  let scrollVelocity = 0;
  let frame = 0;
  let last = performance.now();
  let nextStreak = last + 2600;

  const spawn = (anywhere) => {
    const z = 0.2 + Math.pow(Math.random(), 1.8) * 0.8;
    return {
      x: Math.random() * width,
      y: anywhere ? Math.random() * height : height + 10,
      z,
      r: 0.35 + z * 1.45,
      vx: (Math.random() - 0.5) * 0.08,
      vy: -(0.04 + z * 0.2),
      phase: Math.random() * TAU,
      speed: 0.6 + Math.random() * 1.8,
    };
  };

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, width < 700 ? 1.25 : 1.5);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(Math.min(140, Math.max(46, (width * height) / 14000)));
    motes = Array.from({ length: count }, () => spawn(true));
    if (reduceMotion) draw(performance.now(), 0);
  };

  const spawnStreak = () => {
    const angle = (22 + Math.random() * 14) * (Math.PI / 180);
    const speed = 13 + Math.random() * 9;
    streaks.push({
      x: Math.random() * width * 0.8 - width * 0.1,
      y: Math.random() * height * 0.35 - 40,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0,
      max: 50 + Math.random() * 20,
      length: 120 + Math.random() * 110,
    });
  };

  const draw = (now, dt) => {
    ctx.clearRect(0, 0, width, height);

    // Pointer target: the mouse on desktop, a slow wandering focus on touch screens.
    if (!finePointer && now > pointer.touchUntil) {
      pointer.tx = width * (0.5 + 0.34 * Math.sin(now * 0.00013));
      pointer.ty = height * (0.46 + 0.26 * Math.sin(now * 0.00021 + 1.3));
      pointer.active = true;
    }
    if (pointer.x < -9000) {
      pointer.x = pointer.tx;
      pointer.y = pointer.ty;
    }
    pointer.x += (pointer.tx - pointer.x) * Math.min(1, 0.08 * dt);
    pointer.y += (pointer.ty - pointer.y) * Math.min(1, 0.08 * dt);

    const scroll = window.scrollY;
    const delta = scroll - lastScroll;
    lastScroll = scroll;
    scrollVelocity += (delta - scrollVelocity) * 0.2;

    const near = [];
    for (const mote of motes) {
      mote.x += mote.vx * dt;
      mote.y += mote.vy * dt - delta * mote.z * 0.22;

      if (pointer.active) {
        const dx = mote.x - pointer.x;
        const dy = mote.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance < LINK_RADIUS && distance > 0.1) {
          const push = (1 - distance / LINK_RADIUS) * 0.45 * mote.z * dt;
          mote.x += (dx / distance) * push;
          mote.y += (dy / distance) * push;
          if (near.length < 18) near.push(mote);
        }
      }

      if (mote.y < -12) Object.assign(mote, spawn(false));
      else if (mote.y > height + 12) { mote.y = -10; mote.x = Math.random() * width; }
      if (mote.x < -12) mote.x = width + 10;
      else if (mote.x > width + 12) mote.x = -10;

      const twinkle = 0.55 + 0.45 * Math.sin(mote.phase + now * 0.001 * mote.speed);
      const alpha = (0.22 + 0.78 * mote.z) * twinkle;
      const stretch = scrollVelocity * mote.z * 1.3;

      if (Math.abs(stretch) > 1.5) {
        ctx.strokeStyle = `rgba(238, 240, 242, ${alpha.toFixed(3)})`;
        ctx.lineWidth = mote.r * 1.4;
        ctx.beginPath();
        ctx.moveTo(mote.x, mote.y);
        ctx.lineTo(mote.x, mote.y + stretch);
        ctx.stroke();
      } else {
        ctx.fillStyle = `rgba(238, 240, 242, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(mote.x, mote.y, mote.r, 0, TAU);
        ctx.fill();
      }
    }

    // Constellation around the focus point.
    ctx.lineWidth = 0.6;
    for (let i = 0; i < near.length; i += 1) {
      const a = near[i];
      const toPointer = Math.hypot(a.x - pointer.x, a.y - pointer.y);
      ctx.strokeStyle = `rgba(255, 255, 255, ${((1 - toPointer / LINK_RADIUS) * 0.32 * a.z).toFixed(3)})`;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(pointer.x, pointer.y);
      ctx.stroke();
      for (let j = i + 1; j < near.length; j += 1) {
        const b = near[j];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        if (distance < PAIR_RADIUS) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${((1 - distance / PAIR_RADIUS) * 0.2).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Light streaks.
    if (!reduceMotion && now > nextStreak) {
      spawnStreak();
      nextStreak = now + 4200 + Math.random() * 6500;
    }
    for (let i = streaks.length - 1; i >= 0; i -= 1) {
      const streak = streaks[i];
      streak.life += dt;
      streak.x += streak.vx * dt;
      streak.y += streak.vy * dt;
      const progress = streak.life / streak.max;
      if (progress >= 1) { streaks.splice(i, 1); continue; }
      const fade = Math.sin(progress * Math.PI);
      const speed = Math.hypot(streak.vx, streak.vy);
      const tailX = streak.x - (streak.vx / speed) * streak.length;
      const tailY = streak.y - (streak.vy / speed) * streak.length;
      const gradient = ctx.createLinearGradient(streak.x, streak.y, tailX, tailY);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${(0.85 * fade).toFixed(3)})`);
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(streak.x, streak.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();
      ctx.fillStyle = `rgba(255, 255, 255, ${(0.5 * fade).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(streak.x, streak.y, 1.8, 0, TAU);
      ctx.fill();
    }
  };

  const loop = (now) => {
    const dt = Math.min(50, now - last) / 16.667;
    last = now;
    draw(now, dt);
    frame = window.requestAnimationFrame(loop);
  };

  const start = () => {
    if (reduceMotion || frame) return;
    last = performance.now();
    lastScroll = window.scrollY;
    frame = window.requestAnimationFrame(loop);
  };
  const stop = () => {
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
  };

  const onPointerMove = (event) => {
    if (!finePointer) pointer.touchUntil = performance.now() + 1400;
    pointer.tx = event.clientX;
    pointer.ty = event.clientY;
    pointer.active = true;
  };
  const onPointerOut = (event) => {
    if (!event.relatedTarget && finePointer) pointer.active = false;
  };
  const onVisibility = () => (document.hidden ? stop() : start());

  resize();
  start();
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerdown", onPointerMove, { passive: true });
  document.addEventListener("pointerout", onPointerOut);
  document.addEventListener("visibilitychange", onVisibility);

  return () => {
    stop();
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerdown", onPointerMove);
    document.removeEventListener("pointerout", onPointerOut);
    document.removeEventListener("visibilitychange", onVisibility);
  };
}

