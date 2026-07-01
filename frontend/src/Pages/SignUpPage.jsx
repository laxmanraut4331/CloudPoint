import { useAdminStore } from "../Store/useAdminStore";
import { toast } from "react-hot-toast";
import { Loader, Eye, EyeOff, User, Mail, Lock, Cloud } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "../Components/GoogleLogin";

export const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAdminStore();

  const validateForm = () => {
    if (!formData.username.trim()) return toast.error("Username is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Email is invalid");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleForm = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      signup(formData);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden px-4">
      {/* Background Animated Glows */}
      <div className="absolute top-0 right-0 w-[550px] h-[500px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none animate-pulse" />

      {/* Main Glass Container */}
      <div className="relative w-full max-w-6xl min-h-[550px] bg-[#121417]/90 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] shadow-[0_0_80px_rgba(16,185,129,0.1)] grid md:grid-cols-2 overflow-hidden transition-all duration-500">
        {/* LEFT SIDE: BRANDING */}
        <div className="hidden md:flex relative p-16 flex-col justify-between overflow-hidden border-r border-white/5 bg-[#0f1114]">
          <div className="relative z-20">
            <div className="flex items-center gap-3 mb-10 group cursor-default">
              <div className="bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                <Cloud
                  className="text-emerald-400 fill-emerald-400/10"
                  size={26}
                />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Cloud
                <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent italic font-serif">
                  Point
                </span>
              </h1>
            </div>

            <h2 className="text-5xl font-bold text-white leading-tight mb-2">
              Join the <br />
              <span className="text-emerald-500 italic drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                Secure Cloud.
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-md mt-6 leading-relaxed">
              Start protecting your assets with end-to-end encryption today.
            </p>
          </div>

          <div className="absolute inset-0 z-10 opacity-10 flex items-center justify-center pointer-events-none">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: "url('/files/signin.png')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
              }}
            />
          </div>

          <div className="relative z-20">
            <p className="text-neutral-500 text-sm font-medium tracking-widest uppercase">
              End-to-End Encryption Enabled
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: FORM PANEL */}
        <div className="p-8 md:p-16 flex flex-col justify-center bg-black/10">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-white mb-2">Sign Up</h1>
            <p className="text-gray-400 text-sm">
              Already a member?{" "}
              <Link
                to="/login"
                className="text-emerald-500 font-medium hover:underline ml-1"
              >
                Log in
              </Link>
            </p>
          </div>

          <form onSubmit={handleForm} className="space-y-5">
            {/* Username Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                Username
              </label>
              <div className="relative group/input">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/input:text-emerald-500 transition-colors"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Create a unique alias"
                  className="w-full bg-[#161b22] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:border-emerald-500/50 outline-none transition-all placeholder:text-gray-600"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative group/input">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/input:text-emerald-500 transition-colors"
                  size={18}
                />
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full bg-[#161b22] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:border-emerald-500/50 outline-none transition-all placeholder:text-gray-600"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                Security Password
              </label>
              <div className="relative group/input">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/input:text-emerald-500 transition-colors"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-[#161b22] border border-white/10 rounded-xl pl-12 pr-12 py-4 text-white focus:border-emerald-500/50 outline-none transition-all placeholder:text-gray-600"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Main Submit Button */}
            <button
              type="submit"
              disabled={isSigningUp}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-[#06080a] py-4 rounded-2xl font-bold text-lg transition-all active:scale-[0.98] shadow-[0_10px_20px_rgba(16,185,129,0.2)] flex justify-center items-center gap-2 mt-2"
            >
              {isSigningUp ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  <span>Creating Account...</span>
                </>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Google Authentication Section */}
            <GoogleLogin />
          </form>

          <p className="mt-8 text-center text-[10px] text-neutral-600 font-mono tracking-widest uppercase opacity-50">
            Protected by CloudPoint Precise Protocols
          </p>
        </div>
      </div>
    </div>
  );
};
