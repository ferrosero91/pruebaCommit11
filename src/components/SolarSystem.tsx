"use client"

import { useState, useEffect, useRef } from "react"
import { NavLink } from "react-router-dom"
import { Button } from "./ui/button"

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
    funFact: "¡Cabe un millón de Tierras dentro del Sol!",
    moons: 0,
    dayLength: "25 días terrestres",
  },
  {
    id: 2,
    name: "Mercurio",
    emoji: "🟤",
    distance: "58M km",
    diameter: "3,832 km",
    fact: "El planeta más cercano al Sol y muy caliente",
    color: "#8C7853",
    orbitSpeed: 0.15,
    radius: 30,
    funFact: "Un día en Mercurio dura 59 días terrestres",
    moons: 0,
    dayLength: "59 días terrestres",
  },
  {
    id: 3,
    name: "Venus",
    emoji: "🟡",
    distance: "108M km",
    diameter: "12,104 km",
    fact: "Tiene una atmósfera muy caliente y densa",
    color: "#FFC649",
    orbitSpeed: 0.12,
    radius: 50,
    funFact: "Venus gira al revés que los otros planetas",
    moons: 0,
    dayLength: "243 días terrestres",
  },
  {
    id: 4,
    name: "Tierra",
    emoji: "🌍",
    distance: "150M km",
    diameter: "12,742 km",
    fact: "Nuestro hogar, el único planeta con vida conocida",
    color: "#4B9FFF",
    orbitSpeed: 0.1,
    radius: 70,
    funFact: "La Tierra tiene un 71% de agua",
    moons: 1,
    dayLength: "24 horas",
  },
  {
    id: 5,
    name: "Marte",
    emoji: "🔴",
    distance: "228M km",
    diameter: "6,779 km",
    fact: "El planeta rojo, posible futuro hogar de la humanidad",
    color: "#CD5C5C",
    orbitSpeed: 0.08,
    radius: 90,
    funFact: "Marte tiene el monte más alto del sistema solar",
    moons: 2,
    dayLength: "24.6 horas",
  },
  {
    id: 6,
    name: "Júpiter",
    emoji: "🟠",
    distance: "778M km",
    diameter: "139,820 km",
    fact: "El planeta más grande del Sistema Solar",
    color: "#DAA520",
    orbitSpeed: 0.05,
    radius: 120,
    funFact: "Júpiter tiene 79 lunas conocidas",
    moons: 79,
    dayLength: "10 horas",
  },
  {
    id: 7,
    name: "Saturno",
    emoji: "🪐",
    distance: "1,427M km",
    diameter: "116,460 km",
    fact: "Famoso por sus hermosos anillos",
    color: "#F0E68C",
    orbitSpeed: 0.04,
    radius: 150,
    funFact: "Los anillos de Saturno están hechos de hielo y roca",
    moons: 82,
    dayLength: "10.7 horas",
  },
  {
    id: 8,
    name: "Urano",
    emoji: "🔵",
    distance: "2,871M km",
    diameter: "50,724 km",
    fact: "Gira acostado de un lado",
    color: "#4FD0E7",
    orbitSpeed: 0.03,
    radius: 180,
    funFact: "Urano tiene anillos pero casi no se ven",
    moons: 27,
    dayLength: "17 horas",
  },
  {
    id: 9,
    name: "Neptuno",
    emoji: "🔵",
    distance: "4,495M km",
    diameter: "49,244 km",
    fact: "Tiene los vientos más rápidos de todos los planetas",
    color: "#4166F5",
    orbitSpeed: 0.02,
    radius: 210,
    funFact: "Neptuno tiene vientos de hasta 2,100 km/h",
    moons: 14,
    dayLength: "16 horas",
  },
]

export default function SolarSystem() {
  const [selectedPlanet, setSelectedPlanet] = useState<number | null>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [time, setTime] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [showOrbits, setShowOrbits] = useState(true)
  const [showLabels, setShowLabels] = useState(true)
  const [zoomLevel, setZoomLevel] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  const speakInstruction = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "es-ES"
    utterance.rate = 0.9
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  useEffect(() => {
    if (!gameStarted || isPaused) return

    const interval = setInterval(() => {
      setTime((prev) => prev + 0.5 * speed)
    }, 50)

    return () => clearInterval(interval)
  }, [gameStarted, isPaused, speed])

  const getPlanetPositions = () => {
    const scaleFactor = zoomLevel
    
    return planets.map((planet) => {
      if (planet.id === 1) return { ...planet, x: 0, y: 0 }

      const angle = (time * planet.orbitSpeed * Math.PI) / 180
      const scaledRadius = planet.radius * scaleFactor
      const x = Math.cos(angle) * scaledRadius
      const y = Math.sin(angle) * scaledRadius

      return { ...planet, x, y }
    })
  }

  const positionedPlanets = getPlanetPositions()

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-black flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur rounded-3xl p-12 shadow-2xl border-4 border-yellow-400 max-w-2xl text-center transform hover:scale-105 transition-all">
          <div className="text-9xl mb-6 animate-bounce">🌍</div>
          <h1 className="text-5xl font-black text-purple-600 mb-4">¡Sistema Solar!</h1>
          <p className="text-2xl text-gray-700 mb-8 font-bold">
            Explora los planetas en órbita alrededor del Sol. ¡Aprende datos increíbles sobre cada uno!
          </p>
          <div className="space-y-4">
            <Button
              onClick={() => {
                setGameStarted(true)
                speakInstruction(
                  "¡Bienvenido al Sistema Solar! Usa los controles para pausar, cambiar velocidad y hacer zoom. Haz clic en los planetas para aprender sobre ellos.",
                )
              }}
              className="px-12 py-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-black text-2xl rounded-2xl hover:scale-110 transform transition-all shadow-lg"
            >
              🚀 EXPLORAR EL ESPACIO
            </Button>
            <NavLink to="/">
              <Button variant="outline" className="mt-4 px-8 py-3 text-lg bg-transparent border-gray-300 hover:bg-gray-100">
                ← Volver al Inicio
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-black p-4 relative overflow-hidden">
      {/* Estrellas animadas de fondo */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 3 + 1}px`,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* Controles superiores */}
      <div className="max-w-7xl mx-auto mb-4 relative z-20">
        <div className="bg-white/90 backdrop-blur rounded-2xl p-4 shadow-2xl border-2 border-yellow-400">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <NavLink to="/">
              <Button variant="outline" className="bg-transparent text-black border-black hover:bg-black/10">
                ← Volver
              </Button>
            </NavLink>
            
            <h1 className="text-3xl font-black text-purple-600">☀️ SISTEMA SOLAR INTERACTIVO ☀️</h1>
            
            <div className="flex gap-2">
              <Button
                onClick={() => setIsPaused(!isPaused)}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                {isPaused ? "▶️ Play" : "⏸️ Pausa"}
              </Button>
              <Button
                onClick={() => setTime(0)}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                🔄 Reiniciar
              </Button>
            </div>
          </div>
          
          {/* Controles adicionales */}
          <div className="mt-4 flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2 bg-purple-100 rounded-lg p-2">
              <span className="font-bold text-purple-700">Velocidad:</span>
              <Button
                onClick={() => setSpeed(Math.max(0.5, speed - 0.5))}
                className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1"
              >
                -
              </Button>
              <span className="font-bold text-purple-700 w-12 text-center">{speed}x</span>
              <Button
                onClick={() => setSpeed(Math.min(3, speed + 0.5))}
                className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1"
              >
                +
              </Button>
            </div>
            
            <div className="flex items-center gap-2 bg-blue-100 rounded-lg p-2">
              <span className="font-bold text-blue-700">Zoom:</span>
              <Button
                onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.25))}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1"
              >
                -
              </Button>
              <span className="font-bold text-blue-700 w-12 text-center">{zoomLevel.toFixed(1)}x</span>
              <Button
                onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.25))}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1"
              >
                +
              </Button>
            </div>
            
            <Button
              onClick={() => setShowOrbits(!showOrbits)}
              className={`${showOrbits ? 'bg-green-500' : 'bg-gray-500'} hover:opacity-80 text-white`}
            >
              {showOrbits ? "🌍 Ocultar Órbitas" : "🌍 Mostrar Órbitas"}
            </Button>
            
            <Button
              onClick={() => setShowLabels(!showLabels)}
              className={`${showLabels ? 'bg-green-500' : 'bg-gray-500'} hover:opacity-80 text-white`}
            >
              {showLabels ? "🏷️ Ocultar Nombres" : "🏷️ Mostrar Nombres"}
            </Button>
          </div>
        </div>
      </div>

      {/* Sistema Solar */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-gradient-to-b from-purple-900/50 to-black/50 rounded-3xl p-4 border-4 border-yellow-400 shadow-2xl backdrop-blur">
          <div 
            ref={containerRef}
            className="relative mx-auto bg-gradient-to-br from-purple-950 via-blue-950 to-black rounded-2xl overflow-hidden"
            style={{ 
              width: '100%', 
              height: '70vh',
              minHeight: '500px',
              maxHeight: '800px'
            }}
          >
            {/* Órbitas visuales */}
            {showOrbits && (
              <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
                {positionedPlanets.slice(1).map((planet) => (
                  <circle
                    key={planet.id}
                    cx="50%"
                    cy="50%"
                    r={`${Math.abs(planet.radius * zoomLevel)}px`}
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    className="animate-pulse"
                  />
                ))}
              </svg>
            )}

            {/* Sol en el centro */}
            <button
              onClick={() => {
                setSelectedPlanet(1)
                speakInstruction("El Sol. Una estrella gigante. Un millón de Tierras cabrían dentro del Sol.")
              }}
              className="absolute z-20 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full shadow-2xl border-4 border-yellow-200 flex items-center justify-center hover:scale-125 transition-all transform hover:shadow-[0_0_50px_rgba(255,215,0,0.9)] cursor-pointer animate-pulse"
              style={{
                width: '80px',
                height: '80px',
                fontSize: '3rem',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
              title="Sol"
            >
              ☀️
            </button>

            {/* Planetas en órbita animada */}
            {positionedPlanets.slice(1).map((planet) => (
              <div key={planet.id} className="absolute" style={{
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${planet.x}px), calc(-50% + ${planet.y}px))`
              }}>
                <button
                  onClick={() => {
                    setSelectedPlanet(planet.id)
                    speakInstruction(`${planet.name}. ${planet.fact} ${planet.funFact}`)
                  }}
                  className="relative group hover:scale-150 transition-all transform cursor-pointer drop-shadow-lg"
                  style={{ fontSize: '2rem' }}
                  title={planet.name}
                >
                  {planet.emoji}
                  {showLabels && (
                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-white text-xs font-bold bg-black/50 px-2 py-1 rounded whitespace-nowrap">
                      {planet.name}
                    </span>
                  )}
                  <div className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: planet.color }}></div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panel de información del planeta seleccionado */}
      {selectedPlanet && (
        <div className="max-w-7xl mx-auto mt-6 relative z-10">
          <div className="bg-white/95 backdrop-blur rounded-3xl p-8 shadow-2xl border-4 border-purple-400 transform hover:scale-105 transition-all">
            <div className="text-center">
              <p className="text-8xl mb-4 animate-bounce">{positionedPlanets.find((p) => p.id === selectedPlanet)?.emoji}</p>
              <h2 className="text-4xl font-black text-purple-600 mb-4">
                {positionedPlanets.find((p) => p.id === selectedPlanet)?.name}
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-100 rounded-2xl p-4 border-2 border-blue-300 transform hover:scale-105 transition-all">
                  <p className="text-gray-600 font-bold text-sm">Distancia del Sol</p>
                  <p className="text-xl font-black text-blue-600">
                    {positionedPlanets.find((p) => p.id === selectedPlanet)?.distance}
                  </p>
                </div>
                <div className="bg-green-100 rounded-2xl p-4 border-2 border-green-300 transform hover:scale-105 transition-all">
                  <p className="text-gray-600 font-bold text-sm">Diámetro</p>
                  <p className="text-xl font-black text-green-600">
                    {positionedPlanets.find((p) => p.id === selectedPlanet)?.diameter}
                  </p>
                </div>
                <div className="bg-yellow-100 rounded-2xl p-4 border-2 border-yellow-300 transform hover:scale-105 transition-all">
                  <p className="text-gray-600 font-bold text-sm">Lunas</p>
                  <p className="text-xl font-black text-yellow-600">
                    {positionedPlanets.find((p) => p.id === selectedPlanet)?.moons}
                  </p>
                </div>
                <div className="bg-purple-100 rounded-2xl p-4 border-2 border-purple-300 transform hover:scale-105 transition-all">
                  <p className="text-gray-600 font-bold text-sm">Duración del día</p>
                  <p className="text-xl font-black text-purple-600">
                    {positionedPlanets.find((p) => p.id === selectedPlanet)?.dayLength}
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-100 to-pink-100 rounded-2xl p-6 border-2 border-orange-300 mb-6">
                <p className="text-gray-600 font-bold text-lg mb-2">🔍 Dato Curioso:</p>
                <p className="text-2xl text-gray-800 font-bold">
                  {positionedPlanets.find((p) => p.id === selectedPlanet)?.funFact}
                </p>
              </div>
              
              <div className="space-y-4">
                <Button
                  onClick={() => speakInstruction(`${positionedPlanets.find((p) => p.id === selectedPlanet)?.name}. ${positionedPlanets.find((p) => p.id === selectedPlanet)?.fact} ${positionedPlanets.find((p) => p.id === selectedPlanet)?.funFact}`)}
                  className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black text-lg rounded-2xl hover:scale-105 transform transition-all"
                >
                  🔊 Escuchar Información
                </Button>
                <Button
                  onClick={() => setSelectedPlanet(null)}
                  className="w-full px-6 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-black text-lg rounded-2xl hover:scale-105 transform transition-all"
                >
                  Explorar otro planeta
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Agregar estilos CSS
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes twinkle {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 1; }
    }
  `
  if (!document.head.querySelector('style[data-solar]')) {
    style.setAttribute('data-solar', 'true')
    document.head.appendChild(style)
  }
}