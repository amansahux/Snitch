import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const LogoutModal = ({ showLogoutModal, setShowLogoutModal, handleLogout, navigate, toast }) => {
  return (
    <AnimatePresence>
      {showLogoutModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLogoutModal(false)}
            className="absolute inset-0 bg-[#1b1c1a]/40 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-[#fbf9f6] w-full max-w-md p-10 lg:p-14 rounded-3xl shadow-luxury border border-[#e8e2da]/50"
          >
            <div className="space-y-6 text-center">
              <h3 className="text-3xl font-serif text-[#1b1c1a] tracking-tight">
                Are you sure you want to logout?
              </h3>
              <p className="text-[#7a6e63] font-inter font-light">
                You will be signed out of your account.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 px-8 py-4 border border-[#e8e2da] text-[#1b1c1a] text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-[#e8e2da]/20 transition-all duration-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    try {
                      const res = await handleLogout();
                      setShowLogoutModal(false);
                      if (res.success) {
                        navigate("/login");
                        toast.success("Logged out successfully");
                      } else {
                        toast.error("Logout failed");
                      }
                    } catch (error) {
                      toast.error("Logout failed");
                    }
                  }}
                  className="flex-1 px-8 py-4 bg-[#1b1c1a] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-[#C9A96E] transition-all duration-300 shadow-lg cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LogoutModal;
