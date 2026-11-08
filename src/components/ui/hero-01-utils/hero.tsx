import * as React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "phosphor-react";
import StarBorder from "@/components/ui/StarBorder";

export interface AvatarList {
  image: string;
}

export interface HeroSectionProps {
  avatarList?: AvatarList[];
  titleLine1?: string;
  titleLine2Prefix?: string;
  titleLine2Italic?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  ratingText?: string;
}

export default function HeroSection({
  titleLine1 = "Building bold brands",
  titleLine2Prefix = "with ",
  titleLine2Italic = "thoughtful design",
  description = "At shadcn space, we help small startups tackle the world's biggest challenges with tailored solutions, guiding you from strategy to success in a competitive market.",
  primaryCtaText = "Get Started",
  primaryCtaHref = "/student",
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-16 pb-14 md:pt-24 md:pb-20">
      {/* Subtle Ambient Brand Gradients: Purple (left) & Lime (upper-right) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{
          backgroundImage: `
            radial-gradient(
              ellipse 46% 46% at 8% 48%,
              rgba(118, 101, 255, 0.151) 0%,
              rgba(118, 101, 255, 0.063) 32%,
              transparent 65%
            ),
            radial-gradient(
              ellipse 42% 42% at 92% 10%,
              rgba(168, 230, 46, 0.176) 0%,
              rgba(168, 230, 46, 0.063) 30%,
              transparent 65%
            )
          `,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1100px] px-6 text-center">
        {/* Main Headline */}
        <h1 className="font-inter text-[32px] xs:text-[40px] sm:text-[54px] md:text-[72px] lg:text-[86px] font-normal tracking-[-0.03em] leading-[1.1] text-[#111111] break-words">
          {titleLine1}
          <br />
          <span>{titleLine2Prefix}</span>
          <span className="font-serif italic font-normal tracking-normal text-[#111111]">
            {titleLine2Italic}
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-5 sm:mt-6 max-w-[680px] font-inter text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[1.6] text-[#555550] px-2 sm:px-0">
          {description}
        </p>

        {/* Centered Primary CTA Button with StarBorder effect */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center">
          <StarBorder
            as={Link}
            to={primaryCtaHref}
            color="#ffffff"
            trailColor="#ffffff"
            duration={4}
            direction="clockwise"
            stars={1}
            trailLength={0.3}
            thickness={1}
            radius={28}
            glow={0.6}
            hover="lap"
            sparkle={false}
            clickPulse
            theme="dark"
            backgroundColor="#111111"
            className="group inline-flex items-center gap-3 px-6 sm:px-7 py-3 sm:py-3.5 font-inter text-[14px] sm:text-[15px] font-medium text-white transition-all hover:shadow-md active:scale-95"
          >
            <span>{primaryCtaText}</span>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight size={18} className="w-[18px] h-[18px]" />
            </div>
          </StarBorder>
        </div>
      </div>
    </section>
  );
}
