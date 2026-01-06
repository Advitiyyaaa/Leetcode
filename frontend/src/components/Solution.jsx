export default function Solution({ problem }) {
  return (
    <div className="w-full">
      <div className=" rounded-xl p-3 sm:p-4 overflow-x-auto">
        <div className="space-y-4">
          {problem?.referenceSolution?.map((solution) => (
            <div
              key={solution._id}
              className="border border-white/10 rounded-xl p-3 sm:p-4 bg-[rgba(40,0,65,0.45)]"
            >
              <p className="text-sm sm:text-base text-gray-300 wrap-break-words">
                <span className="text-purple-300 font-semibold">Language: </span>
                
                {solution?.language}
              </p>

              <p className="text-sm sm:text-base text-gray-300 mt-2 overflow-x-auto whitespace-pre-wrap font-mono">
                <span className="text-purple-300 font-semibold">Correct Code:</span>
                <br />
                <code className="block p-2 rounded-lg bg-black/60 border border-white/10 text-gray-200 text-xs sm:text-sm overflow-x-auto">
                  {solution?.completedCode}
                </code>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
