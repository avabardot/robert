import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// No StrictMode on purpose: Robert's scene builds synths and starts Tone
// loops while it renders, and StrictMode's double render would give him two
// of everything.
createRoot(document.getElementById("root")).render(<App />);
