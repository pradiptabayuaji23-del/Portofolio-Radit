"use client";

import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useTexture, Environment, Lightformer, Line, RenderTexture, OrthographicCamera, Text } from "@react-three/drei";
import {
    BallCollider,
    CuboidCollider,
    Physics,
    RigidBody,
    useRopeJoint,
    useSphericalJoint,
} from "@react-three/rapier";
import * as THREE from "three";

export default function Lanyard3D({
    position = [0, 0, 13],
    gravity = [0, -40, 0],
    fov = 22,
    transparent = true,
}: {
    position?: [number, number, number];
    gravity?: [number, number, number];
    fov?: number;
    transparent?: boolean;
}) {
    return (
        <div className="relative w-full h-[500px] md:h-[650px] z-10 cursor-grab active:cursor-grabbing">
            <Canvas
                camera={{ position: position as [number, number, number], fov }}
                gl={{ alpha: true, antialias: true }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={Math.PI * 1.5} />
                    <Physics gravity={gravity as [number, number, number]} interpolate={false}>
                        <Band />
                    </Physics>
                    <Environment preset="city" blur={0.75} environmentIntensity={1.5}>
                        <Lightformer
                            intensity={2}
                            rotation-x={Math.PI / 2}
                            position={[0, 5, -9]}
                            scale={[10, 10, 1]}
                        />
                        <Lightformer
                            intensity={2}
                            rotation-y={Math.PI / 2}
                            position={[-5, 1, -1]}
                            scale={[10, 2, 1]}
                        />
                        <Lightformer
                            intensity={2}
                            rotation-y={Math.PI / 2}
                            position={[-5, -1, -1]}
                            scale={[10, 2, 1]}
                        />
                        <Lightformer
                            intensity={2}
                            rotation-y={-Math.PI / 2}
                            position={[10, 1, 0]}
                            scale={[20, 2, 1]}
                        />
                        <Lightformer
                            type="ring"
                            intensity={2}
                            rotation-y={Math.PI / 2}
                            position={[-0.1, -1, -5]}
                            scale={[10, 10, 1]}
                        />
                    </Environment>
                </Suspense>
            </Canvas>
        </div>
    );
}

function Band({ maxSpeed = 20, minSpeed = 10 }) {
    const band = useRef<any>(null);
    const fixed = useRef<any>(null);
    const j1 = useRef<any>(null);
    const j2 = useRef<any>(null);
    const j3 = useRef<any>(null);
    const card = useRef<any>(null);

    const vec = new THREE.Vector3();
    const dir = new THREE.Vector3();

    const segmentProps = {
        type: "dynamic" as const,
        canSleep: true,
        colliders: false as const,
        angularDamping: 2,
        linearDamping: 2,
    };

    const { nodes, materials } = useGLTF("/models/card.glb") as any;
    const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
    
    // Create the card texture synchronously using useMemo
    const cardTexture = useMemo(() => {
        const drawCard = (ctx: CanvasRenderingContext2D, profileImg: HTMLImageElement | null) => {
            // Dark background
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(0, 0, 1400, 1000);
            
            ctx.save();
            
            // Apply the exact transformation from generate_texture6.js
            ctx.translate(1400, 0);
            ctx.rotate(Math.PI / 2);
            
            const cardW = 1000;
            const cardH = 1400; // Not strictly used for bounds, but context
            
            // Gradient header
            const grad = ctx.createLinearGradient(0, 0, cardW, 0);
            grad.addColorStop(0, '#2563eb');
            grad.addColorStop(1, '#9333ea');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, cardW, 300);
            
            // Profile Image (circle)
            const imgSize = 400;
            const imgX = cardW / 2 - imgSize / 2;
            const imgY = 150;
            
            if (profileImg) {
                ctx.save();
                ctx.beginPath();
                ctx.arc(cardW / 2, imgY + imgSize / 2, imgSize / 2, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.clip();
                ctx.drawImage(profileImg, imgX, imgY, imgSize, imgSize);
                ctx.restore();
            } else {
                ctx.beginPath();
                ctx.arc(cardW / 2, imgY + imgSize / 2, imgSize / 2, 0, Math.PI * 2, true);
                ctx.fillStyle = '#1e293b';
                ctx.fill();
            }
            
            // Border for profile
            ctx.beginPath();
            ctx.arc(cardW / 2, imgY + imgSize / 2, imgSize / 2, 0, Math.PI * 2, true);
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 15;
            ctx.stroke();
            
            // Glow
            ctx.shadowColor = 'rgba(59, 130, 246, 0.8)';
            ctx.shadowBlur = 40;
            ctx.stroke();
            ctx.shadowBlur = 0; // reset
            
            // Text
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 120px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Radit', cardW / 2, 750);
            
            ctx.fillStyle = '#60a5fa';
            ctx.font = 'bold 50px sans-serif';
            ctx.fillText('WEB DEVELOPMENT', cardW / 2, 850);
            
            // Barcode area
            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.fillRect(50, 1100, cardW - 100, 200);
            
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 45px monospace';
            ctx.fillText('ID: RDT-2024-001', cardW / 2, 1280);
            
            // draw lines for barcode
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            for(let i=0; i < 40; i++){
                ctx.fillRect(100 + i * 20, 1130, Math.random() * 10 + 4, 80);
            }
            
            ctx.restore();
        };

        // Create canvas at texture size
        const cvs = document.createElement('canvas');
        cvs.width = 1400;
        cvs.height = 1000;
        const ctx = cvs.getContext('2d');
        if (!ctx) return null;
        
        drawCard(ctx, null);
        
        const tex = new THREE.CanvasTexture(cvs);
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
        // MUST be true to match ImageLoader/useTexture behavior
        tex.flipY = true; 
        tex.anisotropy = 16;
        
        // Store for profile image update
        (tex as any)._cvs = cvs;
        (tex as any)._drawCard = drawCard;
        
        return tex;
    }, []);

    // Load profile image and redraw
    useEffect(() => {
        if (!cardTexture) return;
        const cvs = (cardTexture as any)._cvs as HTMLCanvasElement;
        const drawCard = (cardTexture as any)._drawCard;
        if (!cvs || !drawCard) return;
        
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = '/logo/profile.jpg';
        img.onload = () => {
            const ctx = cvs.getContext('2d');
            if (!ctx) return;
            drawCard(ctx, img);
            cardTexture.needsUpdate = true;
        };
    }, [cardTexture]);

    const [curve] = useState(
        () =>
            new THREE.CatmullRomCurve3([
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
            ])
    );

    const [dragged, setDragged] = useState<THREE.Vector3 | false>(false);
    const [hovered, setHovered] = useState(false);

    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
    useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

    useEffect(() => {
        if (hovered) document.body.style.cursor = "grab";
        return () => {
            document.body.style.cursor = "auto";
        };
    }, [hovered]);

    const points = useState(() => new Float32Array(33 * 3))[0]; // 32 segments = 33 points

    useFrame((state) => {
        if (dragged) {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
            dir.copy(vec).sub(state.camera.position).normalize();
            vec.copy(state.camera.position).add(dir.multiplyScalar(state.camera.position.length()));
            [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
            card.current?.setNextKinematicTranslation({
                x: vec.x - dragged.x,
                y: vec.y - dragged.y,
                z: vec.z - dragged.z,
            });
        }

        if (
            band.current &&
            j3.current?.translation &&
            j2.current?.translation &&
            j1.current?.translation &&
            fixed.current?.translation
        ) {
            curve.points[0].copy(j3.current.translation());
            curve.points[1].copy(j2.current.translation());
            curve.points[2].copy(j1.current.translation());
            curve.points[3].copy(fixed.current.translation());
            const curPoints = curve.getPoints(32);
            for (let i = 0; i < curPoints.length; i++) {
                points[i * 3] = curPoints[i].x;
                points[i * 3 + 1] = curPoints[i].y;
                points[i * 3 + 2] = curPoints[i].z;
            }
            if (band.current.geometry.setPositions) {
                band.current.geometry.setPositions(points);
            } else {
                band.current.geometry.attributes.position.needsUpdate = true;
            }
        }
    });

    return (
        <>
            <group position={[0, 4, 0]}>
                <RigidBody ref={fixed} {...segmentProps} type="kinematicPosition" />
                <RigidBody ref={j1} {...segmentProps}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody ref={j2} {...segmentProps}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody ref={j3} {...segmentProps}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody
                    ref={card}
                    {...segmentProps}
                    type={dragged ? "kinematicPosition" : "dynamic"}
                    colliders={false}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    onPointerDown={(e: any) => {
                        e.target.setPointerCapture(e.pointerId);
                        setDragged(
                            new THREE.Vector3()
                                .copy(e.point)
                                .sub(card.current.translation())
                        );
                    }}
                    onPointerUp={(e: any) => {
                        e.target.releasePointerCapture(e.pointerId);
                        setDragged(false);
                    }}
                >
                    <CuboidCollider args={[0.8, 1.125, 0.01]} />
                    <group scale={2.25} position={[0, -1.2, -0.05]}>
                        <mesh geometry={nodes.card.geometry}>
                            <meshPhysicalMaterial
                                ref={materialRef}
                                map={cardTexture}
                                clearcoat={1}
                                clearcoatRoughness={0.15}
                                roughness={0.3}
                                metalness={0.5}
                                side={THREE.DoubleSide}
                            />
                        </mesh>
                        
                        <mesh geometry={nodes.clip.geometry} material={materials.metal} />
                        <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
                    </group>
                </RigidBody>
            </group>
            {/* Lanyard Strap */}
            <Line
                ref={band}
                points={[new THREE.Vector3(), new THREE.Vector3()]} // Dummy points, updated in useFrame
                color="#1a1a1a"
                lineWidth={16} // This creates a thick strap
            />
        </>
    );
}

// Preload the assets
useGLTF.preload("/models/card.glb");
useTexture.preload("/models/lanyard.png");
