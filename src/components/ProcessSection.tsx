interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const steps: ProcessStep[] = [
  {
    number: "01",
    title: "Konsultasi",
    description: "Ceritakan kebutuhan, tujuan, dan target bisnis Anda.",
  },
  {
    number: "02",
    title: "Pilih Solusi",
    description: "Tentukan template, custom website, atau social media.",
  },
  {
    number: "03",
    title: "Proses Pengerjaan",
    description: "Tim kami mengerjakan dengan progres yang transparan.",
  },
  {
    number: "04",
    title: "Project Selesai",
    description: "Website live, konten berjalan, dan support tetap tersedia.",
  },
];

export default function ProcessSection() {
  return (
    <section id="cara-kerja" className="w-full bg-white py-16 md:py-24 border-t border-gray-100">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-16 lg:px-20">
        
        {/* Section Header */}
        <div className="mb-14 md:mb-16">
          <span className="text-[#00a68a] text-xs md:text-sm font-bold tracking-[0.2em] uppercase block mb-3">
            CARA KERJA
          </span>
          <h2 className="text-3xl md:text-[36px] lg:text-[38px] font-bold text-[#1a1a1a] leading-[1.2] tracking-tight">
            Empat Langkah Sederhana.
          </h2>
        </div>

        {/* Steps Grid with Connecting Line */}
        <div className="relative">
          {/* Horizontal connecting line behind circles for desktop (lg screens) */}
          <div 
            className="hidden lg:block absolute top-6 left-6 right-6 h-[1.5px] bg-gray-200 -translate-y-1/2 z-0" 
            aria-hidden="true"
          />

          {/* Vertical connecting line for mobile / tablet */}
          <div 
            className="lg:hidden absolute top-6 bottom-16 left-6 w-[1.5px] bg-gray-200 -translate-x-1/2 z-0" 
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 relative z-10">
            {steps.map((step) => (
              <div 
                key={step.number} 
                className="flex flex-col items-start group"
              >
                {/* Circle Number */}
                <div className="w-12 h-12 rounded-full bg-[#00a68a] text-white font-bold text-sm md:text-base flex items-center justify-center mb-6 shadow-xs ring-8 ring-white group-hover:scale-105 group-hover:bg-[#008f76] transition-all duration-200 shrink-0">
                  {step.number}
                </div>

                {/* Step Title */}
                <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a] mb-2.5 tracking-tight group-hover:text-[#00a68a] transition-colors">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-[#64748b] text-sm md:text-[14.5px] leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
