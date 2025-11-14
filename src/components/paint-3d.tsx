"use client"

import { useState, useRef, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { Button } from "./ui/button"

const colors = [
  { id: 1, name: "Rojo", value: "#FF5252", emoji: "🔴" },
  { id: 2, name: "Azul", value: "#448AFF", emoji: "🔵" },
  { id: 3, name: "Amarillo", value: "#FFD740", emoji: "🟡" },
  { id: 4, name: "Verde", value: "#69F0AE", emoji: "🟢" },
  { id: 5, name: "Morado", value: "#E040FB", emoji: "🟣" },
  { id: 6, name: "Naranja", value: "#FF9E40", emoji: "🟠" },
  { id: 7, name: "Rosa", value: "#FF4081", emoji: "🌸" },
  { id: 8, name: "Cian", value: "#40C4FF", emoji: "💧" },
]

const brushSizes = [
  { id: 1, name: "Pequeño", value: 5, emoji: "🐜" },
  { id: 2, name: "Mediano", value: 15, emoji: "🐝" },
  { id: 3, name: "Grande", value: 30, emoji: "🦋" },
]

interface DrawingPoint {
  x: number
  y: number
  color: string
  size: number
  id: string
  isNewStroke?: boolean // Marca si este punto comienza un nuevo trazo
}

interface Canvas3DProps {
  points: DrawingPoint[]
  isDrawing: boolean
  currentColor: string
  currentSize: number
  // eslint-disable-next-line no-unused-vars
  onCanvasClick: (x: number, y: number) => void
  // eslint-disable-next-line no-unused-vars
  onCanvasMove: (x: number, y: number) => void
  onMouseUp: () => void
  clearCanvas: () => void
}

const Canvas3D = ({ points, isDrawing, currentColor, currentSize, onCanvasClick, onCanvasMove, onMouseUp, clearCanvas }: Canvas3DProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 400 })

  useEffect(() => {
    const updateCanvasSize = () => {
      if (canvasRef.current) {
        const container = canvasRef.current.parentElement
        if (container) {
          const { width } = container.getBoundingClientRect()
          setCanvasSize({ width: Math.min(width - 40, 800), height: Math.min(width * 0.6, 500) })
        }
      }
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)
    return () => window.removeEventListener('resize', updateCanvasSize)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Dibujar fondo con gradiente para efecto 3D
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, '#f0f9ff')
    gradient.addColorStop(1, '#e0f2fe')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Dibujar trazos con efecto 3D
    for (let i = 0; i < points.length; i++) {
      const point = points[i]
      
      // Sombra para efecto 3D
      ctx.shadowColor = 'rgba(0, 0, 0, 0.2)'
      ctx.shadowBlur = 10
      ctx.shadowOffsetX = 3
      ctx.shadowOffsetY = 3

      // Dibujar punto principal
      ctx.beginPath()
      ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2)
      ctx.fillStyle = point.color
      ctx.fill()

      // Efecto brillante para simular 3D
      ctx.shadowColor = 'transparent'
      ctx.beginPath()
      ctx.arc(point.x - point.size/3, point.y - point.size/3, point.size/3, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
      ctx.fill()

      // Conectar con el punto anterior si hay uno y no es un nuevo trazo
      if (i > 0 && !point.isNewStroke) {
        const prevPoint = points[i - 1]
        
        // Sombra para la línea
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)'
        ctx.shadowBlur = 5
        ctx.shadowOffsetX = 2
        ctx.shadowOffsetY = 2
        
        // Dibujar línea suave entre puntos
        ctx.beginPath()
        ctx.moveTo(prevPoint.x, prevPoint.y)
        ctx.lineTo(point.x, point.y)
        ctx.strokeStyle = point.color
        ctx.lineWidth = point.size * 2
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.stroke()
      }
    }

    // Dibujar cursor actual si está dibujando
    if (isDrawing && points.length > 0) {
      const lastPoint = points[points.length - 1]
      ctx.beginPath()
      ctx.arc(lastPoint.x, lastPoint.y, currentSize, 0, Math.PI * 2)
      ctx.fillStyle = currentColor
      ctx.fill()
    }
  }, [points, canvasSize, isDrawing, currentColor, currentSize])

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    onCanvasClick(x, y)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    onCanvasMove(x, y)
  }

  const handleMouseUp = () => {
    onMouseUp()
  }

  return (
    <div className="bg-white rounded-3xl p-6 border-4 border-purple-400 shadow-lg">
      <h3 className="text-xl font-black text-purple-600 mb-4 text-center">Lienzo Mágico 3D</h3>
      <div className="bg-gradient-to-br from-blue-200 to-purple-200 rounded-xl p-4 border-2 border-purple-400 flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          className="bg-white rounded-lg cursor-crosshair shadow-lg"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>
      <div className="mt-4 flex justify-center gap-4">
        <Button
          onClick={clearCanvas}
          className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-black rounded-2xl text-lg hover:scale-105 transform transition-all"
        >
          🗑️ Borrar Todo
        </Button>
        <Button
          onClick={() => {
            const canvas = canvasRef.current;
            if (canvas) {
              const link = document.createElement('a');
              link.download = 'mi-dibujo-3d.png';
              link.href = canvas.toDataURL();
              link.click();
            }
          }}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-black rounded-2xl text-lg hover:scale-105 transform transition-all"
        >
          💾 Guardar Dibujo
        </Button>
      </div>
      <p className="text-xs text-gray-600 mt-3 text-center font-bold">
        ¡Presiona y arrastra para dibujar líneas en el aire!
      </p>
    </div>
  )
}

export default function Pintura3D() {
  const [gameStarted, setGameStarted] = useState(false)
  const [currentColor, setCurrentColor] = useState(colors[0].value)
  const [currentSize, setCurrentSize] = useState(brushSizes[1].value)
  const [points, setPoints] = useState<DrawingPoint[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [showInstructions, setShowInstructions] = useState(true)

  const speakInstruction = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "es-ES"
    utterance.rate = 0.8
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  const startGame = () => {
    setGameStarted(true)
    speakInstruction(
      "¡Bienvenido a la pintura 3D! Elige un color y un tamaño de pincel. Luego presiona y arrastra en el lienzo para dibujar líneas en el aire.",
    )
    setTimeout(() => setShowInstructions(false), 5000)
  }

  const handleCanvasClick = (x: number, y: number) => {
    setIsDrawing(true)
    const newPoint: DrawingPoint = {
      x,
      y,
      color: currentColor,
      size: currentSize,
      id: Date.now().toString(),
      isNewStroke: true, // Marcar como inicio de un nuevo trazo
    }
    setPoints([...points, newPoint])
  }

  const handleCanvasMove = (x: number, y: number) => {
    if (!isDrawing) return

    const newPoint: DrawingPoint = {
      x,
      y,
      color: currentColor,
      size: currentSize,
      id: Date.now().toString(),
      isNewStroke: false, // No es un nuevo trazo, es parte del trazo actual
    }
    setPoints([...points, newPoint])
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    setPoints([])
    speakInstruction("¡Lienzo limpio! A crear una nueva obra de arte.")
  }

  const handleColorSelect = (color: string, name: string) => {
    setCurrentColor(color)
    speakInstruction(`Has seleccionado el color ${name}`)
  }

  const handleSizeSelect = (size: number, name: string) => {
    setCurrentSize(size)
    speakInstruction(`Pincel ${name}`)
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-12 shadow-2xl border-4 border-purple-400 max-w-2xl text-center">
          <div className="text-9xl mb-6">🎨</div>
          <h1 className="text-5xl font-black text-purple-600 mb-4">¡Pintura 3D Mágica!</h1>
          <p className="text-2xl text-gray-700 mb-8 font-bold">
            Dibuja líneas en el aire con colores mágicos. Crea obras de arte increíbles con tu imaginación.
          </p>
          <Button
            onClick={startGame}
            className="px-12 py-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black text-2xl rounded-2xl hover:scale-110 transform transition-all"
          >
            ¡COMENZAR A PINTAR! 🖌️
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
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-4">
      {showInstructions && (
        <div className="max-w-4xl mx-auto mb-6 bg-yellow-100 border-4 border-yellow-400 rounded-2xl p-4 animate-pulse">
          <p className="text-center text-xl font-bold text-purple-800">
            🎨 ¡Elige un color y un tamaño de pincel, luego presiona y arrastra para dibujar líneas! 🖌️
          </p>
        </div>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Canvas3D
            points={points}
            isDrawing={isDrawing}
            currentColor={currentColor}
            currentSize={currentSize}
            onCanvasClick={handleCanvasClick}
            onCanvasMove={handleCanvasMove}
            onMouseUp={handleMouseUp}
            clearCanvas={clearCanvas}
          />
        </div>

        {/* Controles de color y tamaño */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border-4 border-purple-400 shadow-lg">
            <h2 className="text-2xl font-black text-purple-600 mb-4 text-center">🎨 Colores Mágicos</h2>
            <div className="grid grid-cols-4 gap-3">
              {colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleColorSelect(color.value, color.name)}
                  className={`p-3 rounded-2xl font-bold text-white transition-all transform hover:scale-110 ${
                    currentColor === color.value
                      ? "ring-4 ring-purple-600 scale-110"
                      : ""
                  }`}
                  style={{ backgroundColor: color.value }}
                >
                  {color.emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border-4 border-purple-400 shadow-lg">
            <h2 className="text-2xl font-black text-purple-600 mb-4 text-center">🖌️ Tamaño del Pincel</h2>
            <div className="space-y-3">
              {brushSizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => handleSizeSelect(size.value, size.name)}
                  className={`w-full p-3 rounded-2xl font-bold transition-all transform hover:scale-105 ${
                    currentSize === size.value
                      ? "ring-4 ring-purple-600 bg-gradient-to-r from-purple-400 to-pink-400 text-white"
                      : "bg-gradient-to-r from-blue-400 to-cyan-400 text-white"
                  }`}
                >
                  {size.emoji} {size.name}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border-4 border-purple-400 shadow-lg">
            <h2 className="text-2xl font-black text-purple-600 mb-4 text-center">✨ Tu Obra de Arte</h2>
            <div className="flex justify-center items-center">
              <div
                className="w-24 h-24 rounded-full border-4 border-purple-400 shadow-lg"
                style={{ backgroundColor: currentColor }}
              ></div>
            </div>
            <p className="text-center mt-4 text-lg font-bold text-gray-700">
              ¡Estás usando el color {colors.find(c => c.value === currentColor)?.name}!
            </p>
            <Button
              onClick={() => speakInstruction("¡Sigue dibujando! Tu obra de arte se ve fantástica.")}
              className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black rounded-2xl hover:scale-105 transform transition-all"
            >
              🔊 Escuchar Animación
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}