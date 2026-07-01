import { useState, useRef, useEffect } from "react";
import { useAdminStore } from "../Store/useAdminStore";
import { Cloud } from "lucide-react";
import { UserProfileCard } from "./UserProfileCard";

export const NavBarDash = () => {
  const { authUser } = useAdminStore();
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const firstLetter = authUser?.username?.charAt(0)?.toUpperCase() || "U";

  /* Close on outside click */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className="
      w-full 
      bg-[#121417]/70 
      backdrop-blur-xl 
      border-b border-white/5 
      px-6 sm:px-12 
      py-4 
      flex 
      items-center 
      justify-between 
      sticky top-0 
      
    "
    >
      {/* LEFT: Logo - Identical to Landing Page */}
      <div className="  flex items-center gap-3 group cursor-pointer">
        <div className="bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300">
          <Cloud className="text-emerald-400" size={22} />
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight">
          Cloud
          <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent italic font-serif">
            Point
          </span>
        </h1>
      </div>

      {/* RIGHT: Avatar & Status */}
      <div ref={ref} className="relative flex items-center gap-4">
        {/* User Info (Desktop only) */}
        <div className="hidden md:flex flex-col items-end mr-2">
          <span className="text-sm font-semibold text-white/90">
            {authUser?.username || "User"}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-emerald-400/80 font-bold">
              Online
            </span>
          </div>
        </div>

        {/* Profile Trigger */}
        <div className="relative group">
          {/* Subtle Outer Glow */}
          <div
            className={`absolute -inset-1 bg-emerald-500/20 rounded-full blur-md transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
          />

          <button
            onClick={() => setOpen(!open)}
            className="
              relative
              w-10 h-10
              rounded-full
              bg-white/5
              border border-white/10
              flex items-center justify-center
              text-emerald-400 font-bold
              hover:border-emerald-500/50
              hover:text-white
              transition-all
              duration-300
              backdrop-blur-md
            "
          >
            {firstLetter}
          </button>
        </div>

        {/* Profile Dropdown Container */}
        {open && (
          <div
            className="
            absolute 
            right-0 
            top-14 
            z-[110] 
            animate-in fade-in zoom-in-95 slide-in-from-top-2 
            duration-200 
            origin-top-right
          "
          >
            {/* The actual card */}
            <div className="bg-[#1A1D21] border border-white/10 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-black/50">
              <UserProfileCard onClose={() => setOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
