import { useState } from "react";
import { useAdminStore } from "../Store/useAdminStore";
import { toast } from "react-hot-toast";
import { Upload, FileText, Loader2 } from "lucide-react";

export const UpLoadFile = () => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [preview, setPreview] = useState(null);

  const { uploadFile, isUploading } = useAdminStore();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    // Only preview images
    if (selectedFile.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!file) return toast.error("Please select a file.");
      const finalFileName = filename.trim() || file.name;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("filename", finalFileName);

      await uploadFile(formData);

      setFile(null);
      setFilename("");
      setPreview(null);
      toast.success("File uploaded successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-[#121417]/90 backdrop-blur-xl p-8 rounded-[2rem] border border-white/5 shadow-2xl w-full max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
        <Upload className="text-emerald-500" size={24} />
        Upload File
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* File Input */}
        <div className="relative group">
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20 cursor-pointer transition-all"
          />
        </div>

        {/* Preview Container */}
        {preview ? (
          <div className="relative group overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <img
              src={preview}
              alt="preview"
              className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent" />
          </div>
        ) : (
          file && (
            <div className="flex flex-col items-center justify-center p-10 bg-white/5 border border-dashed border-white/10 rounded-2xl gap-3">
              <FileText className="text-emerald-500/50" size={48} />
              <p className="text-neutral-400 text-sm font-mono">{file.name}</p>
            </div>
          )
        )}

        {/* Filename Input */}
        <input
          type="text"
          placeholder="Enter custom file name (optional)"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-neutral-600 outline-none focus:border-emerald-500/50 focus:bg-white/[0.08] transition-all"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isUploading || !file}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-[#0a0a0a] font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
        >
          {isUploading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>Uploading...</span>
            </>
          ) : (
            "Upload File"
          )}
        </button>
      </form>
    </div>
  );
};
