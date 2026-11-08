import { useState } from 'react';
import { Calendar, X } from 'phosphor-react';
import { getAssetUrl } from '@/lib/utils';

interface MyEventsViewProps {
  onNavigateTab?: (tab: string) => void;
}

interface EventRound {
  title: string;
  organizer: string;
  dateRange: string;
  logoUrl: string;
  logoBg?: string;
  rounds: { name: string; status: string; date: string }[];
}

const UPCOMING_EVENTS: EventRound[] = [
  {
    title: 'Codex 48 – National-Level Hackathon',
    organizer: 'WeCodeCoders',
    dateRange: '24 Sep 2026 – 20 Oct 2026',
    logoUrl: getAssetUrl('assets/wecode-logo.png'),
    logoBg: 'bg-white',
    rounds: [
      { name: 'Round 1: Online Quiz & Ideation', status: 'Completed', date: '24 Sep – 05 Oct 2026' },
      { name: 'Round 2: 48-Hour National Hackathon', status: 'Active (Shortlisted)', date: '12 Oct – 14 Oct 2026' },
      { name: 'Round 3: Grand Finale & Pitch', status: 'Upcoming', date: '20 Oct 2026' },
    ],
  },
  {
    title: 'Vihaan X: Software Track',
    organizer: 'Delhi Technological University (DTU), New Delhi',
    dateRange: '04 Oct 2026 – 07 Nov 2026',
    logoUrl: getAssetUrl('assets/vihaan-logo.png'),
    logoBg: 'bg-[#0c0d19]',
    rounds: [
      { name: 'Round 1: Abstract & PPT Submission', status: 'Approved', date: '04 Oct – 18 Oct 2026' },
      { name: 'Round 2: Prototype Evaluation', status: 'In Review', date: '25 Oct – 01 Nov 2026' },
      { name: 'Round 3: On-Campus Offline Finale', status: 'Scheduled', date: '07 Nov 2026' },
    ],
  },
];

const FEATURED_ITEMS = [
  'SEVA FIRST – Rashtriya Youth Innovation Challenge 2026',
  'Tuition fee support for the selected 2026-27 cohort.',
  'Airtel Sync 2026',
  'Tek-Qubit: Women of Impact 2026',
];

function ApplicationsIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="shrink-0">
      <path
        d="M5 13.5L11.5 20L23.5 6"
        stroke="#383838"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 13.5L11.5 20L23.5 6"
        stroke="#FEEEE1"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RoundsIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="shrink-0">
      <circle cx="12" cy="7" r="2.8" stroke="#383838" strokeWidth="1.8" fill="white" />
      <path
        d="M4 7H9M15 7H17C20.5 7 22.5 9 22.5 11.5C22.5 14 20.5 16 17 16H11C7.5 16 5.5 18 5.5 20.5C5.5 23 7.5 23.5 11 23.5H18"
        stroke="#383838"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20.5" cy="23.5" r="2.8" fill="#383838" />
    </svg>
  );
}

function CoursesIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="shrink-0">
      <path
        d="M6 4C6 3 6.8 2.2 7.8 2.2H20.2C21.2 2.2 22 3 22 4V22.5C22 23.5 21.2 24.2 20.2 24.2H7.8C6.8 24.2 6 23.5 6 22.5V4Z"
        fill="#DEF7EB"
        stroke="#383838"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M6 21H22" stroke="#383838" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M14 8C14 10.5 13.2 11.5 10.5 12.5C13.2 13.5 14 14.5 14 17C14 14.5 14.8 13.5 17.5 12.5C14.8 11.5 14 10.5 14 8Z"
        fill="#383838"
      />
      <path
        d="M19 5.5C19 6.8 18.5 7.2 17 7.8C18.5 8.2 19 8.8 19 10C19 8.8 19.5 8.2 21 7.8C19.5 7.2 19 6.8 19 5.5Z"
        fill="#383838"
      />
    </svg>
  );
}

function SessionsIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="shrink-0">
      <rect x="4" y="5" width="20" height="19" rx="2.5" fill="white" stroke="#383838" strokeWidth="1.8" />
      <path d="M4 10H24" stroke="#383838" strokeWidth="1.8" />
      <path d="M4.9 5.9H23.1V10H4.9V5.9Z" fill="#FFF8DE" />
      <path d="M8.5 3V6.5M19.5 3V6.5" stroke="#383838" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9.5 17L12.5 20L18.5 14" stroke="#383838" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CertificatesIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="shrink-0">
      <rect x="3.5" y="5" width="21" height="16" rx="2" fill="white" stroke="#383838" strokeWidth="1.8" />
      <path d="M6.5 9.5H13M6.5 13H12" stroke="#383838" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="19.5" cy="12.5" r="4.2" fill="#FCE6EE" stroke="#383838" strokeWidth="1.8" />
      <path
        d="M18 16.2L17 23L19.5 21.5L22 23L21 16.2"
        fill="#FCE6EE"
        stroke="#383838"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

const KPI_CARDS = [
  { label: 'Applications', value: '4', status: 'Live', Icon: ApplicationsIcon },
  { label: 'Rounds', value: '3', status: 'Live', Icon: RoundsIcon },
  { label: 'Courses', value: '0', status: 'Total', Icon: CoursesIcon },
  { label: 'Sessions', value: '0', status: 'Total', Icon: SessionsIcon },
  { label: 'Certificates', value: '1', status: 'Total', Icon: CertificatesIcon },
];

export default function MyEventsView({ onNavigateTab }: MyEventsViewProps) {
  const [selectedRoundEvent, setSelectedRoundEvent] = useState<EventRound | null>(null);

  return (
    <div className="relative mx-auto w-full max-w-[1193px]">
      {/* Soft Diffused Atmospheric Background Glows behind Content */}
      <div
        className="pointer-events-none absolute -top-14 right-44 h-80 w-80 rounded-full bg-[#7665FF]/[0.06] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-10 right-0 h-72 w-72 rounded-full bg-[#A8E62E]/[0.05] blur-3xl"
        aria-hidden="true"
      />

      {/* Hero Heading: Left Aligned */}
      <div className="relative z-10">
        <h1 className="font-inter text-[32px] sm:text-[44px] md:text-[56px] font-bold tracking-tight text-[#111111] leading-[1.08]">
          My <span className="text-[#7665FF]">Activities</span>
        </h1>
        <p className="mt-2 sm:mt-3 font-inter text-[14px] sm:text-[16px] md:text-[19px] font-normal text-[#555550]">
          Your applications, rounds, and activity in one place.
        </p>
      </div>

      {/* Two-Column Grid: Primary Column (Responsive) + Right Rail */}
      <div className="relative z-10 mt-6 sm:mt-9 flex flex-col lg:flex-row items-start gap-8 lg:gap-[33px]">
        {/* Left Primary Column */}
        <div className="w-full lg:w-[760px] lg:shrink-0">
          {/* 08. Horizontal KPI Cards (responsive 2 / 3 / 5 columns) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3">
            {KPI_CARDS.map((card) => {
              const IconComp = card.Icon;
              return (
                <div
                  key={card.label}
                  className="flex h-[130px] sm:h-[138px] flex-col justify-between rounded-2xl border border-gray-200/90 bg-white p-3.5 sm:p-4.5 shadow-2xs transition-colors hover:border-gray-300"
                >
                  <div className="flex h-7 w-7 items-center justify-start">
                    <IconComp />
                  </div>
                  <div>
                    <span className="block font-inter text-[13px] sm:text-[14px] font-medium text-[#111111] truncate">
                      {card.label}
                    </span>
                    <div className="mt-1 flex items-baseline gap-1 font-inter text-[13px] sm:text-[13.5px]">
                      <span className="font-bold text-[#111111]">{card.value}</span>
                      <span className="font-normal text-[#666660]">{card.status}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 09. Upcoming Rounds Section */}
          <div className="mt-8 sm:mt-10">
            <div className="flex items-center justify-between pb-4 sm:pb-5">
              <h2 className="font-inter text-[22px] sm:text-[29px] font-bold tracking-tight text-[#111111]">
                Upcoming Rounds
              </h2>
              {onNavigateTab && (
                <button
                  type="button"
                  onClick={() => onNavigateTab('Events')}
                  className="font-inter text-[14px] sm:text-[15.5px] font-medium text-[#7665FF] hover:underline cursor-pointer"
                >
                  View All →
                </button>
              )}
            </div>

            {/* Event Cards Stack */}
            <div className="space-y-4">
              {UPCOMING_EVENTS.map((evt) => (
                <article
                  key={evt.title}
                  className="flex flex-col sm:flex-row min-h-[142px] items-start sm:items-center justify-between gap-4 rounded-2xl border border-[#111111]/[0.08] bg-white p-4 sm:px-6 sm:py-4.5 shadow-2xs transition-all hover:border-[#111111]/15"
                >
                  <div className="flex items-start sm:items-center gap-3.5 sm:gap-5 min-w-0 flex-1">
                    {/* Left: Square Logo */}
                    <div
                      className={`flex h-[64px] w-[64px] sm:h-[84px] sm:w-[84px] shrink-0 items-center justify-center rounded-2xl border border-[#111111]/[0.06] p-2 ${evt.logoBg || 'bg-white'}`}
                    >
                      <img
                        src={evt.logoUrl}
                        alt={evt.title}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    {/* Middle: Event Title, Organizer, Date */}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-inter text-[16px] sm:text-[20px] font-bold leading-snug tracking-tight text-[#111111]">
                        {evt.title}
                      </h3>
                      <p className="mt-0.5 sm:mt-1 font-inter text-[12.5px] sm:text-[14px] text-[#666660]">
                        {evt.organizer}
                      </p>
                      <div className="mt-2 flex items-center gap-1.5 font-inter text-[12px] sm:text-[13px] text-[#666660]">
                        <Calendar size={16} className="w-4 h-4 text-[#858580] shrink-0" />
                        <span className="truncate">{evt.dateRange}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: View Rounds */}
                  <div className="w-full sm:w-auto shrink-0 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setSelectedRoundEvent(evt)}
                      className="w-full sm:w-auto text-center rounded-full bg-[#F0EDFF] px-5 py-2.5 sm:py-2 font-inter text-[13px] font-medium text-[#7665FF] hover:bg-[#e7e1ff] transition-colors cursor-pointer"
                    >
                      View Rounds
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Right Rail: Responsive */}
        <div className="w-full lg:w-[400px] lg:shrink-0 space-y-6">
          {/* Top: ReBuild '26 Banner (Exact Asset) */}
          <div
            onClick={() => onNavigateTab?.('Events')}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#7665FF]/20 shadow-xs transition-transform hover:scale-[1.01]"
          >
            <img
              src={getAssetUrl('assets/rebuild-banner-full.png')}
              alt="REBUILD '26 Challenge"
              className="h-auto w-full rounded-2xl object-cover"
            />
          </div>

          {/* Bottom: Featured List Card */}
          <div className="rounded-2xl border border-[#111111]/[0.08] bg-white p-6.5 shadow-xs">
            <h3 className="font-inter text-[23px] font-bold tracking-tight text-[#111111]">
              Featured
            </h3>
            <div className="mt-2 divide-y divide-[#111111]/[0.08]">
              {FEATURED_ITEMS.map((item) => (
                <div
                  key={item}
                  onClick={() => onNavigateTab?.('Events')}
                  className="group flex cursor-pointer items-center justify-between py-3.5 transition-colors hover:text-[#7665FF]"
                >
                  <span className="pr-4 font-inter text-[14px] font-semibold leading-snug text-[#111111] group-hover:text-[#7665FF] transition-colors">
                    {item}
                  </span>
                  <span className="shrink-0 font-inter text-[15px] text-[#111111] group-hover:text-[#7665FF] transition-colors">
                    →
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Rounds Detail Modal */}
      {selectedRoundEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-[#111111]/[0.08] bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-[#111111]/[0.08] pb-4">
              <div>
                <h3 className="font-inter text-[20px] font-bold text-[#111111]">
                  {selectedRoundEvent.title}
                </h3>
                <p className="font-inter text-[13.5px] text-[#666660]">
                  {selectedRoundEvent.organizer}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRoundEvent(null)}
                className="rounded-full p-1 text-[#858580] hover:bg-[#F7F7F4] hover:text-[#111111]"
              >
                <X size={25} className="w-[25px] h-[25px]" />
              </button>
            </div>

            <div className="my-5 space-y-3.5">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#858580]">
                Event Timeline & Milestones
              </span>
              <div className="space-y-3">
                {selectedRoundEvent.rounds.map((round) => (
                  <div
                    key={round.name}
                    className="flex items-center justify-between rounded-xl border border-[#111111]/[0.06] bg-[#F7F7F4] p-3.5"
                  >
                    <div>
                      <div className="font-inter text-[14px] font-medium text-[#111111]">
                        {round.name}
                      </div>
                      <div className="font-inter text-[12px] text-[#858580]">
                        {round.date}
                      </div>
                    </div>
                    <span className="rounded-full bg-white px-2.5 py-1 font-mono text-[11px] font-medium text-[#7665FF] border border-[#7665FF]/20">
                      {round.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end border-t border-[#111111]/[0.08] pt-4">
              <button
                type="button"
                onClick={() => setSelectedRoundEvent(null)}
                className="rounded-full bg-[#111111] px-5 py-2 font-inter text-[13px] font-medium text-white hover:bg-black cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
