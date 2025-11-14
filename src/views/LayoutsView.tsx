"use client"

import { useState } from "react"
import { NavLink } from "react-router-dom"
import { Button } from "../components/ui/button"

const colombiaDepartments = [
  { id: 1, name: "Atlántico", capital: "Barranquilla", region: "Caribe" },
  { id: 2, name: "Bolívar", capital: "Cartagena", region: "Caribe" },
  { id: 3, name: "Córdoba", capital: "Montería", region: "Caribe" },
  { id: 4, name: "Sucre", capital: "Sincelejo", region: "Caribe" },
  { id: 5, name: "Cesar", capital: "Valledupar", region: "Caribe" },
  { id: 6, name: "Magdalena", capital: "Santa Marta", region: "Caribe" },
  { id: 7, name: "La Guajira", capital: "Riohacha", region: "Caribe" },
  { id: 8, name: "Norte de Santander", capital: "Cúcuta", region: "Oriente" },
  { id: 9, name: "Santander", capital: "Bucaramanga", region: "Oriente" },
  { id: 10, name: "Boyacá", capital: "Tunja", region: "Oriente" },
  { id: 11, name: "Cundinamarca", capital: "Zipaquirá", region: "Centro" },
  { id: 12, name: "Bogotá D.C.", capital: "Bogotá", region: "Centro" },
  { id: 13, name: "Meta", capital: "Villavicencio", region: "Centro" },
  { id: 14, name: "Arauca", capital: "Arauca", region: "Oriente" },
  { id: 15, name: "Casanare", capital: "Yopal", region: "Oriente" },
  { id: 16, name: "Vichada", capital: "Puerto Carreño", region: "Orinoquia" },
  { id: 17, name: "Guaviare", capital: "San José del Guaviare", region: "Amazonia" },
  { id: 18, name: "Tolima", capital: "Ibagué", region: "Centro" },
  { id: 19, name: "Huila", capital: "Neiva", region: "Centro" },
  { id: 20, name: "Cauca", capital: "Popayán", region: "Occidente" },
  { id: 21, name: "Nariño", capital: "Pasto", region: "Occidente" },
  { id: 22, name: "Putumayo", capital: "Mocoa", region: "Amazonia" },
  { id: 23, name: "Caquetá", capital: "Florencia", region: "Amazonia" },
  { id: 24, name: "Amazonas", capital: "Leticia", region: "Amazonia" },
  { id: 25, name: "Valle del Cauca", capital: "Cali", region: "Occidente" },
  { id: 26, name: "Quindío", capital: "Armenia", region: "Eje Cafetero" },
  { id: 27, name: "Risaralda", capital: "Pereira", region: "Eje Cafetero" },
  { id: 28, name: "Caldas", capital: "Manizales", region: "Eje Cafetero" },
  { id: 29, name: "Chocó", capital: "Quibdó", region: "Pacifico" },
  { id: 30, name: "Antioquia", capital: "Medellín", region: "Occidente" },
  { id: 31, name: "San Andrés y Providencia", capital: "San Andrés", region: "Insular" },
  { id: 32, name: "Vaupés", capital: "Mitú", region: "Amazonia" },
]

const ColombiaMap = ({ highlightedDept, onDeptClick, currentDept }: any) => {
  return (
    <svg viewBox="0 0 1200 1400" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Agua */}
      <rect width="1200" height="1400" fill="#87CEEB" />

      {/* Caribe */}
      <text x="900" y="200" fontSize="40" fill="#0066CC" fontWeight="bold" opacity="0.6">
        MAR CARIBE
      </text>

      {/* Pacífico */}
      <text x="50" y="700" fontSize="40" fill="#0066CC" fontWeight="bold" opacity="0.6">
        OCÉANO PACÍFICO
      </text>

      {/* Atlántico */}
      <text x="1000" y="1200" fontSize="40" fill="#0066CC" fontWeight="bold" opacity="0.6">
        OCÉANO ATLÁNTICO
      </text>

      {/* Regions with different colors - representing approximate geographical areas */}
      {/* Caribe Region */}
      <path
        d="M 300 150 L 500 100 L 600 120 L 700 140 L 750 200 L 700 250 L 500 280 L 300 250 Z"
        fill="#FFD54F"
        stroke="#F57C00"
        strokeWidth="3"
        opacity="0.7"
      />

      {/* Occidente Region */}
      <path
        d="M 200 400 L 300 450 L 350 600 L 300 800 L 200 900 L 150 700 L 100 500 Z"
        fill="#FF6B9D"
        stroke="#E91E63"
        strokeWidth="3"
        opacity="0.7"
      />

      {/* Pacifico Region */}
      <path
        d="M 100 900 L 200 900 L 250 1100 L 180 1200 L 120 1100 Z"
        fill="#4DD0E1"
        stroke="#00897B"
        strokeWidth="3"
        opacity="0.7"
      />

      {/* Centro Region */}
      <path
        d="M 400 300 L 600 350 L 650 550 L 600 750 L 450 800 L 350 600 L 300 450 Z"
        fill="#FFE082"
        stroke="#F57C00"
        strokeWidth="3"
        opacity="0.7"
      />

      {/* Oriente Region */}
      <path
        d="M 600 350 L 800 300 L 850 500 L 800 700 L 650 550 Z"
        fill="#A5D6A7"
        stroke="#2E7D32"
        strokeWidth="3"
        opacity="0.7"
      />

      {/* Amazonia Region */}
      <path
        d="M 400 800 L 650 750 L 800 900 L 750 1100 L 600 1200 L 400 1100 Z"
        fill="#C8E6C9"
        stroke="#558B2F"
        strokeWidth="3"
        opacity="0.7"
      />

      {/* Orinoquia Region */}
      <path
        d="M 750 700 L 900 600 L 950 800 L 900 900 L 800 900 Z"
        fill="#B2DFDB"
        stroke="#00897B"
        strokeWidth="3"
        opacity="0.7"
      />

      {/* Labels for regions */}
      <text x="450" y="200" fontSize="32" fill="#333" fontWeight="bold">
        CARIBE
      </text>
      <text x="150" y="550" fontSize="32" fill="#333" fontWeight="bold">
        OCCIDENTE
      </text>
      <text x="500" y="500" fontSize="32" fill="#333" fontWeight="bold">
        CENTRO
      </text>
      <text x="700" y="450" fontSize="32" fill="#333" fontWeight="bold">
        ORIENTE
      </text>
      <text x="450" y="1000" fontSize="32" fill="#333" fontWeight="bold">
        AMAZONIA
      </text>

      {/* Interactive department dots */}
      {colombiaDepartments.map((dept) => {
        // Approximate coordinates for each department
        const coords: { [key: string]: [number, number] } = {
          Atlántico: [550, 180],
          Bolívar: [480, 250],
          Córdoba: [420, 300],
          Sucre: [500, 320],
          Cesar: [550, 220],
          Magdalena: [520, 160],
          "La Guajira": [600, 120],
          "Norte de Santander": [650, 280],
          Santander: [620, 400],
          Boyacá: [580, 450],
          Cundinamarca: [500, 520],
          "Bogotá D.C.": [510, 550],
          Meta: [620, 650],
          Arauca: [720, 450],
          Casanare: [680, 550],
          Vichada: [800, 600],
          Guaviare: [700, 750],
          Tolima: [450, 650],
          Huila: [420, 750],
          Cauca: [320, 700],
          Nariño: [280, 950],
          Putumayo: [380, 900],
          Caquetá: [550, 900],
          Amazonas: [600, 1100],
          "Valle del Cauca": [250, 600],
          Quindío: [380, 550],
          Risaralda: [350, 500],
          Caldas: [420, 480],
          Chocó: [180, 550],
          Antioquia: [350, 350],
          "San Andrés y Providencia": [750, 250],
          Vaupés: [700, 1000],
        }

        const [x, y] = coords[dept.name] || [500, 500]
        const isHighlighted = highlightedDept === dept.id
        const isCurrent = currentDept?.id === dept.id

        return (
          <g key={dept.id} style={{ cursor: "pointer" }} onClick={() => onDeptClick(dept)}>
            {/* Current department highlight */}
            {isCurrent && (
              <circle cx={x} cy={y} r="35" fill="none" stroke="#00FF00" strokeWidth="4" strokeDasharray="5,5" />
            )}

            {/* Department dot */}
            <circle
              cx={x}
              cy={y}
              r={isHighlighted ? "20" : "15"}
              fill={isCurrent ? "#00FF00" : isHighlighted ? "#FF6B00" : "#E91E63"}
              stroke="white"
              strokeWidth="3"
              className="hover:opacity-80 transition-all"
            />

            {/* Department label on hover/highlight */}
            {isHighlighted && (
              <text
                x={x}
                y={y - 40}
                textAnchor="middle"
                fontSize="18"
                fill="#000"
                fontWeight="bold"
                className="drop-shadow-lg pointer-events-none"
                style={{
                  textShadow: "2px 2px 4px rgba(255,255,255,0.8)",
                }}
              >
                {dept.name}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}

export default function SocialSciencesPage() {
  const [gameStarted, setGameStarted] = useState(false)
  const [currentDepartmentIdx, setCurrentDepartmentIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedCapital, setSelectedCapital] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackText, setFeedbackText] = useState("")
  const [highlightedDept, setHighlightedDept] = useState<number | null>(null)

  const speakInstruction = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "es-ES"
    utterance.rate = 0.85
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  const startGame = () => {
    setGameStarted(true)
    const firstDept = colombiaDepartments[0]
    speakInstruction(
      `Bienvenido a Colombia. Vamos a aprender los 32 departamentos y sus capitales. Primero: ¿Cuál es la capital de ${firstDept.name}?`,
    )
  }

  const getCurrentQuestion = () => {
    if (currentDepartmentIdx >= colombiaDepartments.length) return null
    const current = colombiaDepartments[currentDepartmentIdx]
    const options = [current]

    while (options.length < 4) {
      const random = colombiaDepartments[Math.floor(Math.random() * colombiaDepartments.length)]
      if (!options.find((o) => o.id === random.id)) {
        options.push(random)
      }
    }

    return { department: current, options: options.sort(() => Math.random() - 0.5) }
  }

  const handleCapitalSelect = (selectedCapital: string) => {
    if (showFeedback) return

    const question = getCurrentQuestion()
    if (!question) return

    setSelectedCapital(selectedCapital)
    const isCorrect = selectedCapital === question.department.capital

    if (isCorrect) {
      setScore(score + 1)
      setFeedbackText("¡Correcto! ⭐")
      speakInstruction(`¡Excelente! La capital de ${question.department.name} es ${selectedCapital}`)
    } else {
      setFeedbackText(`Incorrecto. La capital de ${question.department.name} es ${question.department.capital}`)
      speakInstruction(`No. La capital de ${question.department.name} es ${question.department.capital}`)
    }

    setShowFeedback(true)

    setTimeout(() => {
      if (currentDepartmentIdx < colombiaDepartments.length - 1) {
        setCurrentDepartmentIdx(currentDepartmentIdx + 1)
        setSelectedCapital(null)
        setShowFeedback(false)
        const nextDept = colombiaDepartments[currentDepartmentIdx + 1]
        speakInstruction(`Siguiente. ¿Cuál es la capital de ${nextDept.name}?`)
      } else {
        speakInstruction(
          `¡Juego terminado! Acertaste ${score + (selectedCapital === question.department.capital ? 1 : 0)} de ${colombiaDepartments.length}`,
        )
      }
    }, 3000)
  }

  const handleDeptClick = (dept: (typeof colombiaDepartments)[0]) => {
    setHighlightedDept(dept.id)
    speakInstruction(`${dept.name}. Capital: ${dept.capital}`)
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-orange-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-12 shadow-2xl border-4 border-orange-400 max-w-2xl text-center">
          <div className="text-9xl mb-6">🗺️</div>
          <h1 className="text-5xl font-black text-orange-600 mb-4">¡Descubre Colombia!</h1>
          <p className="text-2xl text-gray-700 mb-8 font-bold">
            Aprende sobre los 32 departamentos colombianos y sus capitales. Haz clic en el mapa para explorar.
          </p>
          <Button
            onClick={startGame}
            className="px-12 py-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-black text-2xl rounded-2xl hover:scale-110"
          >
            ¡COMENZAR! 🎮
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

  if (currentDepartmentIdx >= colombiaDepartments.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-orange-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-12 shadow-2xl border-4 border-green-400 max-w-2xl text-center">
          <div className="text-9xl mb-6">🎉</div>
          <h1 className="text-5xl font-black text-green-600 mb-4">¡Juego Completado!</h1>
          <p className="text-4xl font-black text-yellow-500 mb-8">
            ⭐ {score} / {colombiaDepartments.length} ⭐
          </p>
          <Button
            onClick={() => {
              setCurrentDepartmentIdx(0)
              setScore(0)
              setGameStarted(false)
              setSelectedCapital(null)
            }}
            className="w-full px-8 py-6 bg-gradient-to-r from-green-500 to-orange-500 text-white font-black text-xl rounded-2xl"
          >
            🔄 Jugar de Nuevo
          </Button>
        </div>
      </div>
    )
  }

  const question = getCurrentQuestion()
  if (!question) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-orange-100 p-4">
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex justify-between items-center bg-white rounded-2xl p-6 border-3 border-orange-400 shadow-lg">
          <h2 className="text-3xl font-black text-orange-600">
            Departamento {currentDepartmentIdx + 1} de {colombiaDepartments.length}
          </h2>
          <p className="text-4xl font-black text-yellow-500">⭐ {score}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border-4 border-orange-400 shadow-lg">
          <h3 className="text-xl font-black text-orange-600 mb-4 text-center">Mapa Interactivo de Colombia</h3>
          <div className="bg-gradient-to-br from-blue-300 to-cyan-200 rounded-xl p-4 border-2 border-blue-400 aspect-square flex items-center justify-center overflow-hidden">
            <ColombiaMap
              highlightedDept={highlightedDept}
              onDeptClick={handleDeptClick}
              currentDept={question.department}
            />
          </div>
          <p className="text-xs text-gray-600 mt-3 text-center font-bold">
            Toca los puntos en el mapa para escuchar cada departamento y su capital
          </p>
        </div>

        {/* Pregunta y opciones */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border-4 border-orange-400 shadow-lg">
            <p className="text-sm text-gray-600 font-bold mb-2">DEPARTAMENTO:</p>
            <h2 className="text-3xl font-black text-orange-600 mb-6">{question.department.name}</h2>
            <p className="text-lg text-gray-700 font-bold mb-4">🎧 ¿Cuál es la capital?</p>
            <Button
              onClick={() => speakInstruction(`¿Cuál es la capital de ${question.department.name}?`)}
              className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black rounded-2xl text-lg"
            >
              🔊 Repetir
            </Button>
          </div>

          <div className="space-y-2">
            {question.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => !showFeedback && handleCapitalSelect(opt.capital)}
                disabled={showFeedback}
                className={`w-full p-4 rounded-2xl font-bold text-white transition-all transform hover:scale-105 ${
                  selectedCapital === opt.capital
                    ? "ring-4 ring-green-400 scale-110 bg-gradient-to-r from-green-400 to-blue-400"
                    : "bg-gradient-to-r from-blue-400 to-cyan-400 disabled:opacity-50"
                }`}
              >
                {opt.capital}
              </button>
            ))}
          </div>

          {showFeedback && (
            <p
              className={`text-2xl font-black text-center animate-bounce ${selectedCapital === question.department.capital ? "text-green-600" : "text-red-600"}`}
            >
              {feedbackText}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
