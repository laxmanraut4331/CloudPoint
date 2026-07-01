import { useEffect } from "react";
import { useAdminStore } from "../Store/useAdminStore";
import { Download, ImageIcon, Trash2, Star, ExternalLink } from "lucide-react";

export const Images = () => {
  const {
    file,
    authUser,
    fetchFiles,
    deleteFile,
    toggleFavorite,
    downloadFile,
  } = useAdminStore();

  useEffect(() => {
    fetchFiles("images");
  }, []);

  /* FILTER ONLY USER IMAGES */
  const userImages = file.filter(
    (f) =>
      (f.uploadedBy?._id === authUser?._id || f.uploadedBy === authUser?._id) &&
      f.fileType === "images" &&
      !f.isTrash,
  );

  /* SOLAR COBALT EMPTY STATE  */
  if (userImages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in fade-in zoom-in duration-700">
        <div className="relative mb-6">
          <div className="absolute -inset-6 bg-blue-500/10 blur-3xl rounded-full" />
          <ImageIcon size={80} className="relative text-blue-500/20" />
        </div>
        <h2 className="text-2xl font-bold text-white">Gallery Empty</h2>
        <p className="text-blue-200/40 mt-2 max-w-xs mx-auto text-sm">
          No visual assets detected in your cloud. Start by uploading an image.
        </p>
      </div>
    );
  }

  /* IMAGE GRID  */
  return (
    <div className="p-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {userImages.map((img) => (
          <div
            key={img._id}
            className="group relative bg-[#0d1117] border border-white/5 rounded-[1.5rem] overflow-hidden transition-all duration-500 hover:border-blue-500/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:-translate-y-2"
          >
            {/* IMAGE PREVIEW CONTAINER */}
            <div className="relative h-52 overflow-hidden bg-[#06080a]">
              <img
                src={img.fileUrl}
                alt={img.filename}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent opacity-60" />

              {/* Hover Actions Overlay */}
              <div className="absolute inset-0 flex items-center justify-center gap-3 bg-blue-900/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button
                  onClick={() => downloadFile(img.fileUrl, img.filename)}
                  className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-400 hover:scale-110 transition-all shadow-xl"
                  title="Download"
                >
                  <Download size={20} />
                </button>
                <a
                  href={img.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-white/10 text-white rounded-full backdrop-blur-md hover:bg-white/20 hover:scale-110 transition-all shadow-xl"
                  title="View Full"
                >
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>

            {/* INFO PANEL */}
            <div className="p-5">
              <div className="flex flex-col mb-4">
                <p className="font-bold text-blue-50 truncate tracking-tight text-[15px]">
                  {img.filename}
                </p>
                <span className="text-[10px] text-blue-400/50 font-mono uppercase mt-1 tracking-widest">
                  Visual Asset
                </span>
              </div>

              {/* ACTION BAR */}
              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <div className="flex gap-2">
                  {/* Favorite */}
                  <button
                    onClick={() => toggleFavorite(img._id)}
                    className={`p-2 rounded-xl transition-all duration-300 ${
                      img.isFavorite
                        ? "bg-yellow-500/10 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.1)]"
                        : "bg-white/5 text-neutral-500 hover:text-blue-400"
                    }`}
                  >
                    <Star
                      size={18}
                      fill={img.isFavorite ? "currentColor" : "none"}
                    />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => deleteFile(img._id)}
                    className="p-2 bg-white/5 text-neutral-500 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all duration-300"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="h-2 w-2 rounded-full bg-blue-500/20 group-hover:bg-blue-500 transition-colors shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
