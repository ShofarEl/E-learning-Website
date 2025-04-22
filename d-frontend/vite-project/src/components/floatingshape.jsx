import React from 'react';
import { motion } from 'framer-motion'; // Make sure to destructure `motion`

const FloatingShape = ({ color, size, top, left, delay }) => {
  return (
    <motion.div
      className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl ${top} ${left}`}
      animate={{
        y: ["0%", "100%", "0%"],
        x: ["0%", "100%", "0%"],
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        ease: "linear",
        repeat: "infinity",
        delay: delay, // Delay applied correctly
      }}
      aria-hidden="true"
    />
  );
};

export default FloatingShape;
