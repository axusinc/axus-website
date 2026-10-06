"use client";

import React, { useEffect, useRef } from "react";

/**
 * ContrailsCanvas renders dynamic blurred AXUS Red (#B61C1C) contrails
 * on a pure black canvas with GPU-accelerated WebGL.
 * The contrails slowly evolve over time and gently deflect/push away from the cursor.
 */
export default function ContrailsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Try WebGL first
    const gl =
      canvas.getContext("webgl", { alpha: false, antialias: true }) ||
      canvas.getContext("experimental-webgl", { alpha: false, antialias: true });

    if (!gl) {
      // Fallback to Canvas 2D
      return initCanvas2DFallback(canvas);
    }

    const webglCtx = gl as WebGLRenderingContext;

    // Vertex shader: Full-screen quad
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader: Procedural dynamic blurred contrails with AXUS Red (#B61C1C)
    const fsSource = `
      precision highp float;
      varying vec2 v_uv;

      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_mouse_active;
      uniform vec2 u_mouse_vel;

      // AXUS Red sRGB #B61C1C = vec3(182.0/255.0, 28.0/255.0, 28.0/255.0)
      const vec3 AXUS_RED = vec3(0.7137, 0.1098, 0.1098);
      const vec3 DEEP_RED = vec3(0.20, 0.015, 0.015);
      const vec3 MID_RED = vec3(0.48, 0.05, 0.05);

      // Simple hash & noise for vapor wisps
      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 3; i++) {
          v += a * noise(p);
          p = p * 2.05 + vec2(1.7, 3.2);
          a *= 0.5;
        }
        return v;
      }

      // Single contrail profile with Gaussian blur falloff
      // pos: current sample point
      // y0: vertical baseline center
      // t: time
      // speed: horizontal drift speed
      // freq, amp: harmonic wave parameters
      // blur: softness/width of the contrail
      float sampleContrail(vec2 pos, float y0, float t, float speed, float freq, float amp, float blur, float seed) {
        // Dynamic horizontal flow
        float x = pos.x;
        
        // Complex organic undulating trajectory with harmonic sine & noise
        float wave = sin(x * freq + t * speed + seed) * amp
                   + cos(x * (freq * 0.45) - t * (speed * 0.7) + seed * 1.5) * (amp * 0.5)
                   + (noise(vec2(x * 0.8 + t * 0.05, seed)) - 0.5) * (amp * 0.7);

        // Center of the contrail at this x
        float cy = y0 + wave;

        // Vertical distance from fragment to contrail center
        float dist = abs(pos.y - cy);

        // Internal vapor turbulence along the trail
        float vapor = 0.85 + 0.25 * fbm(vec2(x * 2.5 - t * 0.2, pos.y * 3.0 + seed));

        // Gaussian blur profile
        float dNorm = dist / blur;
        float intensity = exp(-dNorm * dNorm * 1.8) * vapor;

        return intensity;
      }

      void main() {
        // Aspect ratio correction: coordinate space [-aspect, aspect] x [-1, 1]
        float aspect = u_resolution.x / u_resolution.y;
        vec2 uv = (v_uv - 0.5) * vec2(aspect * 2.0, 2.0);

        // Cursor push interaction
        // Calculate distance and direction to cursor
        vec2 mouseCoord = (u_mouse - 0.5) * vec2(aspect * 2.0, 2.0);
        vec2 toMouse = uv - mouseCoord;
        float mouseDist = length(toMouse);

        // Soft repulsive push radius (gentle cushion)
        float pushRadius = 0.70;
        if (mouseDist < pushRadius && u_mouse_active > 0.01) {
          float pushFactor = (1.0 - smoothstep(0.0, pushRadius, mouseDist));
          // Sliiiightly pushed by cursor
          float pushMag = pushFactor * pushFactor * 0.09 * u_mouse_active;
          vec2 pushDir = normalize(toMouse + vec2(0.0001));
          
          // Displace coordinates inward so visual contrails part outward (pushed away)
          uv -= pushDir * pushMag;
        }

        // Slight rotation for aerodynamic contrail angle (-10 degrees)
        float angle = -0.16;
        float cosA = cos(angle);
        float sinA = sin(angle);
        vec2 p = vec2(cosA * uv.x - sinA * uv.y, sinA * uv.x + cosA * uv.y);

        // Slow, hypnotic time drift
        float t = u_time * 0.22;

        // Accumulate layered contrails
        // 1. Broad deep ambient red vapor bank (base atmosphere)
        float c0 = sampleContrail(p, -0.45, t, 0.22, 1.1, 0.28, 0.55, 1.2) * 0.45;
        float c1 = sampleContrail(p, 0.35, t, 0.18, 0.9, 0.32, 0.60, 4.7) * 0.40;

        // 2. Mid-level luminous contrails sweeping across center
        float c2 = sampleContrail(p, -0.15, t, 0.28, 1.4, 0.18, 0.28, 7.3) * 0.75;
        float c3 = sampleContrail(p, 0.10, t, 0.25, 1.2, 0.22, 0.32, 11.1) * 0.70;

        // 3. Crisp, intense central contrail filaments (streamlines)
        float c4 = sampleContrail(p, -0.05, t, 0.32, 1.8, 0.12, 0.14, 15.4) * 0.85;
        float c5 = sampleContrail(p, 0.22, t, 0.35, 1.6, 0.15, 0.16, 21.8) * 0.80;

        // 4. Subtle secondary high-altitude contrails
        float c6 = sampleContrail(p, -0.70, t, 0.15, 0.8, 0.20, 0.45, 29.3) * 0.35;
        float c7 = sampleContrail(p, 0.65, t, 0.20, 1.0, 0.25, 0.50, 37.9) * 0.35;

        // Total intensity blend with subdued ambient levels
        float broadHaze = (c0 + c1 + c6 + c7) * 0.28;
        float midTrails = (c2 + c3) * 0.42;
        float coreTrails = (c4 + c5) * 0.52;

        // Dark color mapping strictly using deep crimson and AXUS Red (#B61C1C)
        vec3 color = vec3(0.0);
        
        // Faint deep crimson base floor
        color += DEEP_RED * broadHaze * 0.7;
        
        // Mid-tone velvet red
        color += MID_RED * midTrails * 0.65;

        // Peak AXUS red on core contrail ribbons
        color += AXUS_RED * coreTrails * 0.70;

        // Deepen darks to keep background pitch-black and trails shadowy & moody
        color = pow(color, vec3(1.35));

        // Soft vignette to keep outer edges deep black
        float vig = 1.0 - smoothstep(0.5, 2.4, length(uv));
        color *= clamp(vig, 0.0, 1.0);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Compile shader utility
    function createShader(glCtx: WebGLRenderingContext, type: number, source: string) {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.error("Shader compile error:", glCtx.getShaderInfoLog(shader));
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(webglCtx, webglCtx.VERTEX_SHADER, vsSource);
    const fs = createShader(webglCtx, webglCtx.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = webglCtx.createProgram();
    if (!program) return;
    webglCtx.attachShader(program, vs);
    webglCtx.attachShader(program, fs);
    webglCtx.linkProgram(program);

    if (!webglCtx.getProgramParameter(program, webglCtx.LINK_STATUS)) {
      console.error("Program link error:", webglCtx.getProgramInfoLog(program));
      return;
    }

    webglCtx.useProgram(program);

    // Quad geometry (-1 to 1)
    const positionBuffer = webglCtx.createBuffer();
    webglCtx.bindBuffer(webglCtx.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    webglCtx.bufferData(webglCtx.ARRAY_BUFFER, positions, webglCtx.STATIC_DRAW);

    const aPosLoc = webglCtx.getAttribLocation(program, "a_position");
    webglCtx.enableVertexAttribArray(aPosLoc);
    webglCtx.vertexAttribPointer(aPosLoc, 2, webglCtx.FLOAT, false, 0, 0);

    // Uniform locations
    const uResLoc = webglCtx.getUniformLocation(program, "u_resolution");
    const uTimeLoc = webglCtx.getUniformLocation(program, "u_time");
    const uMouseLoc = webglCtx.getUniformLocation(program, "u_mouse");
    const uMouseActiveLoc = webglCtx.getUniformLocation(program, "u_mouse_active");
    const uMouseVelLoc = webglCtx.getUniformLocation(program, "u_mouse_vel");

    // Mouse tracking with smooth spring damping
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;
    let currentMouseX = 0.5;
    let currentMouseY = 0.5;
    let mouseActive = 0.0;
    let targetMouseActive = 0.0;
    let prevMouseX = 0.5;
    let prevMouseY = 0.5;
    let mouseVelX = 0.0;
    let mouseVelY = 0.0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left) / rect.width;
      // Invert Y for WebGL screen coordinates (0 at bottom, 1 at top)
      targetMouseY = 1.0 - (e.clientY - rect.top) / rect.height;
      targetMouseActive = 1.0;
    };

    const handleMouseLeave = () => {
      targetMouseActive = 0.0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        targetMouseX = (touch.clientX - rect.left) / rect.width;
        targetMouseY = 1.0 - (touch.clientY - rect.top) / rect.height;
        targetMouseActive = 1.0;
      }
    };

    const handleTouchEnd = () => {
      targetMouseActive = 0.0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Handle resize
    let width = 0;
    let height = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      webglCtx.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("resize", resize);
    resize();

    // Animation loop
    let animId: number;
    const startTime = performance.now();

    const render = () => {
      const now = performance.now();
      const elapsed = (now - startTime) * 0.001;

      // Smooth mouse interpolation (gentle organic lag & follow)
      const lerp = 0.045;
      currentMouseX += (targetMouseX - currentMouseX) * lerp;
      currentMouseY += (targetMouseY - currentMouseY) * lerp;
      mouseActive += (targetMouseActive - mouseActive) * 0.03;

      mouseVelX = (currentMouseX - prevMouseX) * 10.0;
      mouseVelY = (currentMouseY - prevMouseY) * 10.0;
      prevMouseX = currentMouseX;
      prevMouseY = currentMouseY;

      webglCtx.uniform2f(uResLoc, canvas.width, canvas.height);
      webglCtx.uniform1f(uTimeLoc, elapsed);
      webglCtx.uniform2f(uMouseLoc, currentMouseX, currentMouseY);
      webglCtx.uniform1f(uMouseActiveLoc, mouseActive);
      webglCtx.uniform2f(uMouseVelLoc, mouseVelX, mouseVelY);

      webglCtx.drawArrays(webglCtx.TRIANGLES, 0, 6);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", resize);
      webglCtx.deleteProgram(program);
      webglCtx.deleteShader(vs);
      webglCtx.deleteShader(fs);
      webglCtx.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: "#000000" }}
    />
  );
}

/**
 * Fallback Canvas 2D implementation in case WebGL is disabled or unsupported.
 */
function initCanvas2DFallback(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let animId: number;
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const resize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", resize);

  let mouseX = width / 2;
  let mouseY = height / 2;
  let mouseActive = 0;

  const onMove = (e: MouseEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    mouseActive = 1;
  };
  window.addEventListener("mousemove", onMove);

  const trails = [
    { y: 0.3, speed: 0.0006, width: 90, amp: 70, freq: 0.002 },
    { y: 0.48, speed: 0.0009, width: 45, amp: 50, freq: 0.003 },
    { y: 0.55, speed: 0.0008, width: 60, amp: 65, freq: 0.0025 },
    { y: 0.72, speed: 0.0005, width: 110, amp: 80, freq: 0.0018 },
  ];

  let t = 0;
  const loop = () => {
    t += 1;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    trails.forEach((tr, i) => {
      ctx.beginPath();
      const centerY = tr.y * height;
      for (let x = 0; x <= width; x += 15) {
        let wave = Math.sin(x * tr.freq + t * tr.speed * 20 + i) * tr.amp;
        const dx = x - mouseX;
        const dy = (centerY + wave) - mouseY;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 220 && mouseActive > 0.01) {
          const push = (1 - d / 220) * 35;
          wave += (dy / (d + 1)) * push;
        }
        const y = centerY + wave;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.lineWidth = tr.width;
      ctx.strokeStyle = `rgba(182, 28, 28, ${0.08 + i * 0.04})`;
      ctx.stroke();
    });

    animId = requestAnimationFrame(loop);
  };

  loop();

  return () => {
    cancelAnimationFrame(animId);
    window.removeEventListener("resize", resize);
    window.removeEventListener("mousemove", onMove);
  };
}
