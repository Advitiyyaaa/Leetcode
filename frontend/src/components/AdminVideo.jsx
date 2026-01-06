import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { Trash2, Upload } from "lucide-react";
import { Link } from "react-router";

export default function AdminVideo() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [deleting, setDeleting] = useState(false);


  useEffect(() => {
    async function fetchProblems() {
      try {
        const res = await axiosClient.get("/problem/getAllProblem");
        setProblems(res.data || []);
      } catch {
        setProblems([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProblems();
  }, []);

  // Delete flow
  const handleDelete = async () => {
    if (!selectedProblem) return;
    try {
      setDeleting(true);
      setDeleteError(null);

      await axiosClient.delete(`/video/delete/${selectedProblem._id}`);

      document.getElementById("delete_modal").close();
    } catch (err) {
      const msg =
      err.response?.data?.error ||
      err.response?.data?.message ||
      "Failed to delete video.";

      setDeleteError(msg);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen w-[95%] container mx-auto text-white py-10">
      <h1 className="text-3xl font-bold mb-8">
        Upload / Delete Editorial Videos
      </h1>

      <div className="overflow-x-auto bg-black/50 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_0_10px_rgba(157,0,255,0.25)] p-4">
        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <table className="table w-full text-gray-300">
            <thead>
              <tr className="text-purple-300 border-b border-white/10">
                <th>Title</th>
                <th>Difficulty</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((p) => (
                <tr key={p._id}>
                  <td>{p.title}</td>
                  <td
                    className={`capitalize ${
                      p.difficulty === "easy"
                        ? "text-green-400"
                        : p.difficulty === "medium"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {p.difficulty}
                  </td>
                  <td>
                    <div className="flex gap-2 justify-center">
                      <Link to={`/admin/upload/${p._id}`}>
                        <button
                          className="btn btn-sm bg-blue-600/70 hover:bg-blue-600 border-none text-white rounded-lg flex items-center gap-1 px-3"
                        >
                          <Upload className="w-4 h-4" /> Upload
                        </button>
                      </Link>
                      <button
                        className="btn btn-sm bg-red-600/70 hover:bg-red-600 border-none text-white rounded-lg flex items-center gap-1 px-3"
                        onClick={() => {
                          setSelectedProblem(p);
                          document
                            .getElementById("delete_modal")
                            .showModal();
                        }}
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Delete Modal */}
      <dialog id="delete_modal" className="modal">
        <div className="modal-box bg-black/80 border border-white/10">
          <h3 className="text-red-400 font-bold mb-3">
            Delete Editorial Video
          </h3>

          <p className="text-gray-300">
            Delete video for{" "}
            <span className="font-semibold text-white">
              {selectedProblem?.title}
            </span>
            ?
          </p>

          {/* Error Message */}
          {deleteError && (
            <div className="mt-3 text-sm text-red-400 bg-red-900/30 border border-red-500/30 rounded-lg p-2">
              {deleteError}
            </div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <button
              className="btn btn-sm bg-gray-700 hover:bg-gray-600 border-none"
              onClick={() => {
                setDeleteError(null);
                document.getElementById("delete_modal").close();
              }}
            >
              Cancel
            </button>

            <button
              className={`btn btn-sm bg-red-600 hover:bg-red-700 border-none ${
                deleting ? "opacity-60 cursor-not-allowed" : ""
              }`}
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Confirm"}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
