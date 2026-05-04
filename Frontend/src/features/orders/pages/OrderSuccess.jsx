import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import useOrder from "../hooks/useOrder";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const location = useLocation();
  const { handleGetOrderById } = useOrder();

  const [isValidating, setIsValidating] = useState(true);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const validateAccess = async () => {
      // 1. Initial frontend security check
      const fromCheckout = location.state?.fromCheckout;
      const sessionFlag = sessionStorage.getItem("orderSuccessAccess");

      // If neither is present, it's a direct or unauthorized access
      if (!fromCheckout && !sessionFlag) {
        if (isMounted) navigate("/404", { replace: true });
        return;
      }

      // 2. Strong backend validation
      try {
        const res = await handleGetOrderById(orderId);
        
        if (isMounted) {
          if (res?.success && res?.data?.paymentStatus === "paid") {
            setOrderData(res.data);
            setIsValidating(false);
            
            // Only clear the session flag AFTER successful validation
            sessionStorage.removeItem("orderSuccessAccess");
          } else {
            console.error("Order validation failed: Status not paid or success false");
            navigate("/404", { replace: true });
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error("Order validation error:", error);
          navigate("/404", { replace: true });
        }
      }
    };

    validateAccess();

    return () => {
      isMounted = false;
    };
  }, [orderId, navigate, handleGetOrderById, location.state]);

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

  if (isValidating) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#fbf9f6]">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-[10px] font-black uppercase tracking-[0.5em] text-[#C9A96E]"
          >
            Verifying Your Order
          </motion.div>
          <div className="h-0.5 w-24 bg-[#ece7df] overflow-hidden">
            <motion.div 
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="h-full w-full bg-[#C9A96E]"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#fbf9f6] overflow-hidden select-none">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.2, scale: 1.5 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute inset-0 rounded-full bg-[#C9A96E] blur-xl"
            />

            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 100 100"
            >
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#C9A96E"
                strokeWidth="2"
                variants={circleVariants}
                initial="hidden"
                animate="visible"
              />
              <motion.path
                d="M30 50L45 65L70 35"
                fill="none"
                stroke="#1b1c1a"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={checkmarkVariants}
                initial="hidden"
                animate="visible"
              />
            </svg>
          </motion.div>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl text-[#1b1c1a] mb-4 tracking-tight">
          Order Confirmed
        </h1>

        <p className="font-serif italic text-lg text-[#7a6e63] mb-2">
          Your wardrobe is on its way.
        </p>

        <p className="text-sm text-[#7a6e63]/80 mb-8 leading-relaxed max-w-[280px] mx-auto font-sans">
          Thank you for choosing refined style. A confirmation email has been
          sent to your inbox with full tracking details.
          <br />
          <span className="mt-4 block border-t border-[#e8e2da] pt-4">
            Order Reference:{" "}
            <span className="text-[#1b1c1a] font-medium tracking-wider uppercase">
              {orderId}
            </span>
          </span>
        </p>

        <div className="flex flex-col space-y-4">
          <button
            onClick={() => navigate(`/orders/${orderId}`)}
            className="w-full py-4 rounded-full cursor-pointer bg-[#1b1c1a] text-white text-[11px] font-semibold uppercase tracking-[0.24em] transition-all duration-300 hover:bg-[#C9A96E] hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/5"
          >
            View Order
          </button>
          <button
            onClick={() => navigate("/shop")}
            className="w-full py-4 cursor-pointer rounded-full border border-[#1b1c1a]/10 text-[#1b1c1a] text-[11px] font-semibold uppercase tracking-[0.24em] transition-all duration-300 hover:border-[#1b1c1a] active:scale-[0.98]"
          >
            Continue Shopping
          </button>
        </div>
        
        <div className="mt-12">
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1b1c1a]/20">
              Snich Atelier
           </span>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
