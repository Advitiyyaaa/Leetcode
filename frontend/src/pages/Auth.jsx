import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Terminal, Eye, EyeOff} from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { registerUser, loginUser} from "../authSlice";
import { clearError } from "../authSlice";

const signupSchema = z.object({
  firstName: z.string().min(3, "Name should be at least 3 characters").max(25, "Name should be less than 25 characters"),
  lastName: z.string().max(25).optional(),
  emailId: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password should be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[!@#$%^&*(),.?\":{}|<>]/, "Must contain at least one special character"),
});

const loginSchema = z.object({
  emailId: z.string().email(),
  password: z.string().min(1),
});



export default function Auth() {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state?.auth
  );

  useEffect(() => {
    if (error) {
        setShowErrorModal(true);
    }
  }, [error]);

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const form = useForm({
    resolver: zodResolver(mode === "signup" ? signupSchema : loginSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data) => {
    if (mode === "signup") {
      dispatch(registerUser(data));
    } else {
      dispatch(loginUser(data));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-black via-[#140026] to-[#39016b] px-4 py-10 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md relative">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-linear-to-r from-purple-600 via-violet-600 to-purple-600 rounded-2xl blur-lg opacity-30 transition duration-1000"></div>
        
        {/* Card content */}
        <div className="relative bg-black backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/20 overflow-hidden">
          {/* Header with gradient */}
          <div className=" px-8 pt-8 pb-6 border-b border-purple-500/20">
            <div className="flex items-center mb-6">
              <div className="py-2 mr-1 rounded-lg">
                <Terminal className="w-10 h-10 text-purple-400" />
              </div>
              <h1 className="text-3xl font-bold bg-white bg-clip-text text-transparent">
                HeavyCoderr
              </h1>
            </div>
            
            <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
              {mode === "signup" ? (
                <>
                  Create an account
                </>
              ) : (
                "Welcome back"
              )}
            </h2>
            <p className="text-gray-400 mt-1 text-sm">
              {mode === "signup" 
                ? "Start your coding journey today" 
                : "Sign in to continue coding"}
            </p>
          </div>

          <div className="px-8 py-6">
            {/* Mode Toggle */}
            <div className="flex bg-slate-950/50 rounded-xl p-1 mb-6 border border-purple-500/10">
              <button
                type="button"
                className={`flex-1 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  mode === "login"
                    ? "bg-linear-to-r from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-500/30"
                    : "text-gray-400 hover:text-gray-300"
                }`}
                onClick={() => setMode("login")}
              >
                Login
              </button>
              <button
                type="button"
                className={`flex-1 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  mode === "signup"
                    ? "bg-linear-to-r from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-500/30"
                    : "text-gray-400 hover:text-gray-300"
                }`}
                onClick={() => setMode("signup")}
              >
                Sign Up
              </button>
            </div>

            {/* Divider
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-700"></div>
              <span className="px-3 text-gray-500 text-sm">or continue with email</span>
              <div className="flex-1 border-t border-gray-700"></div>
            </div> */}

            {/* Form Fields */}
            <div className="space-y-4">
              {mode === "signup" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      {...register("firstName")}
                      className="w-full px-4 py-2.5 bg-slate-950/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="text-red-400 text-xs mt-1.5">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      {...register("lastName")}
                      className="w-full px-4 py-2.5 bg-slate-950/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  {...register("emailId")}
                  type="email"
                  className="w-full px-4 py-2.5 bg-slate-950/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                  placeholder="you@example.com"
                />
                {errors.emailId && (
                  <p className="text-red-400 text-xs mt-1.5">
                    {errors.emailId.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-2.5 pr-12 bg-slate-950/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1.5">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <p className="text-red-400 text-sm text-center">{error}</p>
                </div>
              )} */}

              <button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                disabled={loading}
                className="w-full py-3 bg-linear-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-medium rounded-lg shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  mode === "signup" ? "Create Account" : "Sign In"
                )}
              </button>
            </div>

            <p className="text-center text-gray-500 text-sm mt-6">
              {mode === "signup" ? (
                <>Already have an account? <button type="button" onClick={() => setMode("login")} className="text-purple-400 hover:text-purple-300 font-medium">Sign in</button></>
              ) : (
                <>Don't have an account? <button type="button" onClick={() => setMode("signup")} className="text-purple-400 hover:text-purple-300 font-medium">Sign up</button></>
              )}
            </p>
          </div>
        </div>
      </div>
      {/* Error Modal */}
        {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="bg-slate-900 border border-red-500/40 rounded-xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-xl font-semibold text-red-400 mb-3">
                Authentication Failed
            </h3>

            <p className="text-gray-300 mb-6">
                {error}
            </p>

            <div className="flex justify-end gap-3">
                <button
                className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600"
                onClick={() =>{ 
                  setShowErrorModal(false)
                  dispatch(clearError());
                }}
                >
                Retry
                </button>
            </div>
            </div>
        </div>
        )}
    
    </div>
  );
}