export default function ResultSection({ submitResult }) {
  if (!submitResult) {
    return (
      <div className="flex justify-center items-center h-full text-gray-400 text-sm bg-black/40 border border-white/10 rounded-xl">
        Submit your code to see the final result here.
      </div>
    );
  }

  const isAccepted =
    submitResult.status?.toLowerCase() === "accepted" ||
    submitResult.testCasesPassed === submitResult.testCasesTotal;

  return (
    <div className="p-4 text-gray-200 h-full overflow-y-auto bg-black/50 backdrop-blur-xl border border-white/10 shadow-[0_0_10px_rgba(157,0,255,0.15)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-purple-300">Submission Result</h2>

        <span
          className={`px-3 py-1 rounded-lg font-semibold text-sm border ${
            isAccepted
              ? "text-green-400 border-green-400 bg-green-900/20"
              : "text-red-400 border-red-400 bg-red-900/20"
          }`}
        >
          {isAccepted ? "Accepted" : "Rejected"}
        </span>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        <div className="p-3 rounded-lg bg-[rgba(40,0,65,0.45)] border border-white/10">
          <p className="text-xs text-gray-400">Status</p>
          <p
            className={`font-semibold ${
              isAccepted ? "text-green-400" : "text-red-400"
            }`}
          >
            {submitResult.status?.toUpperCase() || "UNKNOWN"}
          </p>
        </div>

        <div className="p-3 rounded-lg bg-[rgba(40,0,65,0.45)] border border-white/10">
          <p className="text-xs text-gray-400">Runtime</p>
          <p className="font-semibold text-gray-200">
            {submitResult?.runTime ? submitResult.runTime.toFixed(3) : "0.000"}s
          </p>
        </div>

        <div className="p-3 rounded-lg bg-[rgba(40,0,65,0.45)] border border-white/10">
          <p className="text-xs text-gray-400">Memory</p>
          <p className="font-semibold text-gray-200">
            {submitResult.memory || "0"} KB
          </p>
        </div>

        <div className="p-3 rounded-lg bg-[rgba(40,0,65,0.45)] border border-white/10 col-span-2 sm:col-span-3">
          <p className="text-xs text-gray-400">Test Cases Passed</p>
          <p className="font-semibold text-gray-200">
            {submitResult.testCasesPassed || 0} /{" "}
            {submitResult.testCasesTotal || 0}
          </p>
        </div>
      </div>

      {/* Error Section */}
      {submitResult.errorMessage && (
        <div className="bg-black/40 border border-red-400/40 text-red-300 rounded-lg p-3 text-sm">
          <p className="font-semibold mb-1">Error Message:</p>
          <p className="text-xs">{submitResult.errorMessage.slice(0, 300)}...</p>
        </div>
      )}

      {/* Footer */}
      <div className="text-xs text-gray-500 mt-4 border-t border-white/10 pt-2">
        {isAccepted
          ? "🎉 Great job! Your solution passed all test cases."
          : "⚠ Some test cases failed. Try debugging your solution and submit again."}
      </div>
    </div>
  );
}
