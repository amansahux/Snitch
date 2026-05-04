import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const checkmarkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
        delay: 0.5,
      },
    },
  };

  const circleVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cream overflow-hidden select-none">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md w-full px-6 text-center"
      >
        {/* Animated Checkmark */}
        <div className="flex justify-center mb-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative h-24 w-24"
          >
            {/* Glow effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.2, scale: 1.5 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute inset-0 rounded-full bg-gold blur-xl"
            />

            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 100 100"
            >
              {/* Outer Circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#C9A96E"
                strokeWidth="2"
                variants={circleVariants}
              />
              {/* Checkmark Path */}
              <motion.path
                d="M30 50L45 65L70 35"
                fill="none"
                stroke="#1b1c1a"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={checkmarkVariants}
              />
            </svg>
          </motion.div>
        </div>

        <motion.h1
          variants={itemVariants}
          className="font-serif text-4xl sm:text-5xl text-charcoal mb-4 tracking-tight"
        >
          Order Confirmed
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="font-serif italic text-lg text-charcoal-light mb-2"
        >
          Your wardrobe is on its way.
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-sm text-charcoal-light/80 mb-8 leading-relaxed max-w-[280px] mx-auto font-sans"
        >
          Thank you for choosing refined style. A confirmation email has been
          sent to your inbox with full tracking details.
          <br />
          <span className="mt-2 block">
            Order ID:{" "}
            <span className="text-charcoal font-medium tracking-wider">
              {orderId}
            </span>
          </span>
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col space-y-4">
          <button
            onClick={() => navigate(`/orders/${orderId}`)}
            className="w-full py-4 rounded-full cursor-pointer bg-charcoal text-white text-[11px] font-semibold uppercase tracking-[0.24em] transition-all duration-300 hover:bg-gold hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/5"
          >
            View Order
          </button>
          <button
            onClick={() => navigate("/shop")}
            className="w-full py-4 cursor-pointer rounded-full border border-charcoal/10 text-charcoal text-[11px] font-semibold uppercase tracking-[0.24em] transition-all duration-300 hover:border-charcoal active:scale-[0.98]"
          >
            Continue Shopping
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
