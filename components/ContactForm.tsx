"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Bomb, Wrench } from "lucide-react";

interface ContactFormProps {
  theme: "light" | "dark";
  setIsThemeSection: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContactForm: React.FC<ContactFormProps> = ({
  theme,
  setIsThemeSection,
}) => {
  const [gravityEnabled, setGravityEnabled] = useState(false);
  const isDark = theme === "dark";
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Animation variants for falling elements
  const containerVariants = {
    initial: {
      opacity: 1,
    },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Modified to fall within container
  const fallingElementVariants = {
    initial: { y: 0, rotate: 0 },
    animate: {
      y: "140%", // Falls to bottom of container instead of viewport
      rotate: [-2, 5, -7, 4, 10, 3],
      transition: {
        y: {
          duration: 1.5,
          ease: [0.2, 0.4, 0.8, 1],
        },
        rotate: {
          duration: 0.4,
          repeat: 1,
          ease: "linear",
        },
      },
    },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsThemeSection(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, [setIsThemeSection]);

  useEffect(() => {
    audioRef.current = new Audio("/explode.mp3");
  }, []);

  return (
    <div
      ref={contactRef}
      id="contact-me"
      className={`min-h-screen flex items-center justify-center ${
        isDark ? "bg-[#121212] text-white" : "bg-[#f4f4f4] text-gray-800"
      }`}
    >
      <div className="w-full max-w-6xl h-screen flex justify-center items-center md:flex-row gap-8 md:gap-16 relative">
        {/* Gravity Toggle */}
        <button
          onClick={() => {
            if (audioRef.current && !gravityEnabled) {
              audioRef.current.currentTime = 0;
              audioRef.current.play();
            }
            setGravityEnabled((prev) => !prev);
          }}
          className={`absolute top-4 right-4 p-4 text-sm font-bold rounded-full ${
            isDark ? "bg-[#313131] text-white" : "bg-gray-300 text-gray-800"
          } hover:scale-110 transition-all z-50`}
        >
          {gravityEnabled ? <Wrench /> : <Bomb />}
        </button>

        <motion.div
          className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left relative h-[500px] overflow-hidden"
          variants={gravityEnabled ? containerVariants : {}}
          initial="initial"
          animate="animate"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 w-full font-parkinsans"
            variants={gravityEnabled ? fallingElementVariants : {}}
          >
            Wanna contact me?
          </motion.h1>
          <motion.p
            className={`text-lg md:text-xl font-josefin ${
              isDark ? "text-gray-300" : "text-gray-600"
            } w-full`}
            variants={gravityEnabled ? fallingElementVariants : {}}
          >
            I'd love to hear from you. Send me a message!
          </motion.p>
        </motion.div>

        {/* Right Column - Contact Form */}
        <div className="flex-1 ">
          <motion.div
            className={`p-8 rounded-2xl relative h-[100%] pt-[40px] overflow-hidden`}
            variants={gravityEnabled ? containerVariants : {}}
            initial="initial"
            animate="animate"
          >
            <form className="space-y-6 font-josefin">
              {/* Name Input */}
              <motion.div
                className="space-y-2"
                variants={gravityEnabled ? fallingElementVariants : {}}
              >
                <label className="text-sm font-medium block">Your Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className={`w-full p-4 rounded-lg bg-transparent border ${
                    isDark
                      ? "border-gray-700 focus:border-blue-500"
                      : "border-gray-300 focus:border-blue-500"
                  } outline-none text-lg transition-all duration-300`}
                  required
                  disabled={gravityEnabled}
                />
              </motion.div>

              {/* Email Input */}
              <motion.div
                className="space-y-2"
                variants={gravityEnabled ? fallingElementVariants : {}}
              >
                <label className="text-sm font-medium block">Your Email</label>
                <input
                  type="email"
                  placeholder="johndoe@example.com"
                  className={`w-full p-4 rounded-lg bg-transparent border ${
                    isDark
                      ? "border-gray-700 focus:border-blue-500"
                      : "border-gray-300 focus:border-blue-500"
                  } outline-none text-lg transition-all duration-300`}
                  required
                  disabled={gravityEnabled}
                />
              </motion.div>

              {/* Message Textarea */}
              <motion.div
                className="space-y-2"
                variants={gravityEnabled ? fallingElementVariants : {}}
              >
                <label className="text-sm font-medium block">
                  Your Message
                </label>
                <textarea
                  rows={5}
                  placeholder="What would you like to talk about...."
                  className={`w-full p-4 rounded-lg bg-transparent border ${
                    isDark
                      ? "border-gray-700 focus:border-blue-500"
                      : "border-gray-300 focus:border-blue-500"
                  } outline-none text-lg transition-all duration-300`}
                  required
                  disabled={gravityEnabled}
                ></textarea>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className={`w-full p-4 text-lg font-bold rounded-lg bg-gradient-to-br ${
                  isDark
                    ? "from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600"
                    : "from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500"
                } text-white transition-all duration-300 transform hover:scale-105 shadow-lg group flex items-center justify-center gap-2`}
                variants={gravityEnabled ? fallingElementVariants : {}}
                disabled={gravityEnabled}
              >
                Send Message
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
