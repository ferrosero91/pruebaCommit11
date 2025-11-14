import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "./Sidebar";

// 🔹 Agrupamos todos los tests
describe("Sidebar Component", () => {
  // Render base dentro de un MemoryRouter (para NavLink)
  const setup = () => render(
    <MemoryRouter>
      <Sidebar />
    </MemoryRouter>
  );

  test("renderiza el título y subtítulo del logo", () => {
    setup();
    expect(screen.getByText("Mentes")).toBeInTheDocument();
    expect(screen.getByText("Creativas")).toBeInTheDocument();
  });

  test("muestra todos los módulos del menú", () => {
    setup();
    const modules = ["Inicio", "Geometría 3D", "Sistema Solar", "Pintura 3D"];
    modules.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  test("los enlaces tienen rutas correctas", () => {
    setup();
    expect(screen.getByRole("link", { name: /Inicio/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /Geometría 3D/i })).toHaveAttribute("href", "/geometry-3d");
    expect(screen.getByRole("link", { name: /Sistema Solar/i })).toHaveAttribute("href", "/solar-system");
    expect(screen.getByRole("link", { name: /Pintura 3D/i })).toHaveAttribute("href", "/paint-3d");
  });

  test("renderiza el mensaje motivacional del footer", () => {
    setup();
    expect(screen.getByText("📚 ¡Sigue aprendiendo!")).toBeInTheDocument();
    expect(screen.getByText(/Cada lección te hace más inteligente/i)).toBeInTheDocument();
  });

  test("al presionar el botón móvil se cierra el overlay", () => {
    setup();
    const toggleButton = screen.getByRole("button");
    // Al inicio isOpen = true → debe existir overlay
    expect(screen.getByRole("button")).toHaveTextContent("✕");
    expect(screen.getByTestId("overlay")).toBeInTheDocument();

    // Click → debe cerrar overlay y cambiar icono
    fireEvent.click(toggleButton);
    expect(screen.getByRole("button")).toHaveTextContent("☰");
    expect(screen.queryByTestId("overlay")).not.toBeInTheDocument();
  });

  test("overlay cierra el menú al hacer click en él", () => {
    setup();
    const overlay = screen.getByTestId("overlay");
    expect(overlay).toBeInTheDocument();
    fireEvent.click(overlay);
    // overlay debería desaparecer
    expect(screen.queryByTestId("overlay")).not.toBeInTheDocument();
  });
});
