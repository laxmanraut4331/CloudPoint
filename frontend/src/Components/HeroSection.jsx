import React from "react";
import { Cloud, ShieldCheck, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import PixelBlast from "../Animation/PixelBlast";
// Importing the video correctly

export const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full bg-[#121417] overflow-hidden flex items-center justify-center"
    >
      {/* BACKGROUND ANIMATION */}
      <div className="absolute inset-0 z-0 opacity-30">
        <PixelBlast
          variant="square"
          pixelSize={4}
          color="#10b981" // Emerald 500
          patternScale={6}
          patternDensity={1}
          speed={0.5}
          edgeFade={0.3}
          mixBlendMode="screen"
        />
      </div>

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#121417]/60 via-[#121417]/40 to-[#121417]" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20">
        {/* LEFT CONTENT */}
        <div className="text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-6">
            <Cloud className="text-emerald-400" size={18} />
            <span className="text-emerald-300 text-sm font-medium tracking-wide">
              Secure Cloud Platform
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-[1.1] tracking-tight">
            Store Your Files
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent italic font-serif">
              Securely in Cloud
            </span>
          </h1>

          {/* Description */}
          <p className="mt-8 text-neutral-400 text-xl max-w-xl leading-relaxed">
            Upload, manage, and access your files anytime, anywhere. A fast,
            secure, and reliable cloud storage solution built for modern users.
          </p>

          {/* FEATURES */}
          <div className="flex flex-wrap gap-6 mt-10 justify-center lg:justify-start">
            <Feature icon={ShieldCheck} text="Secure Encryption" />
            <Feature icon={Zap} text="Fast Upload" />
          </div>

          {/* BUTTONS */}
          <div className="mt-12 flex gap-4 flex-wrap justify-center lg:justify-start">
            <Link to="/signup">
              <button className="px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-[#121417] font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95">
                Get Started Free
              </button>
            </Link>

            <Link to="/login">
              <button
                className="
                px-10 py-4 
               bg-white/5 
                border border-white/10 
               text-white 
               font-semibold 
               rounded-2xl 
               transition-all 
               backdrop-blur-md
               relative
               overflow-hidden
               group
   
              hover:border-emerald-500/50 
                hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]
              hover:bg-emerald-500/5
                 "
              >
                {/* Subtle Inner Glow Highlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <span className="relative z-10">Login</span>
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT VIDEO SHOWCASE */}
        <div className="relative hidden lg:block">
          <div className="relative z-10 bg-gradient-to-br from-emerald-500/20 to-transparent p-[1px] rounded-[3rem]">
            <div className="bg-[#1A1D21]/80 backdrop-blur-2xl rounded-[3rem] p-4 shadow-2xl border border-white/5 overflow-hidden">
              <video
                src="/files/hero.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="rounded-[2.5rem] shadow-2xl object-cover w-full h-[500px] opacity-90"
              />
              {/* ... other code ... */}

              {/* Floating Decorative Elements */}
              <div className="absolute -bottom-6 -left-6 bg-[#121417] border border-white/10 p-6 rounded-3xl shadow-2xl animate-bounce-slow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <Cloud className="text-emerald-400" size={24} />
                  </div>
                  <div>
                    <p className="text-white font-bold">Encrypted</p>
                    <p className="text-neutral-500 text-xs">
                      Your data is private
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Background Glow */}
          <div className="absolute -inset-20 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

/* FEATURE COMPONENT */
const Feature = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-2 text-neutral-300">
    <Icon size={18} className="text-emerald-400" />
    <span className="text-sm font-medium">{text}</span>
  </div>
);
