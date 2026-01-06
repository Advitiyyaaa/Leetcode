import { Check, X } from "lucide-react";
export default function Submission({ submissions, setSubmissions }) {
 
  if (!submissions || submissions.length === 0) {
    return (
      <div className="text-gray-400 text-center py-6">
        No submissions found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {submissions.map((submission, index) => (
        <div
          key={submission._id || index}
          className="bg-[rgba(40,0,65,0.45)] border border-white/10 
                     rounded-2xl p-4 flex flex-col gap-3"
        >
          {/* Header */}
          <div className="flex flex-wrap justify-between items-center text-sm">
            <p className="text-purple-300 font-semibold">
              Language:{" "}
              <span className="text-gray-300">{submission.language}</span>
            </p>
            <p
              className={`font-semibold flex ${
                submission.status === "accepted"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {submission.status === "accepted"?<Check className="w-5 h-5" />:<X className="w-5 h-5" />}
              {submission.status.toUpperCase()}
            </p>
          </div>

          {/* Code */}
          <div className="bg-black/40 border border-white/10 rounded-xl p-3 max-h-60 overflow-y-auto">
            <pre className="text-xs sm:text-sm text-gray-300 whitespace-pre-wrap font-mono">
              {submission.code}
            </pre>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-gray-300">
            <p>
              <span className="text-purple-300 font-medium">Runtime:</span>{" "}
              {submission.runTime}s
            </p>
            <p>
              <span className="text-purple-300 font-medium">Memory:</span>{" "}
              {submission.memory} KB
            </p>
            <p>
              <span className="text-purple-300 font-medium">Testcases:</span>{" "}
              {submission.testCasesPassed}/{submission.testCasesTotal}
            </p>
          </div>

          {/* Timestamps */}
          <div className="text-[0.7rem] sm:text-xs text-gray-400">
            Submitted on:{" "}
            {new Date(submission.createdAt).toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </div>
        </div>
      ))}
    </div>
  );
}