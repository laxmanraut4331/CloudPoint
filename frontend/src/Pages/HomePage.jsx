import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { SideBar } from "../Components/SideBar";
import { FetchAllFiles } from "../Components/FetchAllFiles";
import { UpLoadFile } from "../Components/UpLoadFile";
import { Trash } from "../Components/Trash";
import { NavBarDash } from "../Components/NavBarDash";
import { useAdminStore } from "../Store/useAdminStore";

export const HomePage = () => {
  const [active, setActive] = useState("images");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { checkAuth } = useAdminStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="min-h-screen bg-[#06080a] text-blue-50 flex overflow-hidden">
      {/* INTERNAL CSS FOR THE SCROLLBAR */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.15);
          border-radius: 10px;
          transition: all 0.3s ease;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.4);
        }
      `}</style>

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-[#0d1117]/80 backdrop-blur-xl border-b border-blue-500/10 z-[100] flex items-center px-6">
        <button 
          className="md:hidden mr-4 p-2 hover:bg-blue-500/10 rounded-lg transition-colors" 
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={24} className="text-blue-400" />
        </button>
        <div className="w-full">
          <NavBarDash />
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-[110] md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR CONTAINER */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-80 bg-[#0d1117] border-r border-blue-500/10 z-[120] md:z-40
          transition-transform duration-500 ease-in-out pt-20 flex flex-col
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <button 
          className="md:hidden absolute top-6 right-6 p-2 text-neutral-500"
          onClick={() => setSidebarOpen(false)}
        >
          <X size={20} />
        </button>

        {/* Scrollable Sidebar Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar overflow-x-hidden">
          <div className="p-4">
            <UpLoadFile />
          </div>
          <div className="pb-8">
            <SideBar
              active={active}
              setActive={(value) => {
                setActive(value);
                setSidebarOpen(false);
              }}
            />
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 md:ml-80 h-screen pt-20 overflow-y-auto custom-scrollbar bg-[#06080a] relative">
        {/* Visual Background Glow */}
        <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] pointer-events-none" />

        <div className="p-4 md:p-8 max-w-[1600px] mx-auto relative z-10">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {active === "trash" ? <Trash /> : <FetchAllFiles category={active} />}
          </div>
        </div>
      </main>
    </div>
  );
};