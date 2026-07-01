import React from "react";
import {
  Share2,
  Users,
  Smartphone,
  CheckCircle2,
  Sparkles,
  Zap,
} from "lucide-react";

export const ShareSection = () => {
  return (
    <section
      id="share"
      className="w-full bg-[#121417] relative overflow-hidden py-32"
    >
      {/* Subtle ambient light from the top left */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -ml-40 -mt-40 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-start mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[13px] font-medium mb-6 border border-emerald-500/20">
            <Zap size={14} />
            <span>Instant Sync</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Share{" "}
            <span className="text-neutral-500 italic font-serif">every</span>{" "}
            smile.
          </h2>

          <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
            A refined sharing experience designed for privacy and speed. Connect
            your world without the clutter.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid md:grid-cols-12 gap-8">
          {/* Card 1: Social First (Matte Card) */}
          <div className="md:col-span-7 group relative bg-[#1A1D21] border border-white/5 rounded-[3rem] p-12 transition-all duration-500 hover:border-emerald-500/30 hover:bg-[#1E2126]">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="w-16 h-16 bg-neutral-800 rounded-2xl flex items-center justify-center text-white mb-10 border border-white/5 group-hover:text-emerald-400 group-hover:border-emerald-500/20 transition-all duration-500">
                  <Smartphone size={28} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">
                  Social First
                </h3>
                <p className="text-neutral-400 text-lg max-w-sm mb-10 leading-relaxed">
                  Send high-res media directly to your favorite social circles
                  with zero compression.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {["WhatsApp", "Signal", "Telegram"].map((app) => (
                  <span
                    key={app}
                    className="px-5 py-2 bg-white/5 rounded-xl text-sm font-medium text-neutral-400 border border-white/5"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2:  */}
          <div className="md:col-span-5 group relative bg-emerald-950/20 border border-emerald-500/20 rounded-[3rem] p-12 overflow-hidden backdrop-blur-sm transition-all duration-500 hover:bg-emerald-950/30">
            {/* Soft Emerald Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-[60px] rounded-full -mr-16 -mt-16 group-hover:bg-emerald-500/20 transition-colors" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex -space-x-4 mb-10">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-14 h-14 rounded-full border-[3px] border-[#121417] bg-neutral-800 overflow-hidden shadow-2xl"
                  >
                    <img
                      src={`https://i.pravatar.cc/150?u=${i + 40}`}
                      alt="user"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                ))}
                <div className="w-14 h-14 rounded-full border-[3px] border-[#121417] bg-emerald-500 flex items-center justify-center text-emerald-950 font-bold shadow-2xl">
                  <Users size={20} />
                </div>
              </div>

              <h3 className="text-3xl font-bold text-white mb-4 tracking-tight flex items-center gap-2">
                Trusted
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              </h3>

              <p className="text-emerald-100/60 text-lg mb-12 leading-relaxed">
                Smart automation for your inner circle. Private, fast, and
                effortless.
              </p>

              <div className="mt-auto space-y-4">
                <div className="flex items-center gap-3 text-sm font-medium text-emerald-400/80">
                  <CheckCircle2 size={16} />
                  <span>End-to-end Encrypted</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-emerald-400/80">
                  <Sparkles size={16} />
                  <span>AI-powered sorting</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
