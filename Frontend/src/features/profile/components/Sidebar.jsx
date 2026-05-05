import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  LogOut 
} from "lucide-react";

const Sidebar = ({ 
  user, 
  navItems, 
  activeTab, 
  handleNavClick, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen, 
  setShowLogoutModal 
}) => {
  return (
    <>
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-80 h-screen sticky top-0 border-r border-[#e6dfd5] flex-col py-16 px-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="w-24 h-24 rounded-full bg-[#1b1c1a] text-[#fbf9f6] flex items-center justify-center text-3xl font-serif mb-6 shadow-xl">
            {user?.fullname?.[0]?.toUpperCase()}
          </div>
          <h3 className="font-serif text-2xl leading-none mb-2">{user?.fullname}</h3>
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#7a6e63]">Verified Member</p>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`w-full group flex items-center gap-4 px-6 py-4 rounded-[1.5rem] transition-all duration-500 ${
                activeTab === item.id 
                  ? "bg-[#1b1c1a] text-white shadow-xl" 
                  : "text-[#7a6e63] hover:bg-[#f3eee8] hover:text-[#1b1c1a]"
              }`}
            >
              <item.icon size={18} className={`${activeTab === item.id ? "text-[#C9A96E]" : "text-[#d0c5b5] group-hover:text-[#1b1c1a]"} transition-colors`} />
              <span className="text-[10px] font-black uppercase tracking-[0.25em]">{item.label}</span>
              {activeTab === item.id && (
                <motion.div layoutId="activeNav" className="ml-auto w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
              )}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-[#f3eee8]">
          <button 
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-[1.5rem] text-[#ba1a1a] hover:bg-red-50 transition-all duration-300 group"
          >
            <LogOut size={18} className="group-hover:rotate-12 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em]">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar / Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[100] bg-[#1b1c1a]/40 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-[101] w-[80%] max-w-sm bg-[#fbf9f6] flex flex-col p-8 lg:hidden"
            >
              <div className="flex justify-between items-center mb-12">
                <h1 className="font-serif text-2xl font-black tracking-widest">SNICH<span className="text-[#C9A96E]">.</span></h1>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                  <X size={20} />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-12 p-6 bg-white border border-[#e6dfd5] rounded-[2rem]">
                <div className="w-12 h-12 rounded-full bg-[#1b1c1a] text-white flex items-center justify-center text-lg font-serif">
                  {user?.fullname?.[0]?.toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate leading-none mb-1">{user?.fullname}</p>
                  <p className="text-[8px] font-black uppercase tracking-widest text-[#7a6e63]">Verified Member</p>
                </div>
              </div>

              <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className={`w-full flex items-center gap-4 px-6 py-5 rounded-[1.5rem] transition-all ${
                      activeTab === item.id 
                        ? "bg-[#1b1c1a] text-white" 
                        : "text-[#7a6e63] hover:bg-[#f3eee8]"
                    }`}
                  >
                    <item.icon size={18} className={activeTab === item.id ? "text-[#C9A96E]" : "text-[#d0c5b5]"} />
                    <span className="text-[10px] font-black uppercase tracking-[0.25em]">{item.label}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-auto pt-8">
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setShowLogoutModal(true);
                  }}
                  className="w-full flex items-center gap-4 px-6 py-5 rounded-[1.5rem] bg-red-50 text-[#ba1a1a]"
                >
                  <LogOut size={18} />
                  <span className="text-[10px] font-black uppercase tracking-[0.25em]">Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
