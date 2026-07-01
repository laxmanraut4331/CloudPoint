import { useEffect } from "react";
import { useAdminStore } from "../Store/useAdminStore";
import {
  Download,
  Star,
  Video,
  FileText,
  Trash2,
  ExternalLink,
} from "lucide-react";

export const Favourites = () => {
  const {
    file,
    authUser,
    fetchFiles,
    deleteFile,
    toggleFavorite,
    downloadFile,
  } = useAdminStore();

  useEffect(() => {
    fetchFiles("favorites");
  }, []);

  /* FILTER FAVORITE FILES */
  const favoriteFiles = file.filter(
    (f) =>
      (f.uploadedBy?._id === authUser?._id || f.uploadedBy === authUser?._id) &&
      f.isFavorite &&
      !f.isTrash,
  );

  /* SOLAR COBALT EMPTY STATE */
  if (favoriteFiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in fade-in zoom-in duration-700">
        <div className="relative mb-6">
          <div className="absolute -inset-6 bg-blue-500/10 blur-3xl rounded-full" />
          <Star size={80} className="relative text-blue-500/20" />
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          No Favorites Yet
        </h2>
        <p className="text-blue-200/30 mt-2 text-sm max-w-[280px] mx-auto">
          Add your most important assets to your favorites for instant access.
        </p>
      </div>
    );
  }

  return (
    <div className="p-2">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-yellow-500/10 rounded-lg">
          <Star size={20} className="text-yellow-500" fill="currentColor" />
        </div>
        <h2 className="text-2xl font-black tracking-tight text-white uppercase text-[14px]">
          Priority Assets
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {favoriteFiles.map((f) => (
          <div
            key={f._id}
            className="group relative bg-[#0d1117] border border-white/5 rounded-[1.8rem] overflow-hidden transition-all duration-500 hover:border-blue-500/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:-translate-y-2"
          >
            {/* THUMBNAIL SECTION */}
            <div className="relative h-44 bg-[#06080a] flex items-center justify-center overflow-hidden border-b border-white/5">
              {f.fileType === "images" ? (
                <img
                  src={f.fileUrl}
                  alt={f.filename}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : f.fileType === "videos" ? (
                <Video
                  size={48}
                  className="text-blue-500/30 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-500"
                />
              ) : (
                <FileText
                  size={48}
                  className="text-blue-500/30 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-500"
                />
              )}

              {/* Overlay Gradient for images */}
              {f.fileType === "images" && (
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent opacity-60" />
              )}

              {/* Hover Actions Overlay */}
              <div className="absolute inset-0 flex items-center justify-center gap-3 bg-blue-900/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button
                  onClick={() => downloadFile(f.fileUrl, f.filename)}
                  className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-400 hover:scale-110 transition-all shadow-xl"
                >
                  <Download size={18} />
                </button>
                <a
                  href={f.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-white/10 text-white rounded-full backdrop-blur-md hover:bg-white/20 hover:scale-110 transition-all shadow-xl"
                >
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>

            {/* FILE INFO */}
            <div className="p-5">
              <div className="flex flex-col mb-4">
                <p className="font-bold text-blue-50 truncate tracking-tight text-[15px]">
                  {f.filename}
                </p>
                <span className="text-[10px] text-blue-400/50 font-mono uppercase mt-1 tracking-widest">
                  {f.fileType} asset
                </span>
              </div>

              {/* ACTION BAR */}
              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <div className="flex gap-2">
                  {/* Remove from Favorites (Toggle) */}
                  <button
                    onClick={() => toggleFavorite(f._id)}
                    className="p-2.5 bg-yellow-500/10 text-yellow-500 rounded-xl transition-all duration-300 hover:bg-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.1)]"
                  >
                    <Star size={18} fill="currentColor" />
                  </button>

                  {/* Delete Asset */}
                  <button
                    onClick={() => deleteFile(f._id)}
                    className="p-2.5 bg-white/5 text-neutral-500 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all duration-300"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
