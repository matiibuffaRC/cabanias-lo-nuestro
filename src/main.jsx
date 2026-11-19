import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App.jsx";
import "./styles/animations.css";
import "./styles/global.css";
import "./styles/typography.css";

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

const root = document.getElementById("root");
const normalize = (path) => path.replace(/\/+$/, "") || "/";

// Si el HTML ya viene pre-renderizado para esta misma ruta, React lo "activa" sin redibujarlo.
// Si no (ej: una ruta inexistente que el hosting resolvió con otro HTML), se arma de cero.
if (root.dataset.prerendered && normalize(root.dataset.prerendered) === normalize(location.pathname)) {
  hydrateRoot(root, app);
} else {
  root.textContent = "";
  createRoot(root).render(app);
}
