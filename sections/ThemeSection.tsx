"use client";
import { ArrowBigDown, Lightbulb } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ArrowDark from "../public/assets/arrow-dark.png";
import ArrowLight from "../public/assets/arrow-light.png";
import Image from "next/image";

interface ThemeSectionProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
  setIsThemeSection: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeSection: React.FC<ThemeSectionProps> = ({
  theme,
  toggleTheme,
  setIsThemeSection,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const themeSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    audioRef.current = new Audio("/click-sound.mp3"); // Preload sound
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsThemeSection(true);
          } else {
            setIsThemeSection(false);
          }
        });
      },
      { threshold: 0.8 }
    );

    if (themeSectionRef.current) {
      observer.observe(themeSectionRef.current);
    }

    return () => {
      if (themeSectionRef.current) {
        observer.unobserve(themeSectionRef.current);
      }
    };
  }, [setIsThemeSection]);

  return (
    <section
      ref={themeSectionRef}
      className={`overflow-hidden theme-section relative h-screen flex justify-center items-center text-center transition-all ${
        theme === "dark" ? "bg-[#121212]" : "bg-[#f4f4f4]"
      }`}
    >
      <div className="absolute top-0 left-0 w-full h-full z-0 bg-transparent" />
      <div className="relative z-10 flex items-center justify-between w-full px-[350px]">
        <h1
          className={`text-4xl sm:text-5xl ${
            theme == "light" ? "text-gray-500" : "text-white"
          } font-bold mb-4 font-parkinsans`}
        >
          {theme === "light"
            ? "Wanna turn down the light?"
            : "Wanna turn on the light?"}
        </h1>
        <button
          onClick={() => {
            if (audioRef.current) {
              audioRef.current.currentTime = 0;
              audioRef.current.play();
            }
            toggleTheme();
          }}
          className="px-6 py-3 text-xl font-semibold"
        >
          {theme == "light" ? (
            <Lightbulb size={80} color="#6b7280" />
          ) : (
            <div className="relative flex justify-center items-center">
              {/* The icon */}
              <Lightbulb size={80} color="#ffec1f" />

              {/* Glow effect
              <div
                className="absolute inset-0 rounded-full h-[200px] w-[200px]"
                style={{
                  background:
                    "radial-gradient(circle, #ffec1f33, #ffec1f00 70%)",
                  zIndex: -1, // Push glow behind the icon
                }}
              ></div> */}
            </div>
          )}
        </button>
        <div className="absolute -rotate-45 -top-[0px] right-[42em] translate-x-[100%]">
          <Image
            src={theme == "dark" ? ArrowDark : ArrowLight}
            width={200}
            alt="Arrow"
          />
        </div>
      </div>
      <motion.div
        className="absolute bottom-10 z-10 text-gray-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <span className="flex items-center gap-[10px]">
          <ArrowBigDown /> Let's Gooo!
        </span>
      </motion.div>
    </section>
  );
};

export default ThemeSection;
