import Link from "next/link";

interface SolutionItem {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  href: string;
  highlight?: boolean;
}

const solutions: SolutionItem[] = [
  {
    id: "landing-page",
    title: "Landing Page",
    description: "Satu halaman fokus konversi untuk produk, jasa, atau campaign.",
    buttonText: "Konsultasi Landing Page",
    href: "#layanan",
    highlight: true,
  },
  {
    id: "template",
    title: "Template",
    description: "Pilih sendiri template siap pakai dan langsung mulai project.",
    buttonText: "Pilih Template",
    href: "#template",
  },
  {
    id: "custom-website",
    title: "Custom Website",
    description: "Website dan sistem yang dibangun mengikuti kebutuhan bisnis.",
    buttonText: "Konsultasi Custom",
    href: "#custom-website",
  },
  {
    id: "social-media",
    title: "Social Media",
    description: "Strategi, konten, dan pengelolaan akun secara konsisten.",
    buttonText: "Konsultasi Social Media",
    href: "#social-media",
  },
];

import { useData } from "@/context/DataContext";

export default function SolutionChooserSection() {
  const { siteContent } = useData();
  return (
    <section id="pilih-solusi" className="w-full bg-white py-16 md:py-24 border-t border-gray-100">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-16 lg:px-20">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-[#00a68a] text-xs md:text-sm font-bold tracking-[0.2em] uppercase block mb-3">
            {siteContent.solutionSubtitle}
          </span>
          <h2 className="text-3xl md:text-[36px] lg:text-[38px] font-bold text-[#1a1a1a] leading-[1.2] tracking-tight whitespace-pre-line">
            {siteContent.solutionTitle}
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-3xl md:rounded-[1.75rem] border p-7 md:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group min-h-[260px] ${
                item.highlight
                  ? "border-gray-200/90 shadow-md shadow-[#00a68a]/5 hover:border-[#00a68a]/40"
                  : "border-gray-200/80 hover:border-[#00a68a]/40"
              }`}
            >
              {/* Content */}
              <div>
                <h3 className="font-bold text-xl md:text-[21px] text-[#1a1a1a] mb-3 tracking-tight group-hover:text-[#00a68a] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[#64748b] text-sm md:text-[14.5px] leading-relaxed font-normal mb-8">
                  {item.description}
                </p>
              </div>

              {/* Action Button */}
              <Link
                href={item.href}
                className="w-full block text-center py-2.5 px-4 rounded-full border border-gray-200/90 text-[#334155] font-semibold text-xs md:text-[13.5px] bg-white hover:bg-[#00a68a] hover:text-white hover:border-[#00a68a] active:scale-95 transition-all duration-200 shadow-xs"
              >
                {item.buttonText}
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
