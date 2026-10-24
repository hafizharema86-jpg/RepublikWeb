"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Template {
  id: string;
  title: string;
  category: string;
  price: string;
  description: string;
  image: string;
  isPopular?: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: "Landing Page" | "Website" | "E-Commerce" | "Social Media";
  image: string;
}

export interface ClientMessage {
  id: string;
  senderName: string;
  whatsapp: string;
  serviceType: string;
  message: string;
  date: string;
  status: "Baru" | "Dihubungi" | "Selesai";
}

export interface TestimonialItem {
  id: string;
  rating: number;
  quote: string;
  name: string;
  role: string;
  initials: string;
  glow?: boolean;
}

export interface AboutFeatureItem {
  id: string;
  title: string;
  description: string;
  icon: "layers" | "flash" | "sliders" | "sparkles" | "eye" | "support";
}

export interface ProcessStepItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  aboutSubtitle: string;
  aboutTitle: string;
  aboutDescription: string;
  processSubtitle: string;
  processTitle: string;
  processDescription: string;
  testimonialTitle: string;
  testimonialSubtitle: string;
  solutionTitle: string;
  solutionSubtitle: string;
  // Info Kontak & Hubungi Kami
  contactEmail: string;
  contactWhatsapp: string;
  contactHours: string;
  contactLocation: string;
  // Social Media Links
  socialInstagram: string;
  socialLinkedin: string;
  // Template Pesan WhatsApp
  waTemplateOrder: string;
  waTemplateInquiry: string;
  waTemplateConsultation: string;
}

interface DataContextType {
  templates: Template[];
  addTemplate: (item: Omit<Template, "id">) => void;
  updateTemplate: (id: string, item: Partial<Template>) => void;
  deleteTemplate: (id: string) => void;
  templateCategories: string[];
  addTemplateCategory: (category: string) => boolean;
  deleteTemplateCategory: (category: string) => void;

  portfolios: PortfolioItem[];
  addPortfolio: (item: Omit<PortfolioItem, "id">) => void;
  updatePortfolio: (id: string, item: Partial<PortfolioItem>) => void;
  deletePortfolio: (id: string) => void;

  messages: ClientMessage[];
  addMessage: (msg: Omit<ClientMessage, "id" | "date" | "status">) => void;
  updateMessageStatus: (id: string, status: "Baru" | "Dihubungi" | "Selesai") => void;
  deleteMessage: (id: string) => void;

  heroImage: string;
  updateHeroImage: (image: string) => void;

  siteLogo: string;
  updateSiteLogo: (logo: string) => void;

  testimonials: TestimonialItem[];
  addTestimonial: (item: Omit<TestimonialItem, "id">) => void;
  updateTestimonial: (id: string, item: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;

  aboutFeatures: AboutFeatureItem[];
  addAboutFeature: (item: Omit<AboutFeatureItem, "id">) => void;
  updateAboutFeature: (id: string, item: Partial<AboutFeatureItem>) => void;
  deleteAboutFeature: (id: string) => void;

  processSteps: ProcessStepItem[];
  addProcessStep: (item: Omit<ProcessStepItem, "id">) => void;
  updateProcessStep: (id: string, item: Partial<ProcessStepItem>) => void;
  deleteProcessStep: (id: string) => void;

  siteContent: SiteContent;
  updateSiteContent: (content: Partial<SiteContent>) => void;
}

const defaultTemplates: Template[] = [
  {
    id: "ex-1",
    title: "Apex Luxe - Corporate Holding",
    category: "Company Profile",
    image: "/portfolio-nexora.jpg",
    isPopular: true,
    price: "Rp 599.000",
    description: "Desain profesional dan elegan untuk holding company, korporasi modern, dan institusi bisnis.",
  },
  {
    id: "ex-2",
    title: "Velox Motors - Luxury Showroom",
    category: "Landing Page",
    image: "/portfolio-bistro.jpg",
    isPopular: false,
    price: "Rp 450.000",
    description: "Template modern untuk otomotif & luxury showroom dengan booking test-drive dan katalog interaktif.",
  },
  {
    id: "ex-3",
    title: "Aura Living - Luxury Villa & Residence",
    category: "Landing Page",
    image: "/portfolio-evergreen.jpg",
    isPopular: true,
    price: "Rp 499.000",
    description: "Desain visual memukau untuk developer properti, residence, dan private villa rental.",
  },
  {
    id: "1",
    title: "Nexus Digital - Modern Agency",
    category: "Agency",
    image: "/template-agency.jpg",
    isPopular: true,
    price: "Rp 299.000",
    description: "Template siap pakai untuk digital agency, IT consultant, dan startup teknologi. Cepat online dan mudah dikustomisasi.",
  },
  {
    id: "2",
    title: "The Grill Room - Fine Dining",
    category: "Restaurant",
    image: "/template-restaurant.jpg",
    isPopular: false,
    price: "Rp 249.000",
    description: "Desain elegan & mewah untuk restoran, cafe, kuliner, dan booking reservasi pelanggan.",
  },
  {
    id: "3",
    title: "Thoughtful - Designer Portfolio",
    category: "Portfolio",
    image: "/template-portfolio.jpg",
    isPopular: false,
    price: "Rp 199.000",
    description: "Showcase hasil karya visual, UI/UX designer, fotografer, dan professional freelancer.",
  },
  {
    id: "4",
    title: "InnovateTech - Corporate Site",
    category: "Company Profile",
    image: "/template-agency.jpg",
    isPopular: false,
    price: "Rp 349.000",
    description: "Profile perusahaan profesional dengan fitur daftar layanan, portofolio, tim, dan kontak terintegrasi.",
  },
  {
    id: "5",
    title: "EcoWave - Clean E-Commerce",
    category: "E-Commerce",
    image: "/portfolio-stylenest.jpg",
    isPopular: true,
    price: "Rp 399.000",
    description: "Platform toko online minimalis dengan katalog produk, shopping cart, dan integrasi checkout WhatsApp.",
  },
];

const defaultPortfolios: PortfolioItem[] = [
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

const defaultMessages: ClientMessage[] = [
  {
    id: "m-1",
    senderName: "Budi Santoso",
    whatsapp: "081234567890",
    serviceType: "Website E-Commerce Custom",
    message: "Halo tim RepublikWeb, kami butuh website toko fashion online lengkap dengan payment gateway Midtrans dan ongkir JNE/J&T.",
    date: "Hari ini, 10:20 WIB",
    status: "Baru",
  },
  {
    id: "m-2",
    senderName: "Rina Wijaya (PT Maju Jaya)",
    whatsapp: "085678901234",
    serviceType: "Company Profile Perusahaan",
    message: "Butuh landing page profile perusahaan konstruksi dengan desain modern seperti contoh di beranda.",
    date: "Kemarin, 16:45 WIB",
    status: "Dihubungi",
  },
  {
    id: "m-3",
    senderName: "Hendri Pratama",
    whatsapp: "087788990011",
    serviceType: "Template Nexus Digital",
    message: "Saya tertarik dengan template Nexus Digital, apakah bisa dibantu setup domain dan hostingnya sekalian?",
    date: "2 hari lalu",
    status: "Selesai",
  },
];

const defaultTestimonials: TestimonialItem[] = [
  {
    id: "1",
    rating: 5,
    quote: '"Website dan konten Instagram kami akhirnya terlihat satu identitas. Pesanan naik dan brand terasa jauh lebih profesional."',
    name: "Rani Puspita",
    role: "Owner, Kopi Hollow",
    initials: "RP",
    glow: true,
  },
  {
    id: "2",
    rating: 5,
    quote: '"Prosesnya jelas dari awal. Timeline ditepati, revisi ditangani cepat, dan hasil akhirnya melebihi ekspektasi kami."',
    name: "Andi Nugroho",
    role: "Founder, Nexora Studio",
    initials: "AN",
  },
  {
    id: "3",
    rating: 5,
    quote: '"Kami mulai dari template lalu custom beberapa fitur. Sangat efisien untuk tim kecil seperti kami."',
    name: "Siti Maharani",
    role: "Marketing Lead, StyleNest",
    initials: "SM",
  },
];

const defaultAboutFeatures: AboutFeatureItem[] = [
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

const defaultProcessSteps: ProcessStepItem[] = [
  {
    id: "1",
    number: "01",
    title: "Konsultasi",
    description: "Ceritakan kebutuhan, tujuan, dan target bisnis Anda.",
  },
  {
    id: "2",
    number: "02",
    title: "Pilih Solusi",
    description: "Tentukan template, custom website, atau social media.",
  },
  {
    id: "3",
    number: "03",
    title: "Proses Pengerjaan",
    description: "Tim kami mengerjakan dengan progres yang transparan.",
  },
  {
    id: "4",
    number: "04",
    title: "Project Selesai",
    description: "Website live, konten berjalan, dan support tetap tersedia.",
  },
];

const defaultSiteContent: SiteContent = {
  heroTitle: "Bangun Kehadiran\nDigital yang Siap\nBerkembang.",
  heroSubtitle: "Dari landing page, website custom, hingga pengelolaan social media — RepublikWeb.net membantu Anda membangun dan mengembangkan bisnis secara digital dalam satu platform.",
  aboutSubtitle: "TENTANG KAMI",
  aboutTitle: "Kami adalah Mitra Digital yang Berfokus pada Hasil, Bukan Sekadar Tampilan.",
  aboutDescription: "Di RepublikWeb, kami memahami bahwa website yang bagus tidak hanya harus terlihat cantik, tapi juga harus bekerja efektif mendatangkan konversi. Kami merancang solusi digital yang berpusat pada pengalaman pengguna dan pencapaian target bisnis Anda.",
  processSubtitle: "CARA KERJA",
  processTitle: "Cara Kerja Kami",
  processDescription: "Proses sistematis kami memastikan setiap project berjalan transparan, tepat waktu, dan memberikan hasil maksimal.",
  testimonialTitle: "Apa Kata Klien Kami?",
  testimonialSubtitle: "TESTIMONIAL",
  solutionTitle: "Siap Memulai Project Digital Anda?",
  solutionSubtitle: "Pilih jalur yang paling sesuai dengan kebutuhan dan timeline bisnis Anda.",
  contactEmail: "halo@republikweb.net",
  contactWhatsapp: "+62 857-4951-8867",
  contactHours: "Senin – Sabtu, 09.00 – 18.00 WIB",
  contactLocation: "Jakarta & Yogyakarta, Indonesia",
  socialInstagram: "https://instagram.com/republikweb",
  socialLinkedin: "https://linkedin.com/company/republikweb",
  waTemplateOrder: "Halo RepublikWeb, saya ingin memesan template website:\n\n*Detail Template:*\n• Nama Template : *{title}*\n• Kategori : {category}\n• Harga Lisensi : *{price}*\n\n*Data Pemesan:*\n• Nama Lengkap : {name}\n• Email : {email}\n• WhatsApp : {phone}\n\nMohon dibantu proses pemesanan & setup template ini. Terima kasih!",
  waTemplateInquiry: "Halo RepublikWeb, saya melihat portofolio *{title}* ({category}) di website RepublikWeb dan tertarik membuat project serupa. Boleh info estimasi dan alur kerjanya?",
  waTemplateConsultation: "Halo RepublikWeb, saya tertarik untuk memulai project website. Boleh konsultasi terlebih dahulu?",
};

const initialTemplateCategories = [
  "Agency",
  "Company Profile",
  "Landing Page",
  "E-Commerce",
  "Restaurant",
  "Portfolio",
  "UMKM",
  "Personal",
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [templates, setTemplates] = useState<Template[]>(defaultTemplates);
  const [templateCategories, setTemplateCategories] = useState<string[]>(initialTemplateCategories);
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>(defaultPortfolios);
  const [messages, setMessages] = useState<ClientMessage[]>(defaultMessages);
  const [heroImage, setHeroImage] = useState<string>("/hero-mockup.jpg");
  const [siteLogo, setSiteLogo] = useState<string>("");
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(defaultTestimonials);
  const [aboutFeatures, setAboutFeatures] = useState<AboutFeatureItem[]>(defaultAboutFeatures);
  const [processSteps, setProcessSteps] = useState<ProcessStepItem[]>(defaultProcessSteps);
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultSiteContent);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedTemplates = localStorage.getItem("rw_templates");
      if (savedTemplates) {
        const parsed: (Template & { isExclusive?: boolean })[] = JSON.parse(savedTemplates);
        // Strip any residual isExclusive property and clean up
        const cleaned: Template[] = parsed.map(({ isExclusive, ...rest }) => rest);
        setTemplates(cleaned);
      } else {
        localStorage.setItem("rw_templates", JSON.stringify(defaultTemplates));
      }

      const savedCategories = localStorage.getItem("rw_template_categories");
      if (savedCategories) {
        try {
          const parsed = JSON.parse(savedCategories);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setTemplateCategories(parsed);
          } else {
            setTemplateCategories(initialTemplateCategories);
          }
        } catch {
          setTemplateCategories(initialTemplateCategories);
        }
      } else {
        localStorage.setItem("rw_template_categories", JSON.stringify(initialTemplateCategories));
      }

      const savedPortfolios = localStorage.getItem("rw_portfolios");
      if (savedPortfolios) setPortfolios(JSON.parse(savedPortfolios));

      const savedMessages = localStorage.getItem("rw_messages");
      if (savedMessages) setMessages(JSON.parse(savedMessages));

      const savedHero = localStorage.getItem("rw_hero_image");
      if (savedHero) setHeroImage(savedHero);

      const savedLogo = localStorage.getItem("rw_site_logo");
      if (savedLogo) setSiteLogo(savedLogo);

      const savedTestimonials = localStorage.getItem("rw_testimonials");
      if (savedTestimonials) setTestimonials(JSON.parse(savedTestimonials));

      const savedAboutFeatures = localStorage.getItem("rw_about_features");
      if (savedAboutFeatures) setAboutFeatures(JSON.parse(savedAboutFeatures));

      const savedProcessSteps = localStorage.getItem("rw_process_steps");
      if (savedProcessSteps) setProcessSteps(JSON.parse(savedProcessSteps));

      const savedSiteContent = localStorage.getItem("rw_site_content");
      if (savedSiteContent) {
        setSiteContent({ ...defaultSiteContent, ...JSON.parse(savedSiteContent) });
      }
    } catch {
      // Ignore
    }
  }, []);

  const addTemplateCategory = (category: string): boolean => {
    const trimmed = category.trim();
    if (!trimmed) return false;
    let isNew = false;
    setTemplateCategories((prev) => {
      const current = Array.isArray(prev) ? prev : initialTemplateCategories;
      if (current.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
        return current;
      }
      isNew = true;
      const updated = [...current, trimmed];
      try {
        localStorage.setItem("rw_template_categories", JSON.stringify(updated));
      } catch (err) {
        console.error("Gagal menyimpan kategori:", err);
      }
      return updated;
    });
    return isNew;
  };

  const deleteTemplateCategory = (category: string) => {
    setTemplateCategories((prev) => {
      const current = Array.isArray(prev) ? prev : initialTemplateCategories;
      const updated = current.filter((c) => c.toLowerCase() !== category.toLowerCase());
      try {
        localStorage.setItem("rw_template_categories", JSON.stringify(updated));
      } catch (err) {
        console.error("Gagal menyimpan kategori setelah hapus:", err);
      }
      return updated;
    });
  };

  const updateHeroImage = (image: string) => {
    setHeroImage(image);
    localStorage.setItem("rw_hero_image", image);
  };

  const updateSiteLogo = (logo: string) => {
    setSiteLogo(logo);
    localStorage.setItem("rw_site_logo", logo);
  };

  // CRUD Template
  const addTemplate = (item: Omit<Template, "id">) => {
    const newItem: Template = { ...item, id: Date.now().toString() };
    const updated = [newItem, ...templates];
    setTemplates(updated);
    localStorage.setItem("rw_templates", JSON.stringify(updated));
  };

  const updateTemplate = (id: string, item: Partial<Template>) => {
    const updated = templates.map(t => (t.id === id ? { ...t, ...item } : t));
    setTemplates(updated);
    localStorage.setItem("rw_templates", JSON.stringify(updated));
  };

  const deleteTemplate = (id: string) => {
    const updated = templates.filter(t => t.id !== id);
    setTemplates(updated);
    localStorage.setItem("rw_templates", JSON.stringify(updated));
  };

  // CRUD Portfolio
  const addPortfolio = (item: Omit<PortfolioItem, "id">) => {
    const newItem: PortfolioItem = { ...item, id: Date.now().toString() };
    const updated = [newItem, ...portfolios];
    setPortfolios(updated);
    localStorage.setItem("rw_portfolios", JSON.stringify(updated));
  };

  const updatePortfolio = (id: string, item: Partial<PortfolioItem>) => {
    const updated = portfolios.map(p => (p.id === id ? { ...p, ...item } : p));
    setPortfolios(updated);
    localStorage.setItem("rw_portfolios", JSON.stringify(updated));
  };

  const deletePortfolio = (id: string) => {
    const updated = portfolios.filter(p => p.id !== id);
    setPortfolios(updated);
    localStorage.setItem("rw_portfolios", JSON.stringify(updated));
  };

  // CRUD Messages
  const addMessage = (msg: Omit<ClientMessage, "id" | "date" | "status">) => {
    const newMsg: ClientMessage = {
      ...msg,
      id: Date.now().toString(),
      date: "Baru saja",
      status: "Baru",
    };
    const updated = [newMsg, ...messages];
    setMessages(updated);
    localStorage.setItem("rw_messages", JSON.stringify(updated));
  };

  const updateMessageStatus = (id: string, status: "Baru" | "Dihubungi" | "Selesai") => {
    const updated = messages.map(m => (m.id === id ? { ...m, status } : m));
    setMessages(updated);
    localStorage.setItem("rw_messages", JSON.stringify(updated));
  };

  const deleteMessage = (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem("rw_messages", JSON.stringify(updated));
  };

  // CRUD Testimonials
  const addTestimonial = (item: Omit<TestimonialItem, "id">) => {
    const newItem: TestimonialItem = { ...item, id: Date.now().toString() };
    const updated = [newItem, ...testimonials];
    setTestimonials(updated);
    localStorage.setItem("rw_testimonials", JSON.stringify(updated));
  };

  const updateTestimonial = (id: string, item: Partial<TestimonialItem>) => {
    const updated = testimonials.map(t => (t.id === id ? { ...t, ...item } : t));
    setTestimonials(updated);
    localStorage.setItem("rw_testimonials", JSON.stringify(updated));
  };

  const deleteTestimonial = (id: string) => {
    const updated = testimonials.filter(t => t.id !== id);
    setTestimonials(updated);
    localStorage.setItem("rw_testimonials", JSON.stringify(updated));
  };

  // CRUD About Features (Keunggulan / Nilai Tambah)
  const addAboutFeature = (item: Omit<AboutFeatureItem, "id">) => {
    const newItem: AboutFeatureItem = { ...item, id: Date.now().toString() };
    const updated = [...aboutFeatures, newItem];
    setAboutFeatures(updated);
    localStorage.setItem("rw_about_features", JSON.stringify(updated));
  };

  const updateAboutFeature = (id: string, item: Partial<AboutFeatureItem>) => {
    const updated = aboutFeatures.map(f => (f.id === id ? { ...f, ...item } : f));
    setAboutFeatures(updated);
    localStorage.setItem("rw_about_features", JSON.stringify(updated));
  };

  const deleteAboutFeature = (id: string) => {
    const updated = aboutFeatures.filter(f => f.id !== id);
    setAboutFeatures(updated);
    localStorage.setItem("rw_about_features", JSON.stringify(updated));
  };

  // CRUD Process Steps (Langkah Cara Kerja)
  const addProcessStep = (item: Omit<ProcessStepItem, "id">) => {
    const nextNum = String(processSteps.length + 1).padStart(2, "0");
    const newItem: ProcessStepItem = {
      ...item,
      id: Date.now().toString(),
      number: item.number?.trim() || nextNum,
    };
    const updated = [...processSteps, newItem];
    setProcessSteps(updated);
    localStorage.setItem("rw_process_steps", JSON.stringify(updated));
  };

  const updateProcessStep = (id: string, item: Partial<ProcessStepItem>) => {
    const updated = processSteps.map(s => (s.id === id ? { ...s, ...item } : s));
    setProcessSteps(updated);
    localStorage.setItem("rw_process_steps", JSON.stringify(updated));
  };

  const deleteProcessStep = (id: string) => {
    const updated = processSteps.filter(s => s.id !== id);
    setProcessSteps(updated);
    localStorage.setItem("rw_process_steps", JSON.stringify(updated));
  };

  // Update Site Content
  const updateSiteContent = (content: Partial<SiteContent>) => {
    const updated = { ...siteContent, ...content };
    setSiteContent(updated);
    localStorage.setItem("rw_site_content", JSON.stringify(updated));
  };

  return (
    <DataContext.Provider
      value={{
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
        messages,
        addMessage,
        updateMessageStatus,
        deleteMessage,
        heroImage,
        updateHeroImage,
        siteLogo,
        updateSiteLogo,
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
        siteContent,
        updateSiteContent,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
