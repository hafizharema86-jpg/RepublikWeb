import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";
import LogoutConfirmModal from "@/components/LogoutConfirmModal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "RepublikWeb.net - Bangun Kehadiran Digital yang Siap Berkembang",
  description: "Dari landing page, website custom, hingga pengelolaan social media — RepublikWeb.net membantu Anda membangun dan mengembangkan bisnis secara digital dalam satu platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <AuthProvider>
          <DataProvider>
            {children}
            <LogoutConfirmModal />
          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

