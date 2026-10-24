"use client";

import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useData, Template } from "@/context/DataContext";

const sampleTemplates: Record<string, { title: string; category: string; price: string; image: string }> = {
  "1": {
    title: "Nexus Digital - Modern Agency",
    category: "Agency",
    price: "Rp 299.000",
    image: "/template-agency.jpg",
  },
  "2": {
    title: "The Grill Room - Fine Dining",
    category: "Restaurant",
    price: "Rp 249.000",
    image: "/template-restaurant.jpg",
  },
  "3": {
    title: "Thoughtful - Designer Portfolio",
    category: "Portfolio",
    price: "Rp 199.000",
    image: "/template-portfolio.jpg",
  },
  "4": {
    title: "InnovateTech - Corporate Site",
    category: "Company Profile",
    price: "Rp 349.000",
    image: "/template-agency.jpg",
  },
  "5": {
    title: "EcoWave - Clean E-Commerce",
    category: "E-Commerce",
    price: "Rp 399.000",
    image: "/template-portfolio.jpg",
  },
};

export default function MemberDashboardModal() {
  const { user, isDashboardOpen, closeDashboard, logout, toggleSaveTemplate } = useAuth();
  const { templates, siteLogo } = useData();

  if (!isDashboardOpen || !user) return null;

  const savedList = user.savedTemplates
    .map((id) => templates.find((t) => t.id === id) || (sampleTemplates[id] ? { id, ...sampleTemplates[id] } : null))
    .filter(Boolean) as (Template | { id: string; title: string; category: string; price: string; image: string })[];


  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={closeDashboard} />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 md:p-8 z-10 animate-scaleUp overflow-y-auto max-h-[92vh]">
        
        {/* Header with User Info & Close */}
        <div className="flex items-start justify-between pb-5 border-b border-gray-100">
          <div className="flex items-center gap-3.5">
            {user.role === "admin" && siteLogo ? (
              <div className="w-12 h-12 rounded-full overflow-hidden relative border border-gray-200 shrink-0 shadow-md shadow-[#00a68a]/20">
                <Image src={siteLogo} alt={user.name} fill className="object-cover" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#00a68a] to-[#2dd4bf] text-white flex items-center justify-center font-bold text-lg shadow-md shadow-[#00a68a]/20">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#1a1a1a]">{user.name}</h3>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  user.role === "admin"
                    ? "bg-slate-900 text-[#2dd4bf] border border-slate-700"
                    : "bg-emerald-50 text-[#00a68a] border border-emerald-200/80"
                }`}>
                  {user.role === "admin" ? "Administrator" : "Member Aktif"}
                </span>
              </div>
              <p className="text-xs text-gray-500">{user.email}</p>

              {user.role === "admin" && (
                <div className="mt-2">
                  <a
                    href="/admin/dashboard"
                    onClick={closeDashboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#090d16] hover:bg-black text-[#2dd4bf] border border-slate-700 rounded-lg text-xs font-bold transition-all shadow-xs"
                  >
                    Buka Dashboard Admin →
                  </a>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={closeDashboard}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="flex items-center gap-2 mt-5 mb-6 border-b border-gray-100 pb-3">
          <div className="px-4 py-2 text-xs md:text-sm font-bold rounded-xl bg-[#00a68a] text-white shadow-sm shadow-[#00a68a]/20 flex items-center gap-1.5">
            <span>Template Disimpan</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
              {savedList.length}
            </span>
          </div>
        </div>

        {/* Saved Templates List */}
        <div>
            <div className="flex items-center justify-between mb-3.5">
              <h4 className="text-sm font-bold text-gray-800">
                Template Yang Anda Favoritkan ({savedList.length})
              </h4>
              <p className="text-xs text-gray-400">Tersimpan otomatis di akun Anda</p>
            </div>

            {savedList.length === 0 ? (
              <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <div className="w-10 h-10 rounded-full bg-gray-200/70 flex items-center justify-center mx-auto mb-2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-500 font-medium">Belum ada template yang disimpan.</p>
                <p className="text-[11px] text-gray-400 mt-1">
                  Klik simpan di bagian galeri template untuk menyimpannya ke sini.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {savedList.map(item => (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl border border-gray-200/80 bg-gray-50 flex items-center gap-3 relative group"
                  >
                    <div className="relative w-16 h-14 rounded-xl overflow-hidden bg-gray-200 shrink-0">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 pr-6">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[9px] font-bold text-[#00a68a] bg-emerald-50 px-1.5 py-0.5 rounded">
                          {item.category}
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-gray-800 truncate mt-1">
                        {item.title}
                      </h5>
                      <span className="text-xs font-bold block text-gray-600">
                        {item.price}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleSaveTemplate(item.id)}
                      title="Hapus dari favorit"
                      className="absolute top-2.5 right-2.5 text-gray-400 hover:text-red-500 p-1 cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        {/* Modal Bottom Actions */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
          <button
            onClick={logout}
            className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Keluar dari Akun (Logout)
          </button>

          <button
            onClick={closeDashboard}
            className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
