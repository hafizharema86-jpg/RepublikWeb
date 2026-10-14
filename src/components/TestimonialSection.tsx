interface TestimonialItem {
  id: string;
  rating: number;
  quote: string;
  name: string;
  role: string;
  initials: string;
  glow?: boolean;
}

import { useData } from "@/context/DataContext";

export default function TestimonialSection() {
  const { siteContent, testimonials } = useData();
  return (
    <section id="testimonial" className="w-full bg-white py-16 md:py-24 border-t border-gray-100">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-16 lg:px-20">
        
        {/* Section Header */}
        <div className="mb-10">
          <span className="text-[#00a68a] text-xs font-bold tracking-[0.2em] uppercase block mb-3">
            {siteContent.testimonialSubtitle}
          </span>
          <h2 className="text-3xl md:text-[38px] lg:text-[42px] font-bold text-[#111827] leading-[1.2] tracking-tight whitespace-pre-line">
            {siteContent.testimonialTitle}
          </h2>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className={`bg-[#F7FAF9] rounded-[1.75rem] border border-[#edf2f0] p-6 md:px-7 md:py-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group ${
                item.glow
                  ? "shadow-[0_10px_30px_-5px_rgba(0,166,138,0.12)] border-[#00a68a]/20"
                  : "shadow-[0_4px_20px_-2px_rgba(0,0,0,0.03)] hover:border-[#00a68a]/20"
              }`}
            >
              <div>
                {/* 5 Bright Green Stars (Vivid Emerald Green #00c278) */}
                <div className="flex items-center gap-1.5 mb-3.5 text-[#00c278]">
                  {Array.from({ length: item.rating }).map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 text-[#00c278]"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-[#64748b] text-[13.5px] md:text-[14px] leading-[1.6] font-normal mb-5">
                  {item.quote}
                </p>
              </div>

              {/* Author / Client Info */}
              <div className="flex items-center gap-3.5 pt-1">
                {/* Initials Avatar (Light Mint Circle with Teal Text) */}
                <div className="w-10 h-10 rounded-full bg-[#e6f9f3] text-[#00a68a] font-bold text-xs flex items-center justify-center shrink-0">
                  {item.initials}
                </div>

                {/* Name & Role */}
                <div>
                  <h3 className="font-bold text-[#111827] text-[14px] leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-[#9ca3af] text-[12px] font-normal mt-0.5">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
