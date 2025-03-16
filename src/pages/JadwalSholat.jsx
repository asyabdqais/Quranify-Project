import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import axios from "axios";
import { useTheme } from "../Components/ThemeContext";

const JadwalSholat = () => {
  const { darkMode } = useTheme();
  const [kota, setKota] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedKota, setSelectedKota] = useState("");
  const [jadwal, setJadwal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("https://raw.githubusercontent.com/lakuapik/jadwalsholatorg/master/kota.json")
      .then((response) => {
        if (response.data) setKota(response.data);
      })
      .catch(() => setError("Gagal mengambil data kota"));
  }, []);

  useEffect(() => {
    if (!selectedKota) return;
    setJadwal(null);
    setError(null);
    setLoading(true);

    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const day = ("0" + today.getDate()).slice(-2);

    axios.get(`https://raw.githubusercontent.com/lakuapik/jadwalsholatorg/master/adzan/${selectedKota}/${year}/${month}.json`)
      .then((response) => {
        if (response.data && response.data[day]) setJadwal(response.data[day]);
        else setError("Data tidak ditemukan");
      })
      .catch(() => setError("Gagal mengambil data jadwal sholat"))
      .finally(() => setLoading(false));
  }, [selectedKota]);

  const filteredKota = kota.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-10 ${darkMode ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-gradient-to-br from-gray-100 to-white'} text-gray-900 dark:text-white pt-28`}>
      <motion.h2
        className="text-4xl font-extrabold text-yellow-500 dark:text-yellow-400 drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        whileHover={{ scale: 1.1, textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)" }}
      >
        Jadwal Sholat Indonesia
      </motion.h2>

      <motion.div className="mt-6 w-full max-w-md relative">
        <input
          type="text"
          placeholder="Cari Kota..."
          className={`w-full p-3 rounded-lg shadow-md border border-gray-300 ${darkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'bg-white text-gray-900'} placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-yellow-400`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
        {search && (
          <motion.ul className={`absolute left-0 right-0 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'} border max-h-40 overflow-y-auto shadow-md rounded-lg mt-1`}>
            {filteredKota.map((item) => (
              <li
                key={item}
                className="p-2 hover:bg-yellow-400 dark:hover:bg-yellow-500 hover:text-black dark:hover:text-white cursor-pointer transition-all"
                onClick={() => {
                  setSelectedKota(item);
                  setSearch("");
                }}
              >
                {item}
              </li>
            ))}
          </motion.ul>
        )}
      </motion.div>

      <motion.div className={`mt-6 w-full max-w-lg p-6 rounded-lg shadow-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Memuat data...</p>
        ) : error ? (
          <p className="text-red-500 dark:text-red-400 text-center">{error}</p>
        ) : jadwal ? (
          <div className="space-y-3 text-lg">
            <p className={`${darkMode ? 'text-white' : 'text-black'}`}>🌅 <strong>Imsak:</strong> {jadwal.imsyak || "-"}</p>
            <p className={`${darkMode ? 'text-white' : 'text-black'}`}>🕌 <strong>Subuh:</strong> {jadwal.shubuh || "-"}</p>
            <p className={`${darkMode ? 'text-white' : 'text-black'}`}>🕛 <strong>Dzuhur:</strong> {jadwal.dzuhur || "-"}</p>
            <p className={`${darkMode ? 'text-white' : 'text-black'}`}>🌇 <strong>Ashar:</strong> {jadwal.ashr || "-"}</p>
            <p className={`${darkMode ? 'text-white' : 'text-black'}`}>🌆 <strong>Maghrib:</strong> {jadwal.magrib || "-"}</p>
            <p className={`${darkMode ? 'text-white' : 'text-black'}`}>🌙 <strong>Isya:</strong> {jadwal.isya || "-"}</p>
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">Silakan pilih kota</p>
        )}
      </motion.div>
    </div>
  );
};

export default JadwalSholat;