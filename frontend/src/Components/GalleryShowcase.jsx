import React, { useState } from "react";
import { X, Maximize2, Sparkles } from "lucide-react";

export const GalleryShowcase = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      title: "Upload Files Securely",
      desc: "Store your documents safely in the cloud",
    },
    {
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      title: "Access Anywhere",
      desc: "Access files from any device anytime",
    },
    {
      url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
      title: "Fast Performance",
      desc: "Lightning fast upload and download speeds",
    },
    {
      url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
      title: "Advanced Security",
      desc: "Enterprise-level encryption protection",
    },
    {
      url: "https://images.unsplash.com/photo-1504639725590-34d0984388bd",
      title: "Smart Management",
      desc: "Organize files efficiently",
    },
    {
      url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
      title: "Cloud Sync",
      desc: "Automatic file synchronization",
    },
  ];

  const [active, setActive] = useState(null);

  return (
    <section
      id="gallery"
      className="py-32 bg-[#121417] relative overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/[0.02] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="mb-20 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[13px] font-medium mb-6 border border-emerald-500/20">
            <Sparkles size={14} />
            <span>Product Showcase</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8">
            Experience{" "}
            <span className="text-neutral-500 italic font-serif">
              CloudPoint.
            </span>
          </h2>

          <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
            Take a closer look at the modern interface designed for speed,
            security, and effortless organization.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((img, index) => (
            <div
              key={index}
              className="group relative cursor-pointer"
              onClick={() => setActive(img)}
            >
              {/* Image Frame with Green Border on Hover */}
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden border border-white/5 bg-neutral-900/40 backdrop-blur-sm transition-all duration-500 group-hover:border-emerald-500/50">
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-80 object-cover opacity-80 group-hover:opacity-100 transition-all duration-700"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121417] via-[#121417]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white text-2xl font-bold mb-2">
                      {img.title}
                    </h3>
                    <p className="text-neutral-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {img.desc}
                    </p>
                  </div>
                </div>

                {/* Expand Icon */}
                <div className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-md">
                  <Maximize2 size={18} />
                </div>
              </div>

              {/* Background Glow Effect */}
              <div className="absolute -inset-4 bg-emerald-500/10 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Modal / Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0a0a0a]/95 backdrop-blur-xl transition-all"
          onClick={() => setActive(null)}
        >
          <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
            <X size={32} />
          </button>

          <div
            className="max-w-5xl w-full bg-[#121417] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={active.url}
              className="w-full h-[60vh] object-cover"
              alt={active.title}
            />
            <div className="p-10 border-t border-white/5">
              <h3 className="text-3xl font-bold text-white mb-2">
                {active.title}
              </h3>
              <p className="text-neutral-400 text-lg">{active.desc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
