import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";

// 🧩 Mock del entorno del DOM que usa el componente
beforeAll(() => {
  // Simula que el documento tiene classList
  document.documentElement.classList = {
    contains: jest.fn().mockReturnValue(false),
    toggle: jest.fn().mockReturnValue(false),
    add: jest.fn(),
    remove: jest.fn(),
  } as any;

  // Simula localStorage
  Storage.prototype.getItem = jest.fn();
  Storage.prototype.setItem = jest.fn();

  // Simula matchMedia (usado en useEffect)
  window.matchMedia = jest.fn().mockImplementation(() => ({
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
});

describe("Navbar", () => {
  test("renderiza el título principal 'Mentes Creativas'", () => {
    render(<Navbar />);
    const titulo = screen.getByText(/Mentes Creativas/i);
    expect(titulo).toBeInTheDocument();
  });
});
