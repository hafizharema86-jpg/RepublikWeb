"use client";

import { useState } from "react";
import Image from "next/image";
import { useData, PortfolioItem } from "@/context/DataContext";

type PortfolioCategory = "Semua" | "Landing Page" | "Website" | "E-Commerce" | "Social Media";

const categories: PortfolioCategory[] = [
  "Semua",
  "Landing Page",
  "Website",
  "E-Commerce",
  "Social Media",
];

export default function PortfolioSection() {
  const { portfolios } = useData();
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>("Semua");
  const [previewPortfolio, setPreviewPortfolio] = useState<PortfolioItem | null>(null);

  const filteredItems = activeCategory === "Semua"
    ? portfolios
    : portfolios.filter((item) => item.category === activeCategory);

  const handleInquiry = (item: PortfolioItem) => {
    const msg = `Halo RepublikWeb, saya melihat portofolio *${item.title}* (${item.category}) di website RepublikWeb dan tertarik membuat project serupa. Boleh info estimasi dan alur kerjanya?`;
    window.open(`https://wa.me/6285749518867?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section id="portofolio" className="w-full bg-gradient-to-b from-[#090e1a] via-[#0f172a] to-[#080d18] text-white py-20 md:py-28 border-t border-slate-800/80 relative overflow-hidden">
      {/* Ambient Radial Lights */}
      <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-[#00a68a]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-16 lg:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="mb-10">
          <span className="text-[#2dd4bf] text-xs md:text-sm font-bold tracking-[0.2em] uppercase block mb-3">
            PORTOFOLIO KARYA
          </span>
          <h2 className="text-3xl md:text-[36px] lg:text-[40px] font-bold text-white leading-[1.2] tracking-tight">
            Project Unggulan yang Telah Kami Kerjakan.
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-2 max-w-xl">
            Hasil karya nyata pembuatan website, landing page, dan digital branding dengan performa dan konversi maksimal.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5 md:gap-3 mb-12">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#00a68a] text-white shadow-lg shadow-[#00a68a]/30 font-bold scale-102"
                    : "bg-slate-800/80 text-slate-300 border border-slate-700/80 hover:border-slate-500 hover:text-white hover:bg-slate-800"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setPreviewPortfolio(item)}
              className="group bg-slate-900/90 rounded-[2rem] border border-slate-800/90 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#00a68a]/10 hover:border-[#00a68a]/60 hover:-translate-y-1.5 flex flex-col cursor-pointer"
            >
              {/* Mockup Image Container */}
              <div className="relative w-full aspect-[4/3] bg-slate-950 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                
                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Floating Category Badge appearing on the bottom of the image on hover */}
                <div className="absolute bottom-3.5 left-6 md:left-7 z-10 opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                  <span className="text-xs font-bold tracking-[0.16em] uppercase text-[#2dd4bf] drop-shadow-xs">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Bottom Card Area */}
              <div className="relative px-6 py-5 md:px-7 md:py-6 transition-colors duration-300 bg-slate-900 group-hover:bg-slate-850">
                {/* Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-[#2dd4bf] transition-colors duration-300 tracking-tight">
                  {item.title}
                </h3>

                {/* Subtitle / CTA Swap on Hover */}
                <div className="relative mt-1.5 h-6">
                  {/* Default Category Text (visible when unhovered) */}
                  <p className="text-slate-400 text-sm font-normal transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-1 pointer-events-none">
                    {item.category}
                  </p>

                  {/* Hover 'Lihat Preview Project ->' (slides up into view when hovered) */}
                  <div className="absolute inset-0 flex items-center gap-1.5 text-sm font-bold text-[#2dd4bf] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span>Lihat Preview Project</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="15" 
                      height="15" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="group-hover:translate-x-1 transition-transform duration-200"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ===================== MODAL PREVIEW PORTFOLIO ===================== */}
      {previewPortfolio && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 animate-scaleUp">
            {/* Header Toolbar */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-bold bg-[#00a68a] text-white px-2.5 py-0.5 rounded-full">
                  {previewPortfolio.category}
                </span>
                <span className="font-bold text-sm truncate">{previewPortfolio.title}</span>
              </div>
              <button
                onClick={() => setPreviewPortfolio(null)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Main Preview Image */}
            <div className="relative aspect-[16/10] w-full bg-slate-100">
              <Image
                src={previewPortfolio.image}
                alt={previewPortfolio.title}
                fill
                className="object-cover object-top"
              />
            </div>

            {/* Information & Action Footer */}
            <div className="p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border-t border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{previewPortfolio.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Kategori: <strong>{previewPortfolio.category}</strong> • Dikerjakan oleh tim RepublikWeb
                </p>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setPreviewPortfolio(null)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all cursor-pointer"
                >
                  Tutup
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleInquiry(previewPortfolio);
                    setPreviewPortfolio(null);
                  }}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#00a68a] hover:bg-[#008f76] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  Buat Website Serupa →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

