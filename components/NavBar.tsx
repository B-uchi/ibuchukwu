import React, { useEffect, useRef } from "react";
import {
  HomeIcon,
  UserCircleIcon,
  CodeIcon,
  MailIcon,
  UserCog,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface NavBarProps {
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}

const NavBar: React.FC<NavBarProps> = ({ theme, setTheme }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    audioRef.current = new Audio("/click-sound.mp3"); // Preload sound
  }, []);

  const toggleTheme = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    setTheme(theme === "light" ? "dark" : "light");
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  };

  const changeSection = (section: string) => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    router.push(`/#${section}`);
  };

  return (
    <>
      <motion.nav
        className={`fixed bottom-4 md:left-1/2 transform md:-translate-x-1/2 bg-gray-300 dark:text-white dark:bg-black/60 backdrop-blur-md rounded-full px-6 py-3 shadow-lg flex justify-between items-center w-screen md:w-[450px]`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={() => changeSection("home")}
          className="p-3 rounded-full hover:bg-blue-100 dark:hover:bg-gray-800 transition"
        >
          <HomeIcon />
        </button>
        <button
          onClick={() => changeSection("who-am-i")}
          className="p-3 rounded-full hover:bg-blue-100 dark:hover:bg-gray-800 transition"
        >
          <UserCircleIcon />
        </button>
        <button
          onClick={() => changeSection("what-can-i-do")}
          className="p-3 rounded-full hover:bg-blue-100 dark:hover:bg-gray-800 transition"
        >
          <UserCog />
        </button>
        <button
          onClick={() => changeSection("what-i-have-built")}
          className="p-3 rounded-full hover:bg-blue-100 dark:hover:bg-gray-800 transition"
        >
          <CodeIcon />
        </button>
        <button
          onClick={() => changeSection("contact-me")}
          className="p-3 rounded-full hover:bg-blue-100 dark:hover:bg-gray-800 transition"
        >
          <MailIcon />
        </button>
        <button
          className="p-3 rounded-full hover:bg-blue-100 dark:hover:bg-gray-800 transition"
          onClick={toggleTheme}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </motion.nav>
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[80px] h-[3px] rounded-full mt-2 bg-[#b4aeae]"></div>
    </>
  );
};

export default NavBar;
