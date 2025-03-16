import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import Quran from "./pages/Quran";
import SurahDetail from "./pages/SurahDetail";
import JadwalSholat from "./pages/JadwalSholat";
import Doa from "./pages/Doa";
import "./index.css";
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/quran" element={<Quran />} />
        <Route path="/quran/:id" element={<SurahDetail />} />
        <Route path="/jadwal-sholat" element={<JadwalSholat />} />
        <Route path="/doa" element={<Doa />} />
        
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
