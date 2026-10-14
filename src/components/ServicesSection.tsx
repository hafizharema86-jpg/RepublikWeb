"use client";

import { useState } from "react";

interface SubService {
  id: string;
  title: string;
  description: string;
}

interface ServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  countBadge: string;
  icon: "rocket" | "grid" | "code" | "share";
  items: SubService[];
}

const serviceCategories: ServiceCategory[] = [
  {
    id: "landing-page",
    title: "Landing Page",
    subtitle: "Landing page profesional untuk promosi produk, jasa, campaign, maupun personal brand.",
    countBadge: "4 pilihan",
    icon: "rocket",
    items: [
      {
        id: "lp-1",
        title: "Landing Page Produk",
        description: "Fokus penjualan satu produk dengan alur konversi jelas."
      },
      {
        id: "lp-2",
        title: "Landing Page Jasa",
        description: "Tampilkan layanan, keunggulan, dan form konsultasi."
      },
      {
        id: "lp-3",
        title: "Campaign & Event",
        description: "Halaman promo, diskon, webinar, atau pendaftaran event."
      },
      {
        id: "lp-4",
        title: "Personal Brand",
        description: "Profil profesional untuk coach, konsultan, dan kreator."
      }
    ]
  },
  {
    id: "template-marketplace",
    title: "Template Marketplace",
    subtitle: "Kumpulan template siap pakai yang responsif, modern, dan mudah disesuaikan untuk bisnis Anda.",
    countBadge: "4 pilihan",
    icon: "grid",
    items: [
      {
        id: "tmpl-1",
        title: "Company Profile",
        description: "Desain profesional siap pakai untuk memperkuat kredibilitas bisnis."
      },
      {
        id: "tmpl-2",
        title: "E-Commerce Store",
        description: "Toko online modern lengkap dengan katalog dan alur pemesanan."
      },
      {
        id: "tmpl-3",
        title: "Portal Berita & Blog",
        description: "Layout artikel visual dan SEO-friendly yang cepat & responsif."
      },
      {
        id: "tmpl-4",
        title: "Multi-Purpose SaaS",
        description: "Landing page SaaS modern dengan tabel harga & fitur lengkap."
      }
    ]
  },
  {
    id: "custom-website",
    title: "Custom Website",
    subtitle: "Pengembangan website kustom dari nol sesuai kebutuhan alur bisnis internal dan integrasi sistem.",
    countBadge: "4 pilihan",
    icon: "code",
    items: [
      {
        id: "cust-1",
        title: "Custom Web App",
        description: "Sistem berbasis web kustom sesuai operasional internal perusahaan."
      },
      {
        id: "cust-2",
        title: "Enterprise Portal",
        description: "Integrasi API, payment gateway, backend scalable & keamanan tinggi."
      },
      {
        id: "cust-3",
        title: "Portal Komunitas & CRM",
        description: "Platform interaktif dengan sistem registrasi & dashboard data."
      },
      {
        id: "cust-4",
        title: "Redesign & Performa",
        description: "Pembaruan total tampilan website dengan standar UX modern."
      }
    ]
  },
  {
    id: "social-media",
    title: "Social Media Management",
    subtitle: "Strategi dan pengelolaan media sosial komprehensif untuk meningkatkan brand awareness dan penjualan.",
    countBadge: "4 pilihan",
    icon: "share",
    items: [
      {
        id: "sm-1",
        title: "Konten Feed & Reels",
        description: "Pembuatan aset visual & video pendek yang menarik audiens."
      },
      {
        id: "sm-2",
        title: "Copywriting Plan",
        description: "Kalender konten bulanan lengkap dengan caption persuasif & hashtag."
      },
      {
        id: "sm-3",
        title: "Ads Management",
        description: "Optimasi iklan Meta & TikTok tertarget untuk konversi tinggi."
      },
      {
        id: "sm-4",
        title: "Branding & Audit",
        description: "Evaluasi akun sosial media dan penyusunan visual guideline."
      }
    ]
  }
];

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState<string>("landing-page");

  const currentCategory = serviceCategories.find((cat) => cat.id === activeTab) || serviceCategories[0];

  const renderIcon = (iconType: string, isActive: boolean) => {
    const iconClass = isActive ? "text-white" : "text-[#00a68a]";

    switch (iconType) {
      case "rocket":
        return (
          <svg className={`w-4.5 h-4.5 ${iconClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.24A4.5 4.5 0 005.25 15.75M14.25 9.75A1.5 1.5 0 1112.75 8.25a1.5 1.5 0 011.5 1.5z" />
          </svg>
        );
      case "grid":
        return (
          <svg className={`w-4.5 h-4.5 ${iconClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        );
      case "code":
        return (
          <svg className={`w-4.5 h-4.5 ${iconClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case "share":
        return (
          <svg className={`w-4.5 h-4.5 ${iconClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="layanan" className="w-full bg-[#f8fafc] py-16 md:py-24 border-t border-slate-200/80">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-16 lg:px-20">
      {/* Section Header */}
      <div className="mb-7 md:mb-9">
        <span className="text-[#00a68a] text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase block mb-2.5">
          LAYANAN
        </span>
        <h2 className="text-2xl md:text-3xl lg:text-[36px] font-bold text-[#1a1a1a] tracking-tight leading-[1.2] mb-2.5">
          Semua Kebutuhan Digital, Dalam Satu<br className="hidden sm:inline" /> Platform.
        </h2>
        <p className="text-[#64748b] text-xs md:text-sm font-normal">
          Pilih layanan di bawah ini untuk melihat rincian pilihan yang tersedia.
        </p>
      </div>

      {/* Category Tabs Grid - Always 4 cols on medium+ screens */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-7">
        {serviceCategories.map((cat) => {
          const isActive = cat.id === activeTab;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`w-full text-left rounded-xl p-2.5 md:p-3 flex items-center gap-2.5 md:gap-3 transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-white border-2 border-[#00a68a] shadow-sm shadow-[#00a68a]/10"
                  : "bg-[#f8fafc]/90 border border-gray-200/80 hover:border-gray-300 hover:bg-white"
              }`}
            >
              {/* Icon Container */}
              <div
                className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  isActive ? "bg-[#00a68a]" : "bg-[#eaf7f4]"
                }`}
              >
                {renderIcon(cat.icon, isActive)}
              </div>

              {/* Label & Badge */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-xs md:text-[13px] text-[#1a1a1a] truncate">
                  {cat.title}
                </h3>
                <span className="text-[10.5px] text-[#94a3b8] font-medium block mt-0.5">
                  {cat.countBadge}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Sub-Services Content Container - 2 columns starting at md (768px+) */}
      <div className="bg-white border border-gray-200/80 rounded-[1.5rem] p-6 md:p-8 lg:p-10 shadow-xs transition-all">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Left Column: Title, Description & CTA Button */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col items-start pr-0 md:pr-4">
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#1a1a1a] mb-3 tracking-tight">
              {currentCategory.title}
            </h3>
            <p className="text-[#64748b] text-xs md:text-sm leading-relaxed mb-6 font-normal">
              {currentCategory.subtitle}
            </p>
            <button className="bg-[#00a68a] hover:bg-[#008f76] active:scale-95 text-white px-4 py-2 rounded-full text-xs md:text-[13px] font-semibold flex items-center gap-1.5 transition-all shadow-xs">
              <span>Pelajari Selengkapnya</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* Right Column: 2x2 Grid of 4 Cards */}
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:gap-4">
            {currentCategory.items.map((item) => (
              <div
                key={item.id}
                className="bg-[#f8fafc]/90 hover:bg-white border border-gray-200/70 hover:border-[#00a68a]/40 rounded-xl p-4 md:p-4.5 transition-all duration-200 hover:shadow-xs hover:shadow-[#00a68a]/5 group flex flex-col justify-between"
              >
                <div>
                  {/* Title with Checkmark Icon */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-4 h-4 rounded-full bg-[#eaf7f4] text-[#00a68a] flex items-center justify-center shrink-0 group-hover:bg-[#00a68a] group-hover:text-white transition-colors">
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-xs md:text-sm text-[#1a1a1a] group-hover:text-[#00a68a] transition-colors">
                      {item.title}
                    </h4>
                  </div>

                  {/* Description */}
                  <p className="text-[#64748b] text-[11px] md:text-xs leading-relaxed pl-7">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
}
