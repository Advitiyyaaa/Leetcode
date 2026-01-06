export default function Description({ problem }) {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">
        {problem?.title}
      </h1>

      <p className="text-gray-300 mb-4 text-sm sm:text-base">
        {problem?.description}
      </p>

      <div className="bg-[rgba(40,0,65,0.45)] border border-white/10 rounded-xl p-3">
        <h2 className="font-semibold mb-2 text-purple-300">Example</h2>

        <pre className="text-xs sm:text-sm text-gray-300 whitespace-pre-wrap">
          {problem?.visibleCases?.map((testcase) => (
            <div
              key={testcase._id}
              className="border border-white/10 rounded-xl p-3 bg-black/40 mb-3"
            >
              <p className="text-sm text-gray-300">
                <span className="text-purple-300 font-semibold">Input:</span>{" "}
                {testcase.input}
              </p>
              <p className="text-sm text-gray-300">
                <span className="text-purple-300 font-semibold">Output:</span>{" "}
                {testcase.output}
              </p>
              <p className="text-sm text-gray-300">
                <span className="text-purple-300 font-semibold">
                  Explanation:
                </span>{" "}
                {testcase.explanation}
              </p>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
