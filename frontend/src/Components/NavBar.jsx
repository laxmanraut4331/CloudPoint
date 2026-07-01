import React, { useState, useEffect } from "react";
import { Cloud, User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper to close mobile menu when a link is clicked
  const closeMenu = () => setMobileOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled
          ? "py-4 bg-[#121417]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-emerald-500/10 p-1.5 rounded-lg border border-emerald-500/20 group-hover:border-emerald-500/50 transition-colors">
            <Cloud className="text-emerald-400" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Cloud
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent italic font-serif">
              Point
            </span>
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-10">
          {["Home", "Features", "Gallery"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-neutral-400 hover:text-emerald-400 tracking-wide transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-emerald-400 transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* RIGHT SIDE BUTTONS */}
        <div className="flex items-center gap-6">
          <Link to="/login" className="hidden md:block">
            <button className="flex items-center gap-2 px-5 py-2 text-sm font-bold uppercase tracking-widest text-white hover:text-emerald-400 transition-all border border-white/10 rounded-xl hover:border-emerald-500/30 bg-white/5">
              <User size={16} className="text-emerald-400" />
              Sign In
            </button>
          </Link>

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden text-white p-2 bg-white/5 rounded-lg border border-white/10"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`
        absolute top-full left-0 w-full bg-[#121417] border-b border-white/5 px-6 py-8 space-y-6 transition-all duration-300 md:hidden
        ${mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"}
      `}
      >
        {["Home", "Features", "Gallery", "Pricing"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={closeMenu}
            className="block text-lg font-medium text-neutral-300 hover:text-emerald-400 transition-colors"
          >
            {item}
          </a>
        ))}

        <Link
          to="/login"
          className="block pt-4 border-t border-white/5"
          onClick={closeMenu}
        >
          <button className="flex items-center gap-3 text-emerald-400 font-bold uppercase tracking-widest text-sm">
            <User size={18} />
            Sign In
          </button>
        </Link>
      </div>
    </header>
  );
};
