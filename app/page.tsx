"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import ParticleBackground from "@/components/ParticleBackground";
import ThemeSection from "@/components/ThemeSection";
import WhoAmI from "@/components/AboutMe";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import WhatCanIDo from "@/components/WhatCanIDo";
import ProjectSection from "@/components/ProjectSection";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

type Theme = "light" | "dark";

const Portfolio: React.FC = () => {
  const [theme, setTheme] = useState<Theme>("light");
  const [isThemeSection, setIsThemeSection] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const themeSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "100%", // Provides ample scroll space
        pin: true,
        scrub: 2,
      },
    });

    // Greeting animation
    tl.to(greetingRef.current, {
      x: 2200,
      y: 0,
      opacity: 1,
      duration: 2.0,
      ease: "power1.inOut",
    }).to(greetingRef.current, {
      x: 5500,
      y: 0,
      opacity: 0,
      duration: 2.0,
      ease: "power1.in",
    });

    // Name animation
    tl.to(nameRef.current, {
      x: 0,
      opacity: 1,
      duration: 2.0,
      ease: "power1.inOut",
    }).to(nameRef.current, {
      x: -80,
      opacity: 1,
      duration: 1.5,
      ease: "power1.in",
    });

    // Tagline animation
    tl.to(taglineRef.current, {
      opacity: 1,
      duration: 1,
      ease: "power1.inOut",
    }).to(taglineRef.current, {
      x: 100,
      opacity: 0,
      duration: 1,
      ease: "power1.in",
    });

    // Name scaling animation
    const nameScaleAnimation = tl
      .to(nameRef.current, {
        scale: 50,
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power1.inOut",
      })
      .to(nameRef.current, {
        scale: 1000,
        y: 0,
        display: "none",
        opacity: 0,
        duration: 1,
        ease: "power1.in",
      });

    // Theme section animation
    tl.fromTo(
      themeSectionRef.current,
      {
        opacity: 0,
        y: 100, // Start slightly below its final position
        scale: 0.8, // Start slightly smaller
      },
      {
        opacity: 1,
        y: 0, // Move to its final position
        scale: 1, // Full scale
        duration: 1.5,
        ease: "power2.out",
      },
      // Position the theme section animation relative to the name scaling
      `-=${nameScaleAnimation.duration() * 0.7}` // Start slightly before name scaling ends
    );

    // Debugging: Log animation details
    tl.eventCallback("onComplete", () => {
      setIsThemeSection(true);
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <div id="home"></div>
      <div
        ref={containerRef}
        className={`${
          theme === "dark" ? "bg-[#121212]" : "bg-[#f4f4f4]"
        } transition-all min-h-screen relative overflow-hidden`}
      >
        {/* Hero Section */}
        <section className="relative h-screen flex flex-col justify-center items-center text-center">
          <div className="absolute top-0 left-0 w-full h-full z-0">
            <ParticleBackground theme={theme} />
          </div>
          <motion.div
            className="relative z-10 font-bold"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="sm:text-7xl mb-4 font-extrabold tracking-tight flex md:flex-row flex-col gap-[20px] text-5xl font-parkinsans">
              <h1
                ref={greetingRef}
                className={` ${
                  theme == "dark" ? "text-white" : "text-gray-500"
                }`}
              >
                Hi, I'm
              </h1>
              <span
                ref={nameRef}
                className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-arrows"
              >
                Ibuchukwu
              </span>
            </div>
            <p
              ref={taglineRef}
              className={`text-xl sm:text-2xl ${
                theme == "dark" ? "text-white" : "text-gray-500"
              } font-josefin`}
            >
              Turning ideas into reality through{" "}
              <span
                className={`fo ${
                  theme == "dark" ? "bg-[#313131]" : "bg-[#b8b7b7]"
                } p-1`}
              >
                &lt;code/&gt;
              </span>
            </p>
          </motion.div>
        </section>
      </div>
      <div className="h-screen snap-start">
        <ThemeSection
          theme={theme}
          toggleTheme={toggleTheme}
          setIsThemeSection={setIsThemeSection}
        />
      </div>
      <div className="h-screen snap-start">
        <WhoAmI theme={theme} setIsThemeSection={setIsThemeSection} />
      </div>
      <div className="h-screen snap-start">
        <WhatCanIDo theme={theme} />
      </div>
      <div className="h-screen snap-start">
        <ProjectSection theme={theme} />
      </div>
      <div className="h-screen snap-start">
        <ContactForm theme={theme} setIsThemeSection={setIsThemeSection} />
      </div>
      <Footer theme={theme} setIsThemeSection={setIsThemeSection} />
      {!isThemeSection && <NavBar theme={theme} setTheme={setTheme} />}
    </>
  );
};

export default Portfolio;
