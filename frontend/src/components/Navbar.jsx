import { Terminal } from "lucide-react";
import { useDispatch,useSelector } from "react-redux";
import { NavLink,Link,useNavigate } from "react-router"
import { logoutUser } from "../authSlice"
import { CircleUserRound } from 'lucide-react';
import AdminButton from "./AdminButton";

export default function Navbar(){
    const dispatch = useDispatch()
    const navigate = useNavigate(); 
    const {user} = useSelector((state)=> state.auth)
    const handleLogout = ()=>{
        dispatch(logoutUser())
        navigate("/auth"); 
    }
    return(
        <div className="flex items-center justify-between px-4 py-2 rounded-4xl relative
                    top-5 mx-auto w-[95%] z-50 backdrop-blur-md bg-black/70 border-b border-white/10 shadow-lg">
            <Link to="/home">           
                <div className="flex items-center gap-1">
                    <Terminal className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
                    <p className="text-lg sm:text-2xl font-bold text-white tracking-wide">
                    HeavyCoderr
                    </p>
                </div>
            </Link> 

            <div className="flex gap-0.5 items-center">

                {/* Admin Button */}
                <div>
                    <AdminButton/>
                </div>

                {/* User Button */}
                <div className="dropdown dropdown-end">
                    <div 
                        tabIndex="0" 
                        role="button" 
                        className="btn btn-ghost rounded-3xl hover:bg-[rgba(40,0,65,0.45)] flex items-center gap-2 px-2 sm:px-4"
                    >
                        <CircleUserRound
                            color="white"
                            className="w-6 h-6 sm:w-7 sm:h-7"
                        />

                        {/* Show name only on sm+ screens */}
                        <span className="sm:inline text-white text-sm sm:text-base font-medium">
                            {user?.firstName}
                        </span>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu dropdown-content rounded-box z-1 mt-4 w-52 p-2 shadow-sm bg-black">
                        <li className="hover:bg-[rgba(40,0,65,0.45)] rounded-lg"><button onClick={handleLogout}>Logout</button></li>
                    </ul>
                </div>

            </div>
        </div>
    )
}