import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { StoreProvider } from "./services/GlobalState";
import "./App.css";
import "./Robert.css";
import Home from "./Pages/Home";
import World from "./Pages/World";
import AboutRobert from "./Pages/AboutRobert"


function App(props) {

  return (
    <div className="wrapper">
      <StoreProvider>
        <Router>
          <Routes>
            <Route path="/world" element={<World />} />
            <Route path="/aboutrobert" element={<AboutRobert />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </StoreProvider>  
    </div>
  );
}



export default App;
