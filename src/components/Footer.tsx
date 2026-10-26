"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useData } from "@/context/DataContext";

export default function Footer() {
  const { siteContent, siteLogo } = useData();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  let rawWa = (siteContent?.contactWhatsapp || "085749518867").replace(/[^0-9]/g, "");
  if (rawWa.startsWith("0")) {
    rawWa = "62" + rawWa.slice(1);
  }
  const waNumber = rawWa || "6285749518867";
  const consultMsg = siteContent?.waTemplateConsultation || "Halo RepublikWeb, saya tertarik untuk memulai project website. Boleh konsultasi terlebih dahulu?";
  const waConsultationLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(consultMsg)}`;
  const waDirectLink = `https://wa.me/${waNumber}`;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer id="kontak" className="relative bg-[#0c1412] text-[#94a3b8] overflow-hidden">
      {/* Decorative Mint / Teal Glow Gradients */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[350px] bg-gradient-to-br from-[#00a68a]/15 via-[#00a68a]/5 to-transparent blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[300px] bg-gradient-to-tl from-[#00a68a]/10 via-transparent to-transparent blur-3xl pointer-events-none -z-0" />

      {/* Pre-Footer CTA Banner Card */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-16 lg:px-20 pt-16 md:pt-20">
        <div className="relative rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-r from-[#112421] via-[#0e211e] to-[#0d1d1a] border border-[#00a68a]/30 p-8 md:p-12 lg:p-14 overflow-hidden shadow-2xl shadow-[#00a68a]/5">
          {/* Subtle background glow circle */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00a68a]/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            {/* Left CTA text */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00a68a]/15 text-[#2dd4bf] text-xs font-semibold tracking-wide mb-4 border border-[#00a68a]/20">
                <span className="w-2 h-2 rounded-full bg-[#00e5bf] animate-pulse" />
                KONSULTASI GRATIS
              </div>
              <h2 className="text-2xl md:text-4xl lg:text-[40px] font-bold text-white tracking-tight leading-[1.2] mb-4">
                Siap Mewujudkan Website &amp; Akselerasi Bisnis Anda?
              </h2>
              <p className="text-[#a1b5b0] text-sm md:text-base leading-relaxed max-w-2xl font-normal">
                Diskusikan kebutuhan landing page, website custom, maupun social media brand Anda bersama tim spesialis kami. Mulai langkah digital Anda hari ini tanpa ribet.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-6 mt-6 text-xs md:text-sm text-[#cbd5e1]">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#00e5bf]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Tanpa Biaya Konsultasi</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#00e5bf]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Pengerjaan Tepat Waktu</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#00e5bf]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Garansi &amp; Full Support</span>
                </div>
              </div>
            </div>

            {/* Right CTA buttons */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5">
              <a
                href={waConsultationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#00a68a] hover:bg-[#00bf9f] text-white font-semibold text-sm transition-all duration-200 active:scale-95 shadow-lg shadow-[#00a68a]/30 group"
              >
                {/* WhatsApp Icon */}
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>Mulai Konsultasi WhatsApp</span>
              </a>

              <Link
                href="#template"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/10 transition-all duration-200 active:scale-95 text-center"
              >
                <span>Jelajahi Template Siap Pakai</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Information Grid */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-16 lg:px-20 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          
          {/* Col 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              {/* Brand Logo */}
              <Link href="#" className="inline-flex items-center gap-2.5 mb-5 group">
                {siteLogo ? (
                  <div className="w-9 h-9 rounded-full overflow-hidden relative border border-white/20 shrink-0 shadow-md shadow-[#00a68a]/30 group-hover:scale-105 transition-transform bg-white/5">
                    <Image src={siteLogo} alt="Logo" fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-full bg-[#00a68a] text-white flex items-center justify-center font-bold text-base shadow-md shadow-[#00a68a]/30 group-hover:scale-105 transition-transform">
                    R
                  </div>
                )}
                <span className="font-bold text-2xl tracking-tight text-white">
                  RepublikWeb<span className="text-[#00e5bf]">.net</span>
                </span>
              </Link>

              <p className="text-[#94a3b8] text-sm leading-relaxed mb-6 pr-4">
                Partner teknologi terpercaya untuk pembuatan website modern, landing page performa tinggi, dan strategi social media terpadu. Membantu bisnis berkembang di era digital dengan solusi terintegrasi.
              </p>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#112421] border border-[#00a68a]/30 text-xs text-[#2dd4bf] font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-[#00e5bf] animate-ping" />
                <span>Terbuka untuk Project Baru</span>
              </div>
            </div>

            {/* Social Icons (Wa, Ig, Fb, Email, TikTok, LinkedIn) with visibility switch */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {/* WhatsApp */}
              {siteContent.showSocialWhatsapp !== false && (
                <a
                  href={waDirectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#00a68a] hover:text-white text-[#94a3b8] flex items-center justify-center transition-all duration-200 border border-white/10 hover:scale-105"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </a>
              )}

              {/* Instagram */}
              {siteContent.showSocialInstagram !== false && (
                <a
                  href={siteContent.socialInstagram || "https://instagram.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  title="Instagram"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#00a68a] hover:text-white text-[#94a3b8] flex items-center justify-center transition-all duration-200 border border-white/10 hover:scale-105"
                >
                  <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              )}

              {/* Facebook */}
              {siteContent.showSocialFacebook !== false && (
                <a
                  href={siteContent.socialFacebook || "https://facebook.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  title="Facebook"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#00a68a] hover:text-white text-[#94a3b8] flex items-center justify-center transition-all duration-200 border border-white/10 hover:scale-105"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}

              {/* Email */}
              {siteContent.showSocialEmail !== false && (
                <a
                  href={`mailto:${siteContent.socialEmail || siteContent.contactEmail || "halo@republikweb.net"}`}
                  aria-label="Email"
                  title="Email"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#00a68a] hover:text-white text-[#94a3b8] flex items-center justify-center transition-all duration-200 border border-white/10 hover:scale-105"
                >
                  <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </a>
              )}

              {/* TikTok */}
              {siteContent.showSocialTiktok !== false && (
                <a
                  href={siteContent.socialTiktok || "https://tiktok.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  title="TikTok"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#00a68a] hover:text-white text-[#94a3b8] flex items-center justify-center transition-all duration-200 border border-white/10 hover:scale-105"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.98v7.45c-.01 2.92-1.35 5.76-3.69 7.42-2.3 1.63-5.38 2.06-8.08 1.15-2.73-.91-4.9-3.13-5.66-5.91-.77-2.79-.19-5.87 1.55-8.15 1.76-2.3 4.6-3.64 7.49-3.48v4.16c-1.45-.17-2.97.28-4.04 1.3-1.09 1.04-1.55 2.63-1.21 4.1.33 1.48 1.58 2.64 3.08 2.87 1.5.24 3.08-.41 3.88-1.7.35-.55.53-1.2.53-1.87V.02z" />
                  </svg>
                </a>
              )}

              {/* LinkedIn */}
              {siteContent.showSocialLinkedin !== false && (
                <a
                  href={siteContent.socialLinkedin || "https://linkedin.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#00a68a] hover:text-white text-[#94a3b8] flex items-center justify-center transition-all duration-200 border border-white/10 hover:scale-105"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Layanan Kami (2.5 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">
              Layanan Kami
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#layanan" className="hover:text-[#00e5bf] transition-colors flex items-center gap-1.5">
                  <span className="text-xs text-[#00a68a]">▸</span> Landing Page Bisnis
                </Link>
              </li>
              <li>
                <Link href="#custom-website" className="hover:text-[#00e5bf] transition-colors flex items-center gap-1.5">
                  <span className="text-xs text-[#00a68a]">▸</span> Website Custom &amp; Sistem
                </Link>
              </li>
              <li>
                <Link href="#template" className="hover:text-[#00e5bf] transition-colors flex items-center gap-1.5">
                  <span className="text-xs text-[#00a68a]">▸</span> Template Web Siap Pakai
                </Link>
              </li>
              <li>
                <Link href="#layanan" className="hover:text-[#00e5bf] transition-colors flex items-center gap-1.5">
                  <span className="text-xs text-[#00a68a]">▸</span> Company Profile Perusahaan
                </Link>
              </li>
              <li>
                <Link href="#social-media" className="hover:text-[#00e5bf] transition-colors flex items-center gap-1.5">
                  <span className="text-xs text-[#00a68a]">▸</span> Social Media Management
                </Link>
              </li>
              <li>
                <Link href="#layanan" className="hover:text-[#00e5bf] transition-colors flex items-center gap-1.5">
                  <span className="text-xs text-[#00a68a]">▸</span> Optimasi SEO &amp; Performa
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigasi Cepat (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">
              Navigasi
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="hover:text-[#00e5bf] transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="#tentang-kami" className="hover:text-[#00e5bf] transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="#cara-kerja" className="hover:text-[#00e5bf] transition-colors">
                  Cara Kerja
                </Link>
              </li>
              <li>
                <Link href="#portofolio" className="hover:text-[#00e5bf] transition-colors">
                  Portofolio
                </Link>
              </li>
              <li>
                <Link href="#testimonial" className="hover:text-[#00e5bf] transition-colors">
                  Testimonial
                </Link>
              </li>
              <li>
                <Link href="#pilih-solusi" className="hover:text-[#00e5bf] transition-colors">
                  Pilih Solusi
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Kontak & Info Operasional (3.5 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">
              Hubungi Kami
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#00a68a] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <span className="block text-xs text-[#64748b]">Email Resmi</span>
                  <a href={`mailto:${siteContent.contactEmail || "halo@republikweb.net"}`} className="text-white hover:text-[#00e5bf] transition-colors font-medium">
                    {siteContent.contactEmail || "halo@republikweb.net"}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#00a68a] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <span className="block text-xs text-[#64748b]">WhatsApp / Telp</span>
                  <a
                    href={waDirectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#00e5bf] transition-colors font-medium"
                  >
                    {siteContent.contactWhatsapp || "+62 812-3456-7890"}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#00a68a] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <span className="block text-xs text-[#64748b]">Jam Layanan</span>
                  <span className="text-white font-medium">
                    {siteContent.contactHours || "Senin – Sabtu, 09.00 – 18.00 WIB"}
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#00a68a] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <span className="block text-xs text-[#64748b]">Lokasi Kantor</span>
                  <span className="text-white font-medium">
                    {siteContent.contactLocation || "Jakarta & Yogyakarta, Indonesia"}
                  </span>
                </div>
              </li>
            </ul>

            {/* Newsletter Subscription Box */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <span className="text-xs font-semibold text-white block mb-2">
                Dapatkan Info &amp; Promo Terbaru
              </span>
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email Anda"
                  required
                  className="bg-white/5 border border-white/10 rounded-full px-3.5 py-2 text-xs text-white placeholder-[#64748b] focus:outline-none focus:border-[#00a68a] w-full transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[#00a68a] hover:bg-[#00bf9f] text-white p-2 rounded-full transition-all shrink-0 active:scale-95"
                  aria-label="Kirim Email"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
              {subscribed && (
                <p className="text-[#00e5bf] text-[11px] mt-2 animate-fade-in flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-[#00e5bf] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Terima kasih! Anda telah terdaftar.
                </p>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748b]">
          <p>© {new Date().getFullYear()} RepublikWeb.net. Seluruh Hak Cipta Dilindungi.</p>
          
          <div className="flex flex-wrap items-center gap-5">
            <Link href="#" className="hover:text-white transition-colors">
              Kebijakan Privasi
            </Link>
            <span className="text-white/20">•</span>
            <Link href="#" className="hover:text-white transition-colors">
              Syarat &amp; Ketentuan
            </Link>
            <span className="text-white/20">•</span>
            <Link href="#" className="hover:text-white transition-colors">
              Sitemap
            </Link>
            <span className="text-white/20">•</span>
            <span className="text-[#94a3b8]">
              Made in Indonesia
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
