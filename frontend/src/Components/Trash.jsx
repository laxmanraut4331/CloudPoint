import { useEffect, useState } from "react";
import { useAdminStore } from "../Store/useAdminStore";
import axiosInstance from "../Utils/axios";
import toast from "react-hot-toast";
import { Trash2, RotateCcw, FileText, Video, X, Maximize2 } from "lucide-react";

export const Trash = () => {
  const { file, fetchFiles } = useAdminStore();

  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewType, setPreviewType] = useState(null);

  useEffect(() => {
    fetchFiles("trash");
  }, [fetchFiles]);

  const trashFiles = file.filter((f) => f.isTrash === true);

  /*  PREVIEW HANDLERS*/
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

  /* ACTIONS  */
  const restoreFile = async (id) => {
    try {
      await axiosInstance.put(`/files/restore/${id}`);
      toast.success("File restored to vault");
      fetchFiles("trash");
    } catch {
      toast.error("Restore failed");
    }
  };

  const permanentDelete = async (id) => {
    if (!window.confirm("This action is irreversible. Delete forever?")) return;
    try {
      await axiosInstance.delete(`/files/permanent/${id}`);
      toast.success("Asset purged permanently");
      fetchFiles("trash");
    } catch {
      toast.error("Delete failed");
    }
  };

  /* EMPTY STATE  */
  if (trashFiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in fade-in zoom-in duration-700">
        <div className="relative mb-6">
          <div className="absolute -inset-6 bg-red-500/10 blur-3xl rounded-full" />
          <Trash2 size={60} className="relative text-red-500/20" />
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight uppercase italic">
          Trash is Clear
        </h2>
        <p className="text-neutral-500 mt-2 text-xs font-mono">
          No corrupted or deleted assets found.
        </p>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-4">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-1 w-10 bg-red-500 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.8)]" />
        <h2 className="text-2xl font-black capitalize text-white tracking-tighter uppercase italic">
          Recycle Bin
        </h2>
      </div>

      {/* COMPACT GLOWING GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
        {trashFiles.map((f) => (
          <div
            key={f._id}
            className="
              group relative bg-[#0d1117] border border-white/10 rounded-xl overflow-hidden transition-all duration-300
              hover:border-red-500/40 
              hover:shadow-[0_0_25px_rgba(239,68,68,0.1)]
              hover:-translate-y-1
            "
          >
            {/* THUMBNAIL (h-40) */}
            <div
              className="relative h-40 bg-[#06080a] flex items-center justify-center cursor-pointer overflow-hidden"
              onClick={() => openPreview(f)}
            >
              {f.fileType === "images" ? (
                <img
                  src={f.fileUrl}
                  alt={f.filename}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                />
              ) : (
                <div className="relative">
                  <div className="absolute -inset-6 bg-red-500/5 blur-2xl rounded-full group-hover:bg-red-500/15 transition-all" />
                  {f.fileType === "videos" ? (
                    <Video
                      size={36}
                      className="relative text-red-500/20 group-hover:text-red-500/40 transition-colors"
                    />
                  ) : (
                    <FileText
                      size={36}
                      className="relative text-red-500/20 group-hover:text-red-500/40 transition-colors"
                    />
                  )}
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Maximize2 size={24} className="text-white/50" />
              </div>
            </div>

            {/* INFO PANEL */}
            <div className="p-3.5 border-t border-white/5">
              <p className="truncate font-bold text-neutral-400 text-xs mb-4 tracking-tight group-hover:text-white transition-colors">
                {f.filename}
              </p>

              <div className="flex items-center justify-between">
                {/* RESTORE BUTTON */}
                <button
                  onClick={() => restoreFile(f._id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 text-green-500 border border-green-500/20 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-green-500 hover:text-white transition-all active:scale-95"
                >
                  <RotateCcw size={12} />
                  Restore
                </button>

                {/* PURGE BUTTON */}
                <button
                  onClick={() => permanentDelete(f._id)}
                  className="p-2 bg-white/5 text-neutral-600 hover:bg-red-500 hover:text-white rounded-lg transition-all active:scale-95"
                  title="Delete Permanently"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* RED GLOW BAR */}
            <div className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-red-500 transition-all duration-500 group-hover:w-full shadow-[0_0_8px_rgba(239,68,68,1)]" />
          </div>
        ))}
      </div>

      {/*  FULLSCREEN PREVIEW  */}
      {previewUrl && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-[#06080a]/95 backdrop-blur-2xl"
            onClick={closePreview}
          />

          <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-[1002] pointer-events-auto">
            <div className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
              <span className="text-[10px] font-mono text-red-500 uppercase tracking-[0.3em]">
                Trash Preview
              </span>
            </div>

            <button
              onClick={closePreview}
              className="p-3 bg-red-500/10 hover:bg-red-500 text-white border border-red-500/20 rounded-full backdrop-blur-md transition-all active:scale-95 group"
            >
              <X
                size={24}
                className="group-hover:rotate-90 transition-transform duration-300"
              />
            </button>
          </div>

          <div className="relative w-full h-full flex items-center justify-center z-[1001] p-4 pointer-events-none">
            <div className="pointer-events-auto animate-in zoom-in-95 duration-300 max-w-full max-h-full">
              {previewType === "image" && (
                <img
                  src={previewUrl}
                  alt="Full Preview"
                  className="max-w-[95vw] max-h-[85vh] object-contain rounded-lg shadow-2xl border border-white/5 grayscale-[50%]"
                />
              )}

              {previewType === "pdf" && (
                <div className="w-[90vw] h-[80vh] bg-white rounded-xl overflow-hidden">
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
