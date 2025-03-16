import { motion } from "framer-motion";
import { useTheme } from "../Components/ThemeContext";
import { BookOpen } from "lucide-react";

const Home = () => {
  const { darkMode } = useTheme();

  // Konfigurasi animasi partikel dengan ukuran yang diperbesar
  const particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 15 + 5, // Memperbesar ukuran partikel
  }));

  return (
    <div className={`relative min-h-screen flex flex-col items-center justify-center ${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-yellow-50 to-yellow-100'} text-gray-900 dark:text-white transition-all duration-500 pt-24 pb-10 overflow-hidden`}>
      {/* Background Animasi */}
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: darkMode ? '#3b82f6' : '#facc15',
            opacity: 0.6,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", delay: Math.random() }}
        />
      ))}

      <motion.div
        className={`relative z-10 p-10 rounded-xl shadow-2xl border ${darkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-white'} max-w-3xl text-center hover:shadow-yellow-400/50 dark:hover:shadow-yellow-300/50 transition-all duration-500`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          className="flex justify-center items-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <BookOpen className="text-yellow-400 dark:text-yellow-300 w-12 h-12 drop-shadow-lg" />
        </motion.div>

        <motion.h2
          className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 dark:from-yellow-300 dark:to-yellow-500 drop-shadow-lg hover:drop-shadow-[0_0_10px_rgba(255,215,0,0.8)] mb-8"
          whileHover={{ scale: 1.1 }}
        >
          Selamat Datang di QURANIFY
        </motion.h2>

        <motion.p
          className="mt-4 text-lg flex items-center justify-center text-gray-700 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-300 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          Temukan keindahan Al-Quran dengan mudah. Dengarkan lantunan ayat dari qari terbaik dan resapi maknanya dalam setiap ayat.
        </motion.p>

        <motion.p
          className="mt-8 text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 dark:from-yellow-300 dark:to-yellow-500 hover:drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          📖 Mulai perjalanan spiritual Anda hari ini!
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Home;
