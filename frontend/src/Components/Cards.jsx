import {
  ShieldCheck,
  Zap,
  Cloud,
  Clock8,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const Cards = () => {
  const features = [
    {
      title: "Secure Storage",
      description:
        "End-to-end encryption protects your files. Only you control access to your data.",
      icon: ShieldCheck,
      image:
        "https://images.unsplash.com/photo-1664575602276-acd073f104c1?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Lightning Fast",
      description:
        "Upload and download files instantly with our optimized cloud infrastructure.",
      icon: Zap,
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Access Anywhere",
      description:
        "Use your files on desktop, tablet, or mobile. Your cloud is always with you.",
      icon: Cloud,
      image:
        "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Version History",
      description:
        "Restore older versions anytime and never lose important work again.",
      icon: Clock8,
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <section
      id="features"
      className="w-full bg-[#121417] relative overflow-hidden py-32"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-24 text-left">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8">
            Built for{" "}
            <span className="text-neutral-500 italic font-serif">
              precision.
            </span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
            Every tool you need to manage your digital life, wrapped in a secure
            and lightning-fast interface.
          </p>
        </div>

        {/* Feature List */}
        <div className="space-y-40">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isReverse = index % 2 !== 0;

            return (
              <div
                key={index}
                className="grid md:grid-cols-2 gap-16 md:gap-24 items-center group"
              >
                {/* Image Section */}
                <div className={`relative ${isReverse ? "md:order-2" : ""}`}>
                  {/* GREEN BORDER & GLOW CONTAINER */}
                  <div className="relative z-10 overflow-hidden rounded-[3rem] border border-white/5 bg-neutral-900/40 backdrop-blur-sm shadow-2xl transition-all duration-500 group-hover:border-emerald-500/50 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-[380px] object-cover opacity-90"
                    />
                    {/* Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121417] via-transparent to-transparent opacity-90" />
                  </div>

                  {/* BACKGROUND GLOWING LIGHT */}
                  <div className="absolute -inset-6 bg-emerald-500/20 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </div>

                {/* Content Section */}
                <div className="space-y-8">
                  <div className="inline-flex p-4 rounded-2xl bg-white/5 border border-white/5 text-emerald-400 shadow-xl group-hover:border-emerald-500/30 transition-colors">
                    <Icon size={28} />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-4xl font-bold text-white tracking-tight leading-tight">
                      {feature.title}
                      <span className="inline-block ml-3 h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,1)]" />
                    </h3>
                    <p className="text-neutral-400 text-lg leading-relaxed max-w-md">
                      {feature.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 mt-8">
                    <div className="flex items-center gap-3 text-sm font-medium text-emerald-400/80">
                      <CheckCircle2 size={16} />
                      <span>Optimized Infrastructure</span>
                    </div>

                    <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-white hover:text-emerald-400 transition-colors pt-4 group/btn">
                      View details
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
