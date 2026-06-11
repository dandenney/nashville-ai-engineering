// Hero particle scene: the engraved owl rebuilt from ~18k gold particles.
// Particles sample the engraving's pixels, drift like dust in lamplight,
// tilt toward the pointer, carry a verdigris pulse, and scatter on scroll.
// Falls back to the static engraving for reduced-motion or no-WebGL.

import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VERTEX = /* glsl */ `
  attribute vec3 aColor;
  attribute float aSize;
  attribute vec3 aRand;
  attribute float aPhase;

  uniform float uTime;
  uniform float uAssemble;
  uniform float uScroll;
  uniform float uPulse;
  uniform float uPixelRatio;

  varying vec3 vColor;
  varying float vPulse;

  void main() {
    float disperse = min(1.0, uAssemble + uScroll);

    vec3 pos = position;
    pos += aRand * sin(uTime * 0.5 + aPhase * 6.2831) * 1.7;

    vec3 scattered = position * 2.2 + aRand * 240.0;
    pos = mix(pos, scattered, disperse);

    float d = length(position.xy);
    float band = 1.0 - smoothstep(0.0, 24.0, abs(d - uPulse));
    vPulse = band * max(0.0, 1.0 - uPulse / 300.0) * (1.0 - disperse);
    vColor = aColor;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * uPixelRatio * (300.0 / -mv.z) * (1.0 - disperse * 0.45);
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAGMENT = /* glsl */ `
  precision mediump float;

  uniform float uOpacity;

  varying vec3 vColor;
  varying float vPulse;

  void main() {
    float r = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.14, r) * uOpacity;
    if (alpha < 0.01) discard;

    vec3 verdigris = vec3(0.48, 0.86, 0.76);
    vec3 col = mix(vColor, verdigris, vPulse * 0.85);
    col *= 1.0 + vPulse * 0.7;

    gl_FragColor = vec4(col, alpha);
  }
`;

interface Sampled {
  positions: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
  rands: Float32Array;
  phases: Float32Array;
  count: number;
}

function sampleImage(img: HTMLImageElement, grid: number, maxPoints: number, worldSize: number): Sampled {
  const canvas = document.createElement('canvas');
  canvas.width = grid;
  canvas.height = grid;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('2d context unavailable');
  ctx.drawImage(img, 0, 0, grid, grid);
  const { data } = ctx.getImageData(0, 0, grid, grid);

  type Candidate = { x: number; y: number; r: number; g: number; b: number; lum: number };
  const candidates: Candidate[] = [];
  for (let y = 0; y < grid; y++) {
    for (let x = 0; x < grid; x++) {
      const i = (y * grid + x) * 4;
      const r = data[i] / 255;
      const g = data[i + 1] / 255;
      const b = data[i + 2] / 255;
      const lum = (r + g + b) / 3;
      if (lum > 0.09) candidates.push({ x, y, r, g, b, lum });
    }
  }

  const keep = Math.min(maxPoints, candidates.length);
  const stride = candidates.length / keep;

  const positions = new Float32Array(keep * 3);
  const colors = new Float32Array(keep * 3);
  const sizes = new Float32Array(keep);
  const rands = new Float32Array(keep * 3);
  const phases = new Float32Array(keep);

  for (let p = 0; p < keep; p++) {
    const c = candidates[Math.floor(p * stride)];
    const jitter = 0.6;
    positions[p * 3] = (c.x / grid - 0.5) * worldSize + (Math.random() - 0.5) * jitter;
    positions[p * 3 + 1] = -(c.y / grid - 0.5) * worldSize + (Math.random() - 0.5) * jitter;
    positions[p * 3 + 2] = (Math.random() - 0.5) * 10;

    colors[p * 3] = c.r;
    colors[p * 3 + 1] = c.g;
    colors[p * 3 + 2] = c.b;

    sizes[p] = 1.1 + c.lum * 2.1 + Math.random() * 0.7;

    const v = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
    rands[p * 3] = v.x;
    rands[p * 3 + 1] = v.y;
    rands[p * 3 + 2] = v.z;

    phases[p] = Math.random();
  }

  return { positions, colors, sizes, rands, phases, count: keep };
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export async function initOwlScene(host: HTMLElement): Promise<void> {
  const imgUrl = host.dataset.owlScene;
  const fallback = host.querySelector<HTMLElement>('[data-owl-fallback]');
  if (!imgUrl) return;

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });
  } catch {
    return; // keep the static engraving
  }

  const img = await loadImage(imgUrl);
  const small = window.innerWidth < 768;
  const sampled = sampleImage(img, small ? 150 : 210, small ? 9000 : 19000, 200);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 1, 1200);
  camera.position.z = 330;

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(sampled.positions, 3));
  geometry.setAttribute('aColor', new THREE.BufferAttribute(sampled.colors, 3));
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sampled.sizes, 1));
  geometry.setAttribute('aRand', new THREE.BufferAttribute(sampled.rands, 3));
  geometry.setAttribute('aPhase', new THREE.BufferAttribute(sampled.phases, 1));

  const dpr = Math.min(window.devicePixelRatio, 1.75);
  const uniforms = {
    uTime: { value: 0 },
    uAssemble: { value: 1 },
    uScroll: { value: 0 },
    uPulse: { value: 0 },
    uOpacity: { value: 0 },
    uPixelRatio: { value: dpr },
  };

  const material = new THREE.ShaderMaterial({
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  renderer.setPixelRatio(dpr);
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.inset = '0';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  host.appendChild(renderer.domElement);

  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    if (width === 0 || height === 0) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  resize();
  new ResizeObserver(resize).observe(host);

  // Pointer parallax (whole viewport, so it works while reading the hero)
  const targetRot = { x: 0, y: 0 };
  window.addEventListener(
    'pointermove',
    (e) => {
      targetRot.y = (e.clientX / window.innerWidth - 0.5) * 0.34;
      targetRot.x = (e.clientY / window.innerHeight - 0.5) * 0.22;
    },
    { passive: true },
  );

  // Render only while visible and the tab is active
  let inView = true;
  new IntersectionObserver(([entry]) => (inView = entry.isIntersecting), { rootMargin: '100px' }).observe(host);

  const clock = new THREE.Clock();
  const render = () => {
    requestAnimationFrame(render);
    if (!inView || document.hidden) return;
    uniforms.uTime.value = clock.getElapsedTime();
    points.rotation.y += (targetRot.y - points.rotation.y) * 0.045;
    points.rotation.x += (targetRot.x - points.rotation.x) * 0.045;
    renderer.render(scene, camera);
  };
  render();

  // Entrance: engraving dissolves, constellation assembles
  if (fallback) {
    gsap.to(fallback, { autoAlpha: 0, duration: 0.9, ease: 'power2.out', delay: 0.25 });
  }
  gsap.to(uniforms.uOpacity, { value: 1, duration: 1.1, ease: 'power2.out', delay: 0.1 });
  gsap.to(uniforms.uAssemble, { value: 0, duration: 2.4, ease: 'expo.out', delay: 0.15 });

  // Verdigris pulse rolling outward every few seconds
  gsap.to(uniforms.uPulse, {
    value: 300,
    duration: 3.6,
    ease: 'power1.out',
    repeat: -1,
    repeatDelay: 4.2,
    delay: 3,
  });

  // Scatter as the hero scrolls away
  const hero = host.closest('section') ?? host;
  gsap.to(uniforms.uScroll, {
    value: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom 25%',
      scrub: 0.6,
    },
  });
}
