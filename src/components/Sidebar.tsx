"use client"

import { useState } from "react"
import { NavLink } from "react-router-dom"
import { FaHome, FaCube, FaRocket, FaPaintBrush } from "react-icons/fa"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)

  const modules = [
    { label: "Inicio", href: "/", icon: FaHome, color: "from-blue-400 to-cyan-400" },
    { label: "Geometría 3D", href: "/geometry-3d", icon: FaCube, color: "from-purple-400 to-pink-400" },
    { label: "Sistema Solar", href: "/solar-system", icon: FaRocket, color: "from-orange-400 to-red-400" },
    { label: "Pintura 3D", href: "/paint-3d", icon:  FaPaintBrush, color: "from-green-400 to-emerald-400" },
  ]

  return (
    <>
      <aside className="hidden md:flex flex-col h-screen w-72 bg-gradient-to-b from-white to-blue-50 shadow-2xl rounded-r-3xl border-r-4 border-blue-200 p-6 gap-6 fixed left-0 top-0 z-50">
        {/* Logo/Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="text-5xl">🧠</div>
          <div>
            <h1 className="text-2xl font-black text-blue-600">Mentes</h1>
            <p className="text-xs font-bold text-purple-500">Creativas</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-3 flex-1">
          {modules.map((module) => {
            const Icon = module.icon
            return (
              <NavLink
                key={module.href}
                to={module.href}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 ${
                    isActive
                      ? `bg-gradient-to-r ${module.color} text-white shadow-lg scale-105`
                      : "text-gray-700 hover:bg-white/50"
                  }`
                }
              >
                <Icon size={28} />
                <span>{module.label}</span>
              </NavLink>
            )
          })}
        </nav>

        {/* Footer card */}
        <div className="bg-gradient-to-br from-green-200 to-blue-200 rounded-2xl p-5 text-center border-2 border-green-300">
          <p className="text-sm font-black text-gray-700">📚 ¡Sigue aprendiendo!</p>
          <p className="text-xs text-gray-600 mt-1">Cada lección te hace más inteligente</p>
        </div>
      </aside>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-full shadow-lg text-2xl"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
  <div
    data-testid="overlay"
    className="md:hidden fixed inset-0 bg-black/50 z-40"
    onClick={() => setIsOpen(false)}
  />
)}
    </>
  )
}

