import React, { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // Lightweight particles library
import type { Engine } from "@tsparticles/engine";

type Props = {
  theme: string;
};
const ParticleBackground = (props: Props) => {
  const [init, setInit] = useState<boolean>(false);

  // Initialize the tsParticles engine
  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  return (
    <>
      {init && (
        <Particles
          id="tsparticles"
          options={{
            background: {
              color: {
                value: `${props.theme === "dark" ? "bg-[#121212]" : "bg-[#f4f4f4]"}`, // Background color
              },
            },
            fpsLimit: 90, // Frames per second limit
            interactivity: {
              events: {
                onClick: { enable: true, mode: "push" },
                onHover: { enable: true, mode: "repulse" },
              },
              modes: {
                push: { quantity: 10 },
                repulse: { distance: 200, duration: 0.4 },
              },
            },
            particles: {
              color: { value: `${props.theme === "dark" ? "#ffffff" : "#696969"}`}, // Particle color
              links: {
                color: `${props.theme === "dark" ? "#ffffff" : "#696969"}`, // Link color
                distance: 150, // Link distance
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              move: {
                enable: true,
                speed: 6, // Particle speed
                direction: "none",
                outModes: { default: "bounce" },
              },
              number: {
                value: 80, // Number of particles
                density: { enable: true },
              },
              opacity: { value: 0.5 }, // Particle opacity
              shape: { type: "circle" }, // Shape of particles
              size: { value: { min: 1, max: 5 } }, // Particle size range
            },
            detectRetina: true, // Retina display support
          }}
        />
      )}
    </>
  );
};

export default ParticleBackground;
