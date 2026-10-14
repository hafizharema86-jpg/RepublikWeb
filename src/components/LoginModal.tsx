"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "register";
}

export default function LoginModal({ isOpen, onClose, initialMode = "login" }: LoginModalProps) {
  const router = useRouter();
  const { login } = useAuth();
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  
  // Login State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Register State
  const [regFullName, setRegFullName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Shared State
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  if (!isOpen) return null;

  const fillDemo = () => {
    setStatusMessage(null);
    setEmail("klien@republikweb.net");
    setPassword("password123");
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!email || !password) {
      setStatusMessage({ type: "error", text: "Mohon isi email dan password." });
      return;
    }

    const userEmail = email.toLowerCase().trim();
    
    if (userEmail === "admin@republikweb" || userEmail === "admin@republikweb.net") {
      if (password !== "admin123") {
        setStatusMessage({ type: "error", text: "Password admin salah." });
        return;
      }
    } else if (userEmail === "klien@republikweb.net") {
      if (password !== "password123") {
        setStatusMessage({ type: "error", text: "Password salah." });
        return;
      }
    } else {
      setStatusMessage({ type: "error", text: "Akun belum terdaftar." });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const role = login(email);
      if (role === "admin") {
        setStatusMessage({
          type: "success",
          text: "Login Admin Berhasil! Mengalihkan ke Dashboard Admin...",
        });
        setTimeout(() => {
          onClose();
          router.push("/admin/dashboard");
        }, 800);
      } else {
        setStatusMessage({
          type: "success",
          text: "Login Berhasil! Selamat datang di RepublikWeb.",
        });
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    }, 700);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!regFullName || !regEmail || !regPhone || !regPassword || !regConfirmPassword) {
      setStatusMessage({ type: "error", text: "Semua kolom pendaftaran wajib diisi." });
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setStatusMessage({ type: "error", text: "Konfirmasi password tidak cocok." });
      return;
    }

    if (regPassword.length < 6) {
      setStatusMessage({ type: "error", text: "Password minimal harus 6 karakter." });
      return;
    }

    if (!agreeTerms) {
      setStatusMessage({ type: "error", text: "Anda harus menyetujui syarat & ketentuan." });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      login(regEmail, regFullName, regPhone);
      setStatusMessage({
        type: "success",
        text: "Pendaftaran Berhasil! Akun Anda siap digunakan.",
      });
      setTimeout(() => {
        onClose();
      }, 1000);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop overlay (click to close) */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 p-7 md:p-9 z-10 animate-scaleUp overflow-y-auto max-h-[92vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-all cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Brand Logo & Header */}
        <div className="text-center mb-5">
          <div className="w-10 h-10 rounded-full bg-[#00a68a] text-white flex items-center justify-center font-bold text-base shadow-sm mx-auto mb-2.5">
            R
          </div>
          <h2 className="text-2xl font-extrabold text-[#1a1a1a] tracking-tight">
            {mode === "login" ? "Login ke RepublikWeb" : "Buat Akun Baru"}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            {mode === "login"
              ? "Masuk ke akun Anda untuk mengelola website & project digital."
              : "Daftar untuk memesan website & berkonsultasi dengan tim RepublikWeb."}
          </p>
        </div>

        {/* Mode Switcher Tabs (Masuk vs Daftar Baru) */}
        <div className="bg-gray-100/90 p-1 rounded-2xl flex items-center mb-5 border border-gray-200/60">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setStatusMessage(null);
            }}
            className={`flex-1 py-2 text-xs md:text-sm font-bold rounded-xl transition-all cursor-pointer ${
              mode === "login"
                ? "bg-white text-[#00a68a] shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Masuk / Login
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setStatusMessage(null);
            }}
            className={`flex-1 py-2 text-xs md:text-sm font-bold rounded-xl transition-all cursor-pointer ${
              mode === "register"
                ? "bg-white text-[#00a68a] shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Daftar Akun Baru
          </button>
        </div>

        {/* Feedback Alert */}
        {statusMessage && (
          <div
            className={`mb-4 px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-2 ${
              statusMessage.type === "success"
                ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                : "bg-red-50 border border-red-200 text-red-700"
            }`}
          >
            {statusMessage.type === "success" ? (
              <svg className="w-4 h-4 text-[#00a68a] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" strokeWidth="2" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" />
              </svg>
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* ===================== MODE 1: FORM LOGIN ===================== */}
        {mode === "login" ? (
          <form onSubmit={handleLoginSubmit} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a68a] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                  Password
                </label>
                <Link href="#" className="text-[11px] font-medium text-[#00a68a] hover:underline">
                  Lupa password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-3.5 pr-10 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a68a] focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-modal"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 text-[#00a68a] border-gray-300 rounded focus:ring-[#00a68a] cursor-pointer"
              />
              <label htmlFor="remember-modal" className="ml-2 block text-xs text-gray-600 cursor-pointer">
                Ingat saya di perangkat ini
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-[#00a68a] hover:bg-[#008f76] transition-all shadow-md shadow-[#00a68a]/25 flex items-center justify-center gap-2 cursor-pointer ${
                isLoading ? "opacity-75 cursor-not-allowed" : "active:scale-[0.99]"
              }`}
            >
              {isLoading ? "Memproses..." : "Masuk ke Akun"}
            </button>

            <div className="pt-3 border-t border-gray-100 text-center">
              <button
                type="button"
                onClick={fillDemo}
                className="text-xs text-gray-500 hover:text-[#00a68a] transition-colors font-medium inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Coba Akun Demo</span>
              </button>
            </div>
          </form>
        ) : (
          /* ===================== MODE 2: FORM DAFTAR ===================== */
          <form onSubmit={handleRegisterSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={regFullName}
                onChange={(e) => setRegFullName(e.target.value)}
                placeholder="Nama lengkap Anda"
                required
                className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a68a] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                Email
              </label>
              <input
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="nama@email.com"
                required
                className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a68a] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                No. WhatsApp
              </label>
              <input
                type="tel"
                value={regPhone}
                onChange={(e) => setRegPhone(e.target.value)}
                placeholder="081234567890"
                required
                className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a68a] focus:bg-white transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Min. 6 digit"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a68a] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Konfirmasi
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  placeholder="Ulangi"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a68a] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="flex items-center pt-1">
              <input
                id="agree-modal"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-3.5 h-3.5 text-[#00a68a] border-gray-300 rounded focus:ring-[#00a68a] cursor-pointer"
              />
              <label htmlFor="agree-modal" className="ml-2 block text-[11px] text-gray-600 cursor-pointer">
                Saya menyetujui Syarat & Kebijakan Privasi
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-[#00a68a] hover:bg-[#008f76] transition-all shadow-md shadow-[#00a68a]/25 flex items-center justify-center gap-2 cursor-pointer ${
                isLoading ? "opacity-75 cursor-not-allowed" : "active:scale-[0.99]"
              }`}
            >
              {isLoading ? "Mendaftarkan..." : "Daftar Akun Sekarang"}
            </button>
          </form>
        )}

        {/* Footer Toggle text */}
        <p className="text-center text-xs text-gray-500 mt-4">
          {mode === "login" ? (
            <>
              Belum punya akun?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("register");
                  setStatusMessage(null);
                }}
                className="font-bold text-[#00a68a] hover:underline cursor-pointer"
              >
                Daftar sekarang
              </button>
            </>
          ) : (
            <>
              Sudah punya akun?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setStatusMessage(null);
                }}
                className="font-bold text-[#00a68a] hover:underline cursor-pointer"
              >
                Masuk di sini
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
