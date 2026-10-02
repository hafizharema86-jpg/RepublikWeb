"use client";

import { useState } from "react";
import Image from "next/image";

type PortfolioCategory = "Semua" | "Landing Page" | "Website" | "E-Commerce" | "Social Media";

interface PortfolioItem {
  id: string;
  title: string;
  category: "Landing Page" | "Website" | "E-Commerce" | "Social Media";
  image: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: "evergreen",
    title: "Evergreen App",
    category: "Landing Page",
    image: "/portfolio-evergreen.jpg",
  },
  {
    id: "nexora",
    title: "Nexora Agency",
    category: "Website",
    image: "/portfolio-nexora.jpg",
  },
  {
    id: "stylenest",
    title: "StyleNest",
    category: "E-Commerce",
    image: "/portfolio-stylenest.jpg",
  },
  {
    id: "hollow-bean",
    title: "Hollow Bean",
    category: "Social Media",
    image: "/portfolio-coffee.jpg",
  },
  {
    id: "oak-ember",
    title: "Oak & Ember",
    category: "Website",
    image: "/portfolio-bistro.jpg",
  },
  {
    id: "thoughtful-studio",
    title: "Thoughtful Studio",
    category: "Landing Page",
    image: "/portfolio-designer.jpg",
  },
];

const categories: PortfolioCategory[] = [
  "Semua",
  "Landing Page",
  "Website",
  "E-Commerce",
  "Social Media",
];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>("Semua");

  const filteredItems = activeCategory === "Semua"
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <section id="portofolio" className="w-full bg-white py-16 md:py-24 border-t border-gray-100">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-16 lg:px-20">
        
        {/* Section Header */}
        <div className="mb-10">
          <span className="text-[#00a68a] text-xs md:text-sm font-bold tracking-[0.2em] uppercase block mb-3">
            PORTOFOLIO
          </span>
          <h2 className="text-3xl md:text-[36px] lg:text-[38px] font-bold text-[#1a1a1a] leading-[1.2] tracking-tight">
            Project yang Telah Kami Kerjakan.
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5 md:gap-3 mb-12">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#00a68a] text-white shadow-sm shadow-[#00a68a]/20 font-semibold"
                    : "bg-white text-[#64748b] border border-gray-200/90 hover:border-gray-300 hover:text-[#1a1a1a] hover:bg-gray-50/60"
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
              className="group bg-white rounded-[2rem] border border-gray-200/80 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-transparent hover:-translate-y-1 flex flex-col cursor-pointer"
            >
              {/* Mockup Image Container */}
              <div className="relative w-full aspect-[4/3] bg-[#f8fafc] overflow-hidden">
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
                  <span className="text-xs font-bold tracking-[0.16em] uppercase text-white/90 drop-shadow-xs">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Bottom Card Area */}
              <div className="relative px-6 py-5 md:px-7 md:py-6 transition-colors duration-300 bg-white group-hover:bg-[#495159]">
                {/* Title (turns white on hover) */}
                <h3 className="text-xl font-bold text-[#1a1a1a] group-hover:text-white transition-colors duration-300 tracking-tight">
                  {item.title}
                </h3>

                {/* Subtitle / CTA Swap on Hover */}
                <div className="relative mt-1.5 h-6">
                  {/* Default Category Text (visible when unhovered) */}
                  <p className="text-[#64748b] text-sm font-normal transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-1 pointer-events-none">
                    {item.category}
                  </p>

                  {/* Hover 'Lihat Project ->' (slides up into view when hovered) */}
                  <div className="absolute inset-0 flex items-center gap-1.5 text-sm font-medium text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span>Lihat Project</span>
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
    </section>
  );
}
