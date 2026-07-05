import { create } from "zustand";
import axiosInstance from "../Utils/axios.jsx";
import toast from "react-hot-toast";

const LIMIT = 10 * 1024 * 1024 * 1024; // 10GB

export const useAdminStore = create((set, get) => ({
  authUser: null,
  file: [],
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  isUploading: false,
  isDeleting: false,

 
  usedBytes: 0,
  usedGB: "0.00",
  percentage: 0,

  /*  AUTH  */

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().fetchStorage();
    } catch {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    try {
      set({ isSigningUp: true });
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Signup successful");
      get().fetchStorage();
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    try {
      set({ isLoggingIn: true });
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });

      toast.success("Login successful");

      get().fetchFiles();
      get().fetchStorage();
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");

      set({
        authUser: null,
        file: [],
        usedBytes: 0,
        usedGB: "0.00",
        percentage: 0,
      });

      toast.success("Logged out");
    } catch {
      toast.error("Logout failed");
    }
  },

  /*  FILES  */

  uploadFile: async (formData) => {
    try {
      set({ isUploading: true });

      const res = await axiosInstance.post("/files/upload", formData);

      const newFile = res.data.fileDetails;

      set((state) => ({
        file: [newFile, ...state.file],
      }));

      get().fetchStorage();
    } catch {
      toast.error("Upload failed");
    } finally {
      set({ isUploading: false });
    }
  },
  fetchFiles: async (category = "") => {
    try {
      const url = category ? `/files?category=${category}` : "/files";

      const res = await axiosInstance.get(url);

      set({ file: res.data });
    } catch (err) {
      console.error(err);
    }
  },
  deleteFile: async (id) => {
    try {
      set({ isDeleting: true });

      await axiosInstance.delete(`/files/${id}`);

      set((state) => ({
        file: state.file.filter((f) => f._id !== id),
      }));

      get().fetchStorage();

      toast.success("File deleted");
    } catch {
      toast.error("Delete failed");
    } finally {
      set({ isDeleting: false });
    }
  },

  /* STORAGE */

  fetchStorage: async () => {
    try {
      const res = await axiosInstance.get("/files/storage");

      const usedBytes = res.data.usedBytes || 0;

      set({
        usedBytes,
        usedGB: (usedBytes / 1024 ** 3).toFixed(2),
        percentage: (usedBytes / LIMIT) * 100,
      });
    } catch (err) {
      console.error("Storage fetch error", err);
    }
  },

  toggleFavorite: async (id) => {
    try {
      const res = await axiosInstance.put(`/files/favorite/${id}`);

      const updatedFile = res.data;

      // update state instantly
      set((state) => ({
        file: state.file.map((f) => (f._id === id ? updatedFile : f)),
      }));

      toast.success("Favorite updated");
    } catch (err) {
      console.error(err);

      toast.error("Favorite update failed");
    }
  },
  
  downloadFile: async (fileUrl, filename) => {
    try {
      const response = await fetch(fileUrl);

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;

      a.download = filename;

      document.body.appendChild(a);

      a.click();

      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed", error);
    }
  },
}));
