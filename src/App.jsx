import { Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/about";
import Edit from "./pages/edit";
import NotFound from "./pages/NotFound";

import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-[#f7f7f4] text-slate-950">
      <Navbar />
      <main className="min-h-[calc(100vh-260px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
