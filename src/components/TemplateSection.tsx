"use client";

import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useData, Template } from "@/context/DataContext";

const defaultCategories = [
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
  const { user, isLoggedIn, openLoginModal, toggleSaveTemplate, isTemplateSaved } = useAuth();
  const { templates, templateCategories, siteContent } = useData();

  const [activeCategory, setActiveCategory] = useState("Semua");
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  // Derive all unique categories dynamically, always keeping "Semua" first
  const existingCategories = Array.from(new Set(templates.map((t) => t.category).filter(Boolean)));
  const combinedCategories = Array.from(
    new Set(["Semua", ...(templateCategories || defaultCategories), ...existingCategories])
  );

  // Filter templates based on category
  const filteredTemplates = templates.filter((t) => {
    if (activeCategory !== "Semua" && t.category.toLowerCase() !== activeCategory.toLowerCase()) {
      return false;
    }
    return true;
  });

  const sendOrderWhatsapp = (template: Template, currentUser?: { name?: string; email?: string; phone?: string }) => {
    let rawWa = (siteContent?.contactWhatsapp || "085749518867").replace(/[^0-9]/g, "");
    if (rawWa.startsWith("0")) {
      rawWa = "62" + rawWa.slice(1);
    }
    const waNumber = rawWa || "6285749518867";
    const clientName = currentUser?.name || user?.name || "Klien";
    const clientPhone = currentUser?.phone || user?.phone || "-";
    const clientEmail = currentUser?.email || user?.email || "-";

    const rawTemplate = siteContent?.waTemplateOrder || [
      `Halo RepublikWeb, saya ingin memesan template website:`,
      ``,
      `*Detail Template:*`,
      `• Nama Template : *{title}*`,
      `• Kategori : {category}`,
      `• Harga Lisensi : *{price}*`,
      ``,
      `*Data Pemesan:*`,
      `• Nama Lengkap : {name}`,
      `• Email : {email}`,
      `• WhatsApp : {phone}`,
      ``,
      `Mohon dibantu proses pemesanan & setup template ini. Terima kasih!`,
    ].join("\n");

    const msg = rawTemplate
      .replace(/{title}/g, template.title)
      .replace(/{category}/g, template.category)
      .replace(/{price}/g, template.price)
      .replace(/{name}/g, clientName)
      .replace(/{email}/g, clientEmail)
      .replace(/{phone}/g, clientPhone);

    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleOrderWhatsapp = (template: Template) => {
    if (!isLoggedIn) {
      // Jika belum login, buka modal login dan set aksi pesanan otomatis setelah berhasil login
      openLoginModal(() => {
        sendOrderWhatsapp(template);
      });
      return;
    }

    sendOrderWhatsapp(template);
  };

  return (
    <section id="template" className="w-full bg-gradient-to-b from-[#eaf6f2] via-[#f4faf7] to-[#ebf7f3] py-20 md:py-28 border-t border-emerald-200/70 relative">
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 md:px-16 lg:px-20">
        
        {/* Subtitle & Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <span className="text-[#00a68a] text-xs md:text-sm font-bold tracking-[0.2em] uppercase block mb-3">
              TEMPLATE MARKETPLACE
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#1a1a1a] leading-[1.2] tracking-tight">
              Katalog Template Website Siap Pakai
            </h2>
            <p className="text-sm md:text-base text-gray-600 mt-3 leading-relaxed">
              Pilihan template desain profesional siap pakai untuk bisnis, UMKM, dan personal branding Anda. Desain responsif, modern, dan cepat online.
            </p>
          </div>
        </div>

        {/* Category Filter Pills Bar */}
        <div className="flex items-center gap-2 md:gap-2.5 overflow-x-auto pb-3 mb-10 scrollbar-none">
          {combinedCategories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 md:px-4 md:py-1.5 rounded-full text-xs md:text-[13px] font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm scale-102 font-bold"
                    : "bg-gray-100/80 hover:bg-gray-200/80 text-[#52525b] hover:text-[#18181b]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-300 p-8">
            <p className="text-gray-500 font-medium text-sm">Tidak ada template yang sesuai dengan filter yang dipilih.</p>
            <button
              onClick={() => {
                setActiveCategory("Semua");
              }}
              className="mt-3 text-xs font-bold text-[#00a68a] hover:underline"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => {
            return (
              <div
                key={template.id}
                className="group bg-white rounded-3xl border border-gray-200/80 hover:border-[#00a68a]/50 overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Browser Frame Preview Header */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100 border-b border-gray-100">
                    {/* Badge */}
                    <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-1.5">
                      <div className="bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                        {template.category}
                      </div>

                      {template.isPopular && (
                        <div className="bg-[#00a68a] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                          Popular
                        </div>
                      )}
                    </div>

                    {/* Bookmark Heart Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveTemplate(template.id);
                      }}
                      title={isTemplateSaved(template.id) ? "Hapus dari tersimpan" : "Simpan ke akun"}
                      className={`absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-xs ${
                        isTemplateSaved(template.id)
                          ? "bg-red-500 text-white scale-110"
                          : "bg-white/85 hover:bg-white text-gray-500 hover:text-red-500"
                      }`}
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </button>

                    {/* Template Image */}
                    <Image
                      src={template.image}
                      alt={template.title}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Overlay Hover Action */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2.5 backdrop-blur-[2px]">
                      <button
                        onClick={() => setPreviewTemplate(template)}
                        className="bg-white text-[#1a1a1a] px-3.5 py-1.5 rounded-full text-[11px] font-bold shadow-sm hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        Live Preview
                      </button>
                      <button
                        onClick={() => handleOrderWhatsapp(template)}
                        className="px-3.5 py-1.5 rounded-full text-[11px] font-bold shadow-sm text-white transition-colors cursor-pointer bg-[#00a68a] hover:bg-[#008f76] flex items-center gap-1"
                      >
                        <span>Pesan via WhatsApp</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md text-[#00a68a] bg-[#e6f6f3]">
                        {template.category}
                      </span>
                      <div className="text-right">
                        <span className="text-base font-extrabold text-[#1a1a1a]">
                          {template.price}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-[#1a1a1a] group-hover:text-[#00a68a] transition-colors mb-2 leading-snug">
                      {template.title}
                    </h3>
                    
                    <p className="text-xs md:text-[13px] text-[#71717a] leading-relaxed mb-4">
                      {template.description}
                    </p>

                    {/* Features list highlight */}
                    <div className="space-y-1.5 pt-2 border-t border-gray-100 text-[11px] font-medium text-gray-600">
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>Desain Responsif & Modern</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>100% SEO Friendly & Cepat</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>Bantuan Setup & Panduan Lengkap</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer Action */}
                <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-gray-100 bg-gray-50/50">
                  <button
                    onClick={() => setPreviewTemplate(template)}
                    className="text-xs text-gray-500 hover:text-gray-800 font-semibold cursor-pointer"
                  >
                    Lihat Preview ↗
                  </button>

                  <button
                    onClick={() => handleOrderWhatsapp(template)}
                    className="text-xs font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-xl cursor-pointer transition-all bg-[#00a68a] hover:bg-[#008f76] text-white shadow-xs"
                  >
                    <span>Pesan via WhatsApp</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ===================== MODAL LIVE PREVIEW TEMPLATE ===================== */}
      {previewTemplate && (
        <LivePreviewModal
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          onOrder={() => {
            handleOrderWhatsapp(previewTemplate);
            setPreviewTemplate(null);
          }}
        />
      )}
    </section>
  );
}

{/* ===================== SUB-COMPONENT: INTERACTIVE LIVE PREVIEW MODAL ===================== */}
function LivePreviewModal({
  template,
  onClose,
  onOrder,
}: {
  template: Template;
  onClose: () => void;
  onOrder: () => void;
}) {
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [viewMode, setViewMode] = useState<"interactive" | "image">("interactive");
  const [activeMenuTab, setActiveMenuTab] = useState("Semua");
  const [cartCount, setCartCount] = useState(0);
  const [cartNotice, setCartNotice] = useState("");

  const handleAddToCart = (productName: string) => {
    setCartCount((prev) => prev + 1);
    setCartNotice(`"${productName}" ditambahkan ke keranjang demo!`);
    setTimeout(() => setCartNotice(""), 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-slate-950/90 backdrop-blur-md animate-fadeIn text-slate-800">
      {/* ================= TOP TOOLBAR CONTROL BAR ================= */}
      <div className="h-16 bg-slate-900 border-b border-slate-800 px-4 md:px-6 flex items-center justify-between shrink-0 text-white z-20">
        {/* Left: Template info */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
            title="Tutup Preview"
          >
            ✕
          </button>
          <div className="hidden sm:block truncate">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white truncate">{template.title}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500 text-slate-950">
                {template.category}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 block">{template.price}</span>
          </div>
        </div>

        {/* Center: Device Viewport Switcher & View Mode */}
        <div className="flex items-center gap-2">
          {/* View Mode Toggle: Interactive Demo vs High-Res Image */}
          <div className="hidden md:inline-flex p-1 bg-slate-800 rounded-xl border border-slate-700/80 mr-2">
            <button
              onClick={() => setViewMode("interactive")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === "interactive"
                  ? "bg-[#00a68a] text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              ⚡ Interactive Demo
            </button>
            <button
              onClick={() => setViewMode("image")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === "image"
                  ? "bg-[#00a68a] text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              🖼️ Desain HD
            </button>
          </div>

          {/* Device Viewport Buttons */}
          <div className="inline-flex p-1 bg-slate-800 rounded-xl border border-slate-700/80">
            <button
              onClick={() => setDevice("desktop")}
              title="Desktop View (100%)"
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                device === "desktop" ? "bg-slate-700 text-white shadow-xs font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="hidden sm:inline">Desktop</span>
            </button>

            <button
              onClick={() => setDevice("tablet")}
              title="Tablet View (768px)"
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                device === "tablet" ? "bg-slate-700 text-white shadow-xs font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="hidden sm:inline">Tablet</span>
            </button>

            <button
              onClick={() => setDevice("mobile")}
              title="Mobile View (375px)"
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                device === "mobile" ? "bg-slate-700 text-white shadow-xs font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>
        </div>

        {/* Right: Quick Order CTA */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOrder}
            className="px-4 py-2 rounded-xl text-xs font-extrabold text-white shadow-md transition-all cursor-pointer flex items-center gap-1.5 bg-[#00a68a] hover:bg-[#008f76]"
          >
            <span>Pesan via WhatsApp</span>
          </button>
        </div>
      </div>

      {/* ================= PREVIEW VIEWPORT CONTAINER ================= */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-6 flex items-start justify-center bg-slate-950/60 relative">
        {/* Floating Cart Notification in Interactive Demo */}
        {cartNotice && (
          <div className="fixed top-20 right-8 z-50 bg-slate-900 text-white border border-emerald-500/40 px-4 py-2.5 rounded-2xl shadow-2xl text-xs flex items-center gap-2 animate-fadeIn">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{cartNotice}</span>
          </div>
        )}

        {/* Device Frame */}
        <div
          className={`transition-all duration-300 bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-700 flex flex-col ${
            device === "desktop"
              ? "w-full max-w-[1300px] min-h-[750px]"
              : device === "tablet"
              ? "w-[768px] min-h-[750px] my-2 ring-8 ring-slate-800 rounded-3xl"
              : "w-[390px] min-h-[750px] my-2 ring-12 ring-slate-800 rounded-[2.5rem]"
          }`}
        >
          {/* Simulated Browser Address Bar */}
          <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center gap-3 shrink-0 select-none">
            {/* Window Dots */}
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>

            {/* URL Input */}
            <div className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1 flex items-center justify-between text-xs text-slate-600 shadow-2xs font-mono">
              <div className="flex items-center gap-1.5 truncate">
                <span className="text-emerald-600">🔒</span>
                <span className="text-slate-400">https://</span>
                <span className="font-semibold text-slate-800">{template.title.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 20)}.republikweb.demo</span>
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded uppercase font-sans font-bold">
                Live
              </span>
            </div>
          </div>

          {/* ================= VIEWPORT CONTENT ================= */}
          <div className="flex-1 bg-white overflow-y-auto">
            {viewMode === "image" ? (
              /* High-Res Full Image View */
              <div className="w-full relative aspect-[16/10] min-h-[700px] bg-slate-100">
                <Image
                  src={template.image}
                  alt={template.title}
                  fill
                  className="object-contain object-top p-2"
                />
              </div>
            ) : (
              /* ================= INTERACTIVE SIMULATED DEMO ================= */
              <div className="w-full font-sans text-slate-900 select-none">
                {/* 1. Header Bar inside Template */}
                <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                      {template.title.charAt(0)}
                    </div>
                    <span className="font-bold text-sm tracking-tight">{template.title.split(" - ")[0]}</span>
                  </div>

                  <nav className="hidden md:flex items-center gap-5 text-xs font-semibold text-slate-600">
                    <span className="text-slate-900 font-bold hover:text-[#00a68a] cursor-pointer">Home</span>
                    <span className="hover:text-[#00a68a] cursor-pointer">Layanan</span>
                    <span className="hover:text-[#00a68a] cursor-pointer">Katalog</span>
                    <span className="hover:text-[#00a68a] cursor-pointer">Tentang</span>
                    <span className="hover:text-[#00a68a] cursor-pointer">Kontak</span>
                  </nav>

                  <div className="flex items-center gap-2.5">
                    {cartCount > 0 && (
                      <div className="relative px-2 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-xs font-bold flex items-center gap-1">
                        <span>🛒</span>
                        <span>{cartCount} item</span>
                      </div>
                    )}
                    <button
                      onClick={() => alert(`Selamat datang di demo interaktif ${template.title}!`)}
                      className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                    >
                      Hubungi Kami
                    </button>
                  </div>
                </header>

                {/* 2. Hero Banner inside Template */}
                <div className="relative py-12 md:py-16 px-6 md:px-12 bg-gradient-to-br from-slate-50 via-teal-50/20 to-slate-100/50 border-b border-slate-100 overflow-hidden">
                  <div className="max-w-2xl relative z-10 space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-bold shadow-2xs">
                      <span className="text-[#00a68a]">●</span>
                      <span>{template.category} • Demo Siap Pakai</span>
                    </div>

                    <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
                      {template.title}
                    </h1>

                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-xl">
                      {template.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => alert("Fitur formulir interaktif siap dikustomisasi sesuai kebutuhan bisnis Anda!")}
                        className="px-5 py-2.5 bg-[#00a68a] hover:bg-[#008f76] text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
                      >
                        Mulai Konsultasi
                      </button>
                      <button
                        onClick={() => alert("Menampilkan katalog showcase lengkap template.")}
                        className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-semibold shadow-2xs transition-all cursor-pointer"
                      >
                        Jelajahi Fitur ↓
                      </button>
                    </div>
                  </div>

                  {/* Hero Mockup Graphic */}
                  <div className="mt-8 rounded-2xl overflow-hidden border border-slate-200/80 shadow-lg relative aspect-[16/9] w-full max-w-2xl bg-white">
                    <Image
                      src={template.image}
                      alt={template.title}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </div>

                {/* 3. Category-Specific Interactive Demo Section */}
                <div className="py-10 px-6 md:px-12 bg-white">
                  {/* Category: Restaurant */}
                  {template.category === "Restaurant" && (
                    <div className="space-y-6 max-w-4xl mx-auto">
                      <div className="text-center space-y-1">
                        <span className="text-[11px] font-bold tracking-widest text-[#00a68a] uppercase">MENU PILIHAN</span>
                        <h3 className="text-xl font-bold text-slate-900">Daftar Menu Spesial & Reservasi Meja</h3>
                      </div>

                      <div className="flex justify-center gap-2">
                        {["Semua", "Main Course", "Appetizer", "Drinks", "Dessert"].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveMenuTab(tab)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                              activeMenuTab === tab ? "bg-slate-900 text-white font-bold" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                          { name: "Prime Wagyu Steak A5", price: "Rp 185.000", desc: "Daging wagyu meltique dengan saus blackpepper khas.", tag: "Favorit" },
                          { name: "Truffle Cream Pasta", price: "Rp 95.000", desc: "Fettuccine handmade dengan jamur truffle premium.", tag: "Chef Rec" },
                          { name: "Smoked Salmon Salad", price: "Rp 75.000", desc: "Sayuran organik segar dengan dressing lemon thyme.", tag: "Sehat" },
                          { name: "Matcha Lava Cake", price: "Rp 55.000", desc: "Dessert lumer dengan es krim vanilla gelato.", tag: "Dessert" },
                          { name: "Artisan Cold Brew", price: "Rp 38.000", desc: "Kopi single origin fermentasi 18 jam.", tag: "Drinks" },
                          { name: "Sparkling Berry Mojito", price: "Rp 42.000", desc: "Minuman segar perpaduan mint dan raspberry.", tag: "Fresh" },
                        ].map((m, idx) => (
                          <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all flex flex-col justify-between space-y-2">
                            <div>
                              <div className="flex justify-between items-start mb-1">
                                <h4 className="font-bold text-xs text-slate-900">{m.name}</h4>
                                <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">{m.tag}</span>
                              </div>
                              <p className="text-[11px] text-slate-500 leading-tight">{m.desc}</p>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-slate-200/50">
                              <span className="font-bold text-xs text-slate-900">{m.price}</span>
                              <button
                                onClick={() => handleAddToCart(m.name)}
                                className="px-2.5 py-1 bg-[#00a68a] hover:bg-[#008f76] text-white rounded-lg text-[10px] font-bold transition-all cursor-pointer"
                              >
                                + Pesan Demo
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Category: E-Commerce */}
                  {template.category === "E-Commerce" && (
                    <div className="space-y-6 max-w-4xl mx-auto">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[11px] font-bold text-[#00a68a] uppercase tracking-wider">KATALOG PRODUK</span>
                          <h3 className="text-xl font-bold text-slate-900">Koleksi Terpopuler Toko Online</h3>
                        </div>
                        <span className="text-xs text-slate-500 font-medium">Klik produk untuk coba checkout</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                          { name: "Aero Minimalist Backpack", price: "Rp 349.000", badge: "Diskon 20%" },
                          { name: "Wireless ANC Headphones", price: "Rp 699.000", badge: "Best Seller" },
                          { name: "Mechanical Gaming Keyboard", price: "Rp 549.000", badge: "Stok Terbatas" },
                          { name: "Smart Ergonomic Desk Lamp", price: "Rp 219.000", badge: "Baru" },
                          { name: "Ultra-Fast GaN Charger 65W", price: "Rp 179.000", badge: "Diskon 15%" },
                          { name: "Waterproof Travel Pouch", price: "Rp 89.000", badge: "Hemat" },
                        ].map((prod, idx) => (
                          <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-300 transition-all flex flex-col justify-between space-y-3">
                            <div className="aspect-[4/3] rounded-xl bg-slate-200 relative overflow-hidden flex items-center justify-center text-slate-400 font-bold text-xs">
                              <span className="absolute top-2 left-2 bg-slate-900 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                                {prod.badge}
                              </span>
                              <span>Foto Produk {idx + 1}</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-xs text-slate-900 truncate">{prod.name}</h4>
                              <span className="font-bold text-sm text-[#00a68a] block mt-1">{prod.price}</span>
                            </div>
                            <button
                              onClick={() => handleAddToCart(prod.name)}
                              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                            >
                              <span>🛒 Tambah ke Cart</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Category: Agency / Company Profile / Portfolio / Others */}
                  {template.category !== "Restaurant" && template.category !== "E-Commerce" && (
                    <div className="space-y-8 max-w-4xl mx-auto">
                      {/* Metric Stats Counter */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                          <span className="text-2xl font-black text-slate-900 block">150+</span>
                          <span className="text-[10px] text-slate-500 font-semibold uppercase">Project Selesai</span>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                          <span className="text-2xl font-black text-[#00a68a] block">99.8%</span>
                          <span className="text-[10px] text-slate-500 font-semibold uppercase">Kepuasan Klien</span>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                          <span className="text-2xl font-black text-slate-900 block">24/7</span>
                          <span className="text-[10px] text-slate-500 font-semibold uppercase">Dukungan Teknis</span>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                          <span className="text-2xl font-black text-amber-500 block">5★</span>
                          <span className="text-[10px] text-slate-500 font-semibold uppercase">Review Terbaik</span>
                        </div>
                      </div>

                      {/* Services / Feature Highlights */}
                      <div className="space-y-4">
                        <h3 className="text-base font-bold text-slate-900">Keunggulan & Fitur Unggulan Template</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                            <span className="text-lg">⚡</span>
                            <h4 className="font-bold text-xs text-slate-900">Kecepatan Loading Tinggi</h4>
                            <p className="text-[11px] text-slate-500">Skor PageSpeed 95+ dengan optimasi struktur code Next.js modern.</p>
                          </div>
                          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                            <span className="text-lg">📱</span>
                            <h4 className="font-bold text-xs text-slate-900">100% Responsif & Mobile</h4>
                            <p className="text-[11px] text-slate-500">Tampilan sempurna otomatis di smartphone, tablet, maupun monitor desktop.</p>
                          </div>
                          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                            <span className="text-lg">🔍</span>
                            <h4 className="font-bold text-xs text-slate-900">SEO & Metadata Siap Pakai</h4>
                            <p className="text-[11px] text-slate-500">Struktur heading dan tag meta siap terindeks Google secara optimal.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. Footer inside Template */}
                <footer className="py-8 px-6 bg-slate-900 text-white text-center text-xs space-y-2">
                  <div className="font-bold">{template.title.split(" - ")[0]} Demo Experience</div>
                  <p className="text-slate-400 text-[11px]">Didesain dan dikembangkan secara profesional oleh RepublikWeb.net</p>
                </footer>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= BOTTOM FLOATING ACTION DOCK ================= */}
      <div className="h-20 bg-slate-900/95 border-t border-slate-800 px-6 flex items-center justify-between shrink-0 text-white z-20">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Harga Template:</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-[#2dd4bf]">{template.price}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-bold transition-all cursor-pointer"
          >
            Tutup Preview
          </button>

          <button
            onClick={onOrder}
            className="px-6 py-2.5 rounded-xl text-white text-xs font-extrabold transition-all shadow-lg cursor-pointer flex items-center gap-1.5 bg-[#00a68a] hover:bg-[#008f76] shadow-[#00a68a]/20"
          >
            <span>Gunakan Template Ini Sekarang →</span>
          </button>
        </div>
      </div>
    </div>
  );
}

