import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/auth";
import type { RegisterRequest } from "../types";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    defaultValues: {
      role: "USER",
    },
  });

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: RegisterRequest) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await registerUser(data);
      navigate("/login");
    } catch (error: any) {
      const msg = error.response?.data?.message || "Registration failed. Please try again.";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-50 via-white to-purple-50 px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-indigo-50/50 p-8 transition-all hover:shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-gray-500 mt-2 text-sm">Join us and access your secure dashboard</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className={`w-full px-4 py-3 rounded-lg border text-gray-900 placeholder-gray-400 bg-white transition-colors duration-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${
                errors.name ? "border-red-300 focus:ring-red-500/20 focus:border-red-500" : "border-gray-200"
              }`}
              placeholder="John Doe"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className={`w-full px-4 py-3 rounded-lg border text-gray-900 placeholder-gray-400 bg-white transition-colors duration-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${
                errors.email ? "border-red-300 focus:ring-red-500/20 focus:border-red-500" : "border-gray-200"
              }`}
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`w-full px-4 py-3 rounded-lg border text-gray-900 placeholder-gray-400 bg-white transition-colors duration-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${
                errors.password ? "border-red-300 focus:ring-red-500/20 focus:border-red-500" : "border-gray-200"
              }`}
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                validate: (value) => /\d/.test(value) || "Password must contain at least one number",
              })}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="role">
              Account Role
            </label>
            <select
              id="role"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-900 bg-white transition-colors duration-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              {...register("role", { required: "Role is required" })}
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Global Error Message */}
        {errorMessage && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
            {errorMessage}
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline font-semibold transition-colors duration-200">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
