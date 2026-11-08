import React, { useState } from 'react';
import { LanyardCard } from '../ui/lanyard-card';
import { Download, Share2, Check } from 'lucide-react';
import { getAssetUrl } from '@/lib/utils';

interface DigitalIdViewProps {
  className?: string;
  fullscreen?: boolean;
  onNavigateTab?: (tab: string) => void;
}

export default function DigitalIdView({
  className = '',
  fullscreen = false,
  onNavigateTab,
}: DigitalIdViewProps) {
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = getAssetUrl('assets/lanyard-digital-id.png');
    link.download = 'CampusCode-Digital-Pass.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    // 1. Ensure the main page background is standard gray/off-white (#F8F9FA), NOT white
    <div
      className={`relative w-full overflow-hidden bg-[#F8F9FA] select-none ${
        fullscreen
          ? 'min-h-[calc(100vh-87px)] p-6 md:p-10'
          : 'min-h-[calc(100vh-140px)] p-4 sm:p-6 md:p-8 rounded-2xl'
      } ${className}`}
    >
      {/* 2. Header and Buttons matching specification */}
      <div className="relative z-20 flex w-full max-w-5xl mx-auto flex-wrap items-start justify-between gap-4 mb-2 sm:mb-4">
        <div>
          <h1 className="font-inter text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Digital Card
          </h1>
          <p className="mt-1 font-inter text-xs sm:text-sm font-medium text-gray-500">
            Your all-access CampusCode digital pass
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-2 rounded-lg border-[2px] border-black bg-white px-4 py-2 text-xs font-black shadow-[4px_4px_0px_0px_#000] transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none hover:bg-gray-50 cursor-pointer uppercase"
          >
            <Download className="h-4 w-4" /> DOWNLOAD ID
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-2 rounded-lg border-[2px] border-black bg-white px-4 py-2 text-xs font-black shadow-[4px_4px_0px_0px_#000] transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none hover:bg-gray-50 cursor-pointer uppercase"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-600" />
                <span>COPIED!</span>
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4" />
                <span>SHARE PASS</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3. The Lanyard Wrapper - NO BACKGROUND, NO BORDERS, NO CARDS, NO SHADOWS */}
      {/* The lanyard strap hangs freely directly against the off-white background */}
      <div className="relative mx-auto mt-2 sm:mt-0 flex w-full max-w-lg justify-center bg-transparent border-0 shadow-none">
        <LanyardCard
          onOpenPlaybook={() => {
            if (onNavigateTab) {
              onNavigateTab('Student Guide');
            }
          }}
        />
      </div>

      {/* Footer Sub-caption */}
      <p className="relative z-10 text-center text-[11px] font-mono font-medium text-gray-400 uppercase tracking-widest mt-6">
        • Interactive 3D Physics: Move cursor to tilt · Drag to pull lanyard •
      </p>
    </div>
  );
}
