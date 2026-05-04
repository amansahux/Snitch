import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-cream overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl w-full px-6 text-center"
      >
        <motion.span
          variants={itemVariants}
          className="text-[10px] font-black uppercase tracking-[0.5em] text-gold mb-8 block"
        >
          Error Protocol 404
        </motion.span>

        <motion.div variants={itemVariants} className="relative mb-8">
          <h1 className="text-[12rem] sm:text-[16rem] font-serif leading-none text-charcoal opacity-[0.03] absolute inset-0 flex items-center justify-center select-none pointer-events-none">
            404
          </h1>
          <h2 className="text-5xl sm:text-7xl font-serif text-charcoal relative z-10">
            Page Not Found
          </h2>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-lg text-charcoal-light font-inter font-light max-w-md mx-auto mb-12 leading-relaxed"
        >
          The archive you are seeking is either restricted or no longer exists. 
          We suggest returning to the main collection.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto cursor-pointer px-12 py-5 rounded-full bg-charcoal text-white text-[11px] font-semibold uppercase tracking-[0.3em] transition-all duration-500 hover:bg-gold hover:shadow-luxury active:scale-95"
          >
            Back to Home
          </button>
          <button
            onClick={() => navigate("/shop")}
            className="w-full sm:w-auto cursor-pointer px-12 py-5 rounded-full border border-charcoal/10 text-charcoal text-[11px] font-semibold uppercase tracking-[0.3em] transition-all duration-500 hover:border-charcoal active:scale-95"
          >
            Explore Collection
          </button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-20 pt-8 border-t border-charcoal/5"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/20">
            Snich Atelier Archive
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
