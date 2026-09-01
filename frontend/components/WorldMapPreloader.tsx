"use client";
import WorldMap from "@/components/ui/world-map";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Store } from "lucide-react";

export const WorldMapPreloader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Fade out the preloader after 4.5 seconds.
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-white flex flex-col w-full overflow-hidden"
        >
          <div className="pt-12 bg-white w-full h-full relative">
            <div className="max-w-7xl mx-auto text-center relative z-10">
              <p className="font-sans font-bold text-xl md:text-4xl text-black flex items-center justify-center gap-2 uppercase tracking-widest">
                
                <span className="text-black">
                  {"CONNECTS AMONG TINDAHAN ACROSS THE GLOBE".split("").map((word, idx) => (
                    <motion.span
                      key={idx}
                      className="inline-block"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: idx * 0.04 }}
                    >
                      {word === " " ? "\u00A0" : word}
                    </motion.span>
                  ))}
                </span>
              </p>
             
            </div>
            
            <div className="w-full absolute inset-0 pt-32 pointer-events-none px-4 md:px-0">
                <WorldMap
                dots={[
                    {
                    start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
                    end: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
                    },
                    {
                    start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
                    end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
                    },
                    {
                    start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
                    end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
                    },
                    {
                    start: { lat: 51.5074, lng: -0.1278 }, // London
                    end: { lat: 28.6139, lng: 77.209 }, // New Delhi
                    },
                    {
                    start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                    end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
                    },
                    {
                    start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                    end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
                    },
                ]}
                />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
