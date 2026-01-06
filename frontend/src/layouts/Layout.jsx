import { Outlet, useLocation} from "react-router";
import Navbar from "../components/Navbar";

export default function Layout() {

  const location = useLocation();
  const nonStickyRoutes = ["/problem/solve"];
  const isNonSticky = nonStickyRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#39016b] via-[#140026] to-black text-white">
      <Navbar />
      <main className="pt-8"> 
        <Outlet />  
      </main>
    </div>
  )
}
