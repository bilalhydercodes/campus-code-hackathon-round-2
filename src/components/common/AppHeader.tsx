import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { List } from "phosphor-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export interface NavItem {
  title: string;
  href: string;
}

export interface AppHeaderProps {
  navItems?: NavItem[];
  action?: React.ReactNode;
}

const defaultNav: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "/#how" },
  { title: "How it works", href: "/#how" },
  { title: "Hackathons", href: "/#hackathons" },
  { title: "Community", href: "/student" },
];

/**
 * CampusCode Unified Platform Header
 * - Official brand logo (/campuscode-logo.png) on the left
 * - Symmetrically centered floating navigation pill (absolute left-1/2 -translate-x-1/2)
 * - Mobile slide-out sheet navigation
 * - Preserves light cream backdrop (#FBFBF9/80 with blur)
 */
export function AppHeader({ navItems = defaultNav, action }: AppHeaderProps) {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 py-4 bg-[#FBFBF9]/80 backdrop-blur-md border-b border-[#111111]/[0.04]">
      <div className="relative mx-auto flex max-w-[1320px] items-center justify-between">
        {/* Left: Official Logo */}
        <Link to="/" className="flex items-center z-10 shrink-0">
          <img
            src="/campuscode-logo.png"
            alt="CampusCode"
            className="h-8 w-auto object-contain object-left"
          />
        </Link>

        {/* Center: Mathematically Centered Navigation Pill */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1.5 rounded-full border border-[#E5E5DF] bg-[#F3F3F1]/95 p-1.5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] backdrop-blur-md z-0">
          {navItems.map((item, idx) => {
            const isActive =
              location.pathname === item.href ||
              (item.href.startsWith("/#") && location.pathname === "/");

            return (
              <a
                key={idx}
                href={item.href}
                className={`rounded-full px-5 py-2 font-inter text-[14px] font-medium leading-tight transition-all duration-150 select-none ${
                  isActive
                    ? "bg-white text-[#111111] shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]"
                    : "text-[#555550] hover:text-[#111111]"
                }`}
              >
                {item.title}
              </a>
            );
          })}
        </nav>

        {/* Right: Actions / Mobile Menu Trigger */}
        <div className="flex items-center justify-end gap-3 z-10 shrink-0 min-w-[32px] sm:min-w-[120px]">
          {action && <div className="hidden sm:block">{action}</div>}

          {/* Mobile Sheet Trigger */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <List size={25} className="w-[25px] h-[25px] text-[#111111]" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#FAF9F7] p-6">
                <div className="flex flex-col gap-5 mt-8">
                  {navItems.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="font-inter text-lg font-medium text-[#111111] hover:text-[#7665FF]"
                    >
                      {item.title}
                    </a>
                  ))}
                  {action && <div className="mt-4">{action}</div>}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
