export default function TestcaseSection({ runResult }) {
  // Handle when there's no result
  if (!runResult) {
    return (
      <div className="flex justify-center items-center h-full text-gray-400 text-sm">
        Run your code to see test results here.
      </div>
    );
  }

  return (
    <div className="p-4 text-gray-200 h-full overflow-y-auto bg-black/50 backdrop-blur-xl  border border-white/10 shadow-[0_0_10px_rgba(157,0,255,0.15)]">
      {/* Header */}
      <h2 className="text-xl font-bold text-purple-300 mb-3">
        Test Results
      </h2>

      {/* Summary Section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
        <div className="p-2 rounded-lg bg-[rgba(40,0,65,0.45)] border border-white/10">
          <p className="text-xs text-gray-400">Status</p>
          <p
            className={`font-semibold ${
              runResult?.every?.((r) => r.status?.id === 3)
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {runResult?.every?.((r) => r.status?.id === 3)
              ? "Passed"
              : "Failed"}
          </p>
        </div>
      </div>

      {/* Individual Testcases */}
      <div className="space-y-3">
        {runResult.map((test, index) => (
          <div
            key={index}
            className="bg-[rgba(40,0,65,0.45)] border border-white/10 rounded-xl p-3 hover:shadow-[0_0_12px_rgba(157,0,255,0.2)] transition"
          >
            <div className="flex justify-between mb-2">
              <p className="text-purple-300 font-medium">
                Testcase #{index + 1}
              </p>
              <p
                className={`font-semibold ${
                  test.status?.id === 3 ? "text-green-400" : "text-red-400"
                }`}
              >
                {test.status?.description || "Unknown"}
              </p>
            </div>

            <div className="text-xs sm:text-sm font-mono text-gray-300">
              <p>
                <span className="text-purple-300 font-semibold">Input:</span>{" "}
                {test.stdin || "—"}
              </p>
              <p>
                <span className="text-purple-300 font-semibold">Expected:</span>{" "}
                {test.expected_output || "—"}
              </p>
              <p>
                <span className="text-purple-300 font-semibold">Output:</span>{" "}
                {test.stdout || test.stderr || "—"}
              </p>
            </div>

            <div className="text-[0.7rem] text-gray-500 mt-2">
              Runtime: {test.time}s | Memory: {test.memory} KB
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
