"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ============ CONFIGURATION ============
const CONFIG = {
    rotationSpeedY: 0.003, // Horizontal rotation speed
    rotationSpeedX: 0.003, // Vertical rotation speed

    dragDamping: 0.95, // How quickly drag momentum fades (0.9-0.99)
    dragSensitivity: 0.008, // How responsive to mouse movement

    cameraDistance: 10, // How far the camera is from the sphere
    cameraFOV: 50, // Field of view
};

// ============ ADD/REMOVE TECH LOGOS HERE ============
const techLogos = [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original-wordmark.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bun/bun-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
];

function TechSphere() {
    const groupRef = useRef<THREE.Group>(null!);
    const logoCount = techLogos.length;

    const [sphereRadius, setSphereRadius] = useState<number>(3.5);
    const [logoSize, setLogoSize] = useState<number>(1);

    // Drag state
    const [isDragging, setIsDragging] = useState(false);
    const [velocity, setVelocity] = useState({ x: 0, y: 0 });
    const lastMousePos = useRef({ x: 0, y: 0 });

    const { gl } = useThree();

    // Load textures
    const textures = useLoader(THREE.TextureLoader, techLogos);

    useEffect(() => {
        const updateSphereRadius = () => {
            const width = window.innerWidth;
            if (width < 760) {
                setSphereRadius(3);
                setLogoSize(0.8);
            } else if (width < 1024) {
                setSphereRadius(2.7);
                setLogoSize(0.7);
            } else {
                setSphereRadius(3);
                setLogoSize(0.9);
            }
        };

        updateSphereRadius();
        window.addEventListener("resize", updateSphereRadius);

        return () => window.removeEventListener("resize", updateSphereRadius);
    }, []);

    // Calculate positions using Fibonacci sphere algorithm
    const logoPositions = useMemo(() => {
        const positions = [];
        const goldenRatio = (1 + Math.sqrt(5)) / 2;
        const angleIncrement = Math.PI * 2 * goldenRatio;

        for (let i = 0; i < logoCount; i++) {
            const t = i / logoCount;
            const inclination = Math.acos(1 - 2 * t);
            const azimuth = angleIncrement * i;

            const x = sphereRadius * Math.sin(inclination) * Math.cos(azimuth);
            const y = sphereRadius * Math.sin(inclination) * Math.sin(azimuth);
            const z = sphereRadius * Math.cos(inclination);

            positions.push(new THREE.Vector3(x, y, z));
        }

        return positions;
    }, [logoCount, sphereRadius]);

    // Handle mouse events
    const handlePointerDown = (e: MouseEvent) => {
        setIsDragging(true);
        lastMousePos.current = { x: e.clientX, y: e.clientY };
        gl.domElement.style.cursor = "grabbing";
    };

    const handlePointerMove = (e: MouseEvent) => {
        if (!isDragging) return;

        const deltaX = e.clientX - lastMousePos.current.x;
        const deltaY = e.clientY - lastMousePos.current.y;

        setVelocity({
            x: deltaY * CONFIG.dragSensitivity,
            y: deltaX * CONFIG.dragSensitivity,
        });

        lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
        setIsDragging(false);
        gl.domElement.style.cursor = "grab";
    };

    // Set up event listeners
    useEffect(() => {
        const canvas = gl.domElement;
        canvas.style.cursor = "grab";

        canvas.addEventListener("pointerdown", handlePointerDown);
        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);

        return () => {
            canvas.removeEventListener("pointerdown", handlePointerDown);
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
        };
    }, [isDragging, gl.domElement]);

    // Animate rotation with drag physics
    useFrame(() => {
        if (groupRef.current) {
            // Apply current velocity
            groupRef.current.rotation.x += velocity.x;
            groupRef.current.rotation.y += velocity.y;

            // Apply damping to slow down to default speed
            if (!isDragging) {
                setVelocity((v) => ({
                    x:
                        v.x * CONFIG.dragDamping +
                        CONFIG.rotationSpeedX * (1 - CONFIG.dragDamping),
                    y:
                        v.y * CONFIG.dragDamping +
                        CONFIG.rotationSpeedY * (1 - CONFIG.dragDamping),
                }));
            }
        }
    });

    return (
        <group ref={groupRef}>
            {logoPositions.map((position, idx) => (
                <sprite
                    key={idx}
                    position={position}
                    scale={[logoSize, logoSize, 1]}
                >
                    <spriteMaterial
                        map={textures[idx]}
                        transparent={true}
                        opacity={0.9}
                    />
                </sprite>
            ))}
        </group>
    );
}

export default function SkillBall() {
    return (
        <Canvas
            className=""
            camera={{
                position: [0, 0, CONFIG.cameraDistance],
                fov: CONFIG.cameraFOV,
            }}
        >
            {/* <ambientLight intensity={0.6} /> */}
            {/* <pointLight position={[10, 10, 10]} intensity={0.8} /> */}
            <TechSphere />
        </Canvas>
    );
}
