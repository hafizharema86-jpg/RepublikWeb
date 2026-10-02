import Image from "next/image";
import Link from "next/link";
import ServicesSection from "@/components/ServicesSection";
import TemplateSection from "@/components/TemplateSection";
import CustomWebsiteSection from "@/components/CustomWebsiteSection";
import SocialMediaSection from "@/components/SocialMediaSection";
import AboutSection from "@/components/AboutSection";
import ProcessSection from "@/components/ProcessSection";
import PortfolioSection from "@/components/PortfolioSection";
import TestimonialSection from "@/components/TestimonialSection";
import SolutionChooserSection from "@/components/SolutionChooserSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#1a1a1a] relative">
      {/* Mint Gradient Glow on the Right Side (Matching Screenshot) */}
      <div className="absolute top-0 right-0 w-[55%] h-[700px] bg-gradient-to-l from-[#d5f0e8]/80 via-[#eaf7f3]/50 to-transparent pointer-events-none -z-10" />

      {/* Sticky Navbar Header */}
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100/80 transition-all shadow-xs">
        <div className="w-full max-w-[1400px] mx-auto px-10 md:px-16 lg:px-20 py-3.5 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-[#00a68a] text-white flex items-center justify-center font-bold text-sm shadow-xs">
              R
            </div>
            <span className="font-bold text-xl tracking-tight text-[#1a1a1a]">
              RepublikWeb<span className="text-[#00a68a]">.net</span>
            </span>
          </div>

          {/* Nav Links & CTA Button Grouped & Compacted to the Right */}
          <div className="flex items-center gap-5 lg:gap-6">
            <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-[#71717a] text-sm font-medium">
              <Link href="#" className="hover:text-[#00a68a] transition-colors">Beranda</Link>
              <Link href="#layanan" className="hover:text-[#00a68a] transition-colors">Layanan</Link>
              <Link href="#template" className="hover:text-[#00a68a] transition-colors">Template</Link>
              <Link href="#portofolio" className="hover:text-[#00a68a] transition-colors">Portofolio</Link>
              <Link href="#tentang-kami" className="hover:text-[#00a68a] transition-colors">Tentang Kami</Link>
              <Link href="#kontak" className="hover:text-[#00a68a] transition-colors">Kontak</Link>
            </nav>
            
            <button className="bg-[#00a68a] hover:bg-[#008f76] active:scale-95 text-white px-5 py-2 rounded-full text-[13.5px] font-semibold transition-all shadow-sm">
              Mulai Project
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="w-full max-w-[1400px] mx-auto px-10 md:px-16 lg:px-20 pt-10 pb-16 grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Content (6 Columns) */}
        <div className="lg:col-span-6 max-w-xl">
          <h1 className="text-4xl lg:text-[52px] font-bold leading-[1.12] mb-6 text-[#1a1a1a] tracking-tight">
            Bangun Kehadiran<br />
            Digital yang Siap<br />
            Berkembang.
          </h1>

          <p className="text-[#64748b] text-lg mb-10 leading-relaxed font-normal">
            Dari landing page, website custom, hingga pengelolaan social media — <span className="text-[#334155]">RepublikWeb.net</span> membantu Anda membangun dan mengembangkan bisnis secara digital dalam satu platform.
          </p>
          
          <div className="flex flex-wrap items-center gap-3.5 mb-14">
            <button className="bg-[#00a68a] hover:bg-[#008f76] active:scale-95 text-white px-6 py-2.5 md:px-7 md:py-3 rounded-full font-semibold text-sm flex items-center gap-2 transition-all shadow-md shadow-[#00a68a]/20">
              Mulai Project
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
            <Link href="#template" className="bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50/80 active:scale-95 text-[#334155] px-6 py-2.5 md:px-7 md:py-3 rounded-full font-semibold text-sm transition-all shadow-xs inline-block">
              Jelajahi Template
            </Link>
          </div>
          
          {/* Category Footer Bar */}
          <div className="flex items-center gap-2.5 text-[11px] font-bold text-[#94a3b8] tracking-[0.15em] uppercase">
            <span>WEBSITE</span>
            <span className="text-[#cbd5e1]">•</span>
            <span>LANDING PAGE</span>
            <span className="text-[#cbd5e1]">•</span>
            <span>SOCIAL MEDIA</span>
            <span className="text-[#cbd5e1]">•</span>
            <span>DIGITAL SOLUTION</span>
          </div>
        </div>

        {/* Right Content / Mockup Container (6 Columns) */}
        <div className="lg:col-span-6 relative">
          <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 bg-[#eaf7f4]">
            <Image 
              src="/hero-mockup.jpg" 
              alt="RepublikWeb Dashboard Mockup" 
              fill 
              className="object-cover"
              priority
            />
          </div>
        </div>
      </main>

      {/* Services Section (Layanan) */}
      <ServicesSection />

      {/* Template Marketplace Section */}
      <TemplateSection />

      {/* Custom Website Section */}
      <CustomWebsiteSection />

      {/* Social Media Section */}
      <SocialMediaSection />

      {/* About Section (Tentang Kami) */}
      <AboutSection />

      {/* Cara Kerja (How It Works) Section */}
      <ProcessSection />

      {/* Portofolio Section */}
      <PortfolioSection />

      {/* Testimonial Section */}
      <TestimonialSection />

      {/* Pilih Solusi Section */}
      <SolutionChooserSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}



