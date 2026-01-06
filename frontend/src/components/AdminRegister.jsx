import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Terminal, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import axiosClient from "../utils/axiosClient";

/* ---------------- Schema ---------------- */
const adminSchema = z.object({
  firstName: z.string().min(3, "Min 3 characters"),
  lastName: z.string().optional(),
  emailId: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "Min 8 characters")
    .regex(/[A-Z]/, "1 uppercase required")
    .regex(/[a-z]/, "1 lowercase required")
    .regex(/[0-9]/, "1 number required")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "1 special character required"),
});

export default function AdminRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(adminSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await axiosClient.post("/user/admin/register", data);

      setSuccess("Admin registered successfully 🎉");
      reset();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.response?.data ||
        "Failed to register admin"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-150  px-4">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-black backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/20 p-8">

          {/* Header */}
          <div className="flex items-center mb-2">
            <h1 className="text-2xl font-bold text-white">
              Admin Registration
            </h1>
          </div>

          <p className="text-gray-400 mb-6 text-sm">
            Only admins can create other admins
          </p>

          {/* Success */}
          {success && (
            <div className="mb-4 bg-green-500/10 border border-green-500/30 text-green-400 p-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <input
              {...register("firstName")}
              placeholder="First Name"
              className="w-full px-4 py-2.5 bg-slate-900/90 border border-purple-500/20 rounded-lg text-white"
            />
            {errors.firstName && (
              <p className="text-red-400 text-xs">{errors.firstName.message}</p>
            )}

            <input
              {...register("lastName")}
              placeholder="Last Name (optional)"
              className="w-full px-4 py-2.5 bg-slate-900/90 border border-purple-500/20 rounded-lg text-white"
            />

            <input
              {...register("emailId")}
              placeholder="Admin Email"
              className="w-full px-4 py-2.5 bg-slate-900/90 border border-purple-500/20 rounded-lg text-white"
            />
            {errors.emailId && (
              <p className="text-red-400 text-xs">{errors.emailId.message}</p>
            )}

            {/* Password */}
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-2.5 pr-12 bg-slate-900/90 border border-purple-500/20 rounded-lg text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs">{errors.password.message}</p>
            )}

            <button
              disabled={loading}
              className="w-full py-3 mt-4 bg-linear-to-r from-purple-600 to-violet-600 rounded-lg text-white font-medium hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Creating Admin..." : "Create Admin"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
