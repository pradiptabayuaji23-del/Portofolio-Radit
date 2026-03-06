"use client";

import { useRef, useEffect, useCallback } from "react";
import { DATA } from "@/lib/data";

export default function Lanyard3D() {
    const cardRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<number>(0);
    const isHoveredRef = useRef(false);

    // Idle swing animation
    useEffect(() => {
        let start: number | null = null;
        const animate = (timestamp: number) => {
            if (!start) start = timestamp;
            const elapsed = (timestamp - start) / 1000;

            if (!isHoveredRef.current && cardRef.current) {
                const swing = Math.sin(elapsed * 1.2) * 3;
                cardRef.current.style.transform = `rotateX(${swing}deg) rotateY(0deg)`;
            }
            frameRef.current = requestAnimationFrame(animate);
        };
        frameRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameRef.current);
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const rotateX = y * -25;
        const rotateY = x * 25;
        cardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        // Update glow
        const glow = cardRef.current.querySelector<HTMLDivElement>("[data-glow]");
        if (glow) {
            const glowX = (x + 0.5) * 100;
            const glowY = (y + 0.5) * 100;
            glow.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.18) 0%, transparent 60%)`;
            glow.style.opacity = "1";
        }
    }, []);

    const handleMouseEnter = useCallback(() => {
        isHoveredRef.current = true;
    }, []);

    const handleMouseLeave = useCallback(() => {
        isHoveredRef.current = false;
        if (cardRef.current) {
            cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
            const glow = cardRef.current.querySelector<HTMLDivElement>("[data-glow]");
            if (glow) glow.style.opacity = "0";
        }
    }, []);

    return (
        <div
            className="relative w-full h-full flex flex-col items-center justify-start"
            style={{ perspective: "1200px" }}
        >
            {/* Lanyard String */}
            <svg
                className="absolute top-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
                width="200"
                height="120"
                viewBox="0 0 200 120"
                fill="none"
            >
                <path
                    d="M60 120 Q60 60 80 20 Q90 0 100 0"
                    stroke="url(#ropeGrad)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                />
                <path
                    d="M140 120 Q140 60 120 20 Q110 0 100 0"
                    stroke="url(#ropeGrad)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                />
                <circle cx="100" cy="4" r="6" fill="none" stroke="#9ca3af" strokeWidth="2.5" />
                <defs>
                    <linearGradient id="ropeGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6b7280" />
                        <stop offset="100%" stopColor="#374151" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Card Container with 3D transforms */}
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative mt-[90px] md:mt-[100px] w-[220px] h-[300px] sm:w-[240px] sm:h-[320px] md:w-[280px] md:h-[380px] cursor-grab active:cursor-grabbing"
                style={{
                    transformStyle: "preserve-3d",
                    transition: "transform 0.15s ease-out",
                }}
            >
                {/* Metal clip connector */}
                <div className="absolute -top-[22px] left-1/2 -translate-x-1/2 z-20">
                    <div className="w-[36px] h-[24px] bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-lg border border-gray-400 shadow-md flex items-center justify-center">
                        <div className="w-[20px] h-[4px] bg-gray-500 rounded-full" />
                    </div>
                </div>

                {/* Lanyard hole */}
                <div className="absolute top-[6px] left-1/2 -translate-x-1/2 z-30">
                    <div className="w-[14px] h-[14px] rounded-full border-[3px] border-gray-400 bg-white/10" />
                </div>

                {/* Main Card */}
                <div
                    className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
                    style={{
                        background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
                    }}
                >
                    {/* Holographic shine effect */}
                    <div
                        data-glow
                        className="absolute inset-0 z-10 pointer-events-none rounded-2xl"
                        style={{ opacity: 0, transition: "opacity 0.3s ease" }}
                    />

                    {/* Card Border glow */}
                    <div className="absolute inset-0 rounded-2xl border border-white/10 z-20 pointer-events-none" />

                    {/* Card Content */}
                    <div className="relative z-10 flex flex-col items-center h-full pt-6 sm:pt-7 md:pt-8 px-4 sm:px-5 md:px-6">
                        {/* Top accent bar */}
                        <div className="w-full flex justify-center mb-3 sm:mb-4 md:mb-5">
                            <div className="h-[3px] w-16 md:w-20 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500" />
                        </div>

                        {/* Profile Photo */}
                        <div className="relative mb-3 sm:mb-4 md:mb-5">
                            <div className="absolute inset-[-4px] rounded-full bg-gradient-to-br from-blue-500 via-cyan-400 to-indigo-500 opacity-70 blur-[2px]" />
                            <div className="relative w-[80px] h-[80px] sm:w-[90px] sm:h-[90px] md:w-[110px] md:h-[110px] rounded-full overflow-hidden border-[3px] border-white/20 shadow-lg">
                                <img
                                    src="/logo/profile.jpg"
                                    alt={DATA.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute bottom-1 right-1 w-4 h-4 md:w-5 md:h-5 bg-green-400 rounded-full border-[2.5px] border-[#16213e] shadow-lg shadow-green-400/50" />
                        </div>

                        {/* Name */}
                        <h3
                            className="text-white font-bold text-base sm:text-lg md:text-xl tracking-tight text-center"
                            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
                        >
                            {DATA.name}
                        </h3>

                        {/* Title */}
                        <p className="text-cyan-300/80 text-[10px] sm:text-xs md:text-sm font-medium mt-1 text-center tracking-wide">
                            {DATA.title}
                        </p>

                        {/* Divider */}
                        <div className="w-full my-3 sm:my-4 md:my-5 flex items-center gap-2">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        </div>

                        {/* Info chips */}
                        <div className="flex flex-col gap-1.5 sm:gap-2 w-full">
                            <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white/5 border border-white/10">
                                <span className="text-[10px] sm:text-xs text-cyan-300">📍</span>
                                <span className="text-[10px] sm:text-xs text-gray-300 font-medium">Tegal, Indonesia</span>
                            </div>
                            <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white/5 border border-white/10">
                                <span className="text-[10px] sm:text-xs text-cyan-300">💻</span>
                                <span className="text-[10px] sm:text-xs text-gray-300 font-medium">Full Stack Developer</span>
                            </div>
                            <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white/5 border border-white/10">
                                <span className="text-[10px] sm:text-xs text-cyan-300">🎓</span>
                                <span className="text-[10px] sm:text-xs text-gray-300 font-medium">SMKN 1 Slawi</span>
                            </div>
                        </div>
                    </div>

                    {/* Background grid decoration */}
                    <div
                        className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                            backgroundSize: "20px 20px",
                        }}
                    />
                </div>

                {/* Card drop shadow */}
                <div
                    className="absolute -bottom-4 left-[10%] right-[10%] h-8 rounded-[50%] blur-xl -z-10"
                    style={{ background: "rgba(15, 52, 96, 0.4)" }}
                />
            </div>
        </div>
    );
}
