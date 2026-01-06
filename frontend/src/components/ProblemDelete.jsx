import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { Trash2 } from "lucide-react";

export default function ProblemDelete() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProblem, setSelectedProblem] = useState(null);

  // Fetch all problems
  useEffect(() => {
    async function fetchProblems() {
      try {
        const response = await axiosClient.get("/problem/getAllProblem");
        setProblems(response.data || []);
      } catch (err) {
        console.error("Error fetching problems:", err);
        setProblems([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProblems();
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    try {
      await axiosClient.delete(`/problem/delete/${id}`);
      setProblems((prev) => prev.filter((p) => p._id !== id));
      document.getElementById("delete_modal").close();
    } catch (error) {
      console.error("Error deleting problem:", error);
    }
  };

  return (
    <div className="min-h-screen w-[95%] container mx-auto text-white py-10">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">
        Delete Problems
      </h1>

      {/* Table */}
      <div className="overflow-x-auto bg-black/50 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_0_10px_rgba(157,0,255,0.25)] p-4">
        {loading ? (
          <div className="text-center text-gray-400 py-10">Loading problems...</div>
        ) : problems.length === 0 ? (
          <div className="text-center text-gray-400 py-10">
            No problems found.
          </div>
        ) : (
          <table className="table w-full text-gray-300">
            <thead>
              <tr className="text-purple-300 border-b border-white/10">
                <th>Title</th>
                <th>Difficulty</th>
                <th>Tags</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((problem) => (
                <tr
                  key={problem._id}
                  className="border-b border-white/10 hover:bg-[rgba(40,0,65,0.35)] transition"
                >
                  <td className="font-semibold">{problem.title}</td>
                  <td
                    className={`capitalize ${
                      problem.difficulty === "easy"
                        ? "text-green-400"
                        : problem.difficulty === "medium"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {problem.difficulty}
                  </td>
                  <td>{problem.tags?.join(", ")}</td>
                  <td className="text-center align-middle">
                    <div className="flex justify-center">
                        <button
                        className="btn btn-sm bg-red-600/70 hover:bg-red-600 border-none text-white rounded-lg flex items-center gap-1 px-3"
                        onClick={() => {
                            setSelectedProblem(problem);
                            document.getElementById("delete_modal").showModal();
                        }}
                        >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* DaisyUI Delete Modal */}
      <dialog id="delete_modal" className="modal">
        <div className="modal-box bg-[rgba(20,0,40,0.9)] border border-white/10 backdrop-blur-xl text-gray-200 rounded-2xl">
          <h3 className="font-bold text-lg text-purple-300 mb-3">
            Confirm Deletion
          </h3>
          <p className="text-gray-400 mb-4">
            Are you sure you want to delete{" "}
            <span className="text-white font-semibold">
              {selectedProblem?.title}
            </span>
            ? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-sm bg-gray-700 hover:bg-gray-600 border-none text-gray-200"
              onClick={() => document.getElementById("delete_modal").close()}
            >
              Cancel
            </button>
            <button
              className="btn btn-sm bg-red-600 hover:bg-red-700 border-none text-white"
              onClick={() => handleDelete(selectedProblem._id)}
            >
              Confirm Delete
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
