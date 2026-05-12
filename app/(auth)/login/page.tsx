"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "email":
        if (!value.trim()) error = "Please enter your email.";
        break;

      case "password":
        if (!value) error = "Please enter your password.";
        else if (value.length < 6)
          error = "Password must be at least 6 characters.";
        break;

      default:
        break;
    }

    return error;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setError("");

    const newErrors = {
      email: validateField("email", email),
      password: validateField("password", password),
    };

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    setErrors({
      email: "",
      password: "",
    });

    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/dashboard");
  };

  const handleChange =
    (field: "email" | "password") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      switch (field) {
        case "email":
          setEmail(value);
          setErrors((prev) => ({
            ...prev,
            email:
              prev.email && !validateField("email", value)
                ? ""
                : prev.email,
          }));
          break;

        case "password":
          setPassword(value);
          setErrors((prev) => ({
            ...prev,
            password:
              prev.password && !validateField("password", value)
                ? ""
                : prev.password,
          }));
          break;

        default:
          break;
      }
    };

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-white to-pink-200 p-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg className="w-full h-full opacity-30" viewBox="0 0 700 500">
          <defs>
            <radialGradient
              id="loginGradient1"
              cx="30%"
              cy="20%"
              r="90%"
              gradientTransform="rotate(25)"
            >
              <stop offset="0%" stopColor="#a5b4fc" />
              <stop offset="100%" stopColor="#f0abfc" />
            </radialGradient>

            <radialGradient
              id="loginGradient2"
              cx="70%"
              cy="80%"
              r="80%"
              gradientTransform="rotate(-25)"
            >
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#c7d2fe" />
            </radialGradient>
          </defs>

          <ellipse
            cx="350"
            cy="250"
            rx="360"
            ry="230"
            fill="url(#loginGradient1)"
          />

          <ellipse
            cx="580"
            cy="380"
            rx="200"
            ry="140"
            fill="url(#loginGradient2)"
          />
        </svg>
      </div>

      {/* Login Card */}
      <form
        onSubmit={onSubmit}
        noValidate
        className="relative z-10 w-full max-w-md space-y-7 bg-white/80 backdrop-blur-md border-2 border-white/80 rounded-2xl shadow-xl shadow-indigo-200 px-8 py-10 transition duration-300 hover:scale-[1.015]"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-4">
          <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-100 border-2 border-indigo-300 mb-3 shadow-lg animate-bounce-slow">
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 3L4 7V12C4 17 7.5 21.5 12 23C16.5 21.5 20 17 20 12V7L12 3Z"
                className="fill-indigo-500"
              />
              <path
                d="M9.5 12L11.2 13.7L14.8 10.1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <h1 className="text-4xl font-extrabold text-indigo-700 drop-shadow-sm">
            Welcome Back
          </h1>

          <p className="mt-1 text-slate-500 text-base text-center max-w-xs">
            Login to continue to your admin dashboard
          </p>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="block text-[1rem] font-semibold text-slate-900">
            Email <span className="text-pink-600">*</span>
          </label>

          <input
            type="email"
            value={email}
            onChange={handleChange("email")}
            placeholder="Enter your email address"
            autoComplete="email"
            required
            className={`w-full rounded-lg border-2 bg-white/90 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${
              errors.email
                ? "border-pink-500"
                : "border-indigo-200"
            }`}
          />

          {errors.email && (
            <p className="text-sm text-pink-600">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="block text-[1rem] font-semibold text-slate-900">
            Password <span className="text-pink-600">*</span>
          </label>

          <input
            type="password"
            value={password}
            onChange={handleChange("password")}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            minLength={6}
            className={`w-full rounded-lg border-2 bg-white/90 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${
              errors.password
                ? "border-pink-500"
                : "border-indigo-200"
            }`}
          />

          {errors.password && (
            <p className="text-sm text-pink-600">
              {errors.password}
            </p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-center">
            <p className="text-base font-semibold rounded px-3 py-2 bg-red-50 text-pink-600 border border-pink-200 shadow">
              {error}
            </p>
          </div>
        )}

        {/* Button */}
        <button
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 px-6 py-3 text-lg font-bold text-white shadow hover:scale-105 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-pink-300 disabled:from-indigo-300 disabled:via-rose-200 disabled:to-pink-300 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5 animate-spin text-white/90"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#fff"
                  strokeWidth="4"
                ></circle>

                <path
                  className="opacity-75"
                  fill="#fff"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>

              Signing in...
            </span>
          ) : (
            "Login"
          )}
        </button>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-base text-slate-600 font-medium">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-bold text-indigo-600 underline underline-offset-4 hover:text-pink-500 transition-colors"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
}