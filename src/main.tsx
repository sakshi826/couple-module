
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

// Global fallback to prevent ReferenceError: t is not defined
(window as any).t = (key: string) => key;

  createRoot(document.getElementById("root")!).render(<App />);
  
