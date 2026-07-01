import { Navigate, Route, Routes } from "react-router-dom";
import { useAdminStore } from "./Store/useAdminStore";
import { useEffect } from "react";

import { HomePage } from "./Pages/HomePage";
import { LoginPage } from "./Pages/LoginPage";
import { SignUpPage } from "./Pages/SignUpPage";
import { LandingPage } from "./Pages/LandingPage";
import { FetchAllFiles } from "./Components/FetchAllFiles";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAdminStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#06080a]">
        <div className="relative">
          <div className="absolute -inset-4 bg-emerald-500/20 blur-2xl rounded-full animate-pulse" />
          <Loader className="animate-spin h-12 w-12 text-emerald-500 relative" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06080a] text-white selection:bg-emerald-500/30">
      <Routes>
        <Route 
          path="/" 
          element={!authUser ? <LandingPage /> : <Navigate to={`${authUser.username}`} replace />} 
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={`/cloudpoint/${authUser.username}`} replace />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={`/cloudpoint/${authUser.username}`} replace />}
        />
       <Route
          path="/cloudpoint/:username"
          element={authUser ? <HomePage /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/cloudpoint/:username/image"
          element={authUser ? <FetchAllFiles category="images" /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#0d1117',
            color: '#fff',
            border: '1px solid rgba(16,185,129,0.1)',
            borderRadius: '1rem',
          },
        }}
      />
    </div>
  );
}

export default App;