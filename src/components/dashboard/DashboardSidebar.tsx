import React from 'react';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '@/lib/utils';
import {
  SquaresFour,
  Trophy,
  CalendarCheck,
  Medal,
  CreditCard,
  FileText,
  Envelope,
  Bell,
  Question,
  User,
  SidebarSimple,
  X,
  SignOut,
} from 'phosphor-react';

export interface DashboardSidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  userName: string;
  onLogout: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isOpenOnMobile?: boolean;
  onCloseMobile?: () => void;
}

interface NavItem {
  name: string;
  icon: React.ComponentType<{ className?: string; size?: number | string }>;
}

const PRIMARY_NAV_ITEMS: NavItem[] = [
  { name: 'Overview', icon: SquaresFour },
  { name: 'Events', icon: Trophy },
  { name: 'My Events', icon: CalendarCheck },
  { name: 'Certificates', icon: Medal },
  { name: 'Digital Card', icon: CreditCard },
  { name: 'Student Guide', icon: FileText },
  { name: 'Official Communication', icon: Envelope },
  { name: 'Notifications', icon: Bell },
  { name: 'Help & Support', icon: Question },
  { name: 'Profile', icon: User },
];

export default function DashboardSidebar({
  activeTab,
  onSelectTab,
  userName = 'Sai',
  onLogout,
  isCollapsed = false,
  onToggleCollapse,
  isOpenOnMobile = false,
  onCloseMobile,
}: DashboardSidebarProps) {
  const handleItemClick = (name: string) => {
    onSelectTab(name);
    onCloseMobile?.();
  };

  // Content for mobile drawer
  const mobileDrawer = isOpenOnMobile && (
    <div className="md:hidden fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onCloseMobile}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside className="fixed inset-y-0 left-0 z-50 flex h-full w-[260px] max-w-[85vw] flex-col border-r border-[#111111]/[0.08] bg-[#F7F7F4] shadow-2xl select-none text-[#111111] animate-in slide-in-from-left duration-200">
        {/* Drawer Header */}
        <div className="flex h-[56px] items-center justify-between border-b border-[#111111]/[0.08] px-4">
          <Link to="/" onClick={onCloseMobile} className="flex items-center">
            <img
              src={getAssetUrl('campuscode-logo.png')}
              alt="CampusCode"
              className="h-[22px] w-auto object-contain object-left"
            />
          </Link>
          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200/80 text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X size={18} className="w-[18px] h-[18px]" />
          </button>
        </div>

        {/* Workspace Tag */}
        <div className="px-4 pt-3 pb-1">
          <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.1em] text-[#7A7A75]">
            WORKSPACE
          </span>
        </div>

        {/* Navigation List */}
        <nav className="flex flex-1 flex-col px-2.5 py-1.5 space-y-1 overflow-y-auto">
          {PRIMARY_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              activeTab === item.name ||
              (item.name === 'My Events' && activeTab === 'My Activities') ||
              (item.name === 'Digital Card' && activeTab === 'Digital ID');

            return (
              <button
                key={item.name}
                type="button"
                onClick={() => handleItemClick(item.name)}
                className={`flex w-full min-h-[42px] items-center gap-3 rounded-[8px] px-3 py-2 text-left transition-all active:scale-[0.98] ${
                  isActive
                    ? 'bg-[#7665FF] font-semibold text-white shadow-2xs'
                    : 'font-normal text-[#111111] hover:bg-black/[0.04]'
                }`}
              >
                <Icon
                  size={20}
                  className={`w-5 h-5 shrink-0 ${
                    isActive ? 'text-white' : 'text-[#666660]'
                  }`}
                />
                <span className="truncate text-[13.5px] tracking-[-0.01em]">
                  {item.name}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Account Section at Bottom */}
        <div className="border-t border-[#111111]/[0.08] px-4 py-3 bg-[#F0F0EB]/60">
          <div className="mb-2 font-mono text-[9.5px] font-semibold uppercase tracking-[0.1em] text-[#7A7A75]">
            ACCOUNT
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#111111] font-inter text-[12px] font-bold text-white">
                {userName ? userName.charAt(0).toUpperCase() : 'S'}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-inter text-[13px] font-medium leading-tight text-[#111111]">
                  {userName || 'Sai'}
                </div>
                <div className="truncate font-inter text-[11px] text-[#7A7A75]">
                  Verified builder
                </div>
              </div>
            </div>
            {onLogout && (
              <button
                type="button"
                onClick={() => {
                  onLogout();
                  onCloseMobile?.();
                }}
                title="Sign Out"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <SignOut size={18} />
              </button>
            )}
          </div>
        </div>
      </aside>
    </div>
  );

  // Desktop Collapsed Sidebar
  if (isCollapsed) {
    return (
      <>
        {mobileDrawer}
        <aside className="hidden md:flex sticky top-0 z-30 h-screen w-[64px] min-w-[64px] flex-col items-center border-r border-[#111111]/[0.08] bg-[#F7F7F4] py-3 select-none text-[#111111]">
          <div className="flex h-[40px] items-center justify-center">
            <Link to="/" className="flex items-center justify-center">
              <img
                src={getAssetUrl('campuscode-logo.png')}
                alt="CampusCode"
                className="h-[18px] w-auto object-contain"
              />
            </Link>
          </div>
          <div className="my-2 h-[1px] w-8 bg-[#111111]/[0.08]" />
          <nav className="flex flex-1 flex-col items-center space-y-2 overflow-y-auto px-1 py-1">
            {PRIMARY_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                activeTab === item.name ||
                (item.name === 'My Events' && activeTab === 'My Activities') ||
                (item.name === 'Digital Card' && activeTab === 'Digital ID');

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => onSelectTab(item.name)}
                  title={item.name}
                  className={`flex h-9 w-9 items-center justify-center rounded-[8px] transition-all ${
                    isActive
                      ? 'bg-[#7665FF] text-white shadow-2xs'
                      : 'text-[#666660] hover:bg-black/[0.04] hover:text-[#111111]'
                  }`}
                >
                  <Icon size={20} className="w-5 h-5" />
                </button>
              );
            })}
          </nav>
          <div className="mt-auto flex flex-col items-center gap-2 border-t border-[#111111]/[0.08] pt-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111111] font-inter text-[12px] font-bold text-white">
              {userName ? userName.charAt(0).toUpperCase() : 'S'}
            </div>
            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                title="Log out"
                className="flex h-7 w-7 items-center justify-center rounded-md text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
              >
                <SignOut size={16} />
              </button>
            )}
            {onToggleCollapse && (
              <button
                type="button"
                onClick={onToggleCollapse}
                aria-label="Expand sidebar"
                className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200/60 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <SidebarSimple size={18} className="w-[18px] h-[18px] rotate-180" />
              </button>
            )}
          </div>
        </aside>
      </>
    );
  }

  // Desktop Expanded Sidebar
  return (
    <>
      {mobileDrawer}
      <aside className="hidden md:flex sticky top-0 z-30 h-screen w-[194px] min-w-[194px] max-w-[194px] flex-col border-r border-[#111111]/[0.08] bg-[#F7F7F4] select-none text-[#111111]">
        {/* Brand Header */}
        <div className="flex h-[52px] items-center justify-between border-b border-[#111111]/[0.08] px-3.5">
          <Link to="/" className="flex items-center">
            <img
              src={getAssetUrl('campuscode-logo.png')}
              alt="CampusCode"
              className="h-[20px] w-auto object-contain object-left"
            />
          </Link>
          {onToggleCollapse && (
            <button
              type="button"
              onClick={onToggleCollapse}
              aria-label="Toggle sidebar"
              className="flex h-6 w-6 items-center justify-center rounded border border-gray-200/60 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <SidebarSimple size={18} className="w-[18px] h-[18px]" />
            </button>
          )}
        </div>

        {/* Workspace Navigation */}
        <div className="px-3.5 pt-3.5 pb-1">
          <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.1em] text-[#7A7A75]">
            WORKSPACE
          </span>
        </div>

        {/* Navigation List */}
        <nav className="flex flex-1 flex-col px-2 py-1.5 space-y-1.5 overflow-y-auto">
          {PRIMARY_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              activeTab === item.name ||
              (item.name === 'My Events' && activeTab === 'My Activities') ||
              (item.name === 'Digital Card' && activeTab === 'Digital ID');

            return (
              <button
                key={item.name}
                type="button"
                onClick={() => onSelectTab(item.name)}
                title={item.name}
                className={`flex w-full min-h-[36px] items-center gap-2.5 rounded-[7px] px-2.5 py-2 text-left transition-all ${
                  isActive
                    ? 'bg-[#7665FF] font-medium text-white shadow-2xs'
                    : 'font-normal text-[#111111] hover:bg-black/[0.04]'
                }`}
              >
                <Icon
                  size={19}
                  className={`w-[19px] h-[19px] shrink-0 ${
                    isActive ? 'text-white' : 'text-[#666660]'
                  }`}
                />
                <span className="truncate text-[13px] tracking-[-0.01em] leading-tight">
                  {item.name}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Account Section at Bottom */}
        <div className="border-t border-[#111111]/[0.08] px-3.5 py-3">
          <div className="mb-2 font-mono text-[9.5px] font-semibold uppercase tracking-[0.1em] text-[#7A7A75]">
            ACCOUNT
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#111111] font-inter text-[12px] font-bold text-white">
                {userName ? userName.charAt(0).toUpperCase() : 'S'}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-inter text-[13px] font-medium leading-tight text-[#111111]">
                  {userName || 'Sai'}
                </div>
                <div className="truncate font-inter text-[11px] text-[#7A7A75]">
                  Verified builder
                </div>
              </div>
            </div>
            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                title="Log out"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
              >
                <SignOut size={16} />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
