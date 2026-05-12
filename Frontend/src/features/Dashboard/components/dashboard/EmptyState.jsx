import React from 'react';
import { PackageOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const EmptyState = ({ title, description, actionLabel, onAction }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative overflow-hidden flex flex-col items-center justify-center p-16 md:p-24 text-center bg-white/40 backdrop-blur-xl rounded-[3rem] border border-amber-100 shadow-luxury group"
    >
      {/* Decorative Gradient Glows */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-amber-50 rounded-full blur-[80px] opacity-60" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-50 rounded-full blur-[80px] opacity-60" />
      
      <div className="relative z-10 max-w-md">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-24 h-24 bg-white rounded-[2.5rem] shadow-luxury border border-amber-50 flex items-center justify-center mb-10 mx-auto transform -rotate-6 group-hover:rotate-0 transition-all duration-700"
        >
          <div className="w-16 h-16 bg-amber-50 rounded-[1.8rem] flex items-center justify-center">
             <PackageOpen className="w-8 h-8 text-gold" />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-4xl font-serif text-slate-900 mb-6 tracking-tight">
            {title}
          </h3>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-12 leading-relaxed">
            {description}
          </p>
        </motion.div>

        {actionLabel && (
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={onAction}
            className="group relative px-12 py-5 bg-slate-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-black transition-all shadow-2xl shadow-slate-200 cursor-pointer overflow-hidden"
          >
            <span className="relative z-10 transition-colors group-hover:text-white">
              {actionLabel}
            </span>
            <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </motion.button>
        )}
      </div>

      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
    </motion.div>
  );
};

export default EmptyState;
