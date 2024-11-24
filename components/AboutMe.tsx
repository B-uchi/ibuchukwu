"use client";

import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import SocialButton from "./SocialButton";
import avatarPng from "../public/assets/avatar.png";
import Image from "next/image";

interface WhoAmIProps {
  theme: "light" | "dark";
  setIsThemeSection: React.Dispatch<React.SetStateAction<boolean>>;
}
export const socials = [
  {
    label: "Twitter",
    url: "https://twitter.com/your_handle",
    icon: <Twitter />,
  },
  {
    label: "Github",
    url: "https://github.com/your_handle",
    icon: <Github />,
  },
  {
    label: "Email",
    url: "mailto:your_email@example.com",
    icon: <Mail />,
  },
  {
    label: "LinkedIn",
    url: "https://linkedin.com/in/your_profile",
    icon: <Linkedin />,
  },
];

const WhoAmI: React.FC<WhoAmIProps> = ({ theme, setIsThemeSection }) => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const hasMounted = useRef(false);

  useEffect(() => {
    hasMounted.current = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMounted.current) {
            setIsInView(true);
            controls.start("visible");
            setIsThemeSection(false);
          } else if (!entry.isIntersecting && hasMounted.current) {
            setIsInView(false);
            controls.start("hidden");
          }
        });
      },
      { threshold: 0.7 } // Adjust as needed
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      hasMounted.current = false;
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [controls, setIsThemeSection]);



  return (
    <div
      id="who-am-i"
      ref={sectionRef}
      className={`relative min-h-screen flex flex-col ${
        theme === "dark"
          ? "bg-[#121212] text-white"
          : "bg-[#f4f4f4] text-gray-800"
      }`}
    >
      {/* Content Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 md:px-[200px] items-center min-h-screen">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
          }}
          className="flex flex-col justify-center"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 font-parkinsans">
            Who Am I?
          </h2>
          <p className="text-lg leading-relaxed font-josefin">
            Hey there! I'm Ibuchukwu, a passionate full-stack developer with a
            knack for solving problems and bringing ideas to life through clean,
            efficient, and scalable code. I thrive in creating engaging user
            experiences and love exploring new tools and technologies.
            <br />
            <br />
            When I'm not coding, you'll find me reading, brainstorming ideas, or
            perfecting my craft as a builder and creator. Let's connect and
            create something amazing together!
          </p>
        </motion.div>

        {/* Right Column - Profile and Social Links */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, x: 100 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
          }}
          className="flex flex-col items-center justify-center space-y-8"
        >
          <div
            className={`w-[256px] h-[256px] rounded-full shadow-lg flex items-center justify-center overflow-hidden ${
              theme === "dark" ? "bg-[#313131]" : "bg-gray-300"
            }`}
          >
            <Image
              src={avatarPng}
              alt="My avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Social Links */}
          <div className="flex space-x-10">
            {socials.map((social, index) => (
              <SocialButton key={index} {...social} showToolTip/>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default WhoAmI;
