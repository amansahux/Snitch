import React from "react";
import { Camera } from "lucide-react";
import useAuth from "../../Auth/hooks/useAuth";

const AccountInfo = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h2 className="font-serif text-4xl text-[#1b1c1a]">Profile Information</h2>
        <p className="font-serif italic text-[#7a6e63]">The identity behind the style.</p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-8 bg-white border border-[#e6dfd5] rounded-[3rem] p-10 shadow-[0_18px_40px_rgba(27,28,26,0.02)]">
          <div className="flex items-center gap-6 pb-8 border-b border-[#f3eee8]">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-[#f3eee8] flex items-center justify-center text-3xl font-serif text-[#1b1c1a]">
                {user?.fullname?.[0]?.toUpperCase()}
              </div>
              <button className="absolute bottom-0 right-0 p-2 rounded-full bg-[#1b1c1a] text-white hover:bg-[#C9A96E] transition-all shadow-lg cursor-pointer">
                <Camera size={14} />
              </button>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C9A96E] mb-1">Account Tier</p>
              <p className="text-xl font-serif text-[#1b1c1a] uppercase tracking-widest">{user?.role || "Member"}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-1">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#7a6e63]">Full Name</p>
              <p className="text-lg font-medium text-[#1b1c1a]">{user?.fullname}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#7a6e63]">Email Address</p>
              <p className="text-lg font-medium text-[#1b1c1a]">{user?.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#7a6e63]">Contact</p>
              <p className="text-lg font-medium text-[#1b1c1a]">{user?.contact || "Not provided"}</p>
            </div>
          </div>

          <button className="w-full py-4 rounded-full border border-[#1b1c1a] text-[10px] font-black uppercase tracking-[0.3em] text-[#1b1c1a] hover:bg-[#1b1c1a] hover:text-white transition-all duration-500 cursor-pointer">
            Edit Information
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-[#f3eee8]/50 rounded-[3rem] p-10 space-y-4">
            <h4 className="font-serif text-2xl text-[#1b1c1a]">Security</h4>
            <p className="text-sm text-[#7a6e63]">Protect your account by regularly updating your security protocols.</p>
            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#1b1c1a] border-b border-[#1b1c1a] pb-1 hover:text-[#C9A96E] hover:border-[#C9A96E] transition-all cursor-pointer">
              Update Password
            </button>
          </div>
          <div className="bg-[#1b1c1a] text-white rounded-[3rem] p-10 space-y-4">
            <h4 className="font-serif text-2xl">Preferences</h4>
            <p className="text-sm text-white/60">Manage how we communicate new arrivals and exclusive archive access.</p>
            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#C9A96E] border-b border-[#C9A96E] pb-1 hover:text-white hover:border-white transition-all cursor-pointer">
              Notification Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
