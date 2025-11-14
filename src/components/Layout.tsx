import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenedor principal */}
      <div className="flex-1 flex flex-col md:ml-72">
        {/* Header Estilo LogicLike */}
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
            </div>
          </div>
        </header>

        {/* Contenido dinámico (cada vista) */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-blue-50 via-green-50 to-yellow-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
