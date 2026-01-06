import { Link } from "react-router";
import { Check } from "lucide-react";

export default function ProblemCard({ problem, isSolved}) {
  return (
    <div className="
      bg-[rgba(40,0,65,0.45)] backdrop-blur-xl border border-white/10 
      shadow-[0_0_8px_rgba(157,0,255,0.25)] mt-2 mx-2 sm:mx-3 rounded-2xl
      transition-all duration-200 hover:bg-black
    ">
      <Link to={`/problem/${problem._id}`}>
      <div className="p-3 flex flex-col sm:flex-row justify-between gap-3 sm:items-center">
        <div className="flex items-center">

          {/* ✅ Solved Badge */}
          {isSolved ? (
            <div className="text-green-300 text-xs font-semibold 
              mr-4">
              <Check className="w-6 h-6" />
            </div>

          ):(<div className="mr-4"><div className="w-6 h-6" /></div>)}

          <div className="flex flex-col gap-1">
            <span className="text-gray-200 font-semibold text-sm sm:text-base">
              {problem.title}
            </span>
            
            <div className="flex gap-2 flex-wrap">
              {problem.tags.map(tag => <TagBadge key={tag} tag={tag} />)}
            </div>
          </div>
        </div>

        <div className="self-start sm:self-center">
          <DifficultyBadge difficulty={problem.difficulty} />
        </div>

      </div>
      </Link>
    </div>
  );
}

function DifficultyBadge({ difficulty }) {
    const colorMap = {
        easy: "bg-green-500/20 text-green-300 border border-green-400/40 shadow-[0_0_6px_rgba(16,185,129,0.45)]",
        medium: "bg-amber-500/20 text-amber-300 border border-amber-400/40 shadow-[0_0_6px_rgba(245,158,11,0.45)]",
        hard: "bg-pink-600/20 text-pink-300 border border-pink-500/40 shadow-[0_0_6px_rgba(236,72,153,0.45)]",
   };

    return (
        <span className={`text-xs font-medium px-2 py-1 rounded-xl backdrop-blur-sm ${colorMap[difficulty]}`}>
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </span>
    );
}

function TagBadge({ tag }) {
    const colorMap = {
        array: "bg-blue-600/30 text-blue-300 border border-blue-500/40",
        "linked-list": "bg-teal-600/30 text-teal-300 border border-teal-500/40",
        graph: "bg-purple-600/30 text-purple-300 border border-purple-500/40",
        dp: "bg-rose-600/30 text-rose-300 border border-rose-500/40",
        string: "bg-yellow-600/30 text-yellow-300 border border-yellow-500/40",
    };

    const style = colorMap[tag.toLowerCase()] || "bg-gray-600/30 text-gray-300 border border-gray-500/40";

    return (
        <span className={`text-xs font-medium px-2 py-1 rounded-lg backdrop-blur-sm mt-1 ${style}`}>
        {tag}
        </span>
    );
}