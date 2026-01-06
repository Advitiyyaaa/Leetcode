import Description from "./Description";
import Editorial from "./Editorial";
import Solution from "./Solution";
import Submission from "./Submission";
import { useEffect } from "react";
import AIchat from "./AIchat"
import { resetChat } from "../chatSlice";
import ProblemShimmer from "./ProblemShimmer";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function ProblemSection({
  problem,
  submissions,
  loading,
  code,
}) {
  const dispatch = useDispatch();
  const [section, SetSection] = useState('desc')
   useEffect(() => {
    if (problem?._id) {
      dispatch(resetChat());
    }
  }, [problem?._id, dispatch]);
  return (
    <div className="lg:w-1/2 p-4 overflow-y-auto backdrop-blur-md bg-black/50 rounded-2xl h-screen">
      {/* Section Tabs */}
      <div className="flex flex-wrap gap-2 bg-black rounded-xl p-2">
        <button
          className={`rounded-lg p-2 hover:bg-[rgba(40,0,65,0.45)] ${
            section === "desc" ? "bg-[rgba(40,0,65,0.45)]" : null
          }`}
          onClick={() => SetSection("desc")}
        >
          Description
        </button>

        <button
          className={`rounded-lg p-2 hover:bg-[rgba(40,0,65,0.45)] ${
            section === "editorial" ? "bg-[rgba(40,0,65,0.45)]" : null
          }`}
          onClick={() => SetSection("editorial")}
        >
          Editorial
        </button>

        <button
          className={`rounded-lg p-2 hover:bg-[rgba(40,0,65,0.45)] ${
            section === "solution" ? "bg-[rgba(40,0,65,0.45)]" : null
          }`}
          onClick={() => SetSection("solution")}
        >
          Solutions
        </button>

        <button
          className={`rounded-lg p-2 hover:bg-[rgba(40,0,65,0.45)] ${
            section === "submission" ? "bg-[rgba(40,0,65,0.45)]" : null
          }`}
          onClick={() => SetSection("submission")}
        >
          Submissions
        </button>
        <button
          className={`rounded-lg p-2 hover:bg-[rgba(40,0,65,0.45)] ${
            section === "AIchat" ? "bg-[rgba(40,0,65,0.45)]" : null
          }`}
          onClick={() => SetSection("AIchat")}
        >
          AIchat
        </button>
      </div>

      {/* Section Content */}
        <div className="w-[95%] container mx-auto pt-3">
            {loading ? (
                <ProblemShimmer />
            ) : (
                <>
                {section === "desc" && <Description problem={problem} />}
                {section === "editorial" && <Editorial secureUrl={problem?.secureUrl} thumbnailUrl={problem?.thumbnailUrl} duration={problem?.duration}/>}
                {section === "solution" && <Solution problem={problem} />}
                {section === "submission" && <Submission submissions={submissions}/>}
                {section === "AIchat" && <AIchat problem={problem} code={code} />}
                </>
            )}
        </div>

    </div>
  );
}
