import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { Edit, Loader2 } from "lucide-react";
 
export default function UpdateProblem() {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState(null);
  const [isClicked,setIsClicked] = useState(null)

  // Fetch all problems
  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      try {
        const res = await axiosClient.get("/problem/getAllProblem");
        setProblems(res.data);
      } catch (err) {
        console.error("Error fetching problems:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  // Open modal with full problem data
  const handleEditClick = async (problemSummary) => {
    try {
      setIsClicked(true);
      const res = await axiosClient.get(
        `/problem/problemForUpdate/${problemSummary._id}`
      );
      const full = res.data;

      const normalized = {
        ...full,
        visibleCases: full?.visibleCases || [],
        hiddenCases: full?.hiddenCases || [],
        starterCode: full?.starterCode || [],
        referenceSolution: full?.referenceSolution || [],
      };

      setSelectedProblem(normalized);
      setFormData(normalized);
      document.getElementById("update_modal").showModal();
    } catch (err) {
      console.error("Failed to load full problem:", err);
      alert("Failed to load problem details. See console.");
    } finally {
      setIsClicked(false);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle update API call
  const handleUpdate = async () => {
    if (!formData?._id) return;
    setUpdating(true);
    try {
      const res = await axiosClient.put(
        `/problem/update/${formData._id}`,
        formData
      );
      const updated = res.data;
      setProblems((prev) =>
        prev.map((p) =>
          p._id === updated._id
            ? {
                _id: updated._id,
                title: updated.title,
                difficulty: updated.difficulty,
                tags: updated.tags,
              }
            : p
        )
      );
      document.getElementById("update_modal").close();
    } catch (err) {
      console.error("Error updating problem:", err);
      alert("Failed to update problem. Check console for details.");
    } finally {
      setUpdating(false);
    }
  };

  const addVisibleCase = () =>
    setFormData((prev) => ({
      ...prev,
      visibleCases: [
        ...prev.visibleCases,
        { input: "", output: "", explanation: "" },
      ],
    }));

  const addHiddenCase = () =>
    setFormData((prev) => ({
      ...prev,
      hiddenCases: [...prev.hiddenCases, { input: "", output: "" }],
    }));

  return (
    <div className="min-h-screen w-[95%] container mx-auto text-white py-10">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">
        Update Problems
      </h1>

      {/* Problem Table */}
      <div className="overflow-x-auto bg-black/50 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_0_10px_rgba(157,0,255,0.25)] p-4">
        {loading ? (
          <div className="text-center text-gray-400 py-10">
            Loading problems...
          </div>
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
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {problem.tags?.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-lg text-xs bg-[rgba(108,25,160,0.35)] border border-white/10 text-purple-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm bg-blue-600/70 hover:bg-blue-600 border-none text-white rounded-lg flex gap-1 items-center mx-auto w-20"
                      onClick={() => handleEditClick(problem)}
                    >
                      {isClicked ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                        <>
                            <Edit className="w-4 h-4" /> Update
                        </>
                        )}

                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Update Modal */}
      <dialog id="update_modal" className="modal">
        <div className="modal-box bg-[rgba(20,0,40,0.9)] border border-white/10 backdrop-blur-xl text-gray-200 rounded-2xl shadow-[0_0_15px_rgba(157,0,255,0.4)] max-w-5xl overflow-y-auto max-h-[90vh]">
          <h3 className="font-bold text-lg text-purple-300 mb-3">
            Update Problem
          </h3>

          {formData ? (
            <div className="space-y-6">
              {/* BASIC INFO */}
              <div className="space-y-3">
                <div>
                  <label className="text-sm">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title || ""}
                    onChange={handleChange}
                    className="input bg-black/60 border border-white/20 w-full rounded-xl mt-1 p-2"
                  />
                </div>
                <div>
                  <label className="text-sm">Description</label>
                  <textarea
                    name="description"
                    value={formData.description || ""}
                    onChange={handleChange}
                    className="textarea bg-black/60 border border-white/20 w-full rounded-xl mt-1 p-2 h-28"
                  />
                </div>
              </div>

              {/* TEST CASES */}
              {["visibleCases", "hiddenCases"].map((type) => (
                <div
                  key={type}
                  className="border border-white/10 rounded-xl p-4 bg-[rgba(40,0,65,0.35)]"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-purple-300 font-semibold">
                      {type === "visibleCases"
                        ? "Visible Test Cases"
                        : "Hidden Test Cases"}
                    </h3>
                    <button
                      type="button"
                      onClick={
                        type === "visibleCases"
                          ? addVisibleCase
                          : addHiddenCase
                      }
                      className="btn btn-xs bg-purple-700/50 hover:bg-purple-700 border-none text-white"
                    >
                      + Add
                    </button>
                  </div>
                  {formData[type]?.length === 0 ? (
                    <p className="text-gray-400 text-sm">
                      No {type === "visibleCases" ? "visible" : "hidden"} test
                      cases yet.
                    </p>
                  ) : (
                    formData[type].map((tc, idx) => (
                      <div
                        key={idx}
                        className="bg-black/40 border border-white/10 rounded-xl p-3 mb-3 relative"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            const updated = formData[type].filter(
                              (_, i) => i !== idx
                            );
                            setFormData({
                              ...formData,
                              [type]: updated,
                            });
                          }}
                          className="p-0.5 text-red-400 hover:text-red-300 text-xs flex items-center gap-1"
                        >
                        Delete Test-case
                        </button>

                        <input
                          value={tc.input}
                          onChange={(e) => {
                            const newCases = [...formData[type]];
                            newCases[idx].input = e.target.value;
                            setFormData({ ...formData, [type]: newCases });
                          }}
                          placeholder="Input"
                          className="input bg-black/60 border-white/20 w-full rounded-lg p-2 mb-2"
                        />
                        <input
                          value={tc.output}
                          onChange={(e) => {
                            const newCases = [...formData[type]];
                            newCases[idx].output = e.target.value;
                            setFormData({ ...formData, [type]: newCases });
                          }}
                          placeholder="Output"
                          className="input bg-black/60 border-white/20 w-full rounded-lg p-2 mb-2"
                        />
                        {type === "visibleCases" && (
                          <textarea
                            value={tc.explanation}
                            onChange={(e) => {
                              const newCases = [...formData.visibleCases];
                              newCases[idx].explanation = e.target.value;
                              setFormData({
                                ...formData,
                                visibleCases: newCases,
                              });
                            }}
                            placeholder="Explanation"
                            className="textarea bg-black/60 border-white/20 w-full rounded-lg p-2"
                          />
                        )}
                      </div>
                    ))
                  )}
                </div>
              ))}

              {/* CODE SECTIONS */}
              {["starterCode", "referenceSolution"].map((section) => (
                <div
                  key={section}
                  className="border border-white/10 rounded-xl p-4 bg-[rgba(40,0,65,0.35)]"
                >
                  <h3 className="text-purple-300 font-semibold mb-3 capitalize">
                    {section === "starterCode"
                      ? "Starter Code (Initial)"
                      : "Reference Solution (Correct)"}
                  </h3>
                  {formData[section]?.map((sc, idx) => (
                    <div key={idx} className="mb-4">
                      <p className="text-sm text-purple-200 font-medium mb-1">
                        {sc.language?.toUpperCase()}
                      </p>
                      <textarea
                        value={
                          section === "starterCode"
                            ? sc.initialCode
                            : sc.completedCode
                        }
                        onChange={(e) => {
                          const newCodes = [...formData[section]];
                          if (section === "starterCode")
                            newCodes[idx].initialCode = e.target.value;
                          else newCodes[idx].completedCode = e.target.value;
                          setFormData({
                            ...formData,
                            [section]: newCodes,
                          });
                        }}
                        rows={8}
                        className="w-full bg-black/70 border border-purple-500/30 rounded-xl p-3 font-mono text-sm"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-400">
              Loading problem details...
            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn bg-gray-700 hover:bg-gray-600 border-none text-gray-200 rounded-xl">
                Close
              </button>
            </form>
            <button
              className="btn bg-purple-600/70 hover:bg-purple-600 border-none text-white rounded-xl px-4"
              onClick={handleUpdate}
              disabled={updating}
            >
              {updating ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Save Changes"
              )}
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
