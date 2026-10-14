"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fillDemo = () => {
    setStatusMessage(null);
    setEmail("klien@republikweb.net");
    setPassword("password123");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!email || !password) {
      setStatusMessage({ type: "error", text: "Mohon isi email dan password dengan benar." });
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
          router.push("/admin/dashboard");
        }, 800);
      } else {
        setStatusMessage({
          type: "success",
          text: "Login Berhasil! Selamat datang di RepublikWeb. Mengalihkan...",
        });
        setTimeout(() => {
          router.push("/");
        }, 900);
      }
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1a1a1a] flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background Soft Glows */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#00a68a]/12 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#38bdf8]/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Top Header */}
      <header className="w-full max-w-[1300px] mx-auto px-6 py-6 flex items-center justify-between z-10">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full bg-[#00a68a] text-white flex items-center justify-center font-bold text-sm shadow-md group-hover:scale-105 transition-transform">
            R
          </div>
          <span className="font-bold text-xl tracking-tight text-[#1a1a1a]">
            RepublikWeb<span className="text-[#00a68a]">.net</span>
          </span>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#00a68a] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Beranda
        </Link>
      </header>

      {/* Main Form Container */}
      <main className="w-full max-w-md mx-auto px-6 py-8 z-10">
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 p-8 md:p-10 relative">
          
          {/* Header Title */}
          <div className="text-center mb-7">
            <div className="w-12 h-12 rounded-full bg-[#00a68a] text-white flex items-center justify-center font-bold text-lg shadow-sm mx-auto mb-3">
              R
            </div>
            <h1 className="text-2xl font-extrabold text-[#1a1a1a] tracking-tight">
              Login ke RepublikWeb
            </h1>
            <p className="text-xs text-gray-500 mt-1.5">
              Masuk ke akun Anda untuk mengelola website & project digital.
            </p>
          </div>

          {/* Feedback Status Alert */}
          {statusMessage && (
            <div
              className={`mb-5 px-4 py-3 rounded-xl text-xs flex items-center gap-2.5 transition-all ${
                statusMessage.type === "success"
                  ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                  : "bg-red-50 border border-red-200 text-red-700"
              }`}
            >
              {statusMessage.type === "success" ? (
                <svg className="w-4 h-4 text-[#00a68a] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
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
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a68a] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs font-medium text-[#00a68a] hover:underline"
                >
                  Lupa password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a68a] focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
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
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-[#00a68a] border-gray-300 rounded focus:ring-[#00a68a] cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-xs text-gray-600 cursor-pointer">
                Ingat saya di perangkat ini
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-[#00a68a] hover:bg-[#008f76] transition-all shadow-md shadow-[#00a68a]/25 flex items-center justify-center gap-2 cursor-pointer ${
                isLoading ? "opacity-75 cursor-not-allowed" : "active:scale-[0.99]"
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memproses...
                </>
              ) : (
                "Masuk ke Akun"
              )}
            </button>
          </form>

          {/* Quick Demo Filler */}
          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <button
              type="button"
              onClick={fillDemo}
              className="text-xs text-gray-500 hover:text-[#00a68a] transition-colors font-medium inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Coba Akun Demo</span>
            </button>
          </div>

          <p className="text-center text-xs text-gray-500 mt-5">
            Belum punya akun?{" "}
            <Link href="#" className="font-bold text-[#00a68a] hover:underline">
              Daftar sekarang
            </Link>
          </p>
        </div>
      </main>

      {/* Footer Copyright */}
      <footer className="w-full text-center py-5 text-xs text-gray-400 z-10">
        &copy; {new Date().getFullYear()} RepublikWeb.net. All rights reserved.
      </footer>
    </div>
  );
}
