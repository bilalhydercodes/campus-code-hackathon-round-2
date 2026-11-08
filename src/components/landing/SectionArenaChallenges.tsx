import { Link } from 'react-router-dom';
import TiltedGridHero, { TiltedGridImage } from './TiltedGridHero';
import { getAssetUrl } from '@/lib/utils';

const activeChallengeImages: TiltedGridImage[] = [
  { src: getAssetUrl('slides/slide-1.png'), alt: 'Building India Case Study Competition' },
  { src: getAssetUrl('slides/slide-2.png'), alt: 'Seva First Innovation Challenge 2026' },
  { src: getAssetUrl('slides/slide-3.png'), alt: 'Rajasthan Royals SuperRR Selector Winners' },
  { src: getAssetUrl('slides/slide-4.png'), alt: 'Rajasthan Royals SuperRR Selector Season 2' },
  { src: getAssetUrl('slides/slide-5.png'), alt: 'Asian Paints Alchemy' },
];

export default function SectionArenaChallenges() {
  return (
    <section id="hackathons" className="relative w-full pt-10 md:pt-14 pb-10 md:pb-16 bg-[#F7F7F4] overflow-hidden">
      {/* Container Header */}
      <div className="mx-auto max-w-[1320px] px-6 lg:px-11 pb-6 md:pb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="font-mono text-[11px] font-normal tracking-[0.05em] text-[#7665FF] uppercase">
              ACTIVE CHALLENGES & ARENA TRACKS
            </div>
            <h2 className="mt-2 font-inter text-[30px] md:text-[42px] font-bold leading-[1.1] tracking-tight text-[#111111]">
              Compete for real prizes.
              <br />
              Ship what matters.
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/student"
              className="inline-flex h-[42px] items-center gap-2 rounded-[5px] bg-[#111111] px-5 font-inter text-[13px] font-medium text-white transition-all hover:bg-[#202020]"
            >
              <span>Explore All Challenges</span>
              <span className="text-[#A8E62E] font-mono leading-none">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Infinite Seamless Poster Slider */}
      <div className="relative w-full">
        <TiltedGridHero
          images={activeChallengeImages}
          speed={6.72}
          tileHeight={50}
          aspectRatio={2 / 3}
          gap={6}
          fade={8}
          className="w-full"
        />
      </div>
    </section>
  );
}
