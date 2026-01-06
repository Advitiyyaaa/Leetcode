import { FilePlus2, FileEdit, Trash2, UserPlus,Video } from "lucide-react";
import { useNavigate } from "react-router";

export default function AdminPanel() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Create Problem",
      desc: "Add new coding challenges with test cases and solutions.",
      icon: <FilePlus2 className="w-8 h-8 text-purple-400" />,
      color: "from-purple-700/40 via-purple-800/30 to-black/60",
      hover: "hover:shadow-[0_0_25px_rgba(157,0,255,0.5)]",
      path: "/admin/create",
    },
    {
      title: "Update Problem",
      desc: "Modify existing problems and test data easily.",
      icon: <FileEdit className="w-8 h-8 text-blue-400" />,
      color: "from-blue-700/40 via-blue-800/30 to-black/60",
      hover: "hover:shadow-[0_0_25px_rgba(0,150,255,0.5)]",
      path: "/admin/update",
    },
    {
      title: "Delete Problem",
      desc: "Remove outdated or duplicate problems safely.",
      icon: <Trash2 className="w-8 h-8 text-red-400" />,
      color: "from-red-700/40 via-red-800/30 to-black/60",
      hover: "hover:shadow-[0_0_25px_rgba(255,0,100,0.5)]",
      path: "/admin/delete",
    },
    {
      title: "Register Admin",
      desc: "Create new admin accounts for problem management.",
      icon: <UserPlus className="w-8 h-8 text-green-400" />,
      color: "from-green-700/40 via-green-800/30 to-black/60",
      hover: "hover:shadow-[0_0_25px_rgba(0,255,120,0.5)]",
      path: "/admin/register",
    },
    {
      title: "Editorial Video",
      desc: "Add problem video solution",
      icon: <Video className="w-8 h-8 text-yellow-400" />,
      color: "from-yellow-700/40 via-yellow-800/30 to-black/60",
      hover: "hover:shadow-[0_0_25px_rgba(255,255,0,0.5)]",
      path: "/admin/video",
    },
  ];

  return (
    <div className="min-h-screen w-[95%] container mx-auto text-gray-100 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-white">
          Admin Control Panel
        </h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Manage coding problems and administrators with ease.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {actions.map((action, idx) => (
          <div
            key={idx}
            onClick={() => navigate(action.path)}
            className={`cursor-pointer group p-6 rounded-2xl
                        bg-linear-to-br ${action.color}
                        border border-white/10 backdrop-blur-xl
                        shadow-[0_0_10px_rgba(157,0,255,0.25)]
                        transition-all duration-300 transform
                        hover:scale-[1.02] ${action.hover}
                        hover:border-purple-500/30`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-black/50 rounded-xl border border-white/10 group-hover:border-purple-500/40 transition-all duration-300">
                {action.icon}
              </div>
              <h2 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
                {action.title}
              </h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {action.desc}
            </p>

            {/* Bottom glow accent */}
            <div className="h-1 mt-5 w-0 group-hover:w-full transition-all duration-500 bg-linear-to-r from-purple-500 via-pink-500 to-transparent rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
