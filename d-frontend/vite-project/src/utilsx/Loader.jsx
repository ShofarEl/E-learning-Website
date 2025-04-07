import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

const DarkGreenLoader = () => {
  const containerRef = useRef(null);
  const colors = ["#14532d", "#166534", "#15803d", "#16a34a", "#22c55e"];

  // Academic icons to float
  const academicIcons = [
    { symbol: "📚", label: "Book" },
    { symbol: "🎓", label: "Graduation Cap" },
    { symbol: "💡", label: "Lightbulb" },
    { symbol: "✏️", label: "Pencil" },
    { symbol: "📝", label: "Notepad" }
  ];

  // Animation variants
  const loaderVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    },
    exit: { opacity: 0 }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      containerRef.current.style.background = `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]}20 0%, #052e16 100%)`;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#052e16] to-[#14532d]"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={loaderVariants}
    >
      <div className="flex flex-col items-center space-y-8 relative">
        {/* Animated Logo */}
        <motion.div
          className="text-4xl font-bold text-white mb-12"
          initial={{ scale: 0.8 }}
          animate={{ 
            scale: [0.8, 1, 0.8],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-600">
            EduMall
          </span>
        </motion.div>

        {/* Bouncing Academic Dots */}
        <div className="flex space-x-4">
          {colors.map((color, i) => (
            <motion.div
              key={i}
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: color }}
              animate={{
                y: [0, -15, 0],
                scale: [1, 1.3, 1],
                transition: {
                  delay: i * 0.15,
                  duration: 1.2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
            />
          ))}
        </div>

        {/* Knowledge Progress Bar */}
        <motion.div 
          className="relative w-64 h-2 bg-green-900 rounded-full overflow-hidden mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 to-green-600"
            initial={{ width: 0 }}
            animate={{
              width: "100%",
              transition: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }}
          />
          <motion.div
            className="absolute top-0 h-full w-4 bg-white opacity-70"
            animate={{
              x: [0, 256],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
        </motion.div>

        {/* Floating Academic Icons */}
        {academicIcons.map((icon, i) => (
          <motion.div
            key={icon.label}
            className="absolute text-2xl text-emerald-300"
            initial={{
              x: Math.random() * 400 - 200,
              y: Math.random() * 400 - 200,
              rotate: Math.random() * 360
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 15, 0],
              transition: {
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
            aria-label={icon.label}
          >
            {icon.symbol}
          </motion.div>
        ))}

        {/* Subtle Loading Text */}
        <motion.p 
          className="text-green-200 text-sm mt-6"
          animate={{
            opacity: [0.6, 1, 0.6],
            transition: {
              duration: 2,
              repeat: Infinity
            }
          }}
        >
          Loading knowledge resources...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default DarkGreenLoader;