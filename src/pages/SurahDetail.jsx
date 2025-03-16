import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Search } from "lucide-react";
import axios from "axios";
import { useTheme } from "../Components/ThemeContext";

const SurahDetail = () => {
  const { darkMode } = useTheme();
  const { id } = useParams();
  const [surah, setSurah] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAudio, setSelectedAudio] = useState("");
  const [availableAudios, setAvailableAudios] = useState([]);
  const [error, setError] = useState(null);
  const qariNames = [
    "Abdullah Al-Juhany",
    "Abdul Muhsin Al-Qasim",
    "Abdurrahman As-Sudais",
    "Ibrahim Al-Dossari",
    "Misyari Rasyid Al-Afasi"
  ];

  useEffect(() => {
    axios.get(`https://equran.id/api/v2/surat/${id}`)
      .then(response => {
        if (response.data && response.data.data) {
          setSurah(response.data.data);

          const audioData = response.data.data.audioFull || {};
          const audioList = Object.keys(audioData).map((key, index) => ({
            key,
            name: qariNames[index] || `Qari ${index + 1}`,
            url: audioData[key]
          })).filter(audio => audio.url);

          setAvailableAudios(audioList);
          if (audioList.length > 0) {
            setSelectedAudio(audioList[0].url);
          }
        } else {
          setError("Data surah tidak ditemukan.");
        }
      })
      .catch(() => setError("Gagal mengambil data surah."));
  }, [id]);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center pt-24 pb-10 ${darkMode ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-gradient-to-br from-gray-100 to-white'} text-gray-900 dark:text-white`}>
      {error && (
        <p className="text-red-500 dark:text-red-400 text-center mt-4">{error}</p>
      )}

      {surah && (
        <motion.div className={`w-full max-w-3xl p-8 rounded-lg shadow-lg border border-gray-300 ${darkMode ? 'dark:bg-gray-800 dark:border-gray-700 dark:shadow-yellow-700/40' : 'bg-white'}`}> 
          <motion.div className="flex justify-center items-center mb-4">
            <BookOpen size={50} className="text-yellow-500 dark:text-yellow-400 drop-shadow-lg" />
          </motion.div>
          <h2 className={`text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-700 dark:from-yellow-300 dark:to-yellow-500 drop-shadow-lg text-center ${darkMode ? 'animate-pulse' : ''}`}> 
            {surah.namaLatin} ({surah.nama})
          </h2>
          <p className="mt-3 text-sm text-gray-700 dark:text-gray-400 leading-relaxed text-center">
            {surah.deskripsi}
          </p>
        </motion.div>
      )}

      {surah && (
        <motion.div className="w-full max-w-3xl mt-6">
          <motion.div className="relative">
            <input
              type="text"
              placeholder="Cari ayat berdasarkan nomor..."
              className="w-full p-3 rounded-lg shadow-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 dark:shadow-yellow-700/40 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-yellow-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          </motion.div>

          <motion.div className="mt-4">
            <select
              className="p-3 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 dark:shadow-yellow-700/40 text-gray-900 dark:text-white shadow-md"
              value={selectedAudio}
              onChange={(e) => setSelectedAudio(e.target.value)}
            >
              {availableAudios.map(audio => (
                <option key={audio.key} value={audio.url}>
                  {audio.name}
                </option>
              ))}
            </select>

            {selectedAudio && (
              <audio controls className="w-full mt-3 bg-white dark:bg-gray-700 rounded-lg">
                <source src={selectedAudio} type="audio/mpeg" />
                Browser Anda tidak mendukung tag audio.
              </audio>
            )}
          </motion.div>
        </motion.div>
      )}

      {surah && (
        <motion.div className="mt-6 w-full max-w-3xl">
          <motion.ul className="space-y-4">
            {surah.ayat.filter(ayat =>
              ayat.nomorAyat.toString().includes(searchTerm)
            ).map((ayat) => (
              <motion.li
                key={ayat.nomorAyat}
                className={`p-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md ${darkMode ? 'dark:bg-gray-800 dark:shadow-yellow-700/40' : 'bg-white'}`}
                whileHover={{ scale: 1.02, backgroundColor: "#fce5cd" }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{ayat.nomorAyat}. {ayat.teksArab}</p>
                <p className="text-lg italic text-yellow-500 dark:text-yellow-300 mt-2">{ayat.teksLatin}</p>
                <p className="text-base text-gray-700 dark:text-gray-400 mt-1">{ayat.teksIndonesia}</p>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      )}
    </div>
  );
};

export default SurahDetail;
