import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/util/sanity/client";
import { Github, Link } from "lucide-react";

interface ProjectsProps {
  theme: "light" | "dark";
}

const PROJECTS_QUERY = `*[_type == "project"]{
  title,
  description,
  repo_link,
  live_link,
  "image":image.asset->url,
  tags
}`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

type Project = {
  title: string;
  description: string;
  repo_link: string;
  live_link: string;
  image: string;
  tags: string[];
};

const Projects: React.FC<ProjectsProps> = ({ theme }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await client.fetch(PROJECTS_QUERY);
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      id="what-i-have-built"
      className={`relative min-h-screen flex flex-col ${
        theme === "dark"
          ? "bg-[#121212] text-white"
          : "bg-[#f4f4f4] text-gray-800"
      }`}
    >
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-screen">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
          }}
          className="flex flex-col justify-center px-8 md:px-[200px]"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 font-parkinsans">
            My Projects
          </h2>
          <p className="text-lg leading-relaxed font-josefin">
            Here are some of the projects I have worked on. Each project
            showcases my skills and dedication to delivering exceptional
            solutions. Click on any project to explore further.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, x: 100 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
          }}
          className="flex gap-x-3 w-full overflow-scroll p-3 overflow-y-hidden"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={`p-4 flex flex-col justify-between flex-none w-[300px] rounded-lg shadow-lg font-josefin cursor-pointer ${
                theme === "dark"
                  ? "bg-[#313131] text-white"
                  : "bg-gray-300 text-gray-800"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={project.image}
                alt={`${project.title} image`}
                width={300}
                height={200}
                className="rounded-lg mb-4 h-[200px] object-cover"
              />
              <>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-sm mb-4 line-clamp-3">{project.description}</p>
              </>
              <>
                <div className="flex flex-wrap gap-2 justify-between mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className={`px-2 py-1 text-xs font-medium rounded-md ${
                        theme === "dark"
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 justify-center">
                  <a
                    href={project.repo_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm font-medium underline ${
                      theme === "dark" ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    <Github />
                  </a>
                  {project.live_link && (
                    <a
                      href={project.live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm font-medium underline ${
                        theme === "dark" ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      <Link />
                    </a>
                  )}
                </div>
              </>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Projects;
