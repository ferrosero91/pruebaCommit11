"use client"

import { NavLink } from "react-router-dom"

export default function Home() {
  const modules = [
    {
      id: "math",
      title: "Matemáticas",
      subtitle: "Figuras Geométricas",
      emoji: "📐",
      color: "bg-blue-100",
      borderColor: "border-blue-400",
      gradient: "from-blue-400 to-cyan-400",
      href: "/geometry-3d",
    },
    {
      id: "science",
      title: "Ciencias Naturales",
      subtitle: "Sistema Solar",
      emoji: "🌍",
      color: "bg-purple-100",
      borderColor: "border-purple-400",
      gradient: "from-purple-400 to-pink-400",
      href: "/solar-system",
    },
        {
      id: "art",
      title: "Arte y Creatividad",
      subtitle: "Pintura 3D",
      emoji: "🎨",
      color: "bg-purple-100",
      borderColor: "border-purple-400",
      gradient: "from-purple-400 to-pink-400",
      href: "/paint-3d",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Greeting */}
      <div className="mb-12 text-center">
        <h2 className="text-5xl font-black text-gray-800 mb-3">¡Hola, pequeño aventurero! 👋</h2>
        <p className="text-xl text-gray-600 font-semibold">Elige un módulo y aprende con instrucciones de voz</p>
      </div>

      {/* Modules Grid - 3 columnas */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {modules.map((module) => (
          <NavLink key={module.id} to={module.href}>
            <div
              className={`${module.color} ${module.borderColor} rounded-3xl p-8 h-full flex flex-col justify-between cursor-pointer transform hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-2xl border-4`}
            >
              {/* Module Icon */}
              <div className="text-9xl text-center mb-4">{module.emoji}</div>

              {/* Module Info */}
              <div className="text-center flex-1 flex flex-col justify-center mb-6">
                <h3 className="text-3xl font-black text-gray-800 mb-2">{module.title}</h3>
                <p className="text-xl font-bold text-gray-700">{module.subtitle}</p>
              </div>

              {/* CTA Button */}
              <div
                className={`bg-gradient-to-r ${module.gradient} text-white px-6 py-4 rounded-2xl font-black text-center text-lg hover:shadow-lg transition-all transform hover:scale-105`}
              >
                ¡JUGAR! 🎮
              </div>
            </div>
          </NavLink>
        ))}
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-green-200">
        <h3 className="text-3xl font-black text-gray-800 mb-6">📊 Tu Progreso</h3>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: "📚", label: "Módulos", value: "0/3" },
            { icon: "⭐", label: "Estrellas", value: "0" },
            { icon: "🏆", label: "Medallas", value: "0" },
            { icon: "🔥", label: "Racha", value: "0 días" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-green-100 to-blue-100 rounded-3xl p-6 text-center border-3 border-green-300 transform hover:scale-105 transition-all"
            >
              <div className="text-6xl mb-3">{stat.icon}</div>
              <p className="text-gray-700 font-bold text-lg">{stat.label}</p>
              <p className="text-4xl font-black text-green-600">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
