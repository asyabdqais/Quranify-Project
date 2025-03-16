import { useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Menu, X, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeContext";
import "@fontsource-variable/playfair";

const GlowEffect = ({ children }) => (
  <motion.span
    className="relative"
    animate={{
      textShadow: [
        "0 0 10px #facc15",
        "0 0 20px #facc15",
        "0 0 30px #facc15",
        "0 0 40px #facc15",
        "0 0 50px #facc15",
        "0 0 60px #facc15",
        "0 0 70px #facc15",
      ],
    }}
    transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
  >
    {children}
  </motion.span>
);

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Quran", path: "/quran" },
    { name: "Doa", path: "/doa" },
    { name: "Jadwal Sholat", path: "/jadwal-sholat" },
  ];

  return (
    <nav className={`w-full fixed top-0 z-50 p-4 flex justify-between items-center transition-all duration-500 shadow-md dark:shadow-gray-700 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <motion.div
        className="flex items-center space-x-2 ml-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <BookOpen size={28} className="text-yellow-500 dark:text-yellow-400 drop-shadow-lg" />
        <Link
          to="/"
          className="text-3xl font-extrabold text-yellow-500 dark:text-yellow-400 drop-shadow-lg font-playfair hover:scale-105 transition-all duration-300"
        >
          <GlowEffect>QURANIFY</GlowEffect>
        </Link>
      </motion.div>

      <div className="hidden md:flex space-x-8">
        {navLinks.map((link) => (
          <motion.div
            key={link.name}
            whileHover={{ scale: 1.15, rotate: 2, textShadow: "0px 0px 8px #facc15" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              to={link.path}
              className="text-xl font-semibold text-yellow-500 dark:text-yellow-400 hover:text-yellow-300 dark:hover:text-yellow-500 transition duration-300 font-playfair"
            >
              <GlowEffect>{link.name}</GlowEffect>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative flex items-center cursor-pointer bg-gray-200 dark:bg-gray-700 rounded-full p-1 w-14 h-8"
        onClick={toggleDarkMode}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          className="absolute left-1 top-1 bg-yellow-500 dark:bg-yellow-400 rounded-full w-6 h-6 shadow-md"
          animate={{ x: darkMode ? 24 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
        <Sun className="absolute left-1 top-1 text-yellow-400 w-5 h-5" />
        <Moon className="absolute right-1 top-1 text-gray-800 dark:text-white w-5 h-5" />
      </motion.div>

      <button
        className="md:hidden text-gray-900 dark:text-white ml-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className={`absolute top-16 right-0 w-full py-4 flex flex-col items-center space-y-4 md:hidden shadow-md dark:shadow-gray-700 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.1, textShadow: "0px 0px 8px #facc15" }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={link.path}
                  className="text-xl font-semibold text-yellow-500 dark:text-yellow-400 hover:text-yellow-300 dark:hover:text-yellow-500 transition duration-300 font-playfair"
                  onClick={() => setIsOpen(false)}
                >
                  <GlowEffect>{link.name}</GlowEffect>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
