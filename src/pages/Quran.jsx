import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, BookOpen } from "lucide-react";
import axios from "axios";
import { useTheme } from "../Components/ThemeContext";

const Quran = () => {
  const { darkMode } = useTheme();
  const [surat, setSurat] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredSurat, setFilteredSurat] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://equran.id/api/v2/surat")
      .then((response) => {
        setSurat(response.data.data);
        setFilteredSurat(response.data.data);
      })
      .catch(() => {
        setError("Gagal memuat daftar surat. Coba lagi nanti.");
      });
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredSurat(surat);
    } else {
      setFilteredSurat(
        surat.filter((s) =>
          s.namaLatin.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, surat]);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center pt-24 pb-10 transition-all duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <motion.div
        className="flex items-center space-x-2 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <BookOpen size={38} className="text-yellow-500 drop-shadow-lg" />
        <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 drop-shadow-lg">
          Daftar Surat
        </h2>
      </motion.div>

      <motion.div className="relative flex items-center mt-6">
        <input
          type="text"
          placeholder="Cari surat..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 border border-gray-300 dark:border-gray-700 rounded-l-xl w-64 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        />
        <button className="p-3 bg-yellow-400 dark:bg-yellow-500 text-white rounded-r-xl hover:bg-yellow-500 dark:hover:bg-yellow-600 transition">
          <Search />
        </button>
      </motion.div>

      {error && <p className="text-red-500 dark:text-red-400 text-center mt-4">{error}</p>}

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.05 } },
        }}
      >
        {filteredSurat.length > 0 ? (
          filteredSurat.map((s) => (
            <motion.div
              key={s.nomor}
              className={`p-5 border rounded-xl shadow-lg text-center cursor-pointer transition-all ${darkMode ? 'bg-gray-800 border-gray-700 hover:shadow-yellow-400/50' : 'bg-white border-gray-300 hover:shadow-yellow-400/30'}`}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <Link to={`/quran/${s.nomor}`}>
                <h3 className="text-xl font-bold hover:text-yellow-400 transition-all">
                  {s.nomor}. {s.namaLatin} ({s.nama})
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Arti: {s.arti}</p>
                <p className="text-gray-600 dark:text-gray-400">Jumlah Ayat: {s.jumlahAyat}</p>
                <p className="text-gray-600 dark:text-gray-400">Tempat Turun: {s.tempatTurun}</p>
              </Link>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 col-span-3">Surat tidak ditemukan</p>
        )}
      </motion.div>
    </div>
  );
};

export default Quran;
