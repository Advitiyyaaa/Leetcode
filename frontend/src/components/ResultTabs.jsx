export default function ResultTabs({ runResult, submitResult }) {
  return (
    <div className="bg-black/50  backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-[0_0_15px_rgba(157,0,255,0.25)] text-gray-200 mt-3">
      {/* Run Results */}
      {runResult && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-purple-300 mb-3 border-b border-white/10 pb-1">
            Run Results
          </h2>

          {Array.isArray(runResult) && runResult.length > 0 ? (
            <div className="space-y-3">
              {runResult.map((t, i) => (
                <div
                  key={i}
                  className="bg-[rgba(40,0,65,0.45)] rounded-xl border border-white/10 p-4 transition hover:bg-[rgba(60,0,90,0.5)]"
                >
                  <p className="text-sm sm:text-base">
                    <span className="text-purple-300 font-semibold">Status:</span>{" "}
                    <span
                      className={`${
                        t.status?.description === "Accepted"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {t.status?.description || "N/A"}
                    </span>
                  </p>
                  <p className="text-sm sm:text-base">
                    <span className="text-purple-300 font-semibold">Time:</span>{" "}
                    {t.time ? `${t.time}s` : "—"}
                  </p>
                  <p className="text-sm sm:text-base">
                    <span className="text-purple-300 font-semibold">Memory:</span>{" "}
                    {t.memory ? `${t.memory} KB` : "—"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic text-sm">No run results found.</p>
          )}
        </div>
      )}

      {/* Submission Results */}
      {submitResult && (
        <div>
          <h2 className="text-lg font-semibold text-green-400 mb-3 border-b border-white/10 pb-1">
            Submission Result
          </h2>

          <div className="bg-black/50 border border-white/10 rounded-xl p-4 shadow-[0_0_10px_rgba(157,0,255,0.15)]">
            <p className="text-sm sm:text-base">
              <span className="text-purple-300 font-semibold">Status:</span>{" "}
              <span
                className={`${
                  submitResult.status === "accepted"
                    ? "text-green-400"
                    : "text-red-400"
                } font-semibold`}
              >
                {submitResult.status?.toUpperCase()}
              </span>
            </p>
            <p className="text-sm sm:text-base">
              <span className="text-purple-300 font-semibold">Runtime:</span>{" "}
              {submitResult.runTime ? `${submitResult.runTime}s` : "—"}
            </p>
            <p className="text-sm sm:text-base">
              <span className="text-purple-300 font-semibold">Memory:</span>{" "}
              {submitResult.memory ? `${submitResult.memory} KB` : "—"}
            </p>
            <p className="text-sm sm:text-base">
              <span className="text-purple-300 font-semibold">Test Cases:</span>{" "}
              {submitResult.testCasesPassed ?? 0} /{" "}
              {submitResult.testCasesTotal ?? 0}
            </p>
          </div>
        </div>
      )}

      {!runResult && !submitResult && (
        <p className="text-gray-400 italic text-center text-sm py-4">
          Run or submit your code to see results here.
        </p>
      )}
    </div>
  );
}
