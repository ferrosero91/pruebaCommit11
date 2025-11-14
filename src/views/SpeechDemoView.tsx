"use client"

import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { Button } from "../components/ui/button"

const planets = [
  {
    id: 1,
    name: "Sol",
    emoji: "☀️",
    distance: "0 km",
    diameter: "1,391,000 km",
    fact: "Es una estrella gigante que alimenta todo el Sistema Solar",
    color: "#FFD700",
    orbitSpeed: 0,
    radius: 0,
  },
  {
    id: 2,
    name: "Mercurio",
    emoji: "🟤",
    distance: "58M km",
    diameter: "3,832 km",
    fact: "El planeta más cercano al Sol y muy caliente",
    color: "#8C7853",
    orbitSpeed: 0.08,
    radius: 80,
  },
  {
    id: 3,
    name: "Venus",
    emoji: "🟡",
    distance: "108M km",
    diameter: "12,104 km",
    fact: "Tiene una atmósfera muy caliente y densa",
    color: "#FFC649",
    orbitSpeed: 0.045,
    radius: 130,
  },
  {
    id: 4,
    name: "Tierra",
    emoji: "🌍",
    distance: "150M km",
    diameter: "12,742 km",
    fact: "Nuestro hogar, el único planeta con vida conocida",
    color: "#4B9FFF",
    orbitSpeed: 0.03,
    radius: 180,
  },
  {
    id: 5,
    name: "Marte",
    emoji: "🔴",
    distance: "228M km",
    diameter: "6,779 km",
    fact: "El planeta rojo, posible futuro hogar de la humanidad",
    color: "#CD5C5C",
    orbitSpeed: 0.02,
    radius: 230,
  },
  {
    id: 6,
    name: "Júpiter",
    emoji: "🟠",
    distance: "778M km",
    diameter: "139,820 km",
    fact: "El planeta más grande del Sistema Solar",
    color: "#DAA520",
    orbitSpeed: 0.008,
    radius: 300,
  },
  {
    id: 7,
    name: "Saturno",
    emoji: "🪐",
    distance: "1,427M km",
    diameter: "116,460 km",
    fact: "Famoso por sus hermosos anillos",
    color: "#F0E68C",
    orbitSpeed: 0.004,
    radius: 360,
  },
  {
    id: 8,
    name: "Urano",
    emoji: "🔵",
    distance: "2,871M km",
    diameter: "50,724 km",
    fact: "Gira acostado de un lado",
    color: "#4FD0E7",
    orbitSpeed: 0.0015,
    radius: 420,
  },
  {
    id: 9,
    name: "Neptuno",
    emoji: "💙",
    distance: "4,495M km",
    diameter: "49,244 km",
    fact: "Tiene los vientos más rápidos de todos los planetas",
    color: "#4166F5",
    orbitSpeed: 0.0005,
    radius: 480,
  },
]

export default function NaturalSciencesPage() {
  const [selectedPlanet, setSelectedPlanet] = useState<number | null>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [time, setTime] = useState(0)

  const speakInstruction = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "es-ES"
    utterance.rate = 0.9
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  useEffect(() => {
    if (!gameStarted) return

    const interval = setInterval(() => {
      setTime((prev) => prev + 0.5)
    }, 50)

    return () => clearInterval(interval)
  }, [gameStarted])

  const getPlanetPositions = () => {
    return planets.map((planet) => {
      if (planet.id === 1) return { ...planet, x: 0, y: 0 }

      const angle = (time * planet.orbitSpeed * Math.PI) / 180
      const x = Math.cos(angle) * planet.radius
      const y = Math.sin(angle) * planet.radius

      return { ...planet, x, y }
    })
  }

  const positionedPlanets = getPlanetPositions()

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-black flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-12 shadow-2xl border-4 border-yellow-400 max-w-2xl text-center">
          <div className="text-9xl mb-6">🌍</div>
          <h1 className="text-5xl font-black text-purple-600 mb-4">¡Sistema Solar!</h1>
          <p className="text-2xl text-gray-700 mb-8 font-bold">
            Los 9 planetas en órbita real alrededor del Sol. Haz clic en cada planeta para aprender datos fascinantes.
          </p>
          <Button
            onClick={() => {
              setGameStarted(true)
              speakInstruction(
                "Bienvenido al Sistema Solar. Mira cómo los planetas orbitan alrededor del Sol. Haz clic en cada uno para aprender datos increíbles.",
              )
            }}
            className="px-12 py-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-black text-2xl rounded-2xl hover:scale-110"
          >
            ¡EXPLORAR! 🚀
          </Button>
          <NavLink to="/">
            <Button variant="outline" className="mt-6 px-8 py-3 text-lg bg-transparent">
              ← Volver
            </Button>
          </NavLink>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-black p-4">
      {/* Estrellas animadas */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(200)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${1 + Math.random() * 3}px`,
              animation: `twinkle ${1 + Math.random() * 3}s infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto mb-8 relative z-10">
        <NavLink to="/">
          <Button variant="outline" className="mb-4 bg-transparent text-white border-white hover:bg-white/10">
            ← Volver
          </Button>
        </NavLink>
        <h1 className="text-5xl font-black text-yellow-300 text-center">☀️ SISTEMA SOLAR INTERACTIVO ☀️</h1>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-gradient-to-b from-purple-900 to-black rounded-3xl p-8 border-4 border-yellow-400 shadow-2xl overflow-hidden">
          <div className="relative w-full h-screen md:h-screen flex items-center justify-center bg-gradient-to-br from-purple-950 via-blue-950 to-black rounded-2xl overflow-hidden">
            {/* Órbitas visuales */}
            <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
              {[80, 130, 180, 230, 300, 360, 420, 480].map((r, idx) => (
                <circle
                  key={idx}
                  cx="50%"
                  cy="50%"
                  r={`${r}px`}
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="2"
                  strokeDasharray="8,8"
                />
              ))}
            </svg>

            {/* Sol en el centro */}
            <button
              onClick={() => {
                setSelectedPlanet(1)
                speakInstruction("El Sol. Una estrella gigante. Un millón de Tierras cabrían dentro del Sol.")
              }}
              className="absolute z-20 w-24 h-24 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full shadow-2xl border-4 border-yellow-200 flex items-center justify-center text-8xl hover:scale-125 transition-all transform hover:shadow-[0_0_40px_rgba(255,215,0,0.9)] cursor-pointer"
              title="Sol"
            >
              ☀️
            </button>

            {/* Planetas en órbita animada */}
            {positionedPlanets.slice(1).map((planet) => (
              <button
                key={planet.id}
                onClick={() => {
                  setSelectedPlanet(planet.id)
                  speakInstruction(`${planet.name}. ${planet.fact} Está a ${planet.distance} del Sol.`)
                }}
                className="absolute text-6xl hover:scale-150 transition-all transform z-10 hover:shadow-[0_0_30px_rgba(255,215,0,0.7)] cursor-pointer drop-shadow-lg"
                style={{
                  left: `calc(50% + ${planet.x}px)`,
                  top: `calc(50% + ${planet.y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
                title={planet.name}
              >
                {planet.emoji}
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedPlanet && (
        <div className="max-w-7xl mx-auto mt-8 relative z-10">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-purple-400">
            <div className="text-center">
              <p className="text-8xl mb-4">{positionedPlanets.find((p) => p.id === selectedPlanet)?.emoji}</p>
              <h2 className="text-4xl font-black text-purple-600 mb-4">
                {positionedPlanets.find((p) => p.id === selectedPlanet)?.name}
              </h2>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-100 rounded-2xl p-6 border-2 border-blue-300">
                  <p className="text-gray-600 font-bold text-lg">Distancia del Sol</p>
                  <p className="text-3xl font-black text-blue-600">
                    {positionedPlanets.find((p) => p.id === selectedPlanet)?.distance}
                  </p>
                </div>
                <div className="bg-green-100 rounded-2xl p-6 border-2 border-green-300">
                  <p className="text-gray-600 font-bold text-lg">Diámetro</p>
                  <p className="text-3xl font-black text-green-600">
                    {positionedPlanets.find((p) => p.id === selectedPlanet)?.diameter}
                  </p>
                </div>
              </div>
              <p className="text-2xl text-gray-700 mb-8 font-bold">
                🔍 {positionedPlanets.find((p) => p.id === selectedPlanet)?.fact}
              </p>
              <Button
                onClick={() => setSelectedPlanet(null)}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black text-lg rounded-2xl hover:scale-105"
              >
                Explorar otro planeta
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

// Agregar estilos CSS al head
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes twinkle {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 1; }
    }
  `
  if (!document.head.querySelector('style[data-twinkle]')) {
    style.setAttribute('data-twinkle', 'true')
    document.head.appendChild(style)
  }
}
