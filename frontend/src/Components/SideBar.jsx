import { Image, Video, FileText, Trash2, Star, HardDrive } from "lucide-react";

import { useAdminStore } from "../Store/useAdminStore";
import { useEffect } from "react";

export const SideBar = ({ active, setActive, collapsed }) => {
  const { usedGB, percentage, fetchStorage } = useAdminStore();

  useEffect(() => {
    fetchStorage();
  }, []);

  const menuItems = [
    { id: "images", label: "Images", icon: Image },
    { id: "videos", label: "Videos", icon: Video },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "favorites", label: "Favourites", icon: Star },
    { id: "trash", label: "Trash", icon: Trash2 },
  ];

  return (
    <div
      className={`
      flex flex-col
      justify-between
      h-full
      bg-[#0f1114]
      border-r border-white/5
      transition-all
      duration-300
      overflow-x-hidden
    
    `}
    >
      {/* CATEGORY MENU with Custom Scrollbar */}
      <div
        className="
        flex-1 
        p-4 
        overflow-y-auto 
        overflow-x-hidden
        scrollbar-thin 
        scrollbar-thumb-blue-600/30 
        scrollbar-track-transparent 
        hover:scrollbar-thumb-blue-500/50
      "
      >
        {!collapsed && (
          <h2 className="text-[12px] uppercase tracking-[0.3em] font-black mb-8 text-neutral-600 px-4">
            Categories
          </h2>
        )}

        <div className="flex flex-col gap-2.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`
                  relative
                  flex items-center
                  ${collapsed ? "justify-center" : "gap-4 px-4"}
                  py-3.5
                  rounded-2xl
                  cursor-pointer
                  transition-all
                  duration-300
                  group
                  ${
                    isActive
                      ? "bg-blue-500/10 text-blue-400 shadow-[inset_0_0_20px_rgba(59,130,246,0.05)]"
                      : "hover:bg-white/[0.03] text-neutral-500 hover:text-neutral-200"
                  }
                `}
                title={collapsed ? item.label : ""}
              >
                {/* Active Indicator Glow Pillar */}
                {isActive && (
                  <div className="absolute left-0 w-1.5 h-6 bg-blue-500 rounded-r-full shadow-[4px_0_15px_rgba(59,130,246,0.6)]" />
                )}

                <Icon
                  size={22}
                  className={`${isActive ? "drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" : "group-hover:scale-110 transition-transform duration-300"}`}
                />

                {!collapsed && (
                  <span className="font-bold tracking-tight text-[15px] whitespace-nowrap overflow-hidden">
                    {item.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* STORAGE SECTION  */}
      {!collapsed && (
        <div className="p-6 mt-auto border-t border-white/5 bg-[#0f1114]">
          <div
            className="
            p-5 
            rounded-[2rem] 
            bg-gradient-to-b from-white/[0.04] to-transparent
            border border-white/5 
            backdrop-blur-sm
          "
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5 text-neutral-300">
                <div className="bg-blue-500/20 p-1.5 rounded-lg">
                  <HardDrive size={16} className="text-blue-400" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest text-neutral-400">
                  Storage
                </span>
              </div>
            </div>

            <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden border border-white/5">
              <div
                className="
                  bg-blue-500
                  h-full
                  rounded-full
                  transition-all
                  duration-1000
                  shadow-[0_0_15px_rgba(59,130,246,0.5)]
                "
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="flex justify-between items-center mt-4">
              <p className="text-[11px] text-neutral-500 font-bold">
                <span className="text-neutral-200">{usedGB}GB</span> / 20GB
              </p>
            </div>

            <button className="w-full mt-5 py-3 bg-blue-600 text-white hover:bg-blue-500 font-black text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all shadow-[0_10px_20px_rgba(59,130,246,0.1)] active:scale-95">
              Upgrade Plan
            </button>
          </div>
        </div>
      )}

      {/* Small Icon  */}
      {collapsed && (
        <div className="flex flex-col items-center gap-6 mb-8 mt-auto">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,1)]" />
          <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
            <HardDrive size={22} className="text-neutral-500" />
          </div>
        </div>
      )}
    </div>
  );
};
