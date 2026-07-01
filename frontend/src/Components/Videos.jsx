import { useEffect } from "react";
import { useAdminStore } from "../Store/useAdminStore";
import { Download, FileText, Trash2, Star, ShieldCheck } from "lucide-react";

export const Documents = () => {
  const {
    file,
    authUser,
    fetchFiles,
    deleteFile,
    toggleFavorite,
    downloadFile,
  } = useAdminStore();

  useEffect(() => {
    fetchFiles("documents");
  }, []);

  const userDocs = file.filter(
    (f) =>
      (f.uploadedBy?._id === authUser?._id || f.uploadedBy === authUser?._id) &&
      f.fileType === "documents" &&
      !f.isTrash,
  );

  /* EMPTY STATE - COBALT THEME */
  if (userDocs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in fade-in zoom-in duration-700">
        <div className="relative mb-6">
          <div className="absolute -inset-4 bg-blue-500/10 blur-2xl rounded-full" />
          <FileText size={80} className="relative text-blue-500/20" />
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Vault Empty
        </h2>
        <p className="text-blue-200/30 mt-2 text-sm max-w-[250px] mx-auto">
          No documents detected. Secure your files by uploading them to the
          cloud.
        </p>
      </div>
    );
  }

  return (
    <div className="p-2">
      {/* ADAPTIVE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {userDocs.map((doc) => (
          <div
            key={doc._id}
            className="group relative bg-[#0d1117] border border-white/5 rounded-[1.8rem] p-5 transition-all duration-500 hover:border-blue-500/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:-translate-y-1"
          >
            {/* DOCUMENT ICON CONTAINER */}
            <div className="relative flex items-center justify-center h-44 bg-[#06080a] rounded-2xl mb-5 overflow-hidden border border-white/5">
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <FileText
                size={56}
                className="text-blue-500/30 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-500"
              />

              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <ShieldCheck size={16} className="text-blue-500/40" />
              </div>
            </div>

            {/* DOCUMENT META */}
            <div className="space-y-1.5 px-1">
              <p className="truncate font-bold text-[15px] text-blue-50 tracking-tight">
                {doc.filename}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-blue-400/40 font-black uppercase tracking-[0.15em]">
                  Document Asset
                </span>
              </div>
            </div>

            {/* ACTION BAR */}
            <div className="flex justify-between items-center mt-6 pt-5 border-t border-white/5">
              <div className="flex gap-2.5">
                {/* Toggle Favorite */}
                <button
                  onClick={() => toggleFavorite(doc._id)}
                  className={`p-2.5 rounded-xl transition-all duration-300 ${
                    doc.isFavorite
                      ? "bg-yellow-500/10 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.1)]"
                      : "bg-white/5 text-neutral-500 hover:text-blue-400"
                  }`}
                >
                  <Star
                    size={18}
                    fill={doc.isFavorite ? "currentColor" : "none"}
                  />
                </button>

                {/* Delete */}
                <button
                  onClick={() => deleteFile(doc._id)}
                  className="p-2.5 bg-white/5 text-neutral-500 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all duration-300"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Download Action */}
              <button
                onClick={() => downloadFile(doc.fileUrl, doc.filename)}
                className="p-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-400 hover:scale-110 transition-all shadow-[0_10px_20px_rgba(59,130,246,0.2)]"
              >
                <Download size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
