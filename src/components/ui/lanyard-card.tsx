"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn, getAssetUrl } from "@/lib/utils";

export interface LanyardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  onOpenPlaybook?: () => void;
}

export function LanyardCard({
  className,
  onOpenPlaybook,
  ...props
}: LanyardCardProps) {
  // 3D Hover Parallax Physics setup
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 22 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (event.clientX - rect.left) / width - 0.5;
    const mouseY = (event.clientY - rect.top) / height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div 
      className={cn(
        "flex w-full flex-col items-center justify-start bg-transparent pointer-events-none select-none",
        className
      )}
      {...props}
    >
      {/* ==================================================== */}
      {/* THE PENDULUM CONTAINER (Swings naturally from top)   */}
      {/* ==================================================== */}
      <motion.div
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "top center", perspective: "1500px" }}
        className="relative flex flex-col items-center z-10 pointer-events-auto"
      >
        {/* ==================================================== */}
        {/* 3D DRAGGABLE & TILT CARD (Physics enabled)           */}
        {/* ==================================================== */}
        <motion.div
          drag
          dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
          dragElastic={0.25}
          whileDrag={{ scale: 1.04, cursor: "grabbing" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="group relative cursor-grab select-none transition-shadow"
          onClick={onOpenPlaybook}
          title="CampusCode Digital ID - Drag or Click"
        >
          {/* Transparent 2D Graphic Illustration with natural silhouette drop shadow */}
          <div className="relative w-[290px] xs:w-[320px] sm:w-[360px] md:w-[390px] drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)] transition-all duration-300 group-hover:drop-shadow-[0_26px_45px_rgba(0,0,0,0.28)]">
            <img
              src={getAssetUrl('assets/lanyard-digital-id.png')}
              alt="CampusCode Lanyard Digital ID - Google Builder"
              className="w-full h-auto block select-none pointer-events-none"
              draggable={false}
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default LanyardCard;
