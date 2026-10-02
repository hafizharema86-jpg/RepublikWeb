import Image from "next/image";
import Link from "next/link";

interface SocialMediaFeature {
  id: string;
  title: string;
  icon: "planning" | "design" | "copywriting" | "management" | "calendar" | "monitoring";
}

const socialFeatures: SocialMediaFeature[] = [
  { id: "1", title: "Content Planning", icon: "planning" },
  { id: "2", title: "Content Design", icon: "design" },
  { id: "3", title: "Copywriting", icon: "copywriting" },
  { id: "4", title: "Social Media Management", icon: "management" },
  { id: "5", title: "Content Calendar", icon: "calendar" },
  { id: "6", title: "Performance Monitoring", icon: "monitoring" },
];

export default function SocialMediaSection() {
  const renderIcon = (type: SocialMediaFeature["icon"]) => {
    switch (type) {
      case "planning":
        return (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        );
      case "design":
        return (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
            <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
            <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
            <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
          </svg>
        );
      case "copywriting":
        return (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        );
      case "management":
        return (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case "calendar":
        return (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        );
      case "monitoring":
        return (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 20V10" />
            <path d="M12 20V4" />
            <path d="M6 20v-6" />
          </svg>
        );
    }
  };

  return (
    <section id="social-media" className="w-full bg-[#fbfcfc] py-16 md:py-24 border-t border-gray-100">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-16 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* Left Column: Heading & Service Pills */}
        <div className="lg:col-span-6 flex flex-col items-start">
          <span className="text-[#00a68a] text-xs md:text-sm font-bold tracking-[0.2em] uppercase block mb-3">
            SOCIAL MEDIA
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#1a1a1a] leading-[1.2] tracking-tight mb-8">
            Bukan Hanya Website. Kami Bantu Bisnis Anda Tetap Aktif di Social Media.
          </h2>

          {/* 2-Column Pill Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-8">
            {socialFeatures.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200/80 hover:border-[#00a68a]/40 rounded-full py-2.5 px-4 md:py-3 md:px-4.5 flex items-center gap-3 shadow-xs hover:shadow-sm transition-all duration-200 group"
              >
                {/* Circle Icon */}
                <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#eaf7f4] text-[#00a68a] group-hover:bg-[#00a68a] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                  {renderIcon(item.icon)}
                </div>

                {/* Pill Title */}
                <span className="font-semibold text-xs md:text-[13.5px] text-[#1a1a1a] group-hover:text-[#00a68a] transition-colors">
                  {item.title}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href="#kontak"
            className="bg-[#00a68a] hover:bg-[#008f76] active:scale-95 text-white px-7 py-3 rounded-full text-xs md:text-sm font-semibold transition-all shadow-md shadow-[#00a68a]/20 inline-flex items-center gap-2"
          >
            Konsultasikan Social Media Anda
          </Link>
        </div>

        {/* Right Column: Office Collaboration & Content Calendar Image */}
        <div className="lg:col-span-6 relative">
          <div className="relative w-full aspect-[4/3] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-200/80 bg-white">
            <Image
              src="/social-media-team.jpg"
              alt="Social Media Content Calendar & Team - RepublikWeb"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
