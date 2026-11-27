"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Procedural hexagonal basalt — inspired by Basaltframe's Monolith template
 * (https://basaltframe.com/templates/monolith-3d): MeshStandardMaterial patched
 * via onBeforeCompile so PBR lights + fog still apply; object-space fissures
 * stay fixed while the column sways. Purple brand glow instead of cyan.
 */

const STONE = "#1e1a24";
const GLOW = "#c4a0ff";

function createBasaltMaterial() {
  const material = new THREE.MeshStandardMaterial({
    color: STONE,
    roughness: 0.92,
    metalness: 0.06,
    flatShading: true,
  });

  const uniforms = {
    uTime: { value: 0 },
    uGlow: { value: new THREE.Color(GLOW) },
  };

  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    material.userData.shader = shader;

    shader.vertexShader = shader.vertexShader.replace(
      "#include <common>",
      /* glsl */ `
      #include <common>
      varying vec3 vObjPos;
      `,
    );

    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      /* glsl */ `
      #include <begin_vertex>
      vObjPos = position;
      `,
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <common>",
      /* glsl */ `
      #include <common>
      uniform float uTime;
      uniform vec3 uGlow;
      varying vec3 vObjPos;

      float hash31(vec3 p) {
        p = fract(p * 0.3183099 + vec3(0.11, 0.17, 0.13));
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
      }

      float noise3(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(mix(hash31(i), hash31(i + vec3(1,0,0)), f.x),
              mix(hash31(i + vec3(0,1,0)), hash31(i + vec3(1,1,0)), f.x), f.y),
          mix(mix(hash31(i + vec3(0,0,1)), hash31(i + vec3(1,0,1)), f.x),
              mix(hash31(i + vec3(0,1,1)), hash31(i + vec3(1,1,1)), f.x), f.y),
          f.z
        );
      }

      float fbm(vec3 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 5; i++) {
          v += a * noise3(p);
          p = p * 2.05 + vec3(1.7, 9.2, 2.3);
          a *= 0.5;
        }
        return v;
      }

      // Cheap 2D Voronoi edge distance for branch cracks
      float voronoiEdge(vec2 x) {
        vec2 n = floor(x);
        vec2 f = fract(x);
        float md = 8.0;
        vec2 mr = vec2(0.0);
        for (int j = -1; j <= 1; j++)
        for (int i = -1; i <= 1; i++) {
          vec2 g = vec2(float(i), float(j));
          vec2 o = vec2(hash31(vec3(n + g, 3.1)), hash31(vec3(n + g, 7.7)));
          vec2 r = g + o - f;
          float d = dot(r, r);
          if (d < md) { md = d; mr = r; }
        }
        float ed = 8.0;
        for (int j = -1; j <= 1; j++)
        for (int i = -1; i <= 1; i++) {
          vec2 g = vec2(float(i), float(j));
          vec2 o = vec2(hash31(vec3(n + g, 3.1)), hash31(vec3(n + g, 7.7)));
          vec2 r = g + o - f;
          if (dot(mr - r, mr - r) > 0.00001) {
            ed = min(ed, dot(0.5 * (mr + r), normalize(r - mr)));
          }
        }
        return ed;
      }
      `,
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <color_fragment>",
      /* glsl */ `
      #include <color_fragment>

      // Vertical basalt brushing
      float strata = fbm(vec3(vObjPos.x * 4.2, vObjPos.y * 0.45, vObjPos.z * 4.2));
      float grain = fbm(vObjPos * 7.5 + 1.7);
      diffuseColor.rgb *= 0.78 + 0.38 * strata + 0.1 * grain;

      // Main fault — noise-wobbled vertical plane (use d*d, never pow of negatives)
      float wobble = 0.12 * sin(vObjPos.y * 2.6 + grain * 3.0) + 0.06 * sin(vObjPos.z * 4.0);
      float faultDist = abs(vObjPos.x + wobble);
      float fault = 1.0 - smoothstep(0.0, 0.11, faultDist * faultDist * 55.0);

      // Branch fractures from Voronoi edges, stronger near the fault
      float edge = voronoiEdge(vec2(vObjPos.y * 1.8 + vObjPos.z * 0.4, vObjPos.z * 1.6 + vObjPos.x * 0.3));
      float branch = 1.0 - smoothstep(0.0, 0.045, edge);
      branch *= smoothstep(0.55, 0.0, abs(vObjPos.x));

      float crack = clamp(fault * 0.95 + branch * 0.55, 0.0, 1.0);

      // Energy travelling up the fissures
      float travel = 0.55 + 0.45 * sin(uTime * 1.7 - vObjPos.y * 2.8);
      float core = crack * crack * travel;

      diffuseColor.rgb = mix(diffuseColor.rgb, uGlow * 1.35, core * 0.85);
      `,
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <emissivemap_fragment>",
      /* glsl */ `
      #include <emissivemap_fragment>

      float strataE = fbm(vec3(vObjPos.x * 4.2, vObjPos.y * 0.45, vObjPos.z * 4.2));
      float grainE = fbm(vObjPos * 7.5 + 1.7);
      float wobbleE = 0.12 * sin(vObjPos.y * 2.6 + grainE * 3.0) + 0.06 * sin(vObjPos.z * 4.0);
      float faultE = 1.0 - smoothstep(0.0, 0.11, abs(vObjPos.x + wobbleE) * abs(vObjPos.x + wobbleE) * 55.0);
      float edgeE = voronoiEdge(vec2(vObjPos.y * 1.8 + vObjPos.z * 0.4, vObjPos.z * 1.6 + vObjPos.x * 0.3));
      float branchE = (1.0 - smoothstep(0.0, 0.045, edgeE)) * smoothstep(0.55, 0.0, abs(vObjPos.x));
      float crackE = clamp(faultE * 0.95 + branchE * 0.55, 0.0, 1.0);
      float travelE = 0.55 + 0.45 * sin(uTime * 1.7 - vObjPos.y * 2.8);
      totalEmissiveRadiance += uGlow * crackE * crackE * travelE * 1.8;
      `,
    );
  };

  material.customProgramCacheKey = () => "monolith-basalt-v2";
  material.userData.uniforms = uniforms;
  return material;
}

function Pillar() {
  const group = useRef<THREE.Group>(null);
  const material = useMemo(() => createBasaltMaterial(), []);
  const { pointer, size } = useThree();
  const target = useRef({ x: 0, y: 0 });
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    return () => {
      material.dispose();
    };
  }, [material]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const shader = material.userData.shader as
      | { uniforms: { uTime: { value: number } } }
      | undefined;
    if (shader) shader.uniforms.uTime.value = t;

    if (!group.current) return;

    if (reduceMotion.current) {
      group.current.rotation.y = 0.12;
      group.current.rotation.x = 0;
      group.current.position.y = 0;
      return;
    }

    // Pointer parallax
    target.current.x = pointer.x * 0.22;
    target.current.y = pointer.y * 0.1;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      Math.sin(t * 0.28) * 0.16 + target.current.x,
      0.06,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -target.current.y * 0.35,
      0.06,
    );
    group.current.position.y = Math.sin(t * 0.55) * 0.05;

    // Keep aspect-aware so it doesn't look crushed on mobile
    void size;
  });

  return (
    <group ref={group} position={[0, -0.2, 0]}>
      <mesh castShadow position={[0, 1.05, 0]} material={material}>
        <cylinderGeometry args={[0.58, 0.66, 2.55, 6]} />
      </mesh>

      <mesh castShadow position={[0, 2.38, 0]}>
        <cylinderGeometry args={[0.5, 0.58, 0.2, 6]} />
        <meshStandardMaterial
          color="#16121c"
          roughness={0.94}
          metalness={0.08}
          flatShading
        />
      </mesh>

      <mesh receiveShadow position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.98, 1.08, 0.2, 6]} />
        <meshStandardMaterial
          color="#121018"
          roughness={0.96}
          metalness={0.05}
          flatShading
        />
      </mesh>
      <mesh receiveShadow position={[0, -0.5, 0]}>
        <cylinderGeometry args={[1.18, 1.28, 0.18, 6]} />
        <meshStandardMaterial
          color="#0c0a10"
          roughness={1}
          metalness={0.04}
          flatShading
        />
      </mesh>

      {/* Soft inner core so laser strike has something luminous to land on */}
      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 2.3, 6]} />
        <meshBasicMaterial color={GLOW} transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

function Debris() {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const n = 28;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const r = 0.9 + (i % 5) * 0.12;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = -0.2 + (i % 7) * 0.35;
      arr[i * 3 + 2] = Math.sin(a) * r * 0.7;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    const t = state.clock.elapsedTime;
    points.current.rotation.y = t * 0.08;
    const pos = points.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const base = positions[i * 3 + 1];
      pos.setY(i, base + Math.sin(t * 0.9 + i) * 0.08);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={GLOW}
        size={0.035}
        transparent
        opacity={0.55}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function LightShaft() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    const mat = mesh.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.08 + 0.04 * Math.sin(state.clock.elapsedTime * 1.4);
  });

  return (
    <mesh ref={mesh} position={[0, 2.9, 0]} rotation={[Math.PI, 0, 0]}>
      <coneGeometry args={[0.55, 2.2, 16, 1, true]} />
      <meshBasicMaterial
        color={GLOW}
        transparent
        opacity={0.1}
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.32} />
      <spotLight
        position={[2.2, 6.5, 3.2]}
        angle={0.42}
        penumbra={0.75}
        intensity={2.8}
        color="#e8dcff"
        castShadow
      />
      <spotLight
        position={[-2.8, 2.8, -2.2]}
        angle={0.55}
        penumbra={0.85}
        intensity={0.85}
        color="#6b13af"
      />
      <directionalLight position={[0, 7, 1.5]} intensity={0.45} color="#f4f0ff" />
      <pointLight position={[0, 3.2, 0.4]} intensity={1.4} color={GLOW} distance={5} />
      <Pillar />
      <Debris />
      <LightShaft />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.62, 0]} receiveShadow>
        <circleGeometry args={[2.4, 48]} />
        <meshStandardMaterial color="#050308" roughness={1} metalness={0} />
      </mesh>
    </>
  );
}

export function MonolithBlock({ className = "" }: { className?: string }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className={`relative h-full w-full ${className}`.trim()}>
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-24 w-14 animate-pulse rounded-sm bg-[#2a2433]/80" />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full ${className}`.trim()}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 1.05, 5.2], fov: 28 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="h-full w-full"
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default MonolithBlock;
