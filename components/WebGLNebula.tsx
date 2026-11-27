"use client";

import { useEffect, useRef } from "react";

export function WebGLNebula() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function syncSize() {
      if (!canvas) return;
      const w = canvas.clientWidth || window.innerWidth || 1280;
      const h = canvas.clientHeight || window.innerHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(syncSize) : null;
    ro?.observe(canvas);
    syncSize();

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl || !(gl instanceof WebGLRenderingContext)) {
      return () => ro?.disconnect();
    }

    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

    const fs = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;

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
  mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot * p * 2.0 + vec2(u_time * 0.03);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  vec2 p = uv * 2.0;
  float t = u_time * 0.12;

  float n1 = fbm(p + vec2(t * 0.2, t * 0.1));
  float n2 = fbm(p * 1.5 - vec2(t * 0.15, -t * 0.2) + n1);

  vec3 deepVoid = vec3(0.027, 0.015, 0.051);
  vec3 deepPurple = vec3(0.294, 0.0, 0.510);
  vec3 lavender = vec3(0.608, 0.447, 0.812);
  vec3 brightViolet = vec3(0.722, 0.573, 1.0);

  vec3 nebula = mix(deepVoid, deepPurple, smoothstep(0.15, 0.85, n1));
  nebula += lavender * pow(n2, 2.5) * 0.75;

  float centerGlow = exp(-length(uv * vec2(1.8, 1.0)) * 2.2);
  nebula += brightViolet * centerGlow * 0.35;

  vec2 starGrid = fract(uv * 28.0) - 0.5;
  vec2 starId = floor(uv * 28.0);
  float starRand = hash(starId);
  float starBright = smoothstep(0.48, 0.0, length(starGrid)) * step(0.88, starRand);
  starBright *= 0.4 + 0.6 * sin(u_time * (2.0 + starRand * 4.0) + starRand * 6.28);

  vec2 dustGrid = fract(uv * 65.0 + vec2(sin(u_time * 0.1), cos(u_time * 0.08))) - 0.5;
  float dustRand = hash(floor(uv * 65.0));
  float dust = smoothstep(0.4, 0.0, length(dustGrid)) * step(0.94, dustRand) * 0.5;

  vec3 col = nebula + vec3(0.97, 0.97, 1.0) * starBright + lavender * dust;
  float vig = smoothstep(1.6, 0.3, length(uv));
  col *= vig;

  gl_FragColor = vec4(col, 1.0);
}`;

    function compile(type: number, src: string) {
      if (!gl || !(gl instanceof WebGLRenderingContext)) return null;
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const vsObj = compile(gl.VERTEX_SHADER, vs);
    const fsObj = compile(gl.FRAGMENT_SHADER, fs);
    if (!vsObj || !fsObj) return () => ro?.disconnect();

    const prog = gl.createProgram();
    if (!prog) return () => ro?.disconnect();
    gl.attachShader(prog, vsObj);
    gl.attachShader(prog, fsObj);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const pos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");

    let rafId = 0;
    const render = (t: number) => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, prefersReduced ? 0 : t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!prefersReduced) {
        rafId = requestAnimationFrame(render);
      }
    };
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      ro?.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-90 mix-blend-screen transition-opacity duration-500 [[data-theme='light']_&]:opacity-15 [[data-theme='light']_&]:mix-blend-multiply"
    />
  );
}
