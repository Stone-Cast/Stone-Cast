"use client";

import React, { useEffect, useRef } from "react";
import { Renderer, Camera, Geometry, Program, Mesh } from "ogl";

interface ParticlesProps {
    particleCount?: number;
    particleSpread?: number;
    speed?: number;
    particleColors?: string[];
    moveParticlesOnHover?: boolean;
    alphaParticles?: boolean;
    particleBaseSize?: number;
    disableRotation?: boolean;
    className?: string;
}

const hexToRgb = (hex: string): [number, number, number] => {
    const int = parseInt(hex.replace("#", ""), 16);
    return [
        ((int >> 16) & 255) / 255,
        ((int >> 8) & 255) / 255,
        (int & 255) / 255,
    ];
};

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;
  
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uSize;
  
  varying vec3 vColor;
  
  void main() {
    vColor = color;
    vec3 pos = position * uSpread;
    pos.z *= 10.0;
    
    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);
    
    vec4 mvPos = viewMatrix * mPos;
    gl_PointSize = uSize / length(mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  
  uniform float uAlpha;
  varying vec3 vColor;
  
  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - 0.5);
    
    if(uAlpha < 0.5) {
      if(d > 0.5) discard;
      gl_FragColor = vec4(vColor, 1.0);
    } else {
      float circle = smoothstep(0.5, 0.4, d) * 0.8;
      gl_FragColor = vec4(vColor, circle);
    }
  }
`;

const Particles: React.FC<ParticlesProps> = ({
    particleCount = 200,
    particleSpread = 10,
    speed = 0.1,
    particleColors = ["#ffffff"],
    moveParticlesOnHover = false,
    alphaParticles = false,
    particleBaseSize = 100,
    disableRotation = false,
    className,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const renderer = new Renderer({ dpr: 1, depth: false, alpha: true });
        const gl = renderer.gl;
        container.appendChild(gl.canvas);
        gl.clearColor(0, 0, 0, 0);

        const camera = new Camera(gl, { fov: 15 });
        camera.position.z = 20;

        const resize = () => {
            renderer.setSize(container.clientWidth, container.clientHeight);
            camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
        };
        resize();
        window.addEventListener("resize", resize);

        if (moveParticlesOnHover) {
            container.addEventListener("mousemove", (e) => {
                const rect = container.getBoundingClientRect();
                mouseRef.current.x =
                    ((e.clientX - rect.left) / rect.width) * 2 - 1;
                mouseRef.current.y = -(
                    ((e.clientY - rect.top) / rect.height) * 2 -
                    1
                );
            });
        }

        // Generate particle data
        const positions = new Float32Array(particleCount * 3);
        const randoms = new Float32Array(particleCount * 4);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            const i4 = i * 4;

            // Random position on sphere
            let x, y, z, len;
            do {
                x = Math.random() * 2 - 1;
                y = Math.random() * 2 - 1;
                z = Math.random() * 2 - 1;
                len = x * x + y * y + z * z;
            } while (len > 1 || len === 0);

            const r = Math.cbrt(Math.random());
            positions[i3] = x * r;
            positions[i3 + 1] = y * r;
            positions[i3 + 2] = z * r;

            randoms[i4] = Math.random();
            randoms[i4 + 1] = Math.random();
            randoms[i4 + 2] = Math.random();
            randoms[i4 + 3] = Math.random();

            const col = hexToRgb(
                particleColors[
                    Math.floor(Math.random() * particleColors.length)
                ]
            );
            colors[i3] = col[0];
            colors[i3 + 1] = col[1];
            colors[i3 + 2] = col[2];
        }

        const geometry = new Geometry(gl, {
            position: { size: 3, data: positions },
            random: { size: 4, data: randoms },
            color: { size: 3, data: colors },
        });

        const program = new Program(gl, {
            vertex,
            fragment,
            uniforms: {
                uTime: { value: 0 },
                uSpread: { value: particleSpread },
                uSize: { value: particleBaseSize },
                uAlpha: { value: alphaParticles ? 1 : 0 },
            },
            transparent: true,
            depthTest: false,
        });

        const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });

        let frame: number;
        let time = 0;

        const update = () => {
            frame = requestAnimationFrame(update);
            time += speed;

            program.uniforms.uTime.value = time * 0.001;

            if (moveParticlesOnHover) {
                particles.position.x = -mouseRef.current.x;
                particles.position.y = -mouseRef.current.y;
            }

            if (!disableRotation) {
                particles.rotation.x = Math.sin(time * 0.0002) * 0.1;
                particles.rotation.y = Math.cos(time * 0.0005) * 0.15;
                particles.rotation.z += 0.01 * speed;
            }

            renderer.render({ scene: particles, camera });
        };

        update();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(frame);
            if (container.contains(gl.canvas)) {
                container.removeChild(gl.canvas);
            }
        };
    }, [
        particleCount,
        particleSpread,
        speed,
        particleColors,
        moveParticlesOnHover,
        alphaParticles,
        particleBaseSize,
        disableRotation,
    ]);

    return (
        <div
            ref={containerRef}
            className={`relative w-full h-full ${className}`}
        />
    );
};

export default Particles;
