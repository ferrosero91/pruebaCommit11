"use client"

import { useState, useEffect, useRef } from "react"
import { NavLink } from "react-router-dom"
import { Button } from "./ui/button"
import * as THREE from "three"

const shapes = [
  { id: 1, name: "Cuadrado", emoji: "⬛", colors: ["#FF6B6B", "#4ECDC4", "#FFE66D", "#95E1D3"] },
  { id: 2, name: "Triángulo", emoji: "🔺", colors: ["#FF9999", "#FFCC99", "#99CCFF", "#CC99FF"] },
  { id: 3, name: "Rectángulo", emoji: "▭", colors: ["#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E9"] },
  { id: 4, name: "Hexágono", emoji: "⬡", colors: ["#F8B88B", "#A9D0F5", "#A4DE6C", "#F78E69"] },
  { id: 5, name: "Esfera", emoji: "🔴", colors: ["#6C5CE7", "#A29BFE", "#74B9FF", "#81ECEC"] },
]

export default function Geometry3D() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const shapeRef = useRef<THREE.Mesh | null>(null)
  const animationIdRef = useRef<number | null>(null)

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackText, setFeedbackText] = useState("")
  const [shapeOrder, setShapeOrder] = useState<number[]>([])
  const [currentColor, setCurrentColor] = useState(0)
  const [audioPlayed, setAudioPlayed] = useState(false)

  const speakInstruction = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "es-ES"
    utterance.rate = 0.9
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  useEffect(() => {
    if (!gameStarted || !mountRef.current || shapeOrder.length === 0) return

    const width = mountRef.current.clientWidth
    const height = mountRef.current.clientHeight

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf0f9ff)
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 3.5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    rendererRef.current = renderer
    mountRef.current.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(10, 10, 10)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0x6c5ce7, 0.5)
    pointLight.position.set(-5, -5, 5)
    scene.add(pointLight)

    const createShape = (shapeId: number, color: string) => {
      let geometry: THREE.BufferGeometry

      switch (shapeId) {
        case 1: // Cuadrado - perfectamente simétrico
          geometry = new THREE.BoxGeometry(1.2, 1.2, 1.2, 8, 8, 8)
          break
        case 2: // Triángulo - cono
          geometry = new THREE.ConeGeometry(1.2, 2, 32)
          break
        case 3: // Rectángulo - claramente alargado (distinto al cuadrado)
          geometry = new THREE.BoxGeometry(2.2, 0.9, 0.9, 8, 8, 8)
          break
        case 4: // Hexágono - cilindro con 6 lados
          geometry = new THREE.CylinderGeometry(1.2, 1.2, 0.8, 6)
          break
        case 5: // Esfera - una esfera más grande que círculo
          geometry = new THREE.SphereGeometry(1.3, 64, 64)
          break
        default:
          geometry = new THREE.BoxGeometry(1, 1, 1)
      }

      const material = new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.4,
        roughness: 0.3,
        emissive: color,
        emissiveIntensity: 0.15,
      })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.castShadow = true
      mesh.receiveShadow = true

      return mesh
    }

    const currentShapeId = shapeOrder[currentQuestion]
    const shape = createShape(currentShapeId, shapes[currentShapeId - 1].colors[currentColor])
    scene.add(shape)
    shapeRef.current = shape

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      if (shape) {
        shape.rotation.x += 0.008
        shape.rotation.y += 0.012
        shape.rotation.z += 0.004
      }

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      const newWidth = mountRef.current?.clientWidth || width
      const newHeight = mountRef.current?.clientHeight || height
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current)
      renderer.dispose()
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
      }
    }
  }, [gameStarted, currentQuestion, currentColor, shapeOrder])

  useEffect(() => {
    if (gameStarted && shapeOrder.length === 0) {
      const randomOrder = shapes.sort(() => Math.random() - 0.5).map((s) => s.id)
      setShapeOrder(randomOrder)
    }
  }, [gameStarted, shapeOrder.length])

  useEffect(() => {
    if (gameStarted && shapeOrder.length > 0 && !audioPlayed) {
      const timer = setTimeout(() => {
        speakInstruction(`Pregunta ${currentQuestion + 1}. Mira bien esta figura que gira. Ahora selecciona cuál es.`)
        setAudioPlayed(true)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [gameStarted, currentQuestion, shapeOrder, audioPlayed])

  const handleShapeSelect = (selectedId: number) => {
    if (selectedAnswer !== null || showFeedback) return

    const correctShapeId = shapeOrder[currentQuestion]
    const correctShape = shapes[correctShapeId - 1]
    setSelectedAnswer(selectedId)

    if (selectedId === correctShapeId) {
      setScore(score + 1)
      setFeedbackText("¡Muy bien! ⭐")
      speakInstruction("¡Excelente! ¡Acertaste!")
    } else {
      setFeedbackText(`Incorrecto. Era ${correctShape.name}`)
      speakInstruction(`No. Era ${correctShape.name}`)
    }

    setShowFeedback(true)

    setTimeout(() => {
      if (currentQuestion < shapes.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setCurrentColor(Math.floor(Math.random() * shapes[shapeOrder[currentQuestion + 1] - 1].colors.length))
        setSelectedAnswer(null)
        setShowFeedback(false)
        setAudioPlayed(false)
      } else {
        speakInstruction(
          `¡Juego terminado! Obtuviste ${score + (selectedId === shapeOrder[currentQuestion] ? 1 : 0)} de ${shapes.length} estrellas.`,
        )
      }
    }, 2000)
  }

  if (!gameStarted || shapeOrder.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-cyan-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-12 shadow-2xl border-4 border-blue-400 max-w-2xl text-center">
          <div className="text-9xl mb-6">📐</div>
          <h1 className="text-5xl font-black text-blue-600 mb-4">¡Geometría 3D!</h1>
          <p className="text-2xl text-gray-700 mb-8 font-bold">
            Verás una figura 3D que rota. Escucharás su nombre. Selecciona la correcta entre varias opciones.
          </p>
          <Button
            onClick={() => setGameStarted(true)}
            className="px-12 py-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-black text-2xl rounded-2xl hover:scale-110"
          >
            ¡EMPEZAR! 🎮
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

  if (currentQuestion >= shapes.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-cyan-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-12 shadow-2xl border-4 border-green-400 max-w-2xl text-center">
          <div className="text-9xl mb-6">🎉</div>
          <h1 className="text-5xl font-black text-green-600 mb-4">¡Juego Completado!</h1>
          <p className="text-4xl font-black text-yellow-500 mb-8">
            ⭐ {score} / {shapes.length} ⭐
          </p>
          <Button
            onClick={() => {
              setCurrentQuestion(0)
              setScore(0)
              setGameStarted(false)
              setSelectedAnswer(null)
              setShapeOrder([])
            }}
            className="w-full px-8 py-6 bg-gradient-to-r from-green-500 to-blue-500 text-white font-black text-xl rounded-2xl"
          >
            🔄 Jugar de Nuevo
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-cyan-100 p-4">
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex justify-between items-center bg-white rounded-2xl p-6 border-3 border-blue-400 shadow-lg">
          <h2 className="text-3xl font-black text-blue-600">
            Pregunta {currentQuestion + 1} de {shapes.length}
          </h2>
          <p className="text-4xl font-black text-yellow-500">⭐ {score}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-8 border-4 border-blue-400 shadow-lg">
            <p className="text-2xl font-black text-blue-600 mb-4 text-center">¿Cuál es la figura que gira?</p>
            <div
              ref={mountRef}
              className="w-full h-96 rounded-2xl border-2 border-blue-200 bg-gradient-to-b from-blue-50 to-cyan-50"
            ></div>
            <div className="mt-6 flex gap-4 justify-center flex-wrap">
              {shapes[shapeOrder[currentQuestion] - 1].colors.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentColor(idx)}
                  className={`w-12 h-12 rounded-full transform hover:scale-110 transition-all border-4 ${currentColor === idx ? "border-gray-800 scale-110" : "border-gray-400"}`}
                  style={{ backgroundColor: color }}
                  title="Cambiar color"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => {
              const correctShapeId = shapeOrder[currentQuestion]
              const correctShape = shapes[correctShapeId - 1]
              speakInstruction(`La figura es: ${correctShape.name}. Ahora selecciona: ${correctShape.name}`)
            }}
            className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black rounded-2xl text-lg"
          >
            🔊 Repetir
          </Button>

          <div className="bg-white rounded-2xl p-4 border-3 border-blue-400 shadow-lg">
            <p className="text-sm font-bold text-gray-600 mb-3">Selecciona la figura:</p>
            <div className="grid grid-cols-2 gap-3">
              {shapes.map((shape) => (
                <button
                  key={shape.id}
                  onClick={() => !showFeedback && handleShapeSelect(shape.id)}
                  disabled={showFeedback}
                  className={`p-4 rounded-xl font-black text-3xl transition-all transform hover:scale-110 ${
                    selectedAnswer === shape.id
                      ? "ring-4 ring-green-400 scale-110 bg-green-200"
                      : "bg-gradient-to-br from-blue-400 to-purple-500 text-white disabled:opacity-50"
                  }`}
                >
                  {shape.emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showFeedback && (
        <div className="max-w-6xl mx-auto mt-8 text-center">
          <p className="text-4xl font-black text-green-600 animate-bounce">{feedbackText}</p>
        </div>
      )}
    </div>
  )
}