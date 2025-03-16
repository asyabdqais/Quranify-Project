import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";

const Footer = () => {
  const { darkMode } = useTheme();

  return (
    <motion.footer
      className={`w-full border-t py-6 shadow-inner transition-all duration-500 ${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-950 border-gray-800 dark:shadow-black' : 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-gray-300 shadow-gray-200'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto text-center text-gray-900 dark:text-white">
        <motion.h2
          className="text-xl font-extrabold text-yellow-500 dark:text-yellow-400 dark:drop-shadow-yellow-500 dark:animate-pulse"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.1, rotate: 2 }}
        >
          QURANIFY
        </motion.h2>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Aplikasi untuk membaca Al-Quran dan mendengarkan ayat-ayat suci dengan mudah.
        </p>

        <div className="flex justify-center mt-4 space-x-6">
          <Link to="/" className="text-gray-800 dark:text-gray-300 hover:text-yellow-400 dark:hover:text-yellow-500 transition duration-300">
            Home
          </Link>
          <Link to="/quran" className="text-gray-800 dark:text-gray-300 hover:text-yellow-400 dark:hover:text-yellow-500 transition duration-300">
            Quran
          </Link>
          <Link to="/jadwal-sholat" className="text-gray-800 dark:text-gray-300 hover:text-yellow-400 dark:hover:text-yellow-500 transition duration-300">
            Jadwal Sholat
          </Link>
          <Link to="/doa" className="text-gray-800 dark:text-gray-300 hover:text-yellow-400 dark:hover:text-yellow-500 transition duration-300">
            Doa
          </Link>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          Terima kasih kepada 
          <a href="https://equran.id" className="underline hover:text-yellow-400 dark:hover:text-yellow-500 mx-1" target="_blank" rel="noopener noreferrer">e-quran.id</a>, 
          <a href="https://github.com/lakuapik/jadwalsholatorg" className="underline hover:text-yellow-400 dark:hover:text-yellow-500 mx-1" target="_blank" rel="noopener noreferrer">Lakuapik</a>, dan 
          <a href="https://open-api.my.id/" className="underline hover:text-yellow-400 dark:hover:text-yellow-500 mx-1" target="_blank" rel="noopener noreferrer">Open API My ID</a> 
          atas API yang luar biasa.
        </p>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Developed By <span className="font-semibold text-yellow-400 dark:text-yellow-500">Asyajj Abdul Qais</span>
        </p>

        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
          &copy; {new Date().getFullYear()} E-QURAN TIF. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;