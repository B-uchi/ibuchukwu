import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { client } from "@/util/sanity/client";
import Image from "next/image";

interface WhatCanIDoProps {
  theme: "light" | "dark";
  setIsThemeSection: React.Dispatch<React.SetStateAction<boolean>>;
}

const SKILLS_QUERY = `*[_type == "skill"]`;
type skills = [skill: { category: string; skills: any }];

const WhatCanIDo: React.FC<WhatCanIDoProps> = ({
  theme,
  setIsThemeSection,
}) => {
  const [skills, setSkills] = useState<skills | []>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const hasMounted = useRef(false);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await client.fetch(SKILLS_QUERY);
        setSkills(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  useEffect(() => {
    hasMounted.current = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMounted.current) {
            controls.start("visible");
            setIsThemeSection(false);
          } else if (!entry.isIntersecting && hasMounted.current) {
            controls.start("hidden");
          }
        });
      },
      { threshold: 0.2 }
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
      ref={sectionRef}
      id="what-can-i-do"
      className={`relative min-h-screen flex flex-col ${
        theme === "dark"
          ? "bg-[#121212] text-white"
          : "bg-[#f4f4f4] text-gray-800"
      }`}
    >
      <section className="lg:grid flex flex-col justify-center lg:grid-cols-2 gap-8 px-8 md:px-[200px] items-center min-h-screen">
        <div className="flex flex-col justify-center">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: -200 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-left text-center font-extrabold mb-6 font-parkinsans">
              What Can I Do?
            </h2>
            <div className="flex lg:justify-normal justify-center space-x-6 mb-6">
              {skills.map((skill: any, index: number) => (
                <button
                  key={skill["Category"]}
                  onClick={() => setActiveTab(index)}
                  className={`px-3 py-2 text-[13px] lg:text-[16px] font-semibold rounded-lg transition-all ${
                    activeTab === index
                      ? theme === "dark"
                        ? "bg-white text-black"
                        : "bg-black text-white"
                      : theme === "dark"
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {skill["Category"]}
                </button>
              ))}
            </div>
          </motion.div>
          <motion.p
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
            }}
            className="text-lg leading-relaxed font-josefin lg:text-left text-justify"
          >
            Here&apos;s a breakdown of my technical skills categorized for
            clarity. I am proficient across both frontend and backend
            technologies, leveraging tools to deliver exceptional projects. With
            a ready to learn spirit, i am also very capable of learning new
            technologies to better fit a project
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 200 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {loading ? (
            <p>Loading...</p>
          ) : (
            skills[activeTab].skills.map((skill: any, index: number) => (
              <motion.div
                key={index}
                className={`px-4 py-2 flex gap-[8px] font-parkinsans cursor-pointer text-sm font-medium rounded-lg shadow-md ${
                  theme === "dark"
                    ? "bg-[#313131] text-white"
                    : "bg-gray-300 text-gray-800"
                }`}
              >
                {skill.icon != "0" && (
                  <Image
                    src={skill.icon}
                    width={20}
                    height={20}
                    alt={`${skill.name} icon`}
                  />
                )}
                {skill.name}
              </motion.div>
            ))
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default WhatCanIDo;
