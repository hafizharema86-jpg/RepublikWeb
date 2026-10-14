"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!fullName || !email || !phone || !password || !confirmPassword) {
      setStatusMessage({ type: "error", text: "Semua kolom formulir wajib diisi." });
      return;
    }

    if (password !== confirmPassword) {
      setStatusMessage({ type: "error", text: "Konfirmasi password tidak cocok dengan password." });
      return;
    }

    if (password.length < 6) {
      setStatusMessage({ type: "error", text: "Password minimal harus 6 karakter." });
      return;
    }

    if (!agreeTerms) {
      setStatusMessage({ type: "error", text: "Anda harus menyetujui syarat & ketentuan layanan." });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      login(email, fullName, phone);
      setStatusMessage({
        type: "success",
        text: "Pendaftaran Berhasil! Selamat datang di RepublikWeb. Mengalihkan...",
      });
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }, 900);
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
      <main className="w-full max-w-lg mx-auto px-6 py-6 z-10">
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 p-8 md:p-10 relative">
          
          {/* Header Title */}
          <div className="text-center mb-6">
            <div className="w-11 h-11 rounded-full bg-[#00a68a] text-white flex items-center justify-center font-bold text-lg shadow-sm mx-auto mb-3">
              R
            </div>
            <h1 className="text-2xl font-extrabold text-[#1a1a1a] tracking-tight">
              Buat Akun Baru
            </h1>
            <p className="text-xs text-gray-500 mt-1.5">
              Daftar sekarang untuk memulai konsultasi, pemesanan website & project digital Anda.
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

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nama Lengkap */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Nama Lengkap
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nama lengkap Anda"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a68a] focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Email & WhatsApp Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
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
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  No. WhatsApp
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="081234567890"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a68a] focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Password & Konfirmasi Password Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
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

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Ulangi Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi password"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a68a] focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Checkbox Syarat & Ketentuan */}
            <div className="flex items-start pt-1">
              <input
                id="agree-terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 text-[#00a68a] border-gray-300 rounded focus:ring-[#00a68a] cursor-pointer"
              />
              <label htmlFor="agree-terms" className="ml-2 block text-xs text-gray-600 cursor-pointer leading-relaxed">
                Saya menyetujui <span className="text-[#00a68a] font-medium hover:underline">Syarat & Ketentuan</span> serta <span className="text-[#00a68a] font-medium hover:underline">Kebijakan Privasi</span> RepublikWeb.
              </label>
            </div>

            {/* Tombol Submit */}
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
                  Membuat Akun...
                </>
              ) : (
                "Daftar Sekarang"
              )}
            </button>
          </form>

          {/* Link ke Halaman Login */}
          <p className="text-center text-xs text-gray-500 mt-6">
            Sudah punya akun?{" "}
            <Link href="/login" className="font-bold text-[#00a68a] hover:underline">
              Masuk di sini
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
