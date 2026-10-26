"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useData, Template, PortfolioItem, TestimonialItem, AboutFeatureItem, ProcessStepItem, SiteContent } from "@/context/DataContext";


export default function AdminDashboardPage() {
  const router = useRouter();
  const { logout } = useAuth();
  const {
    templates,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    templateCategories,
    addTemplateCategory,
    deleteTemplateCategory,
    portfolios,
    addPortfolio,
    updatePortfolio,
    deletePortfolio,
    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    aboutFeatures,
    addAboutFeature,
    updateAboutFeature,
    deleteAboutFeature,
    processSteps,
    addProcessStep,
    updateProcessStep,
    deleteProcessStep,
    heroImage,
    updateHeroImage,
    siteLogo,
    updateSiteLogo,
    siteContent,
    updateSiteContent,
  } = useData();

  const [activeMenu, setActiveMenu] = useState<
    "overview" | "content" | "portfolios" | "templates" | "testimonials" | "about" | "process" | "settings" | "whatsapp"
  >("overview");

  // Search & Filters
  const [templateFilterCategory, setTemplateFilterCategory] = useState("Semua");
  const [portfolioFilterCategory, setPortfolioFilterCategory] = useState("Semua");

  // Site Content State for editing
  const [tempSiteContent, setTempSiteContent] = useState<SiteContent>(siteContent);
  const [contentSavedNotice, setContentSavedNotice] = useState(false);

  useEffect(() => {
    setTempSiteContent(siteContent);
  }, [siteContent]);

  const handleSaveSiteContent = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteContent(tempSiteContent);
    setContentSavedNotice(true);
    setTimeout(() => setContentSavedNotice(false), 3000);
  };

  // Modal: Template CRUD
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null);
  const [templateForm, setTemplateForm] = useState({
    title: "",
    category: "Agency",
    price: "Rp 299.000",
    description: "",
    image: "/template-agency.jpg",
  });
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState("");
  const [categoryModalNotice, setCategoryModalNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isAddingInlineCategory, setIsAddingInlineCategory] = useState(false);
  const [inlineCategoryInput, setInlineCategoryInput] = useState("");
  const [inlineCategoryFeedback, setInlineCategoryFeedback] = useState<{ isError: boolean; message: string } | null>(null);

  const handleSaveInlineCategory = () => {
    const trimmed = inlineCategoryInput.trim();
    if (!trimmed) {
      setInlineCategoryFeedback({ isError: true, message: "Nama kategori tidak boleh kosong" });
      return;
    }
    const isNew = addTemplateCategory(trimmed);
    setTemplateForm(prev => ({ ...prev, category: trimmed }));
    setInlineCategoryInput("");
    setInlineCategoryFeedback({
      isError: false,
      message: isNew
        ? `✓ Kategori "${trimmed}" berhasil dibuat dan dipilih!`
        : `✓ Kategori "${trimmed}" sudah ada dan dipilih!`,
    });
    setTimeout(() => {
      setIsAddingInlineCategory(false);
      setInlineCategoryFeedback(null);
    }, 1200);
  };

  // Modal: Portfolio CRUD
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [editingPortfolioId, setEditingPortfolioId] = useState<string | null>(null);
  const [portfolioForm, setPortfolioForm] = useState<{
    title: string;
    category: "Landing Page" | "Website" | "E-Commerce" | "Social Media";
    image: string;
  }>({
    title: "",
    category: "Landing Page",
    image: "/portfolio-evergreen.jpg",
  });

  // Modal: Testimonial CRUD
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);
  const [testimonialForm, setTestimonialForm] = useState<{
    name: string;
    role: string;
    quote: string;
    rating: number;
    initials: string;
    glow: boolean;
  }>({
    name: "",
    role: "",
    quote: "",
    rating: 5,
    initials: "",
    glow: false,
  });

  // Modal: About Feature CRUD
  const [isAboutFeatureModalOpen, setIsAboutFeatureModalOpen] = useState(false);
  const [editingAboutFeatureId, setEditingAboutFeatureId] = useState<string | null>(null);
  const [aboutFeatureForm, setAboutFeatureForm] = useState<{
    title: string;
    description: string;
    icon: "layers" | "flash" | "sliders" | "sparkles" | "eye" | "support";
  }>({
    title: "",
    description: "",
    icon: "layers",
  });

  // Modal: Process Step CRUD
  const [isProcessStepModalOpen, setIsProcessStepModalOpen] = useState(false);
  const [editingProcessStepId, setEditingProcessStepId] = useState<string | null>(null);
  const [processStepForm, setProcessStepForm] = useState<{
    number: string;
    title: string;
    description: string;
  }>({
    number: "01",
    title: "",
    description: "",
  });

  // Handle Logout
  const handleAdminLogout = () => {
    logout(() => {
      router.push("/");
    });
  };

  // Open Template Create
  const handleOpenAddTemplate = () => {
    setEditingTemplateId(null);
    setTemplateForm({
      title: "",
      category: templateCategories[0] || "Agency",
      price: "Rp 299.000",
      description: "Desain website modern, responsif, siap pakai dan mudah dikustomisasi.",
      image: "/template-agency.jpg",
    });
    setIsAddingInlineCategory(false);
    setInlineCategoryInput("");
    setInlineCategoryFeedback(null);
    setIsTemplateModalOpen(true);
  };

  // Open Template Edit
  const handleOpenEditTemplate = (item: Template) => {
    setEditingTemplateId(item.id);
    setTemplateForm({
      title: item.title,
      category: item.category,
      price: item.price,
      description: item.description || "",
      image: item.image,
    });
    setIsAddingInlineCategory(false);
    setInlineCategoryInput("");
    setInlineCategoryFeedback(null);
    setIsTemplateModalOpen(true);
  };

  // Submit Template Form
  const handleSaveTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!templateForm.title.trim()) return;

    const formattedPrice = templateForm.price.startsWith("Rp")
      ? templateForm.price
      : `Rp ${templateForm.price}`;

    if (editingTemplateId) {
      updateTemplate(editingTemplateId, {
        title: templateForm.title,
        category: templateForm.category,
        price: formattedPrice,
        description: templateForm.description,
        image: templateForm.image,
      });
    } else {
      addTemplate({
        title: templateForm.title,
        category: templateForm.category,
        price: formattedPrice,
        description: templateForm.description,
        image: templateForm.image,
        isPopular: false,
      });
    }
    setIsTemplateModalOpen(false);
  };

  // Open Portfolio Create
  const handleOpenAddPortfolio = () => {
    setEditingPortfolioId(null);
    setPortfolioForm({
      title: "",
      category: "Landing Page",
      image: "/portfolio-evergreen.jpg",
    });
    setIsPortfolioModalOpen(true);
  };

  // Open Portfolio Edit
  const handleOpenEditPortfolio = (item: PortfolioItem) => {
    setEditingPortfolioId(item.id);
    setPortfolioForm({
      title: item.title,
      category: item.category,
      image: item.image,
    });
    setIsPortfolioModalOpen(true);
  };

  // Submit Portfolio Form
  const handleSavePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!portfolioForm.title.trim()) return;

    if (editingPortfolioId) {
      updatePortfolio(editingPortfolioId, {
        title: portfolioForm.title,
        category: portfolioForm.category,
        image: portfolioForm.image,
      });
    } else {
      addPortfolio({
        title: portfolioForm.title,
        category: portfolioForm.category,
        image: portfolioForm.image,
      });
    }
    setIsPortfolioModalOpen(false);
  };

  // Open Testimonial Create
  const handleOpenAddTestimonial = () => {
    setEditingTestimonialId(null);
    setTestimonialForm({
      name: "",
      role: "",
      quote: "",
      rating: 5,
      initials: "",
      glow: false,
    });
    setIsTestimonialModalOpen(true);
  };

  // Open Testimonial Edit
  const handleOpenEditTestimonial = (item: TestimonialItem) => {
    setEditingTestimonialId(item.id);
    setTestimonialForm({
      name: item.name,
      role: item.role,
      quote: item.quote,
      rating: item.rating,
      initials: item.initials,
      glow: !!item.glow,
    });
    setIsTestimonialModalOpen(true);
  };

  // Submit Testimonial Form
  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testimonialForm.name.trim() || !testimonialForm.quote.trim()) return;

    // Generate initials if empty
    const initials = testimonialForm.initials.trim()
      ? testimonialForm.initials.trim().toUpperCase()
      : testimonialForm.name
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")
          .toUpperCase() || "RW";

    if (editingTestimonialId) {
      updateTestimonial(editingTestimonialId, {
        name: testimonialForm.name,
        role: testimonialForm.role,
        quote: testimonialForm.quote,
        rating: Number(testimonialForm.rating) || 5,
        initials,
        glow: testimonialForm.glow,
      });
    } else {
      addTestimonial({
        name: testimonialForm.name,
        role: testimonialForm.role,
        quote: testimonialForm.quote,
        rating: Number(testimonialForm.rating) || 5,
        initials,
        glow: testimonialForm.glow,
      });
    }
    setIsTestimonialModalOpen(false);
  };

  // Open About Feature Create
  const handleOpenAddAboutFeature = () => {
    setEditingAboutFeatureId(null);
    setAboutFeatureForm({
      title: "",
      description: "",
      icon: "layers",
    });
    setIsAboutFeatureModalOpen(true);
  };

  // Open About Feature Edit
  const handleOpenEditAboutFeature = (item: AboutFeatureItem) => {
    setEditingAboutFeatureId(item.id);
    setAboutFeatureForm({
      title: item.title,
      description: item.description,
      icon: item.icon,
    });
    setIsAboutFeatureModalOpen(true);
  };

  // Submit About Feature Form
  const handleSaveAboutFeature = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aboutFeatureForm.title.trim() || !aboutFeatureForm.description.trim()) return;

    if (editingAboutFeatureId) {
      updateAboutFeature(editingAboutFeatureId, {
        title: aboutFeatureForm.title,
        description: aboutFeatureForm.description,
        icon: aboutFeatureForm.icon,
      });
    } else {
      addAboutFeature({
        title: aboutFeatureForm.title,
        description: aboutFeatureForm.description,
        icon: aboutFeatureForm.icon,
      });
    }
    setIsAboutFeatureModalOpen(false);
  };

  // Open Process Step Create
  const handleOpenAddProcessStep = () => {
    setEditingProcessStepId(null);
    const nextNum = String(processSteps.length + 1).padStart(2, "0");
    setProcessStepForm({
      number: nextNum,
      title: "",
      description: "",
    });
    setIsProcessStepModalOpen(true);
  };

  // Open Process Step Edit
  const handleOpenEditProcessStep = (item: ProcessStepItem) => {
    setEditingProcessStepId(item.id);
    setProcessStepForm({
      number: item.number,
      title: item.title,
      description: item.description,
    });
    setIsProcessStepModalOpen(true);
  };

  // Submit Process Step Form
  const handleSaveProcessStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!processStepForm.title.trim() || !processStepForm.description.trim()) return;

    if (editingProcessStepId) {
      updateProcessStep(editingProcessStepId, {
        number: processStepForm.number.trim() || "01",
        title: processStepForm.title,
        description: processStepForm.description,
      });
    } else {
      addProcessStep({
        number: processStepForm.number.trim() || String(processSteps.length + 1).padStart(2, "0"),
        title: processStepForm.title,
        description: processStepForm.description,
      });
    }
    setIsProcessStepModalOpen(false);
  };


  return (
    <div className="flex h-screen w-full bg-[#f8fafc] text-slate-800 antialiased overflow-hidden font-sans">
      {/* ===================== SIDEBAR ===================== */}
      <aside className="w-68 bg-white border-r border-slate-200/90 flex flex-col justify-between shrink-0 z-30 shadow-xs">
        <div>
          {/* Logo Brand Header */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100 bg-white">
            <div className="flex items-center gap-2.5">
              {siteLogo ? (
                <div className="w-9 h-9 rounded-xl overflow-hidden relative border border-slate-200 shrink-0 shadow-xs">
                  <Image src={siteLogo} alt="Logo Brand" fill className="object-cover" />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00a68a] to-[#2dd4bf] flex items-center justify-center text-white font-bold text-sm shadow-xs">
                  RW
                </div>
              )}
              <div>
                <span className="font-extrabold text-[#0f172a] text-[15px] tracking-tight block leading-tight">
                  RepublikWeb
                </span>
                <span className="text-[11px] text-slate-500 tracking-wider font-semibold">
                  Admin Console
                </span>
              </div>
            </div>

            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-50" title="Sistem Aktif" />
          </div>

          {/* Navigation Menus */}
          <div className="p-4 space-y-6">
            {/* Group: MENU UTAMA */}
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold px-3 block mb-2">
                NAVIGASI ADMIN
              </span>
              <div className="space-y-1">
                {/* 1. Beranda */}
                <button
                  onClick={() => setActiveMenu("overview")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    activeMenu === "overview"
                      ? "bg-[#00a68a] text-white shadow-sm shadow-[#00a68a]/20"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Beranda</span>
                </button>

                {/* 2. Tentang Kami */}
                <button
                  onClick={() => setActiveMenu("about")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    activeMenu === "about"
                      ? "bg-[#00a68a] text-white shadow-sm shadow-[#00a68a]/20"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Tentang Kami</span>
                </button>

                {/* 3. Cara Kerja */}
                <button
                  onClick={() => setActiveMenu("process")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    activeMenu === "process"
                      ? "bg-[#00a68a] text-white shadow-sm shadow-[#00a68a]/20"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  <span>Cara Kerja</span>
                </button>

                {/* 4. Portofolio */}
                <button
                  onClick={() => setActiveMenu("portfolios")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    activeMenu === "portfolios"
                      ? "bg-[#00a68a] text-white shadow-sm shadow-[#00a68a]/20"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Portofolio</span>
                </button>

                {/* 5. Testimonial */}
                <button
                  onClick={() => setActiveMenu("testimonials")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    activeMenu === "testimonials"
                      ? "bg-[#00a68a] text-white shadow-sm shadow-[#00a68a]/20"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <span>Testimonial</span>
                </button>

                {/* 6. Katalog Template */}
                <button
                  onClick={() => setActiveMenu("templates")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    activeMenu === "templates"
                      ? "bg-[#00a68a] text-white shadow-sm shadow-[#00a68a]/20"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  <span>Katalog Template</span>
                </button>

                {/* 7. Edit Konten Teks Beranda */}
                <button
                  onClick={() => setActiveMenu("content")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    activeMenu === "content"
                      ? "bg-[#00a68a] text-white shadow-sm shadow-[#00a68a]/20"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Teks & Konten Web</span>
                </button>
              </div>
            </div>

            {/* Group 2: SISTEM & PENGATURAN */}
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold px-3 block mb-2">
                PENGATURAN & HUBUNGI KAMI
              </span>
              {/* WhatsApp & Template Pesan */}
              <button
                onClick={() => setActiveMenu("whatsapp")}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeMenu === "whatsapp"
                    ? "bg-[#00a68a] text-white shadow-sm shadow-[#00a68a]/20"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <div className="flex-1 flex items-center justify-between">
                  <span>WhatsApp & Media Sosial</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md font-bold bg-emerald-100 text-[#00a68a]">
                    SOSMED
                  </span>
                </div>
              </button>

              <button
                onClick={() => setActiveMenu("settings")}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer mt-1 ${
                  activeMenu === "settings"
                    ? "bg-[#00a68a] text-white shadow-sm shadow-[#00a68a]/20"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Pengaturan Agensi</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Admin Info */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/70 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {siteLogo ? (
                <div className="w-9 h-9 rounded-full overflow-hidden relative border border-slate-200 shrink-0 shadow-xs">
                  <Image src={siteLogo} alt="Admin Logo" fill className="object-cover" />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-full bg-[#00a68a] text-white font-extrabold flex items-center justify-center text-xs shadow-xs">
                  AD
                </div>
              )}
              <div>
                <span className="text-sm font-bold text-slate-800 block leading-tight">Admin Utama</span>
                <span className="text-xs text-slate-500">admin@republikweb.net</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Link
              href="/"
              className="flex-1 py-2 px-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-[#00a68a] hover:border-[#00a68a]/40 text-xs font-semibold text-center transition-all flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>Web Publik</span>
            </Link>
            <button
              onClick={handleAdminLogout}
              className="py-2 px-3 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* ===================== MAIN CONTENT WRAPPER ===================== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200/90 px-6 flex items-center justify-between z-20 shrink-0">
          {/* Breadcrumb & Title */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-medium text-slate-400">Admin</span>
            <span>/</span>
            <span className="text-[#0f172a] font-bold capitalize">
              {activeMenu === "overview" && "Dashboard Ringkasan"}
              {activeMenu === "content" && "Edit Beranda"}
              {activeMenu === "portfolios" && "Galeri Portofolio"}
              {activeMenu === "templates" && "Katalog Template Marketplace"}
              {activeMenu === "testimonials" && "Testimoni Klien"}
              {activeMenu === "about" && "Tentang Kami & Keunggulan"}
              {activeMenu === "process" && "Cara Kerja & Alur Pengerjaan"}
              {activeMenu === "whatsapp" && "Konfigurasi WhatsApp & Media Sosial"}
              {activeMenu === "settings" && "Pengaturan Agensi"}
            </span>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenAddProcessStep}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-xs"
            >
              <span>+ Langkah</span>
            </button>

            <button
              onClick={handleOpenAddAboutFeature}
              className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-xs"
            >
              <span>+ Keunggulan</span>
            </button>

            <button
              onClick={handleOpenAddTestimonial}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-xs"
            >
              <span>+ Testimoni</span>
            </button>

            <button
              onClick={handleOpenAddPortfolio}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-xs"
            >
              <span>+ Portofolio</span>
            </button>

            <button
              onClick={handleOpenAddTemplate}
              className="px-3.5 py-1.5 bg-[#00a68a] hover:bg-[#008f76] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-sm shadow-[#00a68a]/20"
            >
              <span>+ Template</span>
            </button>

            <div className="h-5 w-px bg-slate-200 mx-1" />

            <button
              onClick={handleAdminLogout}
              className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Keluar dari sesi admin"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-8 bg-[#f8fafc]">
          {/* ============================================================== */}
          {/* TAB 1: OVERVIEW */}
          {/* ============================================================== */}
          {activeMenu === "overview" && (
            <div className="space-y-8">
              {/* 6 Main Content KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {/* KPI 1: Template Marketplace */}
                <div
                  onClick={() => setActiveMenu("templates")}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-xs font-medium group-hover:text-[#00a68a] transition-colors">
                      Template
                    </span>
                    <span className="w-8 h-8 rounded-xl bg-emerald-50 text-[#00a68a] flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-[#0f172a] mt-2 tracking-tight">
                    {templates.length} Item
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-xs">
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                      Live di Web
                    </span>
                    <span className="text-slate-400 text-[11px]">Kelola →</span>
                  </div>
                </div>

                {/* KPI 2: Portfolio Projects */}
                <div
                  onClick={() => setActiveMenu("portfolios")}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-xs font-medium group-hover:text-sky-600 transition-colors">
                      Portofolio
                    </span>
                    <span className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-[#0f172a] mt-2 tracking-tight">
                    {portfolios.length} Karya
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-xs">
                    <span className="text-sky-700 font-bold bg-sky-50 px-1.5 py-0.5 rounded text-[10px]">
                      Showcase
                    </span>
                    <span className="text-slate-400 text-[11px]">Kelola →</span>
                  </div>
                </div>

                {/* KPI 3: Testimoni Klien */}
                <div
                  onClick={() => setActiveMenu("testimonials")}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-xs font-medium group-hover:text-amber-600 transition-colors">
                      Testimoni
                    </span>
                    <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-[#0f172a] mt-2 tracking-tight">
                    {testimonials.length} Ulasan
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-xs">
                    <span className="text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded text-[10px]">
                      Rating & Klien
                    </span>
                    <span className="text-slate-400 text-[11px]">Kelola →</span>
                  </div>
                </div>

                {/* KPI 4: Tentang Kami & Nilai Tambah */}
                <div
                  onClick={() => setActiveMenu("about")}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-xs font-medium group-hover:text-teal-600 transition-colors">
                      Tentang Kami
                    </span>
                    <span className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-[#0f172a] mt-2 tracking-tight">
                    {aboutFeatures.length} Nilai
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-xs">
                    <span className="text-teal-700 font-bold bg-teal-50 px-1.5 py-0.5 rounded text-[10px]">
                      Keunggulan
                    </span>
                    <span className="text-slate-400 text-[11px]">Kelola →</span>
                  </div>
                </div>

                {/* KPI 5: Cara Kerja */}
                <div
                  onClick={() => setActiveMenu("process")}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-xs font-medium group-hover:text-emerald-600 transition-colors">
                      Cara Kerja
                    </span>
                    <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-[#0f172a] mt-2 tracking-tight">
                    {processSteps.length} Langkah
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-xs">
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                      Alur Kerja
                    </span>
                    <span className="text-slate-400 text-[11px]">Kelola →</span>
                  </div>
                </div>

                {/* KPI 6: Edit Beranda */}
                <div
                  onClick={() => setActiveMenu("content")}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-xs font-medium group-hover:text-purple-600 transition-colors">
                      Beranda
                    </span>
                    <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-[#0f172a] mt-2 tracking-tight">
                    Teks Web
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-xs">
                    <span className="text-purple-700 font-bold bg-purple-50 px-1.5 py-0.5 rounded text-[10px]">
                      Live Editable
                    </span>
                    <span className="text-slate-400 text-[11px]">Kelola →</span>
                  </div>
                </div>
              </div>


              {/* Quick Actions & Content Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Content Distribution Breakdown */}
                <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Distribusi Kategori Portofolio & Template</h4>
                      <p className="text-xs text-slate-500">Komposisi konten yang ditampilkan kepada calon klien.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Landing Page */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-800">Landing Page & Promosi</span>
                        <span className="text-[#00a68a] font-bold">
                          {portfolios.filter(p => p.category === "Landing Page").length} Karya
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-[#00a68a] rounded-full transition-all"
                          style={{
                            width: `${Math.min(100, (portfolios.filter(p => p.category === "Landing Page").length / portfolios.length) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Website Custom */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-800">Website Custom & Company Profile</span>
                        <span className="text-sky-600 font-bold">
                          {portfolios.filter(p => p.category === "Website").length} Karya
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-sky-500 rounded-full transition-all"
                          style={{
                            width: `${Math.min(100, (portfolios.filter(p => p.category === "Website").length / portfolios.length) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* E-Commerce */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-800">E-Commerce & Toko Online</span>
                        <span className="text-amber-600 font-bold">
                          {portfolios.filter(p => p.category === "E-Commerce").length} Karya
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full transition-all"
                          style={{
                            width: `${Math.min(100, (portfolios.filter(p => p.category === "E-Commerce").length / portfolios.length) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Social Media */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-800">Social Media Management & Branding</span>
                        <span className="text-purple-600 font-bold">
                          {portfolios.filter(p => p.category === "Social Media").length} Karya
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-purple-500 rounded-full transition-all"
                          style={{
                            width: `${Math.min(100, (portfolios.filter(p => p.category === "Social Media").length / portfolios.length) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleOpenAddPortfolio}
                      className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs"
                    >
                      + Tambah Portofolio Baru
                    </button>
                    <button
                      onClick={handleOpenAddTemplate}
                      className="px-4 py-2 bg-[#00a68a] hover:bg-[#008f76] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs"
                    >
                      + Tambah Template Baru
                    </button>
                  </div>
                </div>

                {/* Quick Info & Public Link */}
                <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">Sinkronisasi Realtime Web Publik</h4>
                    <p className="text-xs text-slate-500 mb-4">
                      Setiap perubahan, penambahan, atau penghapusan data di dashboard ini langsung tampil secara langsung di website RepublikWeb.
                    </p>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Status Data:</span>
                        <span className="font-bold text-emerald-600">Tersinkronisasi Otomatis</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Katalog Template:</span>
                        <span className="font-bold text-slate-900">{templates.length} Item</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Showcase Portofolio:</span>
                        <span className="font-bold text-slate-900">{portfolios.length} Item</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Testimoni Klien:</span>
                        <span className="font-bold text-slate-900">{testimonials.length} Review</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Kartu Keunggulan:</span>
                        <span className="font-bold text-slate-900">{aboutFeatures.length} Poin</span>
                      </div>
                      <div className="flex items-center justify-between border-t border-slate-200/60 pt-1.5">
                        <span className="text-slate-600">Link WhatsApp Aktif:</span>
                        <button
                          type="button"
                          onClick={() => setActiveMenu("whatsapp")}
                          className="font-bold text-[#00a68a] hover:underline flex items-center gap-1"
                        >
                          <span>5 Titik Terhubung</span>
                          <span className="text-[10px]">⚙</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link
                      href="/"
                      target="_blank"
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[#00a68a] text-xs font-bold text-center block transition-all"
                    >
                      Buka & Lihat Web Publik Sekarang ↗
                    </Link>
                  </div>
                </div>
              </div>


            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: PORTOFOLIO CRUD */}
          {/* ============================================================== */}
          {activeMenu === "portfolios" && (
            <div className="space-y-6">
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Kelola Galeri Portofolio RepublikWeb</h3>
                  <p className="text-xs text-slate-500">
                    Tambah, edit, dan hapus project yang tampil di section portofolio beranda.
                  </p>
                </div>

                <button
                  onClick={handleOpenAddPortfolio}
                  className="px-4 py-2.5 bg-[#00a68a] hover:bg-[#008f76] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm shadow-[#00a68a]/20"
                >
                  <span>+ Tambah Portofolio Baru</span>
                </button>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
                {["Semua", "Landing Page", "Website", "E-Commerce", "Social Media"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setPortfolioFilterCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                      portfolioFilterCategory === cat
                        ? "bg-[#00a68a] text-white font-bold shadow-2xs"
                        : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Portfolio Data Table */}
              <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-5">Gambar Preview</th>
                      <th className="py-3.5 px-5">Judul Project</th>
                      <th className="py-3.5 px-5">Kategori</th>
                      <th className="py-3.5 px-5">Lokasi Gambar</th>
                      <th className="py-3.5 px-5 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {portfolios
                      .filter((p) => portfolioFilterCategory === "Semua" || p.category === portfolioFilterCategory)
                      .map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-5">
                            <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                              <Image src={item.image} alt={item.title} fill className="object-cover" />
                            </div>
                          </td>
                          <td className="py-3.5 px-5 font-bold text-slate-900 text-sm">{item.title}</td>
                          <td className="py-3.5 px-5">
                            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-md text-[11px] font-bold">
                              {item.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-5 text-slate-500 font-normal">{item.image}</td>
                          <td className="py-3.5 px-5 text-right space-x-2">
                            <button
                              onClick={() => handleOpenEditPortfolio(item)}
                              className="text-slate-600 hover:text-slate-900 font-semibold text-xs cursor-pointer px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Yakin ingin menghapus portofolio "${item.title}"?`)) {
                                  deletePortfolio(item.id);
                                }
                              }}
                              className="text-rose-600 hover:text-rose-800 font-semibold text-xs cursor-pointer px-2.5 py-1 hover:bg-rose-50 rounded-lg transition-all"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* ============================================================== */}
          {/* TAB 3: TEMPLATES CRUD */}
          {/* ============================================================== */}
          {activeMenu === "templates" && (
            <div className="space-y-6">
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Katalog Template RepublikWeb</h3>
                  <p className="text-xs text-slate-500">
                    Kelola template website yang tampil di marketplace beranda publik.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsCategoryModalOpen(true)}
                    className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-slate-200"
                  >
                    <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span>Kelola Kategori</span>
                  </button>
                  <button
                    onClick={handleOpenAddTemplate}
                    className="px-4 py-2.5 bg-[#00a68a] hover:bg-[#008f76] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm shadow-[#00a68a]/20"
                  >
                    <span>+ Tambah Template Baru</span>
                  </button>
                </div>
              </div>

              {/* Top Filters: Category Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-slate-200 scrollbar-none">
                {["Semua", ...Array.from(new Set([...(templateCategories || []), ...templates.map(t => t.category).filter(Boolean)]))].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setTemplateFilterCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all whitespace-nowrap ${
                      templateFilterCategory === cat
                        ? "bg-slate-900 text-white font-bold shadow-2xs"
                        : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Data Table */}
              <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-5">Preview</th>
                      <th className="py-3.5 px-5">Nama Template</th>
                      <th className="py-3.5 px-5">Kategori</th>
                      <th className="py-3.5 px-5">Harga</th>
                      <th className="py-3.5 px-5">Deskripsi</th>
                      <th className="py-3.5 px-5 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {templates
                      .filter((t) => {
                        if (templateFilterCategory !== "Semua" && t.category.toLowerCase() !== templateFilterCategory.toLowerCase()) return false;
                        return true;
                      })
                      .map((tpl) => (
                        <tr key={tpl.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-5">
                            <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                              <Image src={tpl.image} alt={tpl.title} fill className="object-cover" />
                            </div>
                          </td>
                          <td className="py-3.5 px-5 font-bold text-slate-900 text-sm">{tpl.title}</td>
                          <td className="py-3.5 px-5">
                            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium">
                              {tpl.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-5 font-bold text-sm text-[#00a68a]">
                            {tpl.price}
                          </td>
                          <td className="py-3.5 px-5 text-slate-500 max-w-xs truncate">{tpl.description}</td>
                          <td className="py-3.5 px-5 text-right space-x-2">
                            <button
                              onClick={() => handleOpenEditTemplate(tpl)}
                              className="text-slate-600 hover:text-slate-900 font-semibold text-xs cursor-pointer px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Yakin ingin menghapus template "${tpl.title}"?`)) {
                                  deleteTemplate(tpl.id);
                                }
                              }}
                              className="text-rose-600 hover:text-rose-800 font-semibold text-xs cursor-pointer px-2.5 py-1 hover:bg-rose-50 rounded-lg transition-all"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 4: TESTIMONIALS CRUD */}
          {/* ============================================================== */}
          {activeMenu === "testimonials" && (
            <div className="space-y-6">
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Kelola Testimoni Klien</h3>
                  <p className="text-xs text-slate-500">
                    Tambah, edit, dan kelola review klien yang tampil di section testimoni beranda website.
                  </p>
                </div>

                <button
                  onClick={handleOpenAddTestimonial}
                  className="px-4 py-2.5 bg-[#00a68a] hover:bg-[#008f76] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm shadow-[#00a68a]/20"
                >
                  <span>+ Tambah Testimoni Baru</span>
                </button>
              </div>

              {/* Testimonials Grid Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-white rounded-2xl border p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all relative group ${
                      item.glow ? "border-[#00a68a]/40 ring-2 ring-[#00a68a]/10" : "border-slate-200/90"
                    }`}
                  >
                    <div>
                      {/* Rating & Glow Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1 text-amber-400">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <svg
                              key={idx}
                              className={`w-4 h-4 ${idx < item.rating ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-xs font-bold text-slate-700 ml-1.5">{item.rating}.0</span>
                        </div>

                        {item.glow && (
                          <span className="text-[10px] font-bold bg-[#00a68a]/10 text-[#00a68a] px-2 py-0.5 rounded-full">
                            Featured Highlight
                          </span>
                        )}
                      </div>

                      {/* Quote Text */}
                      <p className="text-slate-600 text-xs leading-relaxed italic mb-5 line-clamp-4">
                        &quot;{item.quote.replace(/^["']|["']$/g, "")}&quot;
                      </p>
                    </div>

                    <div>
                      {/* Client Info */}
                      <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                        <div className="w-10 h-10 rounded-full bg-[#e6f9f3] text-[#00a68a] font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                          {item.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-slate-900 text-xs truncate">{item.name}</h4>
                          <p className="text-[11px] text-slate-500 truncate">{item.role}</p>
                        </div>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
                        <button
                          onClick={() => handleOpenEditTestimonial(item)}
                          className="flex-1 py-1.5 px-3 bg-slate-100 hover:bg-[#00a68a] hover:text-white text-slate-700 font-bold rounded-lg text-xs transition-all cursor-pointer text-center"
                        >
                          Edit Testimoni
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Yakin ingin menghapus testimoni dari "${item.name}"?`)) {
                              deleteTestimonial(item.id);
                            }
                          }}
                          className="py-1.5 px-3 hover:bg-rose-50 text-rose-600 font-bold rounded-lg text-xs transition-all cursor-pointer"
                          title="Hapus Testimoni"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 5: TENTANG KAMI & KEUNGGULAN */}
          {/* ============================================================== */}
          {activeMenu === "about" && (
            <div className="space-y-6 max-w-5xl">
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Kelola Section Tentang Kami</h3>
                  <p className="text-xs text-slate-500">
                    Atur narasi pengenalan RepublikWeb, tagline, dan poin-poin kartu keunggulan/nilai tambah.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleOpenAddAboutFeature}
                    className="px-4 py-2.5 bg-[#00a68a] hover:bg-[#008f76] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm shadow-[#00a68a]/20"
                  >
                    <span>+ Tambah Kartu Keunggulan</span>
                  </button>
                  <Link
                    href="/#tentang-kami"
                    target="_blank"
                    className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <span>Lihat di Web ↗</span>
                  </Link>
                </div>
              </div>

              {contentSavedNotice && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-bold animate-fadeIn">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">✓</span>
                  <span>Perubahan teks Tentang Kami berhasil disimpan dan langsung live!</span>
                </div>
              )}

              {/* Form Teks Narasi Tentang Kami */}
              <form onSubmit={handleSaveSiteContent} className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs">
                      1
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">Narasi & Judul Section Tentang Kami</h4>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Teks Langsung Live
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Sub-label / Tagline Section</label>
                    <input
                      type="text"
                      value={tempSiteContent.aboutSubtitle || ""}
                      onChange={(e) => setTempSiteContent({ ...tempSiteContent, aboutSubtitle: e.target.value })}
                      placeholder="Contoh: TENTANG KAMI"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Judul Utama Tentang Kami</label>
                    <input
                      type="text"
                      value={tempSiteContent.aboutTitle}
                      onChange={(e) => setTempSiteContent({ ...tempSiteContent, aboutTitle: e.target.value })}
                      placeholder="Judul Tentang Kami..."
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Paragraf Deskripsi Tentang Kami</label>
                  <textarea
                    rows={3}
                    value={tempSiteContent.aboutDescription}
                    onChange={(e) => setTempSiteContent({ ...tempSiteContent, aboutDescription: e.target.value })}
                    placeholder="Paragraf penjelasan tentang visi & nilai RepublikWeb..."
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all resize-none leading-relaxed"
                  />
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#00a68a] hover:bg-[#008f76] text-white font-bold rounded-xl text-xs transition-all shadow-sm shadow-[#00a68a]/30 cursor-pointer flex items-center gap-2"
                  >
                    <span>Simpan Perubahan Teks</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTempSiteContent(siteContent)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-all cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </form>

              {/* Grid 6 Kartu Keunggulan / Nilai Tambah */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs">
                      2
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Kartu Keunggulan & Solusi ({aboutFeatures.length} Kartu)</h4>
                      <p className="text-xs text-slate-500">Nilai tambah yang ditampilkan dalam format card di halaman Tentang Kami.</p>
                    </div>
                  </div>

                  <button
                    onClick={handleOpenAddAboutFeature}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs self-start sm:self-auto"
                  >
                    <span>+ Tambah Kartu Baru</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                  {aboutFeatures.map((item) => (
                    <div
                      key={item.id}
                      className="p-5 rounded-2xl bg-[#fafdfc] border border-slate-200 flex flex-col justify-between hover:bg-white hover:border-[#00a68a]/50 hover:shadow-sm transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="w-9 h-9 rounded-xl bg-[#eaf7f4] text-[#00a68a] font-bold text-xs flex items-center justify-center uppercase">
                            {item.icon}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleOpenEditAboutFeature(item)}
                              className="px-2.5 py-1 rounded-lg text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-[#00a68a] hover:text-white hover:border-[#00a68a] transition-all cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Yakin ingin menghapus kartu keunggulan "${item.title}"?`)) {
                                  deleteAboutFeature(item.id);
                                }
                              }}
                              className="px-2.5 py-1 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                            >
                              Hapus
                            </button>
                          </div>
                        </div>
                        <h5 className="font-bold text-slate-900 text-sm mb-1.5">{item.title}</h5>
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 6: CARA KERJA & ALUR PENGERJAAN */}
          {/* ============================================================== */}
          {activeMenu === "process" && (
            <div className="space-y-6 max-w-5xl">
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Kelola Section Cara Kerja</h3>
                  <p className="text-xs text-slate-500">
                    Atur judul, deskripsi alur kerja, dan langkah-langkah tahapan pengerjaan project RepublikWeb.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleOpenAddProcessStep}
                    className="px-4 py-2.5 bg-[#00a68a] hover:bg-[#008f76] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm shadow-[#00a68a]/20"
                  >
                    <span>+ Tambah Langkah Baru</span>
                  </button>
                  <Link
                    href="/#cara-kerja"
                    target="_blank"
                    className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <span>Lihat di Web ↗</span>
                  </Link>
                </div>
              </div>

              {contentSavedNotice && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-bold animate-fadeIn">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">✓</span>
                  <span>Perubahan teks Cara Kerja berhasil disimpan dan langsung live!</span>
                </div>
              )}

              {/* Form Teks Section Cara Kerja */}
              <form onSubmit={handleSaveSiteContent} className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-emerald-50 text-[#00a68a] flex items-center justify-center font-bold text-xs">
                      1
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">Header & Deskripsi Section Cara Kerja</h4>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Teks Langsung Live
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Sub-label / Tagline Section</label>
                    <input
                      type="text"
                      value={tempSiteContent.processSubtitle || ""}
                      onChange={(e) => setTempSiteContent({ ...tempSiteContent, processSubtitle: e.target.value })}
                      placeholder="Contoh: CARA KERJA"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Judul Utama Cara Kerja</label>
                    <input
                      type="text"
                      value={tempSiteContent.processTitle}
                      onChange={(e) => setTempSiteContent({ ...tempSiteContent, processTitle: e.target.value })}
                      placeholder="Judul Cara Kerja..."
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Paragraf Deskripsi Cara Kerja</label>
                  <textarea
                    rows={3}
                    value={tempSiteContent.processDescription}
                    onChange={(e) => setTempSiteContent({ ...tempSiteContent, processDescription: e.target.value })}
                    placeholder="Paragraf penjelasan alur pengerjaan..."
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all resize-none leading-relaxed"
                  />
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#00a68a] hover:bg-[#008f76] text-white font-bold rounded-xl text-xs transition-all shadow-sm shadow-[#00a68a]/30 cursor-pointer flex items-center gap-2"
                  >
                    <span>Simpan Perubahan Teks</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTempSiteContent(siteContent)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-all cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </form>

              {/* Grid Langkah-Langkah Cara Kerja */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-emerald-50 text-[#00a68a] flex items-center justify-center font-bold text-xs">
                      2
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Tahapan Alur Kerja ({processSteps.length} Langkah)</h4>
                      <p className="text-xs text-slate-500">Urutan langkah yang ditampilkan dengan nomor melingkar dan garis penghubung.</p>
                    </div>
                  </div>

                  <button
                    onClick={handleOpenAddProcessStep}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs self-start sm:self-auto"
                  >
                    <span>+ Tambah Langkah Baru</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                  {processSteps.map((step) => (
                    <div
                      key={step.id}
                      className="p-5 rounded-2xl bg-[#fafdfc] border border-slate-200 flex flex-col justify-between hover:bg-white hover:border-[#00a68a]/50 hover:shadow-sm transition-all relative group"
                    >
                      <div>
                        {/* Step Number Badge */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-10 h-10 rounded-full bg-[#00a68a] text-white font-bold text-sm flex items-center justify-center shadow-xs ring-4 ring-[#e6f9f3]">
                            {step.number}
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleOpenEditProcessStep(step)}
                              className="px-2 py-1 rounded-lg text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-[#00a68a] hover:text-white hover:border-[#00a68a] transition-all cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Yakin ingin menghapus langkah "${step.title}"?`)) {
                                  deleteProcessStep(step.id);
                                }
                              }}
                              className="px-2 py-1 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                            >
                              Hapus
                            </button>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <h5 className="font-bold text-slate-900 text-sm mb-1.5 group-hover:text-[#00a68a] transition-colors">{step.title}</h5>
                        <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB: KELOLA TEKS & GAMBAR BERANDA */}
          {/* ============================================================== */}
          {activeMenu === "content" && (
            <div className="space-y-6 max-w-4xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Edit Beranda</h3>
                  <p className="text-xs text-slate-500">
                    Kustomisasi headline, sub-headline, deskripsi, dan gambar mockup beranda secara langsung.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/"
                    target="_blank"
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <span>Lihat di Web ↗</span>
                  </Link>
                </div>
              </div>

              {contentSavedNotice && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-bold animate-fadeIn">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">✓</span>
                  <span>Perubahan tulisan beranda berhasil disimpan dan langsung live di website!</span>
                </div>
              )}

              {/* Form Content Sections */}
              <form onSubmit={handleSaveSiteContent} className="space-y-6">
                {/* 1. HERO SECTION (BANNER UTAMA) */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-emerald-50 text-[#00a68a] flex items-center justify-center font-bold text-xs">
                        1
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">Hero Section (Banner Utama Beranda)</h4>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Bagian Pertama Web</span>
                  </div>

                  {/* Gambar Hero Mockup */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Gambar Mockup Hero Beranda
                    </label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                      <div className="relative w-36 h-24 rounded-lg overflow-hidden border border-slate-300 bg-white shadow-2xs shrink-0">
                        <Image
                          src={heroImage || "/hero-mockup.jpg"}
                          alt="Preview Mockup Hero"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                updateHeroImage(reader.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#00a68a] file:text-white hover:file:bg-[#008f76] cursor-pointer"
                        />
                        <p className="text-[11px] text-slate-500">
                          Format disarankan: JPG, PNG, atau WEBP. Gambar ini otomatis langsung tampil di layar mockup sebelah kanan beranda.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Judul Hero */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Judul Utama (Headline Hero)
                    </label>
                    <textarea
                      rows={2}
                      value={tempSiteContent.heroTitle}
                      onChange={(e) => setTempSiteContent({ ...tempSiteContent, heroTitle: e.target.value })}
                      placeholder="Contoh: Bangun Kehadiran Digital yang Siap Berkembang."
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all resize-none font-medium"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">Gunakan enter/baris baru jika ingin teks headline turun ke baris berikutnya.</p>
                  </div>

                  {/* Subtitle Hero */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Sub-Judul / Deskripsi Pendukung Hero
                    </label>
                    <textarea
                      rows={3}
                      value={tempSiteContent.heroSubtitle}
                      onChange={(e) => setTempSiteContent({ ...tempSiteContent, heroSubtitle: e.target.value })}
                      placeholder="Deskripsi singkat yang tampil tepat di bawah headline..."
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all resize-none"
                    />
                  </div>
                </div>

                {/* 2. SECTION TENTANG KAMI */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
                        2
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">Section Tentang Kami (#tentang-kami)</h4>
                    </div>
                    <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                      Teks & Kartu Keunggulan
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Sub-label / Tagline Section</label>
                      <input
                        type="text"
                        value={tempSiteContent.aboutSubtitle || ""}
                        onChange={(e) => setTempSiteContent({ ...tempSiteContent, aboutSubtitle: e.target.value })}
                        placeholder="Contoh: TENTANG KAMI"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Judul Utama Tentang Kami</label>
                      <input
                        type="text"
                        value={tempSiteContent.aboutTitle}
                        onChange={(e) => setTempSiteContent({ ...tempSiteContent, aboutTitle: e.target.value })}
                        placeholder="Judul Tentang Kami..."
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Paragraf Deskripsi Tentang Kami</label>
                    <textarea
                      rows={3}
                      value={tempSiteContent.aboutDescription}
                      onChange={(e) => setTempSiteContent({ ...tempSiteContent, aboutDescription: e.target.value })}
                      placeholder="Paragraf penjelasan tentang kami..."
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Kelola 6 Kartu Keunggulan / Alasan Memilih Kami */}
                  <div className="pt-3 border-t border-slate-100">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <h5 className="text-xs font-bold text-slate-900">Kartu Keunggulan / Nilai Tambah ({aboutFeatures.length} Kartu)</h5>
                        <p className="text-[11px] text-slate-500">Poin-poin keunggulan yang tampil di grid Tentang Kami pada beranda.</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleOpenAddAboutFeature}
                        className="px-3 py-1.5 bg-[#00a68a] hover:bg-[#008f76] text-white text-[11px] font-bold rounded-lg transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-2xs"
                      >
                        <span>+ Tambah Kartu</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {aboutFeatures.map((item) => (
                        <div
                          key={item.id}
                          className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:bg-white hover:border-[#00a68a]/40 transition-all"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="w-7 h-7 rounded-lg bg-[#eaf7f4] text-[#00a68a] font-bold text-[11px] flex items-center justify-center uppercase">
                                {item.icon}
                              </span>
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => handleOpenEditAboutFeature(item)}
                                  className="px-2 py-0.5 rounded text-[10px] font-bold text-[#00a68a] hover:bg-emerald-50 transition-all cursor-pointer"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (confirm(`Hapus kartu "${item.title}"?`)) {
                                      deleteAboutFeature(item.id);
                                    }
                                  }}
                                  className="px-2 py-0.5 rounded text-[10px] font-bold text-rose-500 hover:bg-rose-50 transition-all cursor-pointer"
                                >
                                  Hapus
                                </button>
                              </div>
                            </div>
                            <h6 className="font-bold text-slate-900 text-xs mb-1">{item.title}</h6>
                            <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. SECTION CARA KERJA & PILIH SOLUSI */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-xs">
                        3
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">Section Cara Kerja & Pilih Solusi</h4>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Judul Section Cara Kerja</label>
                      <input
                        type="text"
                        value={tempSiteContent.processTitle}
                        onChange={(e) => setTempSiteContent({ ...tempSiteContent, processTitle: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Cara Kerja</label>
                      <input
                        type="text"
                        value={tempSiteContent.processDescription}
                        onChange={(e) => setTempSiteContent({ ...tempSiteContent, processDescription: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Judul Pilih Solusi</label>
                      <input
                        type="text"
                        value={tempSiteContent.solutionTitle}
                        onChange={(e) => setTempSiteContent({ ...tempSiteContent, solutionTitle: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Sub-label / Tagline Pilih Solusi</label>
                      <input
                        type="text"
                        value={tempSiteContent.solutionSubtitle}
                        onChange={(e) => setTempSiteContent({ ...tempSiteContent, solutionSubtitle: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. SECTION HEADER TESTIMONI */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
                        4
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">Header Section Testimonial</h4>
                    </div>
                    <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                      Teks Judul Testimoni
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Sub-label / Tagline Testimoni</label>
                      <input
                        type="text"
                        value={tempSiteContent.testimonialSubtitle}
                        onChange={(e) => setTempSiteContent({ ...tempSiteContent, testimonialSubtitle: e.target.value })}
                        placeholder="Contoh: TESTIMONIAL"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Judul Utama Testimoni</label>
                      <input
                        type="text"
                        value={tempSiteContent.testimonialTitle}
                        onChange={(e) => setTempSiteContent({ ...tempSiteContent, testimonialTitle: e.target.value })}
                        placeholder="Contoh: Apa Kata Klien Kami?"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Save Button Bar */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#00a68a] hover:bg-[#008f76] text-white font-bold rounded-xl text-xs transition-all shadow-sm shadow-[#00a68a]/30 cursor-pointer flex items-center gap-2"
                  >
                    <span>Simpan Seluruh Perubahan Teks & Gambar</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTempSiteContent(siteContent)}
                    className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-all cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          )}


          {/* ============================================================== */}
          {/* TAB 8: PENGATURAN AGENSI & HUBUNGI KAMI */}
          {/* ============================================================== */}
          {activeMenu === "settings" && (
            <div className="max-w-4xl space-y-8">
              {contentSavedNotice && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn shadow-xs">
                  <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Pengaturan Agensi & Kontak Hubungi Kami berhasil disimpan dan langsung aktif di web publik!</span>
                </div>
              )}

              {/* CARD 1: HUBUNGI KAMI */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 md:p-8 space-y-6 shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#00a68a] flex items-center justify-center font-bold">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Edit Kontak "HUBUNGI KAMI"</h3>
                      <p className="text-xs text-slate-500">
                        Informasi kontak ini langsung tampil di footer website publik.
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-[#00a68a] border border-emerald-200">
                    Footer Web Publik
                  </span>
                </div>

                <form onSubmit={handleSaveSiteContent} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Email Resmi */}
                    <div>
                      <label className="block text-slate-700 mb-1.5 font-bold flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-[#00a68a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>Email Resmi</span>
                      </label>
                      <input
                        type="email"
                        value={tempSiteContent.contactEmail || ""}
                        onChange={(e) => setTempSiteContent({ ...tempSiteContent, contactEmail: e.target.value })}
                        placeholder="Contoh: halo@republikweb.net"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-[#00a68a] focus:bg-white focus:outline-none transition-all"
                      />
                      <span className="text-[11px] text-slate-400 mt-1 block">Tampil pada link email resmi footer.</span>
                    </div>

                    {/* WhatsApp / Telp */}
                    <div>
                      <label className="block text-slate-700 mb-1.5 font-bold flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-[#00a68a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>WhatsApp / Telp</span>
                      </label>
                      <input
                        type="text"
                        value={tempSiteContent.contactWhatsapp || ""}
                        onChange={(e) => setTempSiteContent({ ...tempSiteContent, contactWhatsapp: e.target.value })}
                        placeholder="Contoh: +62 812-3456-7890"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-[#00a68a] focus:bg-white focus:outline-none transition-all"
                      />
                      <span className="text-[11px] text-slate-400 mt-1 block">Otomatis menjadi link klik chat WhatsApp.</span>
                    </div>

                    {/* Jam Layanan */}
                    <div>
                      <label className="block text-slate-700 mb-1.5 font-bold flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-[#00a68a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Jam Layanan</span>
                      </label>
                      <input
                        type="text"
                        value={tempSiteContent.contactHours || ""}
                        onChange={(e) => setTempSiteContent({ ...tempSiteContent, contactHours: e.target.value })}
                        placeholder="Contoh: Senin – Sabtu, 09.00 – 18.00 WIB"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-[#00a68a] focus:bg-white focus:outline-none transition-all"
                      />
                    </div>

                    {/* Lokasi Kantor */}
                    <div>
                      <label className="block text-slate-700 mb-1.5 font-bold flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-[#00a68a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Lokasi Kantor</span>
                      </label>
                      <input
                        type="text"
                        value={tempSiteContent.contactLocation || ""}
                        onChange={(e) => setTempSiteContent({ ...tempSiteContent, contactLocation: e.target.value })}
                        placeholder="Contoh: Jakarta & Yogyakarta, Indonesia"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-[#00a68a] focus:bg-white focus:outline-none transition-all"
                      />
                    </div>

                    {/* Link Instagram */}
                    <div>
                      <label className="block text-slate-700 mb-1.5 font-bold flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-[#00a68a]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                        <span>Link Profil Instagram</span>
                      </label>
                      <input
                        type="url"
                        value={tempSiteContent.socialInstagram || ""}
                        onChange={(e) => setTempSiteContent({ ...tempSiteContent, socialInstagram: e.target.value })}
                        placeholder="Contoh: https://instagram.com/republikweb"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-[#00a68a] focus:bg-white focus:outline-none transition-all"
                      />
                      <span className="text-[11px] text-slate-400 mt-1 block">Tampil pada ikon Instagram di footer website.</span>
                    </div>

                    {/* Link LinkedIn */}
                    <div>
                      <label className="block text-slate-700 mb-1.5 font-bold flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-[#00a68a]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                        <span>Link Halaman LinkedIn</span>
                      </label>
                      <input
                        type="url"
                        value={tempSiteContent.socialLinkedin || ""}
                        onChange={(e) => setTempSiteContent({ ...tempSiteContent, socialLinkedin: e.target.value })}
                        placeholder="Contoh: https://linkedin.com/company/republikweb"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-[#00a68a] focus:bg-white focus:outline-none transition-all"
                      />
                      <span className="text-[11px] text-slate-400 mt-1 block">Tampil pada ikon LinkedIn di footer website.</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#00a68a] hover:bg-[#008f76] text-white font-bold rounded-xl transition-all shadow-sm shadow-[#00a68a]/20 cursor-pointer flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Simpan Kontak Hubungi Kami</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTempSiteContent(siteContent)}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold rounded-xl cursor-pointer"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>

              {/* CARD 2: PENGATURAN UMUM & GAMBAR HERO */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 md:p-8 space-y-6 shadow-2xs">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Konfigurasi Brand & Banner Hero</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Ganti gambar mockup beranda dan voucher member.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 mb-1.5 font-medium">Nama Brand Website</label>
                      <input
                        type="text"
                        defaultValue="RepublikWeb.net"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-[#00a68a] focus:bg-white focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 mb-1.5 font-medium">Kode Voucher Member Aktif</label>
                      <input
                        type="text"
                        defaultValue="MEMBER15 (Diskon 15%)"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:ring-2 focus:ring-[#00a68a] focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Upload Logo Web */}
                  <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="block text-slate-800 font-bold text-xs">
                          Logo Website (Navbar & Footer Publik)
                        </label>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Format PNG, SVG, atau JPG transparan (disarankan rasio 1:1 atau persegi).
                        </p>
                      </div>
                      {siteLogo && (
                        <button
                          type="button"
                          onClick={() => updateSiteLogo("")}
                          className="text-[11px] text-rose-500 hover:text-rose-700 font-bold hover:underline cursor-pointer"
                        >
                          Reset ke Default
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Logo Preview */}
                      <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center p-1.5 shrink-0 shadow-2xs overflow-hidden relative group">
                        {siteLogo ? (
                          <Image src={siteLogo} alt="Logo Web Preview" fill className="object-contain p-1" />
                        ) : (
                          <div className="w-full h-full rounded-xl bg-[#00a68a] text-white flex items-center justify-center font-bold text-base shadow-xs">
                            R
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                updateSiteLogo(reader.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#00a68a] file:text-white hover:file:bg-[#008f76] cursor-pointer file:cursor-pointer"
                        />
                        <span className="text-[11px] text-slate-400 mt-1 block">
                          Logo otomatis berganti di Navbar Beranda, Footer, dan Sidebar Admin.
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1.5 font-medium">Gambar Awal Beranda (Hero Mockup)</label>
                    <div className="flex items-center gap-3">
                      {heroImage && (
                        <div className="w-20 h-14 relative rounded-xl overflow-hidden border border-slate-200 shrink-0 shadow-2xs">
                          <Image src={heroImage} alt="Hero Preview" fill className="object-cover" />
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              updateHeroImage(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#00a68a] file:text-white hover:file:bg-[#008f76] cursor-pointer file:cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 9: PENGATURAN WHATSAPP & TEMPLATE PESAN */}
          {/* ============================================================== */}
          {activeMenu === "whatsapp" && (
            <div className="max-w-4xl space-y-8 animate-fadeIn">
              {contentSavedNotice && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn shadow-xs">
                  <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Pengaturan Nomor & Template Pesan WhatsApp berhasil disimpan!</span>
                </div>
              )}

              {/* CARD RINGKASAN LINK WA AKTIF */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00a68a] flex items-center justify-center font-bold">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Status Sinkronisasi Link WhatsApp</h3>
                      <p className="text-xs text-slate-500">
                        Nomor dan template pesan ini otomatis terpasang pada <span className="font-bold text-[#00a68a]">5 Titik Link WhatsApp</span> di seluruh website.
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-50 text-[#00a68a] border border-emerald-200 shrink-0 w-fit">
                    5 Titik Terhubung
                  </span>
                </div>

                {/* List 5 titik link */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center gap-2 font-bold text-slate-800 mb-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>1. Tombol Pesan Template</span>
                    </div>
                    <p className="text-[11px] text-slate-500">Katalog Template (pesan otomatis terisi nama, harga, data klien).</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center gap-2 font-bold text-slate-800 mb-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>2. Inquiry Portofolio</span>
                    </div>
                    <p className="text-[11px] text-slate-500">Tombol 'Konsultasi Project Serupa' pada popup detail portofolio.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center gap-2 font-bold text-slate-800 mb-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>3. Header Mulai Project</span>
                    </div>
                    <p className="text-[11px] text-slate-500">Tombol utama navigasi atas untuk konsultasi langsung.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center gap-2 font-bold text-slate-800 mb-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>4. Hero Beranda Utama</span>
                    </div>
                    <p className="text-[11px] text-slate-500">Tombol 'Mulai Project' di samping tagline beranda depan.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center gap-2 font-bold text-slate-800 mb-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>5. Footer Website & Kontak</span>
                    </div>
                    <p className="text-[11px] text-slate-500">CTA konsultasi footer, ikon WhatsApp, dan link nomor telepon.</p>
                  </div>
                </div>
              </div>

              {/* FORM PENGATURAN NOMOR & TEMPLATE */}
              <form onSubmit={handleSaveSiteContent} className="space-y-6">
                {/* NOMOR WHATSAPP UTAMA */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 md:p-8 space-y-4 shadow-2xs">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00a68a] flex items-center justify-center font-bold">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Nomor WhatsApp Resmi Agensi</h3>
                      <p className="text-xs text-slate-500">
                        Nomor tujuan utama untuk semua order template, konsultasi, dan portofolio inquiry.
                      </p>
                    </div>
                  </div>

                  <div className="max-w-md">
                    <label className="block text-slate-700 mb-1.5 font-bold text-xs">
                      Nomor Telepon / WhatsApp
                    </label>
                    <input
                      type="text"
                      value={tempSiteContent.contactWhatsapp || ""}
                      onChange={(e) => setTempSiteContent({ ...tempSiteContent, contactWhatsapp: e.target.value })}
                      placeholder="Contoh: +62 857-4951-8867 atau 085749518867"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold text-sm focus:ring-2 focus:ring-[#00a68a] focus:bg-white focus:outline-none transition-all"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Otomatis diubah menjadi format link internasional saat diklik oleh pengunjung.
                    </span>
                  </div>
                </div>
                {/* LINK SOSMED & KONTAK FOOTER (Wa, Ig, Fb, Email, TikTok, LinkedIn) */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 md:p-8 space-y-4 shadow-2xs">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00a68a]/20 to-teal-100 text-[#00a68a] flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-slate-900">Kelola 6 Sosial Media & Saklar Tampilan (ON / OFF)</h3>
                      <p className="text-xs text-slate-500">
                        Atur link profil WhatsApp, Instagram, Facebook, Email, TikTok, dan LinkedIn. Anda bisa mematikan (OFF) agar tidak muncul di halaman user / footer.
                      </p>
                    </div>
                  </div>

                  {/* Live Preview Bar */}
                  <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">Preview Ikon yang Aktif di Halaman User:</span>
                      <span className="text-xs text-slate-300">Hanya ikon dengan status <b className="text-emerald-400">ON</b> yang tampil bagi pengunjung.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {tempSiteContent.showSocialWhatsapp !== false && (
                        <div title="WhatsApp Aktif" className="w-8 h-8 rounded-full bg-emerald-600/30 border border-emerald-500/50 text-emerald-400 flex items-center justify-center">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                          </svg>
                        </div>
                      )}
                      {tempSiteContent.showSocialInstagram !== false && (
                        <div title="Instagram Aktif" className="w-8 h-8 rounded-full bg-pink-600/30 border border-pink-500/50 text-pink-400 flex items-center justify-center">
                          <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                          </svg>
                        </div>
                      )}
                      {tempSiteContent.showSocialFacebook !== false && (
                        <div title="Facebook Aktif" className="w-8 h-8 rounded-full bg-blue-600/30 border border-blue-500/50 text-blue-400 flex items-center justify-center">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        </div>
                      )}
                      {tempSiteContent.showSocialEmail !== false && (
                        <div title="Email Aktif" className="w-8 h-8 rounded-full bg-emerald-600/30 border border-emerald-500/50 text-emerald-400 flex items-center justify-center">
                          <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                          </svg>
                        </div>
                      )}
                      {tempSiteContent.showSocialTiktok !== false && (
                        <div title="TikTok Aktif" className="w-8 h-8 rounded-full bg-cyan-600/30 border border-cyan-500/50 text-cyan-400 flex items-center justify-center">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.98v7.45c-.01 2.92-1.35 5.76-3.69 7.42-2.3 1.63-5.38 2.06-8.08 1.15-2.73-.91-4.9-3.13-5.66-5.91-.77-2.79-.19-5.87 1.55-8.15 1.76-2.3 4.6-3.64 7.49-3.48v4.16c-1.45-.17-2.97.28-4.04 1.3-1.09 1.04-1.55 2.63-1.21 4.1.33 1.48 1.58 2.64 3.08 2.87 1.5.24 3.08-.41 3.88-1.7.35-.55.53-1.2.53-1.87V.02z" />
                          </svg>
                        </div>
                      )}
                      {tempSiteContent.showSocialLinkedin !== false && (
                        <div title="LinkedIn Aktif" className="w-8 h-8 rounded-full bg-blue-700/30 border border-blue-500/50 text-blue-400 flex items-center justify-center">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* 1. WhatsApp */}
                    <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-slate-800 font-bold flex items-center gap-1.5">
                            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                              </svg>
                            </span>
                            <span>1. WhatsApp</span>
                          </label>
                          <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                            <span className="text-[11px] font-bold text-slate-500">
                              {tempSiteContent.showSocialWhatsapp !== false ? "ON" : "OFF"}
                            </span>
                            <input
                              type="checkbox"
                              checked={tempSiteContent.showSocialWhatsapp !== false}
                              onChange={(e) => setTempSiteContent({ ...tempSiteContent, showSocialWhatsapp: e.target.checked })}
                              className="w-4 h-4 text-[#00a68a] rounded border-slate-300 focus:ring-[#00a68a] cursor-pointer"
                            />
                          </label>
                        </div>
                        <input
                          type="text"
                          value={tempSiteContent.contactWhatsapp || ""}
                          onChange={(e) => setTempSiteContent({ ...tempSiteContent, contactWhatsapp: e.target.value, socialWhatsapp: e.target.value })}
                          placeholder="Contoh: +62 857-4951-8867"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all"
                        />
                      </div>
                      <span className="text-[11px] text-slate-400 mt-1 block">Otomatis terhubung ke link chat WA di footer.</span>
                    </div>

                    {/* 2. Instagram */}
                    <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-slate-800 font-bold flex items-center gap-1.5">
                            <span className="w-6 h-6 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center">
                              <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                              </svg>
                            </span>
                            <span>2. Instagram (IG)</span>
                          </label>
                          <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                            <span className="text-[11px] font-bold text-slate-500">
                              {tempSiteContent.showSocialInstagram !== false ? "ON" : "OFF"}
                            </span>
                            <input
                              type="checkbox"
                              checked={tempSiteContent.showSocialInstagram !== false}
                              onChange={(e) => setTempSiteContent({ ...tempSiteContent, showSocialInstagram: e.target.checked })}
                              className="w-4 h-4 text-[#00a68a] rounded border-slate-300 focus:ring-[#00a68a] cursor-pointer"
                            />
                          </label>
                        </div>
                        <input
                          type="url"
                          value={tempSiteContent.socialInstagram || ""}
                          onChange={(e) => setTempSiteContent({ ...tempSiteContent, socialInstagram: e.target.value })}
                          placeholder="https://instagram.com/username"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all"
                        />
                      </div>
                      <span className="text-[11px] text-slate-400 mt-1 block">Link akun Instagram agensi Anda.</span>
                    </div>

                    {/* 3. Facebook */}
                    <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-slate-800 font-bold flex items-center gap-1.5">
                            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                              </svg>
                            </span>
                            <span>3. Facebook (FB)</span>
                          </label>
                          <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                            <span className="text-[11px] font-bold text-slate-500">
                              {tempSiteContent.showSocialFacebook !== false ? "ON" : "OFF"}
                            </span>
                            <input
                              type="checkbox"
                              checked={tempSiteContent.showSocialFacebook !== false}
                              onChange={(e) => setTempSiteContent({ ...tempSiteContent, showSocialFacebook: e.target.checked })}
                              className="w-4 h-4 text-[#00a68a] rounded border-slate-300 focus:ring-[#00a68a] cursor-pointer"
                            />
                          </label>
                        </div>
                        <input
                          type="url"
                          value={tempSiteContent.socialFacebook || ""}
                          onChange={(e) => setTempSiteContent({ ...tempSiteContent, socialFacebook: e.target.value })}
                          placeholder="https://facebook.com/username"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all"
                        />
                      </div>
                      <span className="text-[11px] text-slate-400 mt-1 block">Link fanspage atau profil Facebook.</span>
                    </div>

                    {/* 4. Email */}
                    <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-slate-800 font-bold flex items-center gap-1.5">
                            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                              <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                              </svg>
                            </span>
                            <span>4. Email</span>
                          </label>
                          <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                            <span className="text-[11px] font-bold text-slate-500">
                              {tempSiteContent.showSocialEmail !== false ? "ON" : "OFF"}
                            </span>
                            <input
                              type="checkbox"
                              checked={tempSiteContent.showSocialEmail !== false}
                              onChange={(e) => setTempSiteContent({ ...tempSiteContent, showSocialEmail: e.target.checked })}
                              className="w-4 h-4 text-[#00a68a] rounded border-slate-300 focus:ring-[#00a68a] cursor-pointer"
                            />
                          </label>
                        </div>
                        <input
                          type="email"
                          value={tempSiteContent.socialEmail || tempSiteContent.contactEmail || ""}
                          onChange={(e) => setTempSiteContent({ ...tempSiteContent, socialEmail: e.target.value, contactEmail: e.target.value })}
                          placeholder="halo@republikweb.net"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all"
                        />
                      </div>
                      <span className="text-[11px] text-slate-400 mt-1 block">Otomatis membuka aplikasi email (mailto:).</span>
                    </div>

                    {/* 5. TikTok */}
                    <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-slate-800 font-bold flex items-center gap-1.5">
                            <span className="w-6 h-6 rounded-lg bg-cyan-100 text-cyan-600 flex items-center justify-center">
                              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.98v7.45c-.01 2.92-1.35 5.76-3.69 7.42-2.3 1.63-5.38 2.06-8.08 1.15-2.73-.91-4.9-3.13-5.66-5.91-.77-2.79-.19-5.87 1.55-8.15 1.76-2.3 4.6-3.64 7.49-3.48v4.16c-1.45-.17-2.97.28-4.04 1.3-1.09 1.04-1.55 2.63-1.21 4.1.33 1.48 1.58 2.64 3.08 2.87 1.5.24 3.08-.41 3.88-1.7.35-.55.53-1.2.53-1.87V.02z" />
                              </svg>
                            </span>
                            <span>5. TikTok</span>
                          </label>
                          <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                            <span className="text-[11px] font-bold text-slate-500">
                              {tempSiteContent.showSocialTiktok !== false ? "ON" : "OFF"}
                            </span>
                            <input
                              type="checkbox"
                              checked={tempSiteContent.showSocialTiktok !== false}
                              onChange={(e) => setTempSiteContent({ ...tempSiteContent, showSocialTiktok: e.target.checked })}
                              className="w-4 h-4 text-[#00a68a] rounded border-slate-300 focus:ring-[#00a68a] cursor-pointer"
                            />
                          </label>
                        </div>
                        <input
                          type="url"
                          value={tempSiteContent.socialTiktok || ""}
                          onChange={(e) => setTempSiteContent({ ...tempSiteContent, socialTiktok: e.target.value })}
                          placeholder="https://tiktok.com/@username"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all"
                        />
                      </div>
                      <span className="text-[11px] text-slate-400 mt-1 block">Link akun TikTok RepublikWeb/agensi.</span>
                    </div>

                    {/* 6. LinkedIn */}
                    <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-slate-800 font-bold flex items-center gap-1.5">
                            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                              </svg>
                            </span>
                            <span>6. LinkedIn</span>
                          </label>
                          <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                            <span className="text-[11px] font-bold text-slate-500">
                              {tempSiteContent.showSocialLinkedin !== false ? "ON" : "OFF"}
                            </span>
                            <input
                              type="checkbox"
                              checked={tempSiteContent.showSocialLinkedin !== false}
                              onChange={(e) => setTempSiteContent({ ...tempSiteContent, showSocialLinkedin: e.target.checked })}
                              className="w-4 h-4 text-[#00a68a] rounded border-slate-300 focus:ring-[#00a68a] cursor-pointer"
                            />
                          </label>
                        </div>
                        <input
                          type="url"
                          value={tempSiteContent.socialLinkedin || ""}
                          onChange={(e) => setTempSiteContent({ ...tempSiteContent, socialLinkedin: e.target.value })}
                          placeholder="https://linkedin.com/company/namabisnis"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all"
                        />
                      </div>
                      <span className="text-[11px] text-slate-400 mt-1 block">Link profil atau company page LinkedIn.</span>
                    </div>
                  </div>
                </div>
                {/* TEMPLATE PESAN 1: ORDER TEMPLATE */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 md:p-8 space-y-4 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">1. Template Pesan: Pemesanan Template</h4>
                      <p className="text-xs text-slate-500">
                        Digunakan saat pengunjung/member menekan tombol "Pesan via WhatsApp" di katalog template.
                      </p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      Variable: {'{title}'}, {'{category}'}, {'{price}'}, {'{name}'}, {'{email}'}, {'{phone}'}
                    </span>
                  </div>

                  <div>
                    <textarea
                      rows={7}
                      value={tempSiteContent.waTemplateOrder || ""}
                      onChange={(e) => setTempSiteContent({ ...tempSiteContent, waTemplateOrder: e.target.value })}
                      placeholder="Tuliskan format template pesan pemesanan..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-xs focus:ring-2 focus:ring-[#00a68a] focus:bg-white focus:outline-none transition-all leading-relaxed"
                    />
                    <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Tag yang tersedia akan diganti otomatis dengan data template & pemesan sebenarnya.</span>
                      <button
                        type="button"
                        onClick={() => setTempSiteContent({
                          ...tempSiteContent,
                          waTemplateOrder: "Halo RepublikWeb, saya ingin memesan template website:\n\n*Detail Template:*\n• Nama Template : *{title}*\n• Kategori : {category}\n• Harga Lisensi : *{price}*\n\n*Data Pemesan:*\n• Nama Lengkap : {name}\n• Email : {email}\n• WhatsApp : {phone}\n\nMohon dibantu proses pemesanan & setup template ini. Terima kasih!"
                        })}
                        className="text-[#00a68a] hover:underline font-bold"
                      >
                        Reset Template Default
                      </button>
                    </div>
                  </div>
                </div>

                {/* TEMPLATE PESAN 2: INQUIRY PORTOFOLIO */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 md:p-8 space-y-4 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">2. Template Pesan: Tanya Project Portofolio</h4>
                      <p className="text-xs text-slate-500">
                        Digunakan saat pengunjung menekan tombol "Konsultasi Project Serupa" di modal portofolio.
                      </p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      Variable: {'{title}'}, {'{category}'}
                    </span>
                  </div>

                  <div>
                    <textarea
                      rows={3}
                      value={tempSiteContent.waTemplateInquiry || ""}
                      onChange={(e) => setTempSiteContent({ ...tempSiteContent, waTemplateInquiry: e.target.value })}
                      placeholder="Tuliskan format pesan tanya portofolio..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-xs focus:ring-2 focus:ring-[#00a68a] focus:bg-white focus:outline-none transition-all leading-relaxed"
                    />
                    <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Tag {'{title}'} & {'{category}'} akan diganti otomatis dengan judul & kategori karya.</span>
                      <button
                        type="button"
                        onClick={() => setTempSiteContent({
                          ...tempSiteContent,
                          waTemplateInquiry: "Halo RepublikWeb, saya melihat portofolio *{title}* ({category}) di website RepublikWeb dan tertarik membuat project serupa. Boleh info estimasi dan alur kerjanya?"
                        })}
                        className="text-[#00a68a] hover:underline font-bold"
                      >
                        Reset Template Default
                      </button>
                    </div>
                  </div>
                </div>

                {/* TEMPLATE PESAN 3: KONSULTASI UMUM & MULAI PROJECT */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 md:p-8 space-y-4 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">3. Template Pesan: Konsultasi Umum / Mulai Project</h4>
                      <p className="text-xs text-slate-500">
                        Digunakan pada tombol "Mulai Project" (Header & Hero) serta tombol "Mulai Konsultasi WhatsApp" di Footer.
                      </p>
                    </div>
                  </div>

                  <div>
                    <textarea
                      rows={2}
                      value={tempSiteContent.waTemplateConsultation || ""}
                      onChange={(e) => setTempSiteContent({ ...tempSiteContent, waTemplateConsultation: e.target.value })}
                      placeholder="Tuliskan pesan konsultasi umum..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-xs focus:ring-2 focus:ring-[#00a68a] focus:bg-white focus:outline-none transition-all leading-relaxed"
                    />
                    <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Pesan pembuka ketika pengunjung ingin memulai konsultasi baru.</span>
                      <button
                        type="button"
                        onClick={() => setTempSiteContent({
                          ...tempSiteContent,
                          waTemplateConsultation: "Halo RepublikWeb, saya tertarik untuk memulai project website. Boleh konsultasi terlebih dahulu?"
                        })}
                        className="text-[#00a68a] hover:underline font-bold"
                      >
                        Reset Template Default
                      </button>
                    </div>
                  </div>
                </div>

                {/* TOMBOL SIMPAN */}
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="px-7 py-3 bg-[#00a68a] hover:bg-[#008f76] text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-[#00a68a]/20 cursor-pointer flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Simpan Nomor & Semua Template Pesan</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTempSiteContent(siteContent)}
                    className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs rounded-xl cursor-pointer transition-all"
                  >
                    Batalkan Perubahan
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* ===================== MODAL: TAMBAH / EDIT TEMPLATE ===================== */}
      {isTemplateModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-7 shadow-2xl text-slate-900 animate-scaleUp">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              {editingTemplateId ? "Edit Data Template" : "Tambah Template Baru"}
            </h3>

            <form onSubmit={handleSaveTemplate} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 mb-1 font-medium">Nama / Judul Template</label>
                <input
                  type="text"
                  value={templateForm.title}
                  onChange={(e) => setTemplateForm({ ...templateForm, title: e.target.value })}
                  placeholder="Contoh: ZenSpa - Wellness & Massage"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-slate-700 font-medium">Kategori</label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingInlineCategory(true);
                          setInlineCategoryFeedback(null);
                        }}
                        className="text-[11px] text-[#00a68a] hover:underline font-bold"
                      >
                        + Buat Baru
                      </button>
                      <span className="text-slate-300">|</span>
                      <button
                        type="button"
                        onClick={() => {
                          setCategoryModalNotice(null);
                          setIsCategoryModalOpen(true);
                        }}
                        className="text-[11px] text-slate-500 hover:text-slate-800 hover:underline font-medium"
                      >
                        Kelola
                      </button>
                    </div>
                  </div>
                  <select
                    value={templateForm.category}
                    onChange={(e) => {
                      if (e.target.value === "__NEW__") {
                        setIsAddingInlineCategory(true);
                        setInlineCategoryFeedback(null);
                      } else {
                        setTemplateForm({ ...templateForm, category: e.target.value });
                        setIsAddingInlineCategory(false);
                      }
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all font-medium"
                  >
                    {Array.from(new Set([...(templateCategories || []), templateForm.category].filter(Boolean))).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option value="__NEW__" className="font-bold text-[#00a68a]">
                      + Tambah Kategori Baru...
                    </option>
                  </select>

                  {/* Inline Add Category Input */}
                  {isAddingInlineCategory && (
                    <div className="mt-2 p-2.5 rounded-xl bg-teal-50/80 border border-teal-200 shadow-xs animate-in fade-in zoom-in-95 duration-150">
                      <p className="text-[11px] font-bold text-teal-800 mb-1.5 flex items-center justify-between">
                        <span>Nama Kategori Baru:</span>
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddingInlineCategory(false);
                            setInlineCategoryInput("");
                            setInlineCategoryFeedback(null);
                          }}
                          className="text-slate-400 hover:text-slate-600 text-xs"
                        >
                          ✕
                        </button>
                      </p>
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          value={inlineCategoryInput}
                          onChange={(e) => {
                            setInlineCategoryInput(e.target.value);
                            if (inlineCategoryFeedback) setInlineCategoryFeedback(null);
                          }}
                          placeholder="Mis: Otomotif, Edukasi..."
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleSaveInlineCategory();
                            }
                          }}
                          className="flex-1 px-2.5 py-1.5 rounded-lg bg-white border border-teal-300 text-slate-900 text-xs focus:ring-2 focus:ring-[#00a68a] focus:outline-none font-medium"
                        />
                        <button
                          type="button"
                          onClick={handleSaveInlineCategory}
                          disabled={!inlineCategoryInput.trim()}
                          className="px-3 py-1.5 bg-[#00a68a] hover:bg-[#008f76] disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs shrink-0"
                        >
                          Simpan
                        </button>
                      </div>
                      {inlineCategoryFeedback && (
                        <p className={`text-[10px] mt-1.5 font-semibold ${inlineCategoryFeedback.isError ? "text-rose-600" : "text-teal-700"}`}>
                          {inlineCategoryFeedback.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-medium">Harga Lisensi</label>
                  <input
                    type="text"
                    value={templateForm.price}
                    onChange={(e) => setTemplateForm({ ...templateForm, price: e.target.value })}
                    placeholder="Contoh: Rp 299.000"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-medium">Upload Gambar Preview</label>
                <div className="flex items-center gap-3">
                  {templateForm.image && (
                    <div className="w-12 h-12 relative rounded-lg overflow-hidden border border-slate-200 shrink-0">
                      <Image src={templateForm.image} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setTemplateForm({ ...templateForm, image: reader.result as string });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#00a68a] file:text-white hover:file:bg-[#008f76] cursor-pointer file:cursor-pointer"
                  />
                </div>
              </div>


              <div>
                <label className="block text-slate-700 mb-1 font-medium">Deskripsi Singkat</label>
                <textarea
                  rows={3}
                  value={templateForm.description}
                  onChange={(e) => setTemplateForm({ ...templateForm, description: e.target.value })}
                  placeholder="Deskripsi keunggulan template..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all resize-none"
                />
              </div>

              <div className="flex gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsTemplateModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#00a68a] hover:bg-[#008f76] text-white font-bold rounded-xl cursor-pointer shadow-sm shadow-[#00a68a]/20 transition-all"
                >
                  {editingTemplateId ? "Perbarui Template" : "Simpan Template"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== MODAL: TAMBAH / EDIT PORTOFOLIO ===================== */}
      {isPortfolioModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-7 shadow-2xl text-slate-900 animate-scaleUp">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              {editingPortfolioId ? "Edit Data Portofolio" : "Tambah Portofolio Baru"}
            </h3>

            <form onSubmit={handleSavePortfolio} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 mb-1 font-medium">Judul / Nama Project</label>
                <input
                  type="text"
                  value={portfolioForm.title}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, title: e.target.value })}
                  placeholder="Contoh: Nexora Creative Studio"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-medium">Kategori Project</label>
                <select
                  value={portfolioForm.category}
                  onChange={(e) =>
                    setPortfolioForm({
                      ...portfolioForm,
                      category: e.target.value as "Landing Page" | "Website" | "E-Commerce" | "Social Media",
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all"
                >
                  <option value="Landing Page">Landing Page</option>
                  <option value="Website">Website</option>
                  <option value="E-Commerce">E-Commerce</option>
                  <option value="Social Media">Social Media</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-medium">Upload Gambar Portofolio</label>
                <div className="flex items-center gap-3">
                  {portfolioForm.image && (
                    <div className="w-12 h-12 relative rounded-lg overflow-hidden border border-slate-200 shrink-0">
                      <Image src={portfolioForm.image} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setPortfolioForm({ ...portfolioForm, image: reader.result as string });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#00a68a] file:text-white hover:file:bg-[#008f76] cursor-pointer file:cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsPortfolioModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#00a68a] hover:bg-[#008f76] text-white font-bold rounded-xl cursor-pointer shadow-sm shadow-[#00a68a]/20 transition-all"
                >
                  {editingPortfolioId ? "Perbarui Portofolio" : "Simpan Portofolio"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== MODAL: TAMBAH / EDIT TESTIMONI ===================== */}
      {isTestimonialModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-7 shadow-2xl text-slate-900 animate-scaleUp">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">
                {editingTestimonialId ? "Edit Testimoni Klien" : "Tambah Testimoni Baru"}
              </h3>
              <button
                type="button"
                onClick={() => setIsTestimonialModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveTestimonial} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1 font-medium">Nama Klien</label>
                  <input
                    type="text"
                    value={testimonialForm.name}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                    placeholder="Contoh: Rani Puspita"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1 font-medium">Inisial Avatar (Opsional)</label>
                  <input
                    type="text"
                    maxLength={3}
                    value={testimonialForm.initials}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, initials: e.target.value.toUpperCase() })}
                    placeholder="Contoh: RP"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-medium">Jabatan / Usaha Klien</label>
                <input
                  type="text"
                  value={testimonialForm.role}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                  placeholder="Contoh: Owner, Kopi Hollow"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1 font-medium">Rating Bintang</label>
                  <select
                    value={testimonialForm.rating}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all font-semibold"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Bintang)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Bintang)</option>
                    <option value={3}>⭐⭐⭐ (3 Bintang)</option>
                    <option value={2}>⭐⭐ (2 Bintang)</option>
                    <option value={1}>⭐ (1 Bintang)</option>
                  </select>
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/70 transition-all">
                    <input
                      type="checkbox"
                      checked={testimonialForm.glow}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, glow: e.target.checked })}
                      className="w-4 h-4 text-[#00a68a] rounded border-slate-300 focus:ring-[#00a68a] accent-[#00a68a]"
                    />
                    <span className="text-slate-700 font-medium text-[11px] select-none">
                      Highlight Card (Glow)
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-medium">Ulasan / Testimoni</label>
                <textarea
                  rows={4}
                  value={testimonialForm.quote}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, quote: e.target.value })}
                  placeholder="Tuliskan pengalaman positif klien terhadap layanan RepublikWeb..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all resize-none leading-relaxed"
                />
              </div>

              <div className="flex gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsTestimonialModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#00a68a] hover:bg-[#008f76] text-white font-bold rounded-xl cursor-pointer shadow-sm shadow-[#00a68a]/20 transition-all"
                >
                  {editingTestimonialId ? "Perbarui Testimoni" : "Simpan Testimoni"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== MODAL: TAMBAH / EDIT KARTU TENTANG KAMI ===================== */}
      {isAboutFeatureModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-7 shadow-2xl text-slate-900 animate-scaleUp">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">
                {editingAboutFeatureId ? "Edit Kartu Keunggulan" : "Tambah Kartu Keunggulan Baru"}
              </h3>
              <button
                type="button"
                onClick={() => setIsAboutFeatureModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAboutFeature} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 mb-1 font-medium">Judul Keunggulan</label>
                <input
                  type="text"
                  value={aboutFeatureForm.title}
                  onChange={(e) => setAboutFeatureForm({ ...aboutFeatureForm, title: e.target.value })}
                  placeholder="Contoh: One Stop Digital Solution"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-medium">Pilihan Icon</label>
                <select
                  value={aboutFeatureForm.icon}
                  onChange={(e) =>
                    setAboutFeatureForm({
                      ...aboutFeatureForm,
                      icon: e.target.value as "layers" | "flash" | "sliders" | "sparkles" | "eye" | "support",
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all font-semibold"
                >
                  <option value="layers">Layers (All in One / Solusi Terintegrasi)</option>
                  <option value="flash">Flash / Kilat (Cepat & Siap Pakai)</option>
                  <option value="sliders">Sliders (Custom & Fleksibel)</option>
                  <option value="sparkles">Sparkles / Kilau (Desain Modern & Kredibel)</option>
                  <option value="eye">Eye / Mata (Transparan & Jelas)</option>
                  <option value="support">Support / Pelampung (Pendampingan & Bantuan)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-medium">Penjelasan / Deskripsi Singkat</label>
                <textarea
                  rows={3}
                  value={aboutFeatureForm.description}
                  onChange={(e) => setAboutFeatureForm({ ...aboutFeatureForm, description: e.target.value })}
                  placeholder="Deskripsikan keunggulan layanan secara padat dan meyakinkan..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all resize-none leading-relaxed"
                />
              </div>

              <div className="flex gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAboutFeatureModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#00a68a] hover:bg-[#008f76] text-white font-bold rounded-xl cursor-pointer shadow-sm shadow-[#00a68a]/20 transition-all"
                >
                  {editingAboutFeatureId ? "Perbarui Kartu" : "Simpan Kartu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== MODAL: TAMBAH / EDIT LANGKAH CARA KERJA ===================== */}
      {isProcessStepModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-7 shadow-2xl text-slate-900 animate-scaleUp">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">
                {editingProcessStepId ? "Edit Langkah Cara Kerja" : "Tambah Langkah Cara Kerja"}
              </h3>
              <button
                type="button"
                onClick={() => setIsProcessStepModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProcessStep} className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1 font-medium">Nomor</label>
                  <input
                    type="text"
                    maxLength={3}
                    value={processStepForm.number}
                    onChange={(e) => setProcessStepForm({ ...processStepForm, number: e.target.value })}
                    placeholder="Contoh: 01"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all font-bold text-center"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-slate-700 mb-1 font-medium">Judul Tahapan</label>
                  <input
                    type="text"
                    value={processStepForm.title}
                    onChange={(e) => setProcessStepForm({ ...processStepForm, title: e.target.value })}
                    placeholder="Contoh: Konsultasi"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-medium">Deskripsi / Penjelasan Tahapan</label>
                <textarea
                  rows={3}
                  value={processStepForm.description}
                  onChange={(e) => setProcessStepForm({ ...processStepForm, description: e.target.value })}
                  placeholder="Ceritakan apa yang dilakukan pada tahap ini secara ringkas dan informatif..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all resize-none leading-relaxed"
                />
              </div>

              <div className="flex gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsProcessStepModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#00a68a] hover:bg-[#008f76] text-white font-bold rounded-xl cursor-pointer shadow-sm shadow-[#00a68a]/20 transition-all"
                >
                  {editingProcessStepId ? "Perbarui Langkah" : "Simpan Langkah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== MODAL: KELOLA KATEGORI TEMPLATE ===================== */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-[#00a68a]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">Kelola Kategori Template</h3>
                  <p className="text-xs text-slate-500">Tambah atau hapus kategori template website</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCategoryModalOpen(false);
                  setCategoryModalNotice(null);
                }}
                className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Input Tambah Kategori Baru */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const trimmed = newCategoryInput.trim();
                if (!trimmed) {
                  setCategoryModalNotice({ type: "error", message: "Nama kategori tidak boleh kosong!" });
                  return;
                }
                const isNew = addTemplateCategory(trimmed);
                setTemplateForm((prev) => ({ ...prev, category: trimmed }));
                setNewCategoryInput("");
                if (isNew) {
                  setCategoryModalNotice({ type: "success", message: `✓ Kategori "${trimmed}" berhasil ditambahkan & dipilih!` });
                } else {
                  setCategoryModalNotice({ type: "error", message: `Kategori "${trimmed}" sudah ada (otomatis dipilih).` });
                }
                setTimeout(() => setCategoryModalNotice(null), 3000);
              }}
              className="mt-4"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCategoryInput}
                  onChange={(e) => {
                    setNewCategoryInput(e.target.value);
                    if (categoryModalNotice) setCategoryModalNotice(null);
                  }}
                  placeholder="Nama kategori baru (mis: Pendidikan, Hotel...)"
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#00a68a] focus:outline-none transition-all"
                />
                <button
                  type="submit"
                  disabled={!newCategoryInput.trim()}
                  className="px-4 py-2.5 bg-[#00a68a] hover:bg-[#008f76] disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-[#00a68a]/20 cursor-pointer shrink-0"
                >
                  + Tambah
                </button>
              </div>

              {categoryModalNotice && (
                <div
                  className={`mt-2.5 p-2.5 rounded-xl text-[11px] font-semibold flex items-center gap-1.5 animate-in fade-in duration-150 ${
                    categoryModalNotice.type === "success"
                      ? "bg-teal-50 text-teal-800 border border-teal-200"
                      : "bg-amber-50 text-amber-800 border border-amber-200"
                  }`}
                >
                  <span>{categoryModalNotice.message}</span>
                </div>
              )}
            </form>

            {/* Daftar Kategori Saat Ini */}
            <div className="mt-5">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Daftar Kategori ({templateCategories.length})
              </label>
              <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1">
                {templateCategories.map((cat) => (
                  <div
                    key={cat}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all text-xs"
                  >
                    <span className="font-semibold text-slate-700">{cat}</span>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Hapus kategori "${cat}"?`)) {
                          deleteTemplateCategory(cat);
                          setCategoryModalNotice({ type: "success", message: `Kategori "${cat}" telah dihapus.` });
                          setTimeout(() => setCategoryModalNotice(null), 2500);
                        }
                      }}
                      className="p-1 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Hapus Kategori"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsCategoryModalOpen(false);
                  setCategoryModalNotice(null);
                }}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
