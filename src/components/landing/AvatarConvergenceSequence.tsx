import React, { useEffect, useRef, useCallback } from 'react';

interface AvatarItem {
  id: number;
  name: string;
  role: string;
  src: string;
  // Starting state: scattered across the center canvas with light blur
  scatterX: number;
  scatterY: number;
  startScale: number;
  startBlur: number;
  // Clustered circular ring state (no overlapping)
  clusterX: number;
  clusterY: number;
  finalScale: number;
  zIndex: number;
}

// 84px radius produces an evenly spaced circle where 68px avatars sit with a 3-5px gap
const RADIUS = 84;

const AVATARS: AvatarItem[] = [
  {
    id: 1,
    name: 'Avatar 1',
    role: '',
    src: '/avatars/avatar-1.jpg',
    scatterX: -160,
    scatterY: 85,
    startScale: 1.25,
    startBlur: 2.6,
    clusterX: 0,
    clusterY: -RADIUS, // 12 o'clock (top break point)
    finalScale: 1.0,
    zIndex: 30,
  },
  {
    id: 2,
    name: 'Avatar 2',
    role: '',
    src: '/avatars/avatar-2.jpg',
    scatterX: 165,
    scatterY: -80,
    startScale: 1.22,
    startBlur: 2.4,
    clusterX: 66,
    clusterY: -52, // ~1:45 o'clock
    finalScale: 1.0,
    zIndex: 30,
  },
  {
    id: 3,
    name: 'Avatar 3',
    role: '',
    src: '/avatars/avatar-3.jpg',
    scatterX: -140,
    scatterY: -75,
    startScale: 1.15,
    startBlur: 1.8,
    clusterX: 82,
    clusterY: 19, // ~3:30 o'clock
    finalScale: 1.0,
    zIndex: 30,
  },
  {
    id: 4,
    name: 'Avatar 4',
    role: '',
    src: '/avatars/avatar-4.jpg',
    scatterX: 145,
    scatterY: 75,
    startScale: 1.12,
    startBlur: 1.6,
    clusterX: 36,
    clusterY: 76, // ~5:15 o'clock
    finalScale: 1.0,
    zIndex: 30,
  },
  {
    id: 5,
    name: 'Avatar 5',
    role: '',
    src: '/avatars/avatar-5.jpg',
    scatterX: -65,
    scatterY: -110,
    startScale: 0.94,
    startBlur: 1.0,
    clusterX: -36,
    clusterY: 76, // ~6:45 o'clock
    finalScale: 1.0,
    zIndex: 30,
  },
  {
    id: 6,
    name: 'Avatar 6',
    role: '',
    src: '/avatars/avatar-6.jpg',
    scatterX: 70,
    scatterY: -105,
    startScale: 0.94,
    startBlur: 1.0,
    clusterX: -82,
    clusterY: 19, // ~8:30 o'clock
    finalScale: 1.0,
    zIndex: 30,
  },
  {
    id: 7,
    name: 'Avatar 7',
    role: '',
    src: '/avatars/avatar-7.jpg',
    scatterX: 0,
    scatterY: 110,
    startScale: 1.08,
    startBlur: 1.4,
    clusterX: -66,
    clusterY: -52, // ~10:15 o'clock (top break point)
    finalScale: 1.0,
    zIndex: 30,
  },
];

// Horizontal line ordering when circle breaks from the top:
// Left side uncurls outward to the left, right side uncurls outward to the right
const LINE_INDICES: Record<number, number> = {
  7: -3, // far left
  6: -2,
  5: -1,
  4: 0,  // center
  3: 1,
  2: 2,
  1: 3,  // far right
};

function dramaticEaseOut(t: number): number {
  return 1 - Math.pow(1 - t, 4.5);
}

interface AvatarConvergenceSequenceProps {
  leftTextRef?: React.RefObject<HTMLDivElement | null>;
  rightTextRef?: React.RefObject<HTMLDivElement | null>;
}

export default function AvatarConvergenceSequence({
  leftTextRef,
  rightTextRef,
}: AvatarConvergenceSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const avatarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerWidthRef = useRef<number>(380);
  const targetMoveDownDistanceRef = useRef<number>(265);

  const setAvatarRef = (el: HTMLDivElement | null, idx: number) => {
    avatarRefs.current[idx] = el;
  };

  // Synchronously update avatars and flanking texts across Phase 1 (circle) and Phase 2 (break into horizontal line + move down)
  const renderFrame = useCallback(
    (formationProgress: number, downProgress: number) => {
      const responsiveFactor = Math.min(1, Math.max(0.65, containerWidthRef.current / 380));
      const moveDownY = targetMoveDownDistanceRef.current * downProgress;

      // Responsive spacing for horizontal line: 74px on desktop, scaling down cleanly on narrower mobile screens
      const lineSpacing = Math.min(74, Math.max(46, (containerWidthRef.current - 50) / 6));

      // 1. Update avatars:
      // Phase 1: Glides from scattered origins into circular ring
      // Phase 2: Breaks at top and flattens into horizontal line while moving down
      AVATARS.forEach((av, i) => {
        const el = avatarRefs.current[i];
        if (!el) return;

        const startX = av.scatterX * responsiveFactor;
        const startY = av.scatterY * responsiveFactor;

        // Position in Phase 1 (circle)
        const circleX = av.clusterX;
        const circleY = av.clusterY;

        const phase1X = startX + (circleX - startX) * formationProgress;
        const phase1Y = startY + (circleY - startY) * formationProgress;

        // Position in Phase 2 (horizontal line)
        const targetLineX = LINE_INDICES[av.id] * lineSpacing;
        const targetLineY = 0;

        // Combined spatial transformation
        const currentX = phase1X + (targetLineX - circleX) * downProgress;
        const currentY = phase1Y + (targetLineY - circleY + moveDownY) * downProgress;

        const currentScale = av.startScale + (av.finalScale - av.startScale) * formationProgress;
        const currentBlur = Math.max(0, av.startBlur * (1 - formationProgress));

        el.style.transform = `translate(calc(-50% + ${currentX.toFixed(2)}px), calc(-50% + ${currentY.toFixed(2)}px)) scale(${currentScale.toFixed(3)})`;
        el.style.filter = currentBlur > 0.05 ? `blur(${currentBlur.toFixed(2)}px)` : 'none';
      });

      // 2. Synchronize flanking texts:
      // Phase 1: Both texts start with outward margin (-55px / +55px) and glide inward to resting (0px) as circle forms
      // Phase 2: As avatars break into a horizontal line and travel down towards the card,
      // the flanking texts glide even closer together toward each other in perfect synchrony!
      const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
      const phase1Shift = 55 * (1 - formationProgress);

      // Inward glide during Phase 2 (horizontal line formation + move down):
      const maxDesktopInward = Math.min(140, Math.max(60, (containerWidthRef.current || 380) * 0.26));
      const phase2Inward = maxDesktopInward * downProgress;

      if (leftTextRef?.current) {
        if (isDesktop) {
          const leftX = -phase1Shift + phase2Inward;
          leftTextRef.current.style.transform = `translateX(${leftX.toFixed(2)}px)`;
        } else {
          const leftY = -phase1Shift * 0.35 + 16 * downProgress;
          leftTextRef.current.style.transform = `translateY(${leftY.toFixed(2)}px)`;
        }
      }
      if (rightTextRef?.current) {
        if (isDesktop) {
          const rightX = phase1Shift - phase2Inward;
          rightTextRef.current.style.transform = `translateX(${rightX.toFixed(2)}px)`;
        } else {
          const rightY = phase1Shift * 0.35 - 16 * downProgress;
          rightTextRef.current.style.transform = `translateY(${rightY.toFixed(2)}px)`;
        }
      }
    },
    [leftTextRef, rightTextRef]
  );

  useEffect(() => {
    let animFrameId: number;
    let targetFormation = 0;
    let currentFormation = 0;
    let targetDown = 0;
    let currentDown = 0;

    const measureLayout = () => {
      if (containerRef.current) {
        containerWidthRef.current = containerRef.current.offsetWidth;
      }
      // Dynamically measure the exact distance to the highlighted spot right above the CTA card
      const ctaCard = document.querySelector('.rounded-\\[28px\\]');
      if (ctaCard && containerRef.current) {
        const ctaCardTopPage = ctaCard.getBoundingClientRect().top + window.scrollY;
        const containerCenterPage =
          containerRef.current.getBoundingClientRect().top +
          window.scrollY +
          containerRef.current.offsetHeight / 2;
        // Position horizontal line ~65px above the top edge of the slanted CTA card
        const desiredCenterPage = ctaCardTopPage - 34 - 65;
        targetMoveDownDistanceRef.current = Math.max(160, desiredCenterPage - containerCenterPage);
      } else {
        targetMoveDownDistanceRef.current = 265;
      }
    };
    measureLayout();

    const calculateTargets = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // Phase 1: Convergence into circle (starts when section enters, finishes when centered in view)
      const startY1 = vh * 0.58;
      const endY1 = vh * 0.26;
      const dist1 = startY1 - endY1;
      const currentDist1 = startY1 - rect.top;
      const rawP1 = Math.min(1, Math.max(0, currentDist1 / dist1));
      targetFormation = dramaticEaseOut(rawP1);

      // Phase 2: Break from top, form horizontal line and move down to highlighted place
      // Starts right after circle is fully formed (rect.top <= endY1), finishes as user scrolls to CTA card
      const startY2 = endY1;
      const endY2 = -(vh * 0.16);
      const dist2 = startY2 - endY2;
      const currentDist2 = startY2 - rect.top;
      const rawP2 = Math.min(1, Math.max(0, currentDist2 / dist2));
      targetDown = dramaticEaseOut(rawP2);
    };

    const updateLoop = () => {
      let changed = false;

      // Inertial lerp for Phase 1 (circle formation)
      const diff1 = targetFormation - currentFormation;
      if (Math.abs(diff1) > 0.0006) {
        currentFormation += diff1 * 0.1;
        changed = true;
      } else if (currentFormation !== targetFormation) {
        currentFormation = targetFormation;
        changed = true;
      }

      // Inertial lerp for Phase 2 (break from top, form horizontal line & move down)
      const diff2 = targetDown - currentDown;
      if (Math.abs(diff2) > 0.0006) {
        currentDown += diff2 * 0.1;
        changed = true;
      } else if (currentDown !== targetDown) {
        currentDown = targetDown;
        changed = true;
      }

      if (changed) {
        renderFrame(currentFormation, currentDown);
      }

      animFrameId = requestAnimationFrame(updateLoop);
    };

    const handleScrollOrResize = () => {
      measureLayout();
      calculateTargets();
    };

    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });

    measureLayout();
    calculateTargets();
    currentFormation = targetFormation;
    currentDown = targetDown;
    renderFrame(currentFormation, currentDown);

    animFrameId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
      cancelAnimationFrame(animFrameId);
    };
  }, [renderFrame]);

  return (
    <div
      ref={containerRef}
      className="relative w-[360px] md:w-[560px] h-[300px] md:h-[340px] flex items-center justify-center overflow-visible select-none"
    >
      {/* 7 Circular Avatars forming circle and then breaking from top into horizontal line */}
      {AVATARS.map((avatar, idx) => (
        <div
          key={avatar.id}
          ref={(el) => setAvatarRef(el, idx)}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: '68px',
            height: '68px',
            left: '50%',
            top: '50%',
            zIndex: avatar.zIndex,
            willChange: 'transform, filter',
          }}
        >
          <div className="relative w-full h-full rounded-full ring-[3px] ring-white shadow-[0_6px_20px_rgba(0,0,0,0.08)] overflow-hidden bg-white">
            <img
              src={avatar.src}
              alt={avatar.name}
              className="w-full h-full object-cover block"
              loading="eager"
              draggable={false}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
