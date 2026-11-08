import React, { useRef } from 'react';
import AvatarConvergenceSequence from './AvatarConvergenceSequence';

export default function SectionMission() {
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);

  return (
    <section id="community" className="relative w-full bg-[#F7F7F4] py-16 md:py-24 overflow-visible">
      <div className="relative z-10 mx-auto max-w-[1320px] px-6 lg:px-11">
        {/* Horizontal Layout: Left Text - Center Animation - Right Text */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4 w-full">
          {/* Left Column: Heading with editorial serif italic 'builders' */}
          <div
            ref={leftTextRef}
            className="flex-1 flex justify-center lg:justify-start w-full lg:w-auto relative z-10 will-change-transform transition-none"
          >
            <h2 className="font-inter text-[clamp(34px,3.8vw,52px)] font-normal leading-[1.14] tracking-[-0.01em] text-[#111111] text-center lg:text-left">
              Great ideas
              <br />
              need{' '}
              <span className="font-serif italic font-normal text-[#7665FF] text-[1.06em]">
                builders
              </span>
            </h2>
          </div>

          {/* Center Column: Avatar Convergence Sequence (Forms Circle & Floats Down to Highlighted Place) */}
          <div className="shrink-0 flex justify-center w-full lg:w-auto overflow-visible">
            <AvatarConvergenceSequence leftTextRef={leftTextRef} rightTextRef={rightTextRef} />
          </div>

          {/* Right Column: Three Statements */}
          <div
            ref={rightTextRef}
            className="flex-1 flex justify-center lg:justify-end w-full lg:w-auto relative z-10 will-change-transform transition-none"
          >
            <div className="flex flex-col justify-center space-y-3.5 font-inter text-[clamp(20px,2.2vw,30px)] font-normal text-[#111111] text-center lg:text-left">
              <div>
                Build with{' '}
                <span className="font-semibold text-[#7665FF]">developers.</span>
              </div>
              <div>
                Think with{' '}
                <span className="font-semibold text-[#82B91A]">designers.</span>
              </div>
              <div>
                Compete with{' '}
                <span className="relative inline-block font-bold text-[#111111]">
                  builders.
                  <span
                    className="absolute left-0 bottom-0.5 h-[3px] w-full rounded-full bg-[#A8E62E]"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
