import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Search } from "lucide-react";
import axios from "axios";
import { useTheme } from "../Components/ThemeContext";

const Doa = () => {
  const { darkMode } = useTheme();
  const [doaList, setDoaList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://open-api.my.id/api/doa");
        if (response.data && Array.isArray(response.data)) {
          setDoaList(response.data);
        } else {
          throw new Error("Format data tidak sesuai");
        }
      } catch (err) {
        setError("Gagal mengambil data doa. Silakan coba lagi nanti.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center pt-24 pb-10 ${darkMode ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-gradient-to-br from-gray-100 to-white'} text-gray-900 dark:text-white`}>
      <motion.div className={`w-full max-w-3xl p-8 rounded-lg shadow-lg border border-gray-300 ${darkMode ? 'dark:bg-gray-800 dark:border-gray-700 dark:shadow-yellow-700/40' : 'bg-white'}`}> 
        <motion.div className="flex justify-center items-center mb-4">
          <BookOpen size={50} className="text-yellow-500 dark:text-yellow-400 drop-shadow-lg" />
        </motion.div>
        <h2 className={`text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-700 dark:from-yellow-300 dark:to-yellow-500 drop-shadow-lg text-center ${darkMode ? 'animate-pulse' : ''}`}>
          Kumpulan Doa Harian
        </h2>
      </motion.div>

      <motion.div className="w-full max-w-3xl mt-6 relative">
        <input
          type="text"
          placeholder="Cari doa berdasarkan nama..."
          className="w-full p-3 rounded-lg shadow-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 dark:shadow-yellow-700/40 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
      </motion.div>

      {error && <p className="text-red-500 dark:text-red-400 mt-4">{error}</p>}

      <motion.div className="mt-6 w-full max-w-3xl">
        <motion.ul className="space-y-4">
          {doaList.length > 0 ? (
            doaList.filter(doa =>
              doa.judul.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((doa, index) => (
              <motion.li
                key={index}
                className={`p-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md ${darkMode ? 'dark:bg-gray-800 dark:shadow-yellow-700/40' : 'bg-white'}`}
                whileHover={{ scale: 1.02, backgroundColor: "#fce5cd" }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <h3 className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">{doa.judul}</h3>
                <p className="text-2xl text-yellow-600 dark:text-yellow-400 mt-2">{doa.arab}</p>
                <p className="text-lg italic text-yellow-500 dark:text-yellow-300 mt-2">{doa.latin}</p>
                <p className="text-base text-gray-700 dark:text-gray-400 mt-1">{doa.arti}</p>
              </motion.li>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center mt-4">Data doa tidak tersedia</p>
          )}
        </motion.ul>
      </motion.div>
    </div>
  );
};

export default Doa;
