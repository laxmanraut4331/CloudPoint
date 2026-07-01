import { useEffect } from "react";
import { useAdminStore } from "../Store/useAdminStore";
import { Download, FileText, Trash2, Star } from "lucide-react";

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

  /* SOLAR COBALT EMPTY STATE */
  if (userDocs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-neutral-500 text-center animate-in fade-in zoom-in duration-700">
        <div className="relative mb-6">
          <div className="absolute -inset-4 bg-blue-500/10 blur-2xl rounded-full" />
          <FileText size={80} className="relative text-blue-500/20" />
        </div>
        <h2 className="text-2xl font-bold text-white">No Documents Found</h2>
        <p className="text-blue-200/40 mt-2 max-w-xs mx-auto">
          Your secure document vault is empty. Upload files to begin
          synchronization.
        </p>
      </div>
    );
  }

  return (
    <div className="p-2">
      {/* GRID SYSTEM */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {userDocs.map((doc) => (
          <div
            key={doc._id}
            className="group relative bg-[#0d1117] border border-white/5 rounded-[1.5rem] p-4 transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:-translate-y-1"
          >
            {/* DOCUMENT PREVIEW AREA */}
            <div className="relative flex items-center justify-center h-40 bg-[#06080a] rounded-2xl mb-4 overflow-hidden border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <FileText
                size={48}
                className="text-blue-500/40 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-500"
              />

              {/* Overlay Download Action */}
              <button
                onClick={() => downloadFile(doc.fileUrl, doc.filename)}
                className="absolute inset-0 flex items-center justify-center bg-[#0d1117]/60 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="bg-blue-500 p-3 rounded-full text-white shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <Download size={20} />
                </div>
              </button>
            </div>

            {/* INFO SECTION */}
            <div className="space-y-1 px-1">
              <p className="truncate font-semibold text-[15px] text-blue-50 tracking-tight">
                {doc.filename}
              </p>
              <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest">
                PDF / DOCX Asset
              </p>
            </div>

            {/* ACTIONS BAR */}
            <div className="flex justify-between items-center mt-5 pt-4 border-t border-white/5">
              <div className="flex gap-2">
                <button
                  onClick={() => toggleFavorite(doc._id)}
                  className={`p-2 rounded-xl transition-all ${
                    doc.isFavorite
                      ? "bg-yellow-500/10 text-yellow-500"
                      : "bg-white/5 text-neutral-500 hover:text-blue-400"
                  }`}
                >
                  <Star
                    size={16}
                    fill={doc.isFavorite ? "currentColor" : "none"}
                  />
                </button>

                <button
                  onClick={() => deleteFile(doc._id)}
                  className="p-2 bg-white/5 text-neutral-500 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <span className="text-[10px] font-bold text-neutral-600 uppercase">
                Secure
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
