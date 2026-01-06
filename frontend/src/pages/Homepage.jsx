import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosClient from "../utils/axiosClient";
import ProblemCard from "../components/problemCard";

/*SHIMMER*/
function ProblemShimmer() {
  return (
    <div className="flex items-center px-4 py-2 animate-pulse">
        <div className="flex-1 h-20 bg-[rgba(40,0,65,0.45)] rounded-xl"></div>
    </div>
  );
}

export default function Homepage() {
  const { user } = useSelector((state) => state.auth);

  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);

  const [loadingProblems, setLoadingProblems] = useState(true);
  const [loadingSolved, setLoadingSolved] = useState(false);

  const [filters, setFilters] = useState({
    difficulty: "all",
    tags: "all",
    status: "all",
  });

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoadingProblems(true);
        const { data } = await axiosClient.get("/problem/getAllProblem");
        setProblems(data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      } finally {
        setLoadingProblems(false);
      }
    };

    const fetchSolvedProblems = async () => {
      try {
        setLoadingSolved(true);
        const { data } = await axiosClient.get(
          "/problem/problemSolvedByUser"
        );
        setSolvedProblems(data);
      } catch (error) {
        console.error("Error fetching solved problems:", error);
      } finally {
        setLoadingSolved(false);
      }
    };

    fetchProblems();

    if (user) {
      fetchSolvedProblems();
    } else {
      setSolvedProblems([]);
    }
  }, [user]);

  const filteredProblems = problems.filter((problem) => {
    const difficultyMatch =
      filters.difficulty === "all" ||
      problem.difficulty === filters.difficulty;

    const tagMatch =
      filters.tags === "all" ||
      problem.tags.includes(filters.tags);

    const statusMatch =
      filters.status === "all" ||
      solvedProblems.some((sp) => sp._id === problem._id);

    return difficultyMatch && tagMatch && statusMatch;
  });

  const isLoading = loadingProblems || (user && loadingSolved);

  return (
    <div className="w-[85%] container mx-auto flex flex-col gap-5">

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          className="select select-bordered bg-black rounded-3xl w-full sm:w-[16.6%]"
          value={filters.status}
          onChange={(e) =>
            setFilters({ ...filters, status: e.target.value })
          }
        >
          <option value="all">All Problems</option>
          <option value="solved">Solved Problems</option>
        </select>

        <select
          className="select select-bordered bg-black rounded-3xl w-full sm:w-[16.6%]"
          value={filters.difficulty}
          onChange={(e) =>
            setFilters({ ...filters, difficulty: e.target.value })
          }
        >
          <option value="all">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <select
          className="select select-bordered bg-black rounded-3xl w-full sm:w-[16.6%]"
          value={filters.tags}
          onChange={(e) =>
            setFilters({ ...filters, tags: e.target.value })
          }
        >
          <option value="all">All Tags</option>
          <option value="String">String</option>
          <option value="Array">Array</option>
          <option value="LinkedList">Linked List</option>
          <option value="Graph">Graph</option>
          <option value="DP">Dynamic Programming</option>
        </select>
      </div>

      {/* Problems List */}
      <div className="flex flex-col bg-black rounded-3xl gap-2 w-full pb-2 mb-5">

        {/* Shimmer */}
        {isLoading &&
          Array.from({ length: 8 }).map((_, i) => (
            <ProblemShimmer key={i} />
          ))}

        {/* Problems */}
        {!isLoading &&
          filteredProblems.map((problem) => {
            const isSolved = solvedProblems.some(
              (sp) => sp._id === problem._id
            );
            return (
              <ProblemCard
                key={problem._id}
                problem={problem}
                isSolved={isSolved}
              />
            );
          })}

        {/* Empty State */}
        {!isLoading && filteredProblems.length === 0 && (
          <div className="text-center text-gray-400 py-10">
            No problems found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
}
