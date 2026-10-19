"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";

export default function LogoutConfirmModal() {
  const { isLogoutConfirmOpen, cancelLogout, confirmLogout } = useAuth();

  if (!isLogoutConfirmOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={cancelLogout}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-sm w-full p-6 text-center transform transition-all animate-in fade-in zoom-in-95 duration-200">
        {/* Icon */}
        <div className="mx-auto w-14 h-14 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 mb-4 shadow-inner">
          <svg
            className="w-7 h-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </div>

        {/* Title & Desc */}
        <h3 className="text-lg font-bold text-slate-800">
          Konfirmasi Logout
        </h3>
        <p className="text-sm text-slate-500 mt-2">
          Apakah Anda yakin ingin keluar dari akun Anda?
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={cancelLogout}
            className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-all cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={confirmLogout}
            className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm transition-all shadow-md shadow-rose-600/20 cursor-pointer"
          >
            Ya, Keluar
          </button>
        </div>
      </div>
    </div>
  );
}
