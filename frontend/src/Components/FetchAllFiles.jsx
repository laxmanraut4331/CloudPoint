import { useEffect, useState } from "react";
import { useAdminStore } from "../Store/useAdminStore";
import {
  Download,
  FileText,
  Video,
  Star,
  Trash2,
  X,
  Maximize2,
} from "lucide-react";

export const FetchAllFiles = ({ category }) => {
  const { file, fetchFiles, deleteFile, toggleFavorite, downloadFile } =
    useAdminStore();

  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewType, setPreviewType] = useState(null);

  useEffect(() => {
    fetchFiles(category);
  }, [category, fetchFiles]);

  const filteredFiles = file.filter((f) => {
    if (category === "images") return f.fileType === "images" && !f.isTrash;
    if (category === "videos") return f.fileType === "videos" && !f.isTrash;
    if (category === "documents")
      return f.fileType === "documents" && !f.isTrash;
    if (category === "favorites") return f.isFavorite && !f.isTrash;
    if (category === "trash") return f.isTrash;
    if (category === "folders") return f.fileType === "folder" && !f.isTrash;
    return !f.isTrash;
  });

  const openPreview = (f) => {
    setPreviewUrl(f.fileUrl);
    if (f.fileType === "images") setPreviewType("image");
    else if (f.fileType === "videos") setPreviewType("video");
    else setPreviewType("pdf");
  };

  const closePreview = () => {
    setPreviewUrl(null);
    setPreviewType(null);
  };

  if (filteredFiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in fade-in zoom-in duration-700">
        <div className="relative mb-6">
          <div className="absolute -inset-6 bg-blue-500/10 blur-3xl rounded-full" />
          <FileText size={60} className="relative text-blue-500/20" />
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight capitalize">
          No Assets Found
        </h2>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-4">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-1 w-10 bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
        <h2 className="text-2xl font-black capitalize text-white tracking-tighter uppercase italic">
          {category}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
        {filteredFiles.map((f) => (
          <div
            key={f._id}
            className="group relative bg-[#0d1117] border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] hover:-translate-y-1"
          >
            <div
              className="relative h-40 bg-[#06080a] flex items-center justify-center cursor-pointer overflow-hidden"
              onClick={() => openPreview(f)}
            >
              {f.fileType === "images" ? (
                <img
                  src={f.fileUrl}
                  alt={f.filename}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:opacity-70"
                />
              ) : (
                <div className="relative">
                  <div className="absolute -inset-6 bg-blue-500/10 blur-2xl rounded-full group-hover:bg-blue-500/20 transition-all" />
                  {f.fileType === "videos" ? (
                    <Video
                      size={36}
                      className="text-blue-500/40 group-hover:text-blue-400 transition-colors"
                    />
                  ) : (
                    <FileText
                      size={36}
                      className="text-blue-500/40 group-hover:text-blue-400 transition-colors"
                    />
                  )}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Maximize2
                  size={24}
                  className="text-white drop-shadow-lg scale-50 group-hover:scale-100 transition-transform duration-300"
                />
              </div>
            </div>

            <div className="p-3.5 border-t border-white/5">
              <p className="truncate font-bold text-blue-50 text-xs mb-3 tracking-tight group-hover:text-blue-400 transition-colors">
                {f.filename}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  <button
                    onClick={() => toggleFavorite(f._id)}
                    className={`p-1.5 rounded-lg transition-all ${f.isFavorite ? "bg-yellow-500/20 text-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.2)]" : "bg-white/5 text-neutral-600"}`}
                  >
                    <Star
                      size={13}
                      fill={f.isFavorite ? "currentColor" : "none"}
                    />
                  </button>
                  <button
                    onClick={() => deleteFile(f._id)}
                    className="p-1.5 bg-white/5 text-neutral-600 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-all"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
                <button
                  onClick={() => downloadFile(f.fileUrl, f.filename)}
                  className="p-1.5 bg-blue-600/10 text-blue-400 rounded-lg border border-blue-500/20 hover:bg-blue-500 hover:text-white transition-all shadow-[0_0_10px_rgba(59,130,246,0.1)]"
                >
                  <Download size={13} />
                </button>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-blue-500 transition-all duration-500 group-hover:w-full" />
          </div>
        ))}
      </div>

      {/*  FULLSCREEN PREVIEW  */}
      {previewUrl && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-[#06080a]/95 backdrop-blur-2xl cursor-zoom-out"
            onClick={closePreview}
          />

          {/* Controls Layer */}
          <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-[1002] pointer-events-auto">
            <div className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-md hidden md:block">
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-[0.3em]">
                Secure Asset Viewer
              </span>
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <button
                onClick={() => downloadFile(previewUrl, "asset")}
                className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-all shadow-lg shadow-blue-500/20 active:scale-90"
                title="Download Asset"
              >
                <Download size={20} />
              </button>

              {/* THE CLOSE BUTTON (Fixed & Reinforced) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closePreview();
                }}
                className="p-3 bg-red-500/10 hover:bg-red-500 text-white border border-red-500/20 rounded-full backdrop-blur-md transition-all active:scale-95 group"
                aria-label="Close preview"
              >
                <X
                  size={24}
                  className="group-hover:rotate-90 transition-transform duration-300"
                />
              </button>
            </div>
          </div>

          {/* Media Content Container */}
          <div className="relative w-full h-full flex items-center justify-center z-[1001] p-4 pointer-events-none">
            <div className="pointer-events-auto animate-in zoom-in-95 duration-300 max-w-full max-h-full shadow-2xl ">
              {previewType === "image" && (
                <img
                  src={previewUrl}
                  alt="Full Preview"
                  className="max-w-[95vw] max-h-[85vh] object-contain rounded-lg border border-white/10"
                />
              )}

              {previewType === "pdf" && (
                <div className="w-[50vw] h-[88vh] bg-white rounded-xl overflow-hidden shadow-2xl mt-15">
                  <iframe
                    src={`https://docs.google.com/gview?url=${encodeURIComponent(previewUrl)}&embedded=true`}
                    title="PDF"
                    className="w-full h-full"
                  />
                </div>
              )}

              {previewType === "video" && (
                <video
                  src={previewUrl}
                  controls
                  autoPlay
                  className="max-w-[90vw] max-h-[80vh] rounded-xl bg-black"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
