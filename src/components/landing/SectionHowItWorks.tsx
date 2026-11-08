import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

interface TiltCardProps {
  title: string;
  description: string;
  bgColor: string;
  accentColor: string;
  isActive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

function TiltCard({
  title,
  description,
  bgColor,
  accentColor,
  isActive = false,
  className = '',
  style = {},
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({
    rotX: 0,
    rotY: 0,
    spotlightX: 0,
    spotlightY: 0,
    isHovered: false,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    // Elegant, subtle tilt: -7deg to +7deg
    const rotX = (0.5 - y) * 14;
    const rotY = (x - 0.5) * 14;
    setTilt({
      rotX,
      rotY,
      spotlightX: e.clientX - rect.left,
      spotlightY: e.clientY - rect.top,
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({
      rotX: 0,
      rotY: 0,
      spotlightX: 0,
      spotlightY: 0,
      isHovered: false,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex flex-col justify-center rounded-[24px] border-[2px] border-[#111111] ${className}`}
      style={{
        ...style,
        backgroundColor: bgColor,
        boxSizing: 'border-box',
        transform: `perspective(900px) rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg) ${
          tilt.isHovered ? 'scale(1.025) translateY(-3px)' : 'scale(1) translateY(0)'
        }`,
        boxShadow: tilt.isHovered
          ? `0 20px 40px -12px ${accentColor}44, 0 8px 16px -8px rgba(17,17,17,0.08)`
          : isActive
          ? `0 12px 28px -10px ${accentColor}33`
          : 'none',
        transition: tilt.isHovered
          ? 'transform 0.12s ease-out, box-shadow 0.25s ease'
          : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease',
      }}
    >
      {/* 2px Dynamic Border Spotlight (Masked XOR Border Glow) */}
      <div
        className="pointer-events-none absolute -inset-[2px] rounded-[26px] transition-opacity duration-300"
        style={{
          opacity: tilt.isHovered ? 1 : 0,
          background: `radial-gradient(190px circle at ${tilt.spotlightX}px ${tilt.spotlightY}px, ${accentColor}, transparent 70%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '2px',
        }}
        aria-hidden="true"
      />

      {/* Surface Sheen Layer */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[24px] transition-opacity duration-300"
        style={{
          opacity: tilt.isHovered ? 0.35 : 0,
          background: `radial-gradient(240px circle at ${tilt.spotlightX}px ${tilt.spotlightY}px, rgba(255,255,255,0.85), transparent 75%)`,
        }}
        aria-hidden="true"
      />

      {/* Card Content with 3D Parallax Depth */}
      <div
        style={{
          transform: tilt.isHovered ? 'translateZ(14px)' : 'translateZ(0px)',
          transition: 'transform 0.2s ease-out',
        }}
      >
        <h3 className="font-inter text-[20px] lg:text-[26px] xl:text-[30px] font-bold leading-tight text-[#111111]">
          {title}
        </h3>
        <p className="mt-1 font-inter text-[13px] lg:text-[16px] xl:text-[18px] font-normal leading-snug text-[#111111]">
          {description}
        </p>
      </div>
    </div>
  );
}

// Unified mathematical pathway for scroll tracing and particle travel
const FULL_PATHWAY_D =
  'M 930 58 C 930 95, 888 137, 828 137 L 499 167 L 473.5 166 L 460 166 L 446.5 166 L 435 166 C 280 166, 190 185, 190 230 C 190 275, 360 304, 542 305 L 875 285 L 886.5 285 L 900 285 L 913.5 285 C 935 285, 940 310, 940 335 C 940 355, 855 379, 759 379 L 403 382 L 377.5 382 L 364 382 L 350.5 382 L 340 382 C 260 382, 219 408, 219 446 C 219 485, 245 496, 266.5 496 L 280 496 L 293.5 496 C 303 496, 308 502, 335 502';

export default function SectionHowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [gliderPos, setGliderPos] = useState<{ x: number; y: number }>({ x: 930, y: 58 });
  const [pathLength, setPathLength] = useState<number>(1800);
  const [cpThresholds, setCpThresholds] = useState<{
    cp1: number;
    cp3: number;
    cp2: number;
    cp4: number;
  }>({
    cp1: 0.22,
    cp3: 0.52,
    cp2: 0.74,
    cp4: 0.91,
  });

  // Measure path length and calibrate exact checkpoint distances
  useEffect(() => {
    if (!pathRef.current) return;
    try {
      const len = pathRef.current.getTotalLength();
      if (len > 0) {
        setPathLength(len);
        const pt = pathRef.current.getPointAtLength(scrollProgress * len);
        setGliderPos({ x: pt.x, y: pt.y });

        const checkpoints = [
          { key: 'cp1' as const, x: 460, y: 166 },
          { key: 'cp3' as const, x: 900, y: 285 },
          { key: 'cp2' as const, x: 364, y: 382 },
          { key: 'cp4' as const, x: 280, y: 496 },
        ];

        const samples = 200;
        const thresholds: Record<string, number> = {};

        checkpoints.forEach((cp) => {
          let minDist = Infinity;
          let bestD = 0;
          for (let i = 0; i <= samples; i++) {
            const d = (i / samples) * len;
            const ptAtLen = pathRef.current!.getPointAtLength(d);
            const dist = Math.hypot(ptAtLen.x - cp.x, ptAtLen.y - cp.y);
            if (dist < minDist) {
              minDist = dist;
              bestD = d;
            }
          }
          thresholds[cp.key] = bestD / len;
        });

        setCpThresholds({
          cp1: thresholds.cp1 ?? 0.22,
          cp3: thresholds.cp3 ?? 0.52,
          cp2: thresholds.cp2 ?? 0.74,
          cp4: thresholds.cp4 ?? 0.91,
        });
      }
    } catch {
      // Fallback to default thresholds if SVG measurement is unavailable
    }
  }, []);

  // Butter-smooth scroll tracking with requestAnimationFrame
  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        if (sectionRef.current) {
          const rect = sectionRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Start tracing when the section enters comfortable view
          const start = windowHeight * 0.42;
          // Exact previous ending position preserved
          const end = windowHeight * 0.72 - rect.height * 0.88;
          const totalDistance = start - end;
          const progress = (start - rect.top) / totalDistance;
          const clamped = Math.max(0, Math.min(1, progress));

          setScrollProgress(clamped);

          if (pathRef.current) {
            try {
              const totalLen = pathRef.current.getTotalLength();
              if (totalLen > 0) {
                const pt = pathRef.current.getPointAtLength(clamped * totalLen);
                setGliderPos({ x: pt.x, y: pt.y });
              }
            } catch {
              // fallback
            }
          }
        }
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Checkpoint activation states
  const isCP1Active = scrollProgress >= cpThresholds.cp1;
  const isCP3Active = scrollProgress >= cpThresholds.cp3;
  const isCP2Active = scrollProgress >= cpThresholds.cp2;
  const isCP4Active = scrollProgress >= cpThresholds.cp4;

  // Card activation states
  const isCard1Active = scrollProgress >= 0.12;
  const isCard2Active = scrollProgress >= 0.38;
  const isCard3Active = scrollProgress >= 0.62;
  const isCard4Active = scrollProgress >= 0.82;

  return (
    <section
      ref={sectionRef}
      id="how"
      className="relative w-full overflow-hidden bg-[#F7F7F4] py-14 lg:py-24"
    >
      {/* Scoped CSS animations for Portal Vortex and Checkpoint Ping */}
      <style>{`
        @keyframes howPortalVortexSpinCW {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes howPortalVortexSpinCCW {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes howCheckpointRipple {
          0% {
            r: 13.5px;
            opacity: 0.85;
            stroke-width: 2.5px;
          }
          100% {
            r: 28px;
            opacity: 0;
            stroke-width: 0.5px;
          }
        }
        @keyframes howParticleBreathing {
          0%, 100% {
            transform: scale(0.9);
            opacity: 0.45;
          }
          50% {
            transform: scale(1.35);
            opacity: 0.85;
          }
        }
        .how-portal-spin-cw {
          animation: howPortalVortexSpinCW 16s linear infinite;
          transform-origin: 0px 0px;
        }
        .how-portal-spin-ccw {
          animation: howPortalVortexSpinCCW 16s linear infinite;
          transform-origin: 0px 0px;
        }
        .how-checkpoint-ping {
          animation: howCheckpointRipple 1.6s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .how-particle-pulse {
          animation: howParticleBreathing 1.8s ease-in-out infinite;
          transform-origin: center;
        }
        @media (prefers-reduced-motion: reduce) {
          .how-portal-spin-cw,
          .how-portal-spin-ccw,
          .how-checkpoint-ping,
          .how-particle-pulse {
            animation: none !important;
          }
        }
      `}</style>

      {/* Subtle Ambient Brand Glow Layer: Purple (left/lower) & Lime (illustration) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{
          backgroundImage: `
            radial-gradient(
              ellipse 55% 50% at 10% 78%,
              rgba(118, 101, 255, 0.056) 0%,
              rgba(118, 101, 255, 0.018) 35%,
              transparent 65%
            ),
            radial-gradient(
              ellipse 48% 45% at 86% 45%,
              rgba(168, 230, 46, 0.051) 0%,
              rgba(168, 230, 46, 0.013) 30%,
              transparent 65%
            )
          `,
        }}
        aria-hidden="true"
      />

      {/* Blended Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(17, 17, 17, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(17, 17, 17, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: '28.5px 28.5px',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 1) 14%, rgba(0, 0, 0, 1) 86%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 1) 14%, rgba(0, 0, 0, 1) 86%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Main Container */}
      <div className="relative mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
        {/* Desktop / Tablet Canvas: Aspect ratio 1024 / 576 (16:9) matching exact master reference */}
        <div className="relative hidden md:block w-full aspect-[1024/576] select-none">
          {/* Header at Top-Left */}
          <div className="absolute left-[6.35%] top-[8.68%] z-20 max-w-[38%]">
            <span className="font-inter text-[14px] lg:text-[17px] xl:text-[19px] font-bold tracking-[0.05em] text-[#7665FF] uppercase">
              FROM IDEA TO IMPACT
            </span>
            <h2 className="mt-2.5 font-inter text-[26px] lg:text-[34px] xl:text-[40px] font-bold leading-[1.08] tracking-[-0.03em] text-[#111111]">
              A simple path from
              <br />
              idea to a working product
            </h2>
          </div>

          {/* Left Callout Pill: IDEA -> PRODUCT */}
          <div
            className="group absolute left-[7.42%] top-[54.86%] z-20 flex h-[9.38%] w-[21.29%] items-center justify-center rounded-[18px] bg-[#EEF9D1] px-4 py-2 transition-all duration-300 hover:scale-105 hover:shadow-md cursor-default"
            style={{ boxSizing: 'border-box' }}
          >
            <span className="font-inter text-[16px] lg:text-[22px] xl:text-[26px] font-bold tracking-tight text-[#111111] transition-transform duration-300 group-hover:tracking-wider">
              IDEA → PRODUCT
            </span>
          </div>

          {/* Background SVG Pathway, Portals, and Checkpoints */}
          <svg
            viewBox="0 0 1024 576"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 h-full w-full pointer-events-none z-0"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              {/* Energetic Trail Gradient */}
              <linearGradient id="howEnergyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7665FF" stopOpacity="0.4" />
                <stop offset="70%" stopColor="#7665FF" />
                <stop offset="100%" stopColor="#A8E62E" />
              </linearGradient>

              {/* Energy Glow Filter */}
              <filter id="howEnergyGlow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="3.5" result="glowBlur" />
                <feMerge>
                  <feMergeNode in="glowBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>


            {/* Top-Right Portal */}
            <g id="top-portal">
              {/* Outer Portal Lip */}
              <ellipse
                cx="908"
                cy="54"
                rx="48"
                ry="15.5"
                fill="#FAF9F7"
                stroke="#111111"
                strokeWidth="2.5"
              />
              {/* Deep Cavity */}
              <ellipse cx="908" cy="52" rx="38" ry="9" fill="#111111" />

              {/* Rotating Perspective Vortex Disc */}
              <g transform="translate(908, 52) scale(1, 0.237)">
                <g className="how-portal-spin-cw">
                  <circle
                    r="34"
                    fill="none"
                    stroke="#7665FF"
                    strokeWidth="2.5"
                    strokeDasharray="18 10"
                    strokeOpacity="0.85"
                  />
                  <circle
                    r="23"
                    fill="none"
                    stroke="#A8E62E"
                    strokeWidth="2.2"
                    strokeDasharray="14 8"
                    strokeOpacity="0.9"
                  />
                  <circle
                    r="13"
                    fill="none"
                    stroke="#FAF9F7"
                    strokeWidth="1.8"
                    strokeDasharray="8 6"
                    strokeOpacity="0.8"
                  />
                  <circle r="4.5" fill="#A8E62E" className="animate-pulse" />
                </g>
              </g>
            </g>

            {/* Bottom-Left Portal */}
            <g id="bottom-portal">
              {/* Outer Portal Lip */}
              <ellipse
                cx="344"
                cy="502"
                rx="50"
                ry="16"
                fill="#FAF9F7"
                stroke="#111111"
                strokeWidth="2.5"
              />
              {/* Deep Cavity */}
              <ellipse cx="344" cy="500" rx="40" ry="9.5" fill="#111111" />

              {/* Rotating Perspective Vortex Disc (Reverse Spin) */}
              <g transform="translate(344, 500) scale(1, 0.238)">
                <g className="how-portal-spin-ccw">
                  <circle
                    r="36"
                    fill="none"
                    stroke="#A8E62E"
                    strokeWidth="2.5"
                    strokeDasharray="18 10"
                    strokeOpacity="0.85"
                  />
                  <circle
                    r="25"
                    fill="none"
                    stroke="#7665FF"
                    strokeWidth="2.2"
                    strokeDasharray="14 8"
                    strokeOpacity="0.9"
                  />
                  <circle
                    r="15"
                    fill="none"
                    stroke="#FAF9F7"
                    strokeWidth="1.8"
                    strokeDasharray="8 6"
                    strokeOpacity="0.8"
                  />
                  <circle r="5" fill="#7665FF" className="animate-pulse" />
                </g>
              </g>
            </g>

            {/* Continuous Full Pathway Track (Drawn fully from the start) */}
            <path
              ref={pathRef}
              d={FULL_PATHWAY_D}
              stroke="#111111"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* CHECKPOINT 1 (Left of Card 1) */}
            <g id="cp1">
              {isCP1Active && (
                <circle
                  cx="460"
                  cy="166"
                  r="13.5"
                  fill="none"
                  stroke="#A8E62E"
                  strokeWidth="2"
                  className="how-checkpoint-ping"
                  style={{ transformOrigin: '460px 166px' }}
                />
              )}
              <circle
                cx="460"
                cy="166"
                r="13.5"
                fill={isCP1Active ? '#A8E62E' : '#FAF9F7'}
                stroke="#111111"
                strokeWidth="2.5"
                className="transition-colors duration-500"
              />
              <circle
                cx="460"
                cy="166"
                r={isCP1Active ? 4 : 2.5}
                fill="#111111"
                className="transition-all duration-300"
              />
              {/* Motion Arc over CP1 */}
              <path
                d="M 454 156 C 456 150, 469 150, 472 156"
                stroke={isCP1Active ? '#7665FF' : '#111111'}
                strokeWidth={isCP1Active ? '2' : '1.5'}
                strokeLinecap="round"
                className="transition-colors duration-300"
              />
            </g>

            {/* CHECKPOINT 3 (Right edge of Card 2) */}
            <g id="cp3">
              {isCP3Active && (
                <circle
                  cx="900"
                  cy="285"
                  r="13.5"
                  fill="none"
                  stroke="#A8E62E"
                  strokeWidth="2"
                  className="how-checkpoint-ping"
                  style={{ transformOrigin: '900px 285px' }}
                />
              )}
              <circle
                cx="900"
                cy="285"
                r="13.5"
                fill={isCP3Active ? '#A8E62E' : '#FAF9F7'}
                stroke="#111111"
                strokeWidth="2.5"
                className="transition-colors duration-500"
              />
              <circle
                cx="900"
                cy="285"
                r={isCP3Active ? 4 : 2.5}
                fill="#111111"
                className="transition-all duration-300"
              />
              {/* Motion Arc over CP3 */}
              <path
                d="M 894 275 C 896 269, 909 269, 912 275"
                stroke={isCP3Active ? '#7665FF' : '#111111'}
                strokeWidth={isCP3Active ? '2' : '1.5'}
                strokeLinecap="round"
                className="transition-colors duration-300"
              />
            </g>

            {/* CHECKPOINT 2 (Left of Card 3) */}
            <g id="cp2">
              {isCP2Active && (
                <circle
                  cx="364"
                  cy="382"
                  r="13.5"
                  fill="none"
                  stroke="#A8E62E"
                  strokeWidth="2"
                  className="how-checkpoint-ping"
                  style={{ transformOrigin: '364px 382px' }}
                />
              )}
              <circle
                cx="364"
                cy="382"
                r="13.5"
                fill={isCP2Active ? '#A8E62E' : '#FAF9F7'}
                stroke="#111111"
                strokeWidth="2.5"
                className="transition-colors duration-500"
              />
              <circle
                cx="364"
                cy="382"
                r={isCP2Active ? 4 : 2.5}
                fill="#111111"
                className="transition-all duration-300"
              />
            </g>

            {/* CHECKPOINT 4 (Near Bottom Portal) */}
            <g id="cp4">
              {isCP4Active && (
                <circle
                  cx="280"
                  cy="496"
                  r="13.5"
                  fill="none"
                  stroke="#A8E62E"
                  strokeWidth="2"
                  className="how-checkpoint-ping"
                  style={{ transformOrigin: '280px 496px' }}
                />
              )}
              <circle
                cx="280"
                cy="496"
                r="13.5"
                fill={isCP4Active ? '#A8E62E' : '#FAF9F7'}
                stroke="#111111"
                strokeWidth="2.5"
                className="transition-colors duration-500"
              />
              <circle
                cx="280"
                cy="496"
                r={isCP4Active ? 4 : 2.5}
                fill="#111111"
                className="transition-all duration-300"
              />
              {/* Motion Arc over CP4 */}
              <path
                d="M 274 486 C 276 480, 289 480, 292 486"
                stroke={isCP4Active ? '#7665FF' : '#111111'}
                strokeWidth={isCP4Active ? '2' : '1.5'}
                strokeLinecap="round"
                className="transition-colors duration-300"
              />
            </g>

            {/* Gliding Solid Progress Circle */}
            <g id="path-glider">
              {/* Small Round Solid Circle */}
              <circle
                cx={gliderPos.x}
                cy={gliderPos.y}
                r="7.5"
                fill="#111111"
              />
            </g>


          </svg>

          {/* Card 1: Discover (Upper-Right) */}
          <TiltCard
            title="Discover"
            description="Find a challenge that excites you."
            bgColor="#EFECFD"
            accentColor="#7665FF"
            isActive={isCard1Active}
            className="absolute left-[48.73%] top-[17.71%] z-10 h-[16.67%] w-[32.13%] px-6 lg:px-8"
          />

          {/* Card 2: Team up (Right-Middle) */}
          <TiltCard
            title="Team up"
            description="Find people who share your ambition."
            bgColor="#ECFBD2"
            accentColor="#82B91A"
            isActive={isCard2Active}
            className="absolute left-[52.93%] top-[36.98%] z-10 h-[16.67%] w-[32.52%] px-6 lg:px-8"
          />

          {/* Card 3: Build (Middle-Left) */}
          <TiltCard
            title="Build"
            description="Turn your idea into a working product."
            bgColor="#EFECFD"
            accentColor="#7665FF"
            isActive={isCard3Active}
            className="absolute left-[39.36%] top-[55.38%] z-10 h-[16.67%] w-[34.77%] px-6 lg:px-8"
          />

          {/* Card 4: Ship (Lower-Right) */}
          <TiltCard
            title="Ship"
            description="Submit your work and take it to the arena."
            bgColor="#ECFBD2"
            accentColor="#82B91A"
            isActive={isCard4Active}
            className="absolute left-[51.07%] top-[74.13%] z-10 h-[16.67%] w-[31.74%] px-6 lg:px-8"
          />
        </div>

        {/* Mobile Layout (< md) with Interactive TiltCards & Progress */}
        <div className="block md:hidden space-y-6">
          <div>
            <span className="font-inter text-[15px] font-bold tracking-wide text-[#7665FF] uppercase">
              FROM IDEA TO IMPACT
            </span>
            <h2 className="mt-2 font-inter text-[26px] font-bold leading-tight text-[#111111]">
              A simple path from
              <br />
              idea to a working product
            </h2>
          </div>

          <div className="inline-flex rounded-[14px] bg-[#EEF9D1] px-5 py-2.5 shadow-sm">
            <span className="font-inter text-[17px] font-bold text-[#111111]">
              IDEA → PRODUCT
            </span>
          </div>

          <div className="space-y-4">
            <TiltCard
              title="Discover"
              description="Find a challenge that excites you."
              bgColor="#EFECFD"
              accentColor="#7665FF"
              isActive={isCard1Active}
              className="p-5"
            />

            <TiltCard
              title="Team up"
              description="Find people who share your ambition."
              bgColor="#ECFBD2"
              accentColor="#82B91A"
              isActive={isCard2Active}
              className="p-5"
            />

            <TiltCard
              title="Build"
              description="Turn your idea into a working product."
              bgColor="#EFECFD"
              accentColor="#7665FF"
              isActive={isCard3Active}
              className="p-5"
            />

            <TiltCard
              title="Ship"
              description="Submit your work and take it to the arena."
              bgColor="#ECFBD2"
              accentColor="#82B91A"
              isActive={isCard4Active}
              className="p-5"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
