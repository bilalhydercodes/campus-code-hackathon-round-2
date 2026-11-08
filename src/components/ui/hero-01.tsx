import HeroSection from "@/components/ui/hero-01-utils/hero";
import type { NavigationSection } from "@/components/ui/hero-01-utils/header";
import Header from "@/components/ui/hero-01-utils/header";
import BrandSlider, {
  BrandList,
} from "@/components/ui/hero-01-utils/brand-slider";
import { getAssetUrl } from "@/lib/utils";

export default function AgencyHeroSection() {
  const navigationData: NavigationSection[] = [
    {
      title: "Home",
      href: "/",
      isActive: true,
    },
    {
      title: "About",
      href: "#how",
    },
    {
      title: "How it works",
      href: "#how",
    },
    {
      title: "Hackathons",
      href: "#hackathons",
    },
    {
      title: "Community",
      href: "#community",
    },
  ];

  const brandList: BrandList[] = [
    {
      image: getAssetUrl("logos/google.svg"),
      name: "Google",
    },
    {
      image: getAssetUrl("logos/microsoft.svg"),
      name: "Microsoft",
    },
    {
      image: getAssetUrl("logos/github.svg"),
      name: "GitHub",
    },
    {
      image: getAssetUrl("logos/stripe.svg"),
      name: "Stripe",
    },
    {
      image: getAssetUrl("logos/vercel.svg"),
      name: "Vercel",
    },
    {
      image: getAssetUrl("logos/linear.svg"),
      name: "Linear",
    },
    {
      image: getAssetUrl("logos/figma.svg"),
      name: "Figma",
    },
    {
      image: getAssetUrl("logos/supabase.svg"),
      name: "Supabase",
    },
  ];

  return (
    <div className="relative w-full bg-[#F7F7F4] overflow-x-hidden">
      <Header
        navigationData={navigationData}
      />
      <main className="overflow-x-hidden">
        <HeroSection
          titleLine1="Building bold products"
          titleLine2Prefix="with "
          titleLine2Italic="student innovation"
          description="CampusCode is the digital hackathon arena for students who don't just have ideas. Turn concepts into production software, compete in timed arenas, and ship to the world."
          primaryCtaText="Explore Hackathons"
          primaryCtaHref="/login"
        />
        <BrandSlider brandList={brandList} speed="30s" />
      </main>
    </div>
  );
}

export { AgencyHeroSection as HeroOne };
