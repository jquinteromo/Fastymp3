import "./App.css";
import Inputsearch from "./components/inputsearch";

import Tittle from "./components/Tittle";
function App() {
  return (
    <div
      style={{
        background: "linear-gradient(to right, #0f111a, #173a5b)",
      }}
      className="bg-[#0f3664] "
    >
      <Tittle></Tittle>
      <Inputsearch></Inputsearch>
      <footer className="mt-24  text-sm text-center text-white/40 pb-4">
        <p>
          © {new Date().getFullYear()} FastMP3. Todos los derechos reservados.
        </p>
        <p className="mt-2">
          <a href="#terminos" className="underline hover:text-white">
            Términos
          </a>{" "}
          ·
          <a href="#privacidad" className="underline hover:text-white ml-2">
            Privacidad
          </a>{" "}
          ·
          <a href="#contacto" className="underline hover:text-white ml-2">
            Contacto
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
