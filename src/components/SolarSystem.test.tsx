import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SolarSystem from "./SolarSystem";

beforeEach(() => {
  global.SpeechSynthesisUtterance = function (this: any, text: string) {
    this.text = text;
  } as any;

  global.speechSynthesis = {
    speak: jest.fn(),
    cancel: jest.fn(),
  } as any;
});

// Mock del speechSynthesis para evitar errores en Jest
beforeAll(() => {
  Object.defineProperty(window, "speechSynthesis", {
    value: {
      speak: jest.fn(),
      cancel: jest.fn(),
    },
    writable: true,
  });
});

describe("SolarSystem Component", () => {
  test("renderiza el título principal '¡Sistema Solar!'", () => {
    render(
      <MemoryRouter>
        <SolarSystem />
      </MemoryRouter>
    );
    const title = screen.getByText("¡Sistema Solar!");
    expect(title).toBeInTheDocument();
  });

  test("renderiza el botón '🚀 EXPLORAR EL ESPACIO'", () => {
    render(
      <MemoryRouter>
        <SolarSystem />
      </MemoryRouter>
    );
    const button = screen.getByRole("button", { name: /EXPLORAR EL ESPACIO/i });
    expect(button).toBeInTheDocument();
  });

  test("al hacer clic en '🚀 EXPLORAR EL ESPACIO' cambia al modo interactivo", () => {
    render(
      <MemoryRouter>
        <SolarSystem />
      </MemoryRouter>
    );

    // Clic en el botón de inicio
    const startButton = screen.getByRole("button", { name: /EXPLORAR EL ESPACIO/i });
    fireEvent.click(startButton);

    // Luego de hacer clic, el título de modo interactivo debe aparecer
    const interactiveTitle = screen.getByText(/SISTEMA SOLAR INTERACTIVO/i);
    expect(interactiveTitle).toBeInTheDocument();
  });

  test("muestra el botón para pausar o continuar", () => {
    render(
      <MemoryRouter>
        <SolarSystem />
      </MemoryRouter>
    );

    const startButton = screen.getByRole("button", { name: /EXPLORAR EL ESPACIO/i });
    fireEvent.click(startButton);

    const pauseButton = screen.getByRole("button", { name: /pausa/i });
    expect(pauseButton).toBeInTheDocument();
  });

  test("el botón de pausa cambia a play cuando se hace clic", () => {
    render(
      <MemoryRouter>
        <SolarSystem />
      </MemoryRouter>
    );

    const startButton = screen.getByRole("button", { name: /EXPLORAR EL ESPACIO/i });
    fireEvent.click(startButton);

    const pauseButton = screen.getByRole("button", { name: /pausa/i });
    fireEvent.click(pauseButton);

    const playButton = screen.getByRole("button", { name: /play/i });
    expect(playButton).toBeInTheDocument();
  });

  test("muestra el botón de reiniciar", () => {
    render(
      <MemoryRouter>
        <SolarSystem />
      </MemoryRouter>
    );

    const startButton = screen.getByRole("button", { name: /EXPLORAR EL ESPACIO/i });
    fireEvent.click(startButton);

    const resetButton = screen.getByRole("button", { name: /reiniciar/i });
    expect(resetButton).toBeInTheDocument();
  });

  test("muestra controles de velocidad", () => {
    render(
      <MemoryRouter>
        <SolarSystem />
      </MemoryRouter>
    );

    const startButton = screen.getByRole("button", { name: /EXPLORAR EL ESPACIO/i });
    fireEvent.click(startButton);

    expect(screen.getByText("Velocidad:")).toBeInTheDocument();
    expect(screen.getByText("1x")).toBeInTheDocument();
  });

  test("aumenta la velocidad al hacer clic en +", () => {
    render(
      <MemoryRouter>
        <SolarSystem />
      </MemoryRouter>
    );

    const startButton = screen.getByRole("button", { name: /EXPLORAR EL ESPACIO/i });
    fireEvent.click(startButton);

    const increaseSpeedButtons = screen.getAllByRole("button", { name: "+" });
    const increaseSpeedButton = increaseSpeedButtons[0]; // El primero es velocidad
    fireEvent.click(increaseSpeedButton);

    expect(screen.getByText("1.5x")).toBeInTheDocument();
  });

  test("disminuye la velocidad al hacer clic en -", () => {
    render(
      <MemoryRouter>
        <SolarSystem />
      </MemoryRouter>
    );

    const startButton = screen.getByRole("button", { name: /EXPLORAR EL ESPACIO/i });
    fireEvent.click(startButton);

    const decreaseSpeedButton = screen.getAllByRole("button", { name: "-" })[0]; // El primero es velocidad
    fireEvent.click(decreaseSpeedButton);

    expect(screen.getByText("0.5x")).toBeInTheDocument();
  });

  test("muestra controles de zoom", () => {
    render(
      <MemoryRouter>
        <SolarSystem />
      </MemoryRouter>
    );

    const startButton = screen.getByRole("button", { name: /EXPLORAR EL ESPACIO/i });
    fireEvent.click(startButton);

    expect(screen.getByText("Zoom:")).toBeInTheDocument();
    expect(screen.getByText("1.0x")).toBeInTheDocument();
  });

  test("aumenta el zoom al hacer clic en +", () => {
    render(
      <MemoryRouter>
        <SolarSystem />
      </MemoryRouter>
    );

    const startButton = screen.getByRole("button", { name: /EXPLORAR EL ESPACIO/i });
    fireEvent.click(startButton);

    const increaseZoomButton = screen.getAllByRole("button", { name: "+" })[1]; // El segundo es zoom
    fireEvent.click(increaseZoomButton);

    expect(screen.getByText("1.3x")).toBeInTheDocument();
  });

  test("disminuye el zoom al hacer clic en -", () => {
    render(
      <MemoryRouter>
        <SolarSystem />
      </MemoryRouter>
    );

    const startButton = screen.getByRole("button", { name: /EXPLORAR EL ESPACIO/i });
    fireEvent.click(startButton);

    const decreaseZoomButton = screen.getAllByRole("button", { name: "-" })[1]; // El segundo es zoom
    fireEvent.click(decreaseZoomButton);

    expect(screen.getByText("0.8x")).toBeInTheDocument();
  });

  test("muestra el botón para mostrar/ocultar órbitas", () => {
    render(
      <MemoryRouter>
        <SolarSystem />
      </MemoryRouter>
    );

    const startButton = screen.getByRole("button", { name: /EXPLORAR EL ESPACIO/i });
    fireEvent.click(startButton);

    const orbitsButton = screen.getByRole("button", { name: /ocultar órbitas/i });
    expect(orbitsButton).toBeInTheDocument();
  });

  test("cambia el texto del botón de órbitas al hacer clic", () => {
    render(
      <MemoryRouter>
        <SolarSystem />
      </MemoryRouter>
    );

    const startButton = screen.getByRole("button", { name: /EXPLORAR EL ESPACIO/i });
    fireEvent.click(startButton);

    const orbitsButton = screen.getByRole("button", { name: /ocultar órbitas/i });
    fireEvent.click(orbitsButton);

    const showOrbitsButton = screen.getByRole("button", { name: /mostrar órbitas/i });
    expect(showOrbitsButton).toBeInTheDocument();
  });

  test("muestra el botón para mostrar/ocultar nombres", () => {
    render(
      <MemoryRouter>
        <SolarSystem />
      </MemoryRouter>
    );

    const startButton = screen.getByRole("button", { name: /EXPLORAR EL ESPACIO/i });
    fireEvent.click(startButton);

    const labelsButton = screen.getByRole("button", { name: /ocultar nombres/i });
    expect(labelsButton).toBeInTheDocument();
  });

  test("cambia el texto del botón de nombres al hacer clic", () => {
    render(
      <MemoryRouter>
        <SolarSystem />
      </MemoryRouter>
    );

    const startButton = screen.getByRole("button", { name: /EXPLORAR EL ESPACIO/i });
    fireEvent.click(startButton);

    const labelsButton = screen.getByRole("button", { name: /ocultar nombres/i });
    fireEvent.click(labelsButton);

    const showLabelsButton = screen.getByRole("button", { name: /mostrar nombres/i });
    expect(showLabelsButton).toBeInTheDocument();
  });

  test("seleccionar un planeta muestra el panel de información", () => {
    render(
      <MemoryRouter>
        <SolarSystem />
      </MemoryRouter>
    );

    const startButton = screen.getByRole("button", { name: /EXPLORAR EL ESPACIO/i });
    fireEvent.click(startButton);

    const earthButton = screen.getByTitle("Tierra");
    fireEvent.click(earthButton);

    const planetTitles = screen.getAllByText("Tierra");
    expect(planetTitles.length).toBeGreaterThan(0);
    expect(screen.getByText("150M km")).toBeInTheDocument();
  });

  test("seleccionar el Sol muestra el panel de información", () => {
    render(
      <MemoryRouter>
        <SolarSystem />
      </MemoryRouter>
    );

    const startButton = screen.getByRole("button", { name: /EXPLORAR EL ESPACIO/i });
    fireEvent.click(startButton);

    const sunButton = screen.getByTitle("Sol");
    fireEvent.click(sunButton);

    expect(screen.getByText("Sol")).toBeInTheDocument();
    expect(screen.getByText("0 km")).toBeInTheDocument();
  });

  test("el panel muestra la información correcta del planeta", () => {
    render(
      <MemoryRouter>
        <SolarSystem />
      </MemoryRouter>
    );

    const startButton = screen.getByRole("button", { name: /EXPLORAR EL ESPACIO/i });
    fireEvent.click(startButton);

    const marsButton = screen.getByTitle("Marte");
    fireEvent.click(marsButton);

    const marsTitles = screen.getAllByText("Marte");
    expect(marsTitles.length).toBeGreaterThan(0);
    expect(screen.getByText("228M km")).toBeInTheDocument();
    expect(screen.getByText("6,779 km")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("24.6 horas")).toBeInTheDocument();
    expect(screen.getByText("Marte tiene el monte más alto del sistema solar")).toBeInTheDocument();
  });

  test("el botón 'Escuchar Información' llama a speakInstruction", () => {
    render(
      <MemoryRouter>
        <SolarSystem />
      </MemoryRouter>
    );

    const startButton = screen.getByRole("button", { name: /EXPLORAR EL ESPACIO/i });
    fireEvent.click(startButton);

    const venusButton = screen.getByTitle("Venus");
    fireEvent.click(venusButton);

    const listenButton = screen.getByRole("button", { name: /escuchar información/i });
    fireEvent.click(listenButton);

    expect(window.speechSynthesis.speak).toHaveBeenCalled();
  });

 test("el botón 'Explorar otro planeta' cierra el panel", () => {
  render(
    <MemoryRouter>
      <SolarSystem />
    </MemoryRouter>
  );

  // 1️⃣ Iniciar modo interactivo
  const startButton = screen.getByRole("button", { name: /EXPLORAR EL ESPACIO/i });
  fireEvent.click(startButton);

  // 2️⃣ Clic en un planeta (Mercurio)
  const mercuryButton = screen.getByTitle("Mercurio");
  fireEvent.click(mercuryButton);

  // 3️⃣ Confirmar que aparece el panel con detalles del planeta
  const [planetInfo] = screen.getAllByText(/km/i); // 👈 tomamos solo el primero
  expect(planetInfo).toBeInTheDocument();

  // 4️⃣ Cerrar el panel
  const closeButton = screen.getByRole("button", { name: /explorar otro planeta/i });
  fireEvent.click(closeButton);

  // 5️⃣ Esperar a que desaparezca el panel (detalles)
  waitFor(() => {
    const planetInfoAfter = screen.queryByText(/km/i);
    expect(planetInfoAfter).not.toBeInTheDocument();
  });
});


});
