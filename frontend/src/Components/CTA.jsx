import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import LightPillar from "../Animation/LightPillar";

export const CTA = () => {
  return (
    <div className="w-full py-32 bg-[#121417] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <LightPillar
          topColor="#10b981"
          bottomColor="#064e3b"
          intensity={0.8}
          rotationSpeed={0.3}
          glowAmount={0.005}
          pillarWidth={4.0}
          pillarHeight={0.6}
          noiseIntensity={0.4}
          pillarRotation={45}
          interactive={false}
          mixBlendMode="screen"
        />
      </div>

      {/* CTA Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-400 mb-6">
          Get Started Today
        </h2>

        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
          Ready to Transform Your <br />
          <span className="text-neutral-500 italic font-serif">
            Cloud Experience?
          </span>
        </h1>

        <p className="mt-8 text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          Join thousands of users who trust CloudPoint for their secure cloud
          storage needs. No credit card required.
        </p>

        <div className="flex flex-col sm:flex-row justify-center mt-12 gap-6 items-center">
          <Link to="/signup">
            <button className="group flex items-center gap-2 px-10 py-4 bg-emerald-500 text-[#0a0a0a] rounded-2xl font-bold hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]">
              Get Started Free
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>

          <Link to="/login">
            <button className="px-10 py-4 rounded-2xl text-white font-medium hover:bg-white/5 border border-white/5 transition-all">
              Already have an account?
            </button>
          </Link>
        </div>
      </div>

      {/*  footer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
    </div>
  );
};
