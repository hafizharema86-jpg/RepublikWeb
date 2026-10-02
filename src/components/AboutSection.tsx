interface ReasonCard {
  id: string;
  title: string;
  description: string;
  icon: "layers" | "flash" | "sliders" | "sparkles" | "eye" | "support";
}

const reasons: ReasonCard[] = [
  {
    id: "1",
    title: "One Stop Digital Solution",
    description: "Website, template, dan social media dikerjakan dalam satu platform.",
    icon: "layers",
  },
  {
    id: "2",
    title: "Template Siap Pakai",
    description: "Mulai project lebih cepat dengan template yang sudah teruji.",
    icon: "flash",
  },
  {
    id: "3",
    title: "Custom Sesuai Kebutuhan",
    description: "Fitur dan sistem dirancang mengikuti alur kerja bisnis Anda.",
    icon: "sliders",
  },
  {
    id: "4",
    title: "Desain Profesional",
    description: "Tampilan bersih, modern, dan kredibel di semua perangkat.",
    icon: "sparkles",
  },
  {
    id: "5",
    title: "Proses Transparan",
    description: "Progres, timeline, dan kebutuhan project jelas sejak awal.",
    icon: "eye",
  },
  {
    id: "6",
    title: "Support",
    description: "Pendampingan setelah project berjalan, bukan sekadar serah terima.",
    icon: "support",
  },
];

export default function AboutSection() {
  const renderIcon = (type: ReasonCard["icon"]) => {
    switch (type) {
      case "layers":
        return (
          <svg className="w-5 h-5 text-[#00a68a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        );
      case "flash":
        return (
          <svg className="w-5 h-5 text-[#00a68a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case "sliders":
        return (
          <svg className="w-5 h-5 text-[#00a68a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        );
      case "sparkles":
        return (
          <svg className="w-5 h-5 text-[#00a68a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      case "eye":
        return (
          <svg className="w-5 h-5 text-[#00a68a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        );
      case "support":
        return (
          <svg className="w-5 h-5 text-[#00a68a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
            <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
            <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
            <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
            <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
          </svg>
        );
    }
  };

  return (
    <section id="tentang-kami" className="w-full bg-white py-16 md:py-24 border-t border-gray-100">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-16 lg:px-20">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-[#00a68a] text-xs md:text-sm font-bold tracking-[0.2em] uppercase block mb-3">
            TENTANG KAMI
          </span>
          <h2 className="text-3xl md:text-[36px] lg:text-[38px] font-bold text-[#1a1a1a] leading-[1.2] tracking-tight">
            Kenapa RepublikWeb.net?
          </h2>
        </div>

        {/* 6 Cards Grid (3 columns on lg, 2 on md, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl md:rounded-[1.75rem] border border-gray-200/80 p-7 md:p-8 transition-all duration-200 hover:shadow-lg hover:border-[#00a68a]/30 group flex flex-col justify-start"
            >
              {/* Icon Circle */}
              <div className="w-11 h-11 rounded-full bg-[#eaf7f4] flex items-center justify-center shrink-0 mb-6 group-hover:scale-105 transition-transform duration-200">
                {renderIcon(item.icon)}
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-[19px] font-bold text-[#1a1a1a] mb-2.5 group-hover:text-[#00a68a] transition-colors tracking-tight">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[#64748b] text-sm leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
