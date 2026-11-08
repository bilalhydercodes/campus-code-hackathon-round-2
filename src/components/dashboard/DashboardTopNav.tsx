import React from 'react';
import { List, SignOut } from 'phosphor-react';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '@/lib/utils';

export interface DashboardTopNavProps {
  activeTab: string;
  userName?: string;
  onRefresh?: () => void;
  isSidebarCollapsed?: boolean;
  onToggleCollapse?: () => void;
  onOpenMobileDrawer?: () => void;
  onLogout?: () => void;
}

export default function DashboardTopNav({
  activeTab = 'Events',
  userName = 'Sai',
  onOpenMobileDrawer,
  onLogout,
}: DashboardTopNavProps) {
  return (
    <header className="sticky top-0 z-20 flex h-[52px] w-full items-center justify-between border-b border-[#111111]/[0.08] bg-[#F7F7F4]/90 backdrop-blur-sm px-3 xs:px-4 sm:px-6 md:px-8 select-none">
      {/* Left side: Mobile Hamburger Button & Breadcrumb */}
      <div className="flex items-center gap-2 xs:gap-2.5">
        {onOpenMobileDrawer && (
          <button
            type="button"
            onClick={onOpenMobileDrawer}
            aria-label="Open navigation drawer"
            className="md:hidden flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200/90 bg-white text-[#111111] hover:bg-gray-100 transition-colors shadow-2xs"
          >
            <List size={18} className="w-[18px] h-[18px]" />
          </button>
        )}

        {/* Mobile Logo on ultra small viewports */}
        <Link to="/" className="md:hidden flex items-center pr-1">
          <img
            src={getAssetUrl('campuscode-logo.png')}
            alt="CampusCode"
            className="h-[18px] w-auto object-contain"
          />
        </Link>

        {/* Breadcrumb */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-[#858580]">
            WORKSPACE
          </span>
          <span className="text-[#858580]/50 font-mono text-[11px]">/</span>
          <span className="font-inter text-[12px] font-semibold text-[#111111]">
            {activeTab}
          </span>
        </div>
      </div>

      {/* Right side: Builder Badge & Logout */}
      <div className="flex items-center gap-2">
        <div className="flex items-center rounded-full border border-gray-200/90 bg-white px-2.5 sm:px-3 py-1 shadow-2xs">
          <span className="font-mono text-[9px] sm:text-[9.5px] uppercase tracking-[0.08em] text-[#858580] mr-1 sm:mr-1.5">
            BUILDER :
          </span>
          <span className="font-inter text-[11px] font-semibold text-[#111111] truncate max-w-[90px] sm:max-w-[120px]">
            {userName || 'Sai'}
          </span>
        </div>

        {onLogout && (
          <button
            type="button"
            onClick={onLogout}
            title="Log out of account"
            className="flex items-center gap-1.5 rounded-full border border-gray-200/90 bg-white hover:bg-red-50 hover:border-red-200 hover:text-red-600 px-2.5 sm:px-3 py-1 text-gray-600 transition-all text-[11px] font-medium shadow-2xs cursor-pointer active:scale-95"
          >
            <SignOut size={14} className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Log out</span>
          </button>
        )}
      </div>
    </header>
  );
}
