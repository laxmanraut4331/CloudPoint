import { useEffect } from "react";
import axiosInstance from "../utils/axios";
import { Loader } from "lucide-react";

export const GoogleLogin = () => {
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });
    }
  }, []);

  const handleCredentialResponse = async (response) => {
    try {
      await axiosInstance.post("/auth/google", {
        token: response.credential,
      });
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Google Auth Error:", error);
    }
  };

  const handleCustomLogin = () => {
    window.google.accounts.id.prompt();
  };

  return (
    <div className="w-full space-y-4 mt-6">
      {/* Visual Divider */}
      <div className="flex items-center gap-4">
        <div className="h-[1px] flex-1 bg-white/5"></div>
        <span className="text-[10px] text-neutral-600 font-bold uppercase tracking-[0.2em]">
          Or Continue With
        </span>
        <div className="h-[1px] flex-1 bg-white/5"></div>
      </div>

      {/* CUSTOM THEMED BUTTON */}
      <button
        type="button"
        onClick={handleCustomLogin}
        className="group relative w-full bg-[#161b22] hover:bg-[#1c2128] text-white py-4 rounded-2xl font-bold text-sm transition-all active:scale-[0.98] border border-white/5 hover:border-emerald-500/30 flex justify-center items-center gap-3 shadow-xl overflow-hidden"
      >
        {/* Subtle Emerald Glow on Hover */}
        <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Google Icon */}
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            className="fill-[#4285F4]"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            className="fill-[#34A853]"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            className="fill-[#FBBC05]"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            className="fill-[#EA4335]"
          />
        </svg>

        <span className="tracking-wide">Google Account</span>

        {/* Animated Corner Border */}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-emerald-500 transition-all duration-500 group-hover:w-full" />
      </button>
    </div>
  );
};
