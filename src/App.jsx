import {  Routes, Route, useNavigate } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import About from "./pages/about";
import Edit from "./pages/edit";

import "./App.css";

function App() {

  const Navigate = useNavigate();
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/about" element={<About />} />
      </Routes>
   
  );
}

export default App;
