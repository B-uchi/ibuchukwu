import { useAnimation } from "framer-motion";
import React, { useEffect, useRef } from "react";
import SocialButton from "./SocialButton";
import { socials } from "../sections/AboutMe";

interface FooterProps {
  theme: "light" | "dark";
  setIsThemeSection: React.Dispatch<React.SetStateAction<boolean>>;
}

const Footer: React.FC<FooterProps> = ({ theme, setIsThemeSection }) => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsThemeSection(true);
          }else{
            setIsThemeSection(false);
          }
        });
      },
      { threshold: 0.7 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, [setIsThemeSection]);

  return (
    <footer
      ref={footerRef}
      className={`w-full py-6 text-center ${
        theme === "dark"
          ? "bg-[#242323] text-white "
          : "bg-[#f4f4f4] text-gray-800"
      }`}
    >
      <div className="container px-10 mx-auto flex lg:flex-row flex-col-reverse gap-3 lg:gap-0 items-center justify-between">
        <p className="text-[16px] font-josefin">
          © {new Date().getFullYear()} Ibuchukwu. <span>All rights reserved.</span>
        </p>
        <div className="flex space-x-10">
            {socials.map((social, index) => (
              <SocialButton key={index} {...social}/>
            ))}
          </div>
      </div>
    </footer>
  );
};

export default Footer;
