import { X, Mail, HardDrive, LogOut, ShieldCheck } from "lucide-react";
import { useAdminStore } from "../Store/useAdminStore";

export const UserProfileCard = ({ onClose }) => {
  const { authUser, usedGB, logout } = useAdminStore();

  const firstLetter = authUser?.username?.charAt(0)?.toUpperCase() || "U";

  return (
    <div
      className="
      relative
      w-[calc(100vw-2rem)] 
      sm:w-80 
      md:w-96
      bg-[#121417]/95
      backdrop-blur-2xl
      rounded-[2rem]
      shadow-[0_20px_50px_rgba(0,0,0,0.5)]
      border border-white/10
      p-5 sm:p-7
      animate-in fade-in zoom-in-95 duration-200
    "
    >
      {/* GLOWING HEADER ACCENT */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      {/* CLOSE BUTTON - */}
      <button
        onClick={onClose}
        className="
          absolute
          top-4 right-4
          text-neutral-500
          hover:text-white
          hover:bg-white/5
          p-2
          rounded-xl
          transition-all
          active:scale-90
        "
      >
        <X size={20} />
      </button>

      {/* USER HEADER */}
      <div className="flex flex-col items-center gap-3 mb-6 mt-2">
        {/* Avatar with Responsive Sizing */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-emerald-500/20 rounded-full blur-md" />
          <div
            className="
            relative
            w-16 h-16 sm:w-20 sm:h-20
            rounded-full
            bg-[#1A1D21]
            border-2 border-emerald-500/30
            flex
            items-center
            justify-center
            text-emerald-400
            text-xl sm:text-2xl
            font-bold
            shadow-2xl
          "
          >
            {firstLetter}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight truncate max-w-[200px] sm:max-w-full">
            {authUser?.username}
          </h2>
          <div className="flex items-center gap-1.5 justify-center mt-1">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span className="text-[10px] uppercase tracking-widest text-emerald-400/70 font-bold">
              Verified Account
            </span>
          </div>
        </div>
      </div>

      {/* USER INFO BOXES */}
      <div className="space-y-3">
        {/* Email Box */}
        <div
          className="
          flex
          items-center
          gap-3
          bg-white/5
          border border-white/5
          p-3 sm:p-4
          rounded-2xl
          group hover:bg-white/[0.08]
          transition-colors
        "
        >
          <div className="bg-emerald-500/10 p-2 rounded-lg shrink-0">
            <Mail size={16} className="text-emerald-400" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] uppercase tracking-tighter text-neutral-500 font-bold">
              Email Address
            </span>
            <span className="text-neutral-200 text-xs sm:text-sm truncate pr-2">
              {authUser?.email}
            </span>
          </div>
        </div>

        {/* Storage Box */}
        <div
          className="
          flex
          items-center
          gap-3
          bg-white/5
          border border-white/5
          p-3 sm:p-4
          rounded-2xl
          group hover:bg-white/[0.08]
          transition-colors
        "
        >
          <div className="bg-emerald-500/10 p-2 rounded-lg shrink-0">
            <HardDrive size={16} className="text-emerald-400" />
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-end mb-1.5">
              <span className="text-[10px] uppercase tracking-tighter text-neutral-500 font-bold">
                Cloud Storage
              </span>
              <span className="text-xs text-emerald-400 font-mono font-bold">
                {usedGB} GB
              </span>
            </div>
            {/* Storage Progress Bar */}
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-1000"
                style={{ width: `${Math.min((usedGB / 10) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* LOGOUT BUTTON */}
      <button
        onClick={logout}
        className="
          mt-6 sm:mt-8
          w-full
          flex
          items-center
          justify-center
          gap-2
          bg-red-500/10
          hover:bg-red-500
          text-red-500
          hover:text-white
          py-3 sm:py-4
          rounded-2xl
          font-bold
          text-sm
          transition-all
          duration-300
          border border-red-500/20
          active:scale-[0.98]
        "
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
};
