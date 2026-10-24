"use client";

import Image from "next/image";
import { useData } from "@/context/DataContext";

const customFeatures = [
  { id: "1", title: "Company Profile" },
  { id: "2", title: "E-Commerce" },
  { id: "3", title: "Sistem Informasi" },
  { id: "4", title: "Dashboard" },
  { id: "5", title: "Booking System" },
  { id: "6", title: "Website Membership" },
  { id: "7", title: "Website Bisnis" },
  { id: "8", title: "Web Application" },
];

export default function CustomWebsiteSection() {
  const { siteContent } = useData();

  let rawWa = (siteContent?.contactWhatsapp || "085749518867").replace(/[^0-9]/g, "");
  if (rawWa.startsWith("0")) {
    rawWa = "62" + rawWa.slice(1);
  }
  const waNumber = rawWa || "6285749518867";
  const customMsg = "Halo RepublikWeb, saya ingin konsultasi mengenai pembuatan Custom Website / sistem kustom dari nol untuk kebutuhan bisnis saya.";
  const waCustomLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(customMsg)}`;

  return (
    <section id="custom-website" className="w-full bg-white py-16 md:py-24 border-t border-gray-100/80">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-16 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* Left Column: Website Preview Mockup */}
        <div className="lg:col-span-6 relative">
          <div className="relative w-full aspect-[4/3] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-200/80 bg-white">
            <Image
              src="/custom-website-mockup.jpg"
              alt="Custom Website - StyleNest Mockup"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Right Column: Information & Feature Pills */}
        <div className="lg:col-span-6 flex flex-col items-start">
          <span className="text-[#00a68a] text-xs md:text-sm font-bold tracking-[0.2em] uppercase block mb-3">
            CUSTOM WEBSITE
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#1a1a1a] leading-[1.2] tracking-tight mb-4">
            Butuh Website Custom dari Nol dengan Konsep Spesifik?
          </h2>
          <p className="text-[#64748b] text-sm md:text-base leading-relaxed mb-8 font-normal">
            Bangun website yang benar-benar sesuai dengan kebutuhan bisnis, alur kerja (workflow), dan identitas brand unik Anda.
          </p>

          {/* 2-Column Pill List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-8">
            {customFeatures.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200/80 hover:border-[#00a68a]/40 rounded-full py-2.5 px-4 md:py-3 md:px-4.5 flex items-center gap-3 shadow-xs hover:shadow-sm transition-all duration-200 group"
              >
                {/* Circle Check Icon */}
                <div className="w-5 h-5 md:w-5.5 md:h-5.5 rounded-full bg-[#eaf7f4] text-[#00a68a] group-hover:bg-[#00a68a] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                {/* Pill Title */}
                <span className="font-semibold text-xs md:text-[13.5px] text-[#1a1a1a] group-hover:text-[#00a68a] transition-colors">
                  {item.title}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href={waCustomLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#00a68a] hover:bg-[#008f76] active:scale-95 text-white px-7 py-3 rounded-full text-xs md:text-sm font-semibold transition-all shadow-md shadow-[#00a68a]/20 inline-flex items-center gap-2 cursor-pointer group"
          >
            <span>Konsultasikan Project Anda</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
