"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  role: "user" | "admin";
  savedTemplates: string[]; // List of template IDs saved
}

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  login: (email: string, name?: string, phone?: string) => "admin" | "user";
  logout: () => void;
  toggleSaveTemplate: (templateId: string) => boolean; // Returns true if saved, false if unsaved
  isTemplateSaved: (templateId: string) => boolean;
  openLoginModal: (redirectAction?: string) => void;
  closeLoginModal: () => void;
  isLoginModalOpen: boolean;
  isDashboardOpen: boolean;
  openDashboard: () => void;
  closeDashboard: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  // Load user from localStorage on initial render
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("republikweb_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch {
      // Ignore storage error
    }
  }, []);

  const login = (email: string, name?: string, phone?: string): "admin" | "user" => {
    const cleanEmail = email.toLowerCase().trim();
    const isAdmin = cleanEmail === "admin@republikweb" || cleanEmail === "admin@republikweb.net";
    const defaultName = isAdmin
      ? "Administrator RepublikWeb"
      : (name || email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, l => l.toUpperCase()));

    const newUser: UserProfile = {
      name: defaultName,
      email: cleanEmail,
      phone: phone || "08123456789",
      role: isAdmin ? "admin" : "user",
      savedTemplates: user?.savedTemplates || ["1"], // Default initial saved template demo
    };
    setUser(newUser);
    localStorage.setItem("republikweb_user", JSON.stringify(newUser));
    setIsLoginModalOpen(false);
    return newUser.role;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("republikweb_user");
    setIsDashboardOpen(false);
  };

  const toggleSaveTemplate = (templateId: string): boolean => {
    if (!user) {
      setIsLoginModalOpen(true);
      return false;
    }

    const isAlreadySaved = user.savedTemplates.includes(templateId);
    const newSaved = isAlreadySaved
      ? user.savedTemplates.filter(id => id !== templateId)
      : [...user.savedTemplates, templateId];

    const updatedUser = { ...user, savedTemplates: newSaved };
    setUser(updatedUser);
    localStorage.setItem("republikweb_user", JSON.stringify(updatedUser));
    return !isAlreadySaved;
  };

  const isTemplateSaved = (templateId: string): boolean => {
    return user ? user.savedTemplates.includes(templateId) : false;
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openDashboard = () => setIsDashboardOpen(true);
  const closeDashboard = () => setIsDashboardOpen(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
        toggleSaveTemplate,
        isTemplateSaved,
        openLoginModal,
        closeLoginModal,
        isLoginModalOpen,
        isDashboardOpen,
        openDashboard,
        closeDashboard,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
