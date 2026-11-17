import React, { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { StoreProvider } from "./services/GlobalState";
import "./App.css";
import "./Robert.css";
import Home from "./Pages/Home";
// The About page's stylesheet is loaded up front, as it always has been: its
// rules reach the home page too. Only its code waits until it is wanted.
import "./components/AboutRobert/Assets/CSS/AboutRobert.css";
import WorldVeil from "./world/WorldVeil";

// Robert's world brings A-Frame, Tone and RiTa with it - about three
// megabytes that the home page has no use for. They are fetched when someone
// steps through a roundel, and the portal keeps turning until they arrive.
const World = lazy(() => import("./Pages/World"));
const AboutRobert = lazy(() => import("./Pages/AboutRobert"));


function App(props) {

  return (
    <div className="wrapper">
      <StoreProvider>
        <Router>
          <Routes>
            <Route path="/world" element={<Suspense fallback={<WorldVeil />}><World /></Suspense>} />
            <Route path="/aboutrobert" element={<Suspense fallback={null}><AboutRobert /></Suspense>} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </StoreProvider>  
    </div>
  );
}



export default App;
