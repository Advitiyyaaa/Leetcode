import { useSelector } from "react-redux";
import { ShieldUser } from "lucide-react";
import { Link } from "react-router";

export default function AdminButton() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated && user?.role === "admin") {
    return (
      <div className="dropdown dropdown-end">
        
          
          <Link to={"/admin"}>
            <button
              className="text-white font-medium btn btn-ghost rounded-3xl 
                        hover:bg-[rgba(40,0,65,0.45)] flex items-center justify-center gap-2
                        px-2 sm:px-4 w-10 sm:w-auto transition-all"
            >
              <ShieldUser
                color="white"
                className="w-6 h-6 sm:w-7 sm:h-7 shrink-0"
              />
              <p className="hidden sm:inline text-sm sm:text-base">Admin Access</p>
            </button>
          </Link>
        </div>
    );
  }

  return null;
}
