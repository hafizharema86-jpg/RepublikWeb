"use client";

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
import LoginModal from "@/components/LoginModal";
import MemberDashboardModal from "@/components/MemberDashboardModal";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";

export default function Home() {
  const { user, isLoggedIn, isLoginModalOpen, openLoginModal, closeLoginModal, openDashboard, logout } = useAuth();
  const { heroImage, siteContent, siteLogo } = useData();

  let rawWa = (siteContent?.contactWhatsapp || "085749518867").replace(/[^0-9]/g, "");
  if (rawWa.startsWith("0")) {
    rawWa = "62" + rawWa.slice(1);
  }
  const waNumber = rawWa || "6285749518867";
  const consultMsg = siteContent?.waTemplateConsultation || "Halo RepublikWeb, saya tertarik untuk memulai project website. Boleh konsultasi terlebih dahulu?";
  const waConsultationLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(consultMsg)}`;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#eef2f6] via-[#e2e8f0] to-[#d1d9e6] font-sans text-[#1a1a1a] relative">
      {/* Sticky Navbar Header (Always sticks to top on scroll) */}
      <header className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-md border-b border-gray-200/60 transition-all shadow-xs">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-16 lg:px-20 py-3.5 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer">
            {siteLogo ? (
              <div className="w-8 h-8 rounded-full overflow-hidden relative border border-gray-200/70 shrink-0 shadow-xs">
                <Image src={siteLogo} alt="Logo" fill className="object-cover" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#00a68a] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                R
              </div>
            )}
            <span className="font-bold text-xl tracking-tight text-[#1a1a1a]">
              RepublikWeb<span className="text-[#00a68a]">.net</span>
            </span>
          </div>

          {/* Nav Links & CTA Button Grouped & Compacted to the Right */}
          <div className="flex items-center gap-5 lg:gap-6">
            <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium">
              <Link href="#" className="group relative text-[#00a68a] font-semibold transition-colors">
                <span>Beranda</span>
                <span className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-[#00a68a] rounded-full"></span>
              </Link>
              <Link href="#layanan" className="group relative text-[#52525b] hover:text-indigo-600 transition-colors">
                <span>Layanan</span>
                <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-indigo-600 rounded-full transition-all group-hover:w-full"></span>
              </Link>
              <Link href="#template" className="group relative text-[#52525b] hover:text-emerald-600 transition-colors">
                <span>Template</span>
                <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-emerald-600 rounded-full transition-all group-hover:w-full"></span>
              </Link>
              <Link href="#portofolio" className="group relative text-[#52525b] hover:text-cyan-600 transition-colors">
                <span>Portofolio</span>
                <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-cyan-600 rounded-full transition-all group-hover:w-full"></span>
              </Link>
              <Link href="#tentang-kami" className="group relative text-[#52525b] hover:text-amber-600 transition-colors">
                <span>Tentang Kami</span>
                <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-amber-600 rounded-full transition-all group-hover:w-full"></span>
              </Link>
              <Link href="#kontak" className="group relative text-[#52525b] hover:text-rose-600 transition-colors">
                <span>Kontak</span>
                <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-rose-600 rounded-full transition-all group-hover:w-full"></span>
              </Link>
            </nav>
            
            <div className="flex items-center gap-2 md:gap-3">
              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  {user?.role === "admin" && (
                    <Link
                      href="/admin/dashboard"
                      className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-black text-[#2dd4bf] text-xs font-bold border border-slate-700 shadow-xs transition-all"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf] animate-pulse" />
                      <span>Panel Admin</span>
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={openDashboard}
                    className="bg-emerald-50 hover:bg-emerald-100/90 border border-emerald-200 text-[#00a68a] text-xs md:text-sm font-bold px-3 py-1.5 md:px-3.5 md:py-1.5 rounded-full transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                    title="Buka Menu Akun"
                  >
                    {user?.role === "admin" && siteLogo ? (
                      <span className="w-5 h-5 rounded-full overflow-hidden relative border border-emerald-300 shrink-0">
                        <Image src={siteLogo} alt={user.name} fill className="object-cover" />
                      </span>
                    ) : (
                      <span className="w-5 h-5 rounded-full bg-[#00a68a] text-white flex items-center justify-center text-[11px] font-black">
                        {user?.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                    <span>{user?.name.split(" ")[0]}</span>
                    {user && user.savedTemplates.length > 0 && (
                      <span className="text-[10px] bg-[#00a68a] text-white px-1.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                        <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        {user.savedTemplates.length}
                      </span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={logout}
                    className="px-2.5 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 hover:text-rose-700 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                    title="Logout"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="hidden sm:inline">Keluar</span>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => openLoginModal()}
                  className="border border-gray-200 hover:border-[#00a68a] hover:bg-[#00a68a]/5 text-gray-700 hover:text-[#00a68a] text-sm font-semibold px-4 py-2 rounded-full transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Login
                </button>
              )}
              <a
                href={waConsultationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#00a68a] hover:bg-[#008f76] active:scale-95 text-white px-5 py-2 rounded-full text-[13.5px] font-semibold transition-all shadow-sm cursor-pointer inline-flex items-center justify-center"
              >
                Mulai Project
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Beranda Hero Section with Distinct Fresh Mint Gradient Background */}
      <div className="w-full bg-gradient-to-b from-[#ccebe0] via-[#e2f3ec] to-[#eef2f6] border-b border-[#00a68a]/20 relative overflow-hidden">
        {/* Soft Ambient Radial Lights */}
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#00a68a]/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-10 left-[-50px] w-[450px] h-[450px] bg-[#0ea5e9]/15 rounded-full blur-[90px] pointer-events-none" />

        {/* Hero Section */}
        <main className="w-full max-w-[1400px] mx-auto px-6 md:px-16 lg:px-20 pt-10 pb-20 grid lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Content (6 Columns) */}
          <div className="lg:col-span-6 max-w-xl">
            <h1 className="text-4xl lg:text-[52px] font-extrabold leading-[1.12] mb-6 text-[#0f172a] tracking-tight drop-shadow-sm whitespace-pre-line">
              {siteContent.heroTitle}
            </h1>

            <p className="text-[#334155] text-lg mb-10 leading-relaxed font-medium whitespace-pre-line">
              {siteContent.heroSubtitle}
            </p>
            
            <div className="flex flex-wrap items-center gap-3.5 mb-14">
              <a
                href={waConsultationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#00a68a] hover:bg-[#008f76] active:scale-95 text-white px-6 py-2.5 md:px-7 md:py-3 rounded-full font-bold text-sm flex items-center gap-2 transition-all shadow-[0_8px_20px_rgba(0,166,138,0.3)] hover:shadow-[0_10px_25px_rgba(0,166,138,0.4)]"
              >
                Mulai Project
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
              <Link href="#template" className="bg-white border-2 border-gray-200 hover:border-[#00a68a]/50 hover:bg-gray-50/80 active:scale-95 text-[#1e293b] px-6 py-2.5 md:px-7 md:py-3 rounded-full font-bold text-sm transition-all shadow-sm inline-block">
                Jelajahi Template
              </Link>
            </div>
            
            {/* Category Footer Bar */}
            <div className="flex items-center gap-2.5 text-[11px] font-black text-[#475569] tracking-[0.15em] uppercase">
              <span>WEBSITE</span>
              <span className="text-[#94a3b8]">•</span>
              <span>LANDING PAGE</span>
              <span className="text-[#94a3b8]">•</span>
              <span>SOCIAL MEDIA</span>
              <span className="text-[#94a3b8]">•</span>
              <span>DIGITAL SOLUTION</span>
            </div>
          </div>

          {/* Right Content / Mockup Container (6 Columns) */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,166,138,0.15),0_10px_20px_rgba(0,0,0,0.1)] border-[3px] border-white/80 bg-white/80">
              <Image 
                src={heroImage || "/hero-mockup.jpg"} 
                alt="RepublikWeb Dashboard Mockup" 
                fill 
                className="object-cover"
                priority
              />
            </div>
          </div>
        </main>
      </div>

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

      {/* Login Popup Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />

      {/* Member Dashboard Modal (Manfaat Akun Terdaftar) */}
      <MemberDashboardModal />
    </div>
  );
}



