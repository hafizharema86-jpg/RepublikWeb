"use client";

import { useState } from "react";
import Image from "next/image";

interface Template {
  id: string;
  title: string;
  category: string;
  image: string;
  isPopular?: boolean;
  price: string;
  description: string;
  demoUrl?: string;
}

const templatesData: Template[] = [
  {
    id: "1",
    title: "Nexus Digital - Modern Agency",
    category: "Agency",
    image: "/template-agency.jpg",
    isPopular: true,
    price: "Rp 299.000",
    description: "Template siap pakai untuk digital agency, IT consultant, dan startup teknologi.",
  },
  {
    id: "2",
    title: "The Grill Room - Fine Dining",
    category: "Restaurant",
    image: "/template-restaurant.jpg",
    isPopular: false,
    price: "Rp 249.000",
    description: "Desain elegan & mewah untuk restoran, cafe, kuliner, dan booking reservasi.",
  },
  {
    id: "3",
    title: "Thoughtful - Designer Portfolio",
    category: "Portfolio",
    image: "/template-portfolio.jpg",
    isPopular: false,
    price: "Rp 199.000",
    description: "Showcase hasil karya visual, UI/UX designer, dan professional freelancer.",
  },
  {
    id: "4",
    title: "InnovateTech - Corporate Site",
    category: "Company Profile",
    image: "/template-agency.jpg",
    isPopular: false,
    price: "Rp 349.000",
    description: "Profile perusahaan profesional dengan fitur layanan, berita, dan kontak.",
  },
  {
    id: "5",
    title: "EcoWave - Clean E-Commerce",
    category: "E-Commerce",
    image: "/template-portfolio.jpg",
    isPopular: true,
    price: "Rp 399.000",
    description: "Toko online modern lengkap dengan katalog produk dan checkout ramah pengguna.",
  },
  {
    id: "6",
    title: "Soto Nusantara - UMKM Kuliner",
    category: "UMKM",
    image: "/template-restaurant.jpg",
    isPopular: false,
    price: "Rp 149.000",
    description: "Website hemat & responsif khusus UMKM lokal untuk memperluas jangkauan pembeli.",
  },
];

const categories = [
  "Semua",
  "Landing Page",
  "Company Profile",
  "UMKM",
  "Portfolio",
  "Restaurant",
  "E-Commerce",
  "Agency",
  "Personal",
];

export default function TemplateSection() {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredTemplates = activeCategory === "Semua"
    ? templatesData
    : templatesData.filter(t => t.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="template" className="w-full bg-[#fbfcfc] py-20 border-t border-gray-100">
      <div className="w-full max-w-[1400px] mx-auto px-10 md:px-16 lg:px-20">
        
        {/* Subtitle & Title Header */}
        <div className="max-w-3xl mb-10">
          <span className="text-[#00a68a] text-xs md:text-sm font-bold tracking-[0.2em] uppercase block mb-3">
            TEMPLATE MARKETPLACE
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#1a1a1a] leading-[1.2] tracking-tight">
            Tidak Mau Mulai dari Nol? Pilih Template yang Sesuai.
          </h2>
        </div>

        {/* Category Filter Pills Bar */}
        <div className="flex items-center gap-2 md:gap-2.5 overflow-x-auto pb-3 mb-10 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 md:px-4 md:py-1.5 rounded-full text-xs md:text-[13px] font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-[#00a68a] text-white shadow-sm shadow-[#00a68a]/20 scale-102"
                    : "bg-gray-100/80 hover:bg-gray-200/80 text-[#52525b] hover:text-[#18181b]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="group bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Browser Frame Preview Header */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100 border-b border-gray-100">
                  {/* Badge Popular */}
                  {template.isPopular && (
                    <div className="absolute top-3.5 left-3.5 z-20 bg-[#00a68a] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                      Popular
                    </div>
                  )}

                  {/* Template Image */}
                  <Image
                    src={template.image}
                    alt={template.title}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Overlay Hover Action */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2.5 backdrop-blur-[2px]">
                    <button className="bg-white text-[#1a1a1a] px-3.5 py-1.5 rounded-full text-[11px] font-semibold shadow-sm hover:bg-[#00a68a] hover:text-white transition-colors">
                      Live Preview
                    </button>
                    <button className="bg-[#00a68a] text-white px-3.5 py-1.5 rounded-full text-[11px] font-semibold shadow-sm hover:bg-[#008f76] transition-colors">
                      Gunakan Template
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-[#00a68a] bg-[#e6f6f3] px-2.5 py-1 rounded-md">
                      {template.category}
                    </span>
                    <span className="text-sm font-bold text-[#1a1a1a]">
                      {template.price}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#1a1a1a] group-hover:text-[#00a68a] transition-colors mb-2">
                    {template.title}
                  </h3>
                  <p className="text-sm text-[#71717a] leading-relaxed">
                    {template.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-gray-50 mt-4">
                <span className="text-xs text-gray-400 font-medium pt-3">
                  Responsive & SEO Ready
                </span>
                <button className="text-xs font-bold text-[#00a68a] hover:text-[#008f76] flex items-center gap-1 pt-3 group-hover:translate-x-1 transition-transform">
                  Detail Template →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA / Load More */}
        <div className="mt-12 text-center">
          <button className="bg-white border border-gray-300 hover:border-[#00a68a] text-[#1a1a1a] hover:text-[#00a68a] px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all shadow-xs hover:shadow-sm">
            Lihat Semua Template ({templatesData.length}+)
          </button>
        </div>

      </div>
    </section>
  );
}
