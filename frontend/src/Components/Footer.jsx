import React from "react";
import { Instagram, Linkedin, Facebook, Github, Cloud } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#121417] text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Signature Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main Grid */}
        <div className="grid md:grid-cols-12 gap-16 mb-20">
          {/* Brand & Mission */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20">
                <Cloud className="text-emerald-400" size={28} />
              </div>
              <h className="text-2xl font-bold tracking-tight">
                Cloud
                <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent italic font-serif">
                  Point
                </span>
              </h>
            </div>

            <p className="text-neutral-400 text-lg leading-relaxed mb-8 max-w-sm">
              The next generation of file management. Built for speed, secured
              with precision, and designed for the modern web.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {[Instagram, Linkedin, Facebook, Github].map((Icon, index) => (
                <a
                  key={index}
                  className="bg-white/5 p-3 rounded-2xl border border-white/5 text-neutral-400 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300"
                  href="#"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
            {/* Column 1 */}
            <div>
              <h2 className="text-white font-bold mb-6 tracking-wide uppercase text-xs">
                Product
              </h2>
              <ul className="space-y-4 text-neutral-500">
                {["Features", "Security", "Pricing", "Roadmap"].map((link) => (
                  <li
                    key={link}
                    className="hover:text-emerald-400 cursor-pointer transition-colors text-sm font-medium"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h2 className="text-white font-bold mb-6 tracking-wide uppercase text-xs">
                Support
              </h2>
              <ul className="space-y-4 text-neutral-500">
                {[
                  "Documentation",
                  "Help Center",
                  "API Status",
                  "Community",
                ].map((link) => (
                  <li
                    key={link}
                    className="hover:text-emerald-400 cursor-pointer transition-colors text-sm font-medium"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h2 className="text-white font-bold mb-6 tracking-wide uppercase text-xs">
                Legal
              </h2>
              <ul className="space-y-4 text-neutral-500">
                {[
                  "Privacy Policy",
                  "Terms of Service",
                  "Cookie Policy",
                  "Security",
                ].map((link) => (
                  <li
                    key={link}
                    className="hover:text-emerald-400 cursor-pointer transition-colors text-sm font-medium"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar Section */}
        <div className="border-t border-white/5 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2 text-neutral-500 text-sm">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>All systems operational</span>
            </div>

            <p className="text-neutral-500 text-sm order-3 md:order-2">
              © {new Date().getFullYear()} CloudPoint Inc. Built with precision.
            </p>

            <div className="flex gap-8 text-neutral-500 text-sm order-2 md:order-3">
              <span className="hover:text-white cursor-pointer transition-colors tracking-tight font-medium">
                Twitter
              </span>
              <span className="hover:text-white cursor-pointer transition-colors tracking-tight font-medium">
                Dribbble
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
