"use client"

import React, { useEffect } from "react";

const Navbar: React.FC = () => {
  // Inicializa el tema al cargar
  useEffect(() => {
    const root = document.documentElement;
    const saved = localStorage.getItem("theme");

    if (saved) {
      root.classList.toggle("dark", saved === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      root.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = root.classList.toggle("dark") ? "dark" : "light";
    localStorage.setItem("theme", next);
    // Notifica a la app para que vistas activas reaccionen en vivo
    document.dispatchEvent(new CustomEvent("theme:changed", { detail: { theme: next } }));
  };

  return (
    <header className="bg-white shadow-md border-b-4 border-green-400">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-5xl">🎨</div>
          <div>
            <h1 className="text-3xl font-black text-green-600">Mentes Creativas</h1>
            <p className="text-sm text-gray-500 font-semibold">Aprende jugando con audio 🎧</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-black rounded-full hover:shadow-lg transition-all hover:scale-105 transform text-lg">
            ⭐ 0 Estrellas
          </button>
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-3xl shadow-md">
            👤
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="px-4 py-2 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:opacity-90 transition rounded-full"
          >
            {document.documentElement.classList.contains("dark") ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
