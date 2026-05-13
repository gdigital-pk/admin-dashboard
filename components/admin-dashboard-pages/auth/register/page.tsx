"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { SignupFormFieldKey, SignupFormValues } from "@/components/SignupFormFields";
import { SignupFormFields } from "@/components/SignupFormFields";

export default function RegisterPage() {
  const router = useRouter();
  const [values, setValues] = useState<SignupFormValues>({
    fullName: "",
    email: "",
    password: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Partial<Record<SignupFormFieldKey, string>>>({});

  const validateField = (name: SignupFormFieldKey, value: string) => {
    if (name === "fullName") return value.trim() ? "" : "Please enter your full name.";
    if (name === "email") return value.trim() ? "" : "Please enter your email.";
    if (name === "password")
      return !value ? "Please enter a password." : value.length < 6 ? "Password must be at least 6 characters." : "";
    if (name === "role") return value ? "" : "Please select a role.";
    return "";
  };

  const onFieldChange = (field: SignupFormFieldKey, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const nextErr = validateField(field, value);
      return { ...prev, [field]: nextErr || undefined };
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");

    const newErrors: Partial<Record<SignupFormFieldKey, string>> = {
      fullName: validateField("fullName", values.fullName),
      email: validateField("email", values.email),
      password: validateField("password", values.password),
      role: validateField("role", values.role),
    };

    if (newErrors.fullName || newErrors.email || newErrors.password || newErrors.role) {
      setErrors(newErrors);
      setMessage("Please fill in all required fields.");
      return;
    }

    setErrors({});
    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        role: values.role,
      }),
    });

    const data = await res.json();
    setLoading(false);
    setMessage(data.message);

    if (res.ok) {
      router.push("/login");
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-200 via-white to-pink-200 p-4">
      <div className="pointer-events-none absolute inset-0 z-0">
        <svg className="h-full w-full opacity-30" viewBox="0 0 700 500">
          <defs>
            <radialGradient id="eyeGradient1" cx="30%" cy="20%" r="90%" gradientTransform="rotate(25)">
              <stop offset="0%" stopColor="#a5b4fc" />
              <stop offset="100%" stopColor="#f0abfc" />
            </radialGradient>
            <radialGradient id="eyeGradient2" cx="70%" cy="80%" r="80%" gradientTransform="rotate(-25)">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#c7d2fe" />
            </radialGradient>
          </defs>
          <ellipse cx="350" cy="250" rx="360" ry="230" fill="url(#eyeGradient1)" />
          <ellipse cx="580" cy="380" rx="200" ry="140" fill="url(#eyeGradient2)" />
        </svg>
      </div>
      <form
        onSubmit={onSubmit}
        className="relative z-10 w-full max-w-md space-y-8 rounded-2xl border-2 border-white/80 bg-white/80 px-8 py-10 shadow-xl shadow-indigo-200 backdrop-blur-md transition duration-300 hover:scale-[1.015]"
        noValidate
      >
        <div className="mb-6 flex flex-col items-center">
          <span className="animate-bounce-slow mb-2 inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-indigo-300 bg-indigo-100 shadow-lg">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="8" className="stroke-indigo-400" strokeWidth="2.5" />
              <circle cx="12" cy="12" r="3" fill="#6366f1" />
              <ellipse cx="15.5" cy="10" rx="2" ry="1" fill="#6366f1" fillOpacity="0.4" />
            </svg>
          </span>
          <h1 className="text-4xl font-extrabold text-indigo-700 drop-shadow-sm">Sign Up</h1>
          <p className="mt-1 max-w-xs text-center text-base text-slate-500">
            Create your account to access the admin dashboard
          </p>
        </div>

        <SignupFormFields
          values={values}
          errors={errors}
          onChange={onFieldChange}
          passwordMode="required"
          disabled={loading}
        />

        {message && (
          <div className="text-center">
            <p
              className={`mt-4 rounded px-2 py-1 text-base font-semibold shadow ${
                message.toLowerCase().includes("success")
                  ? "border border-green-200 bg-green-50 text-green-700"
                  : "border border-pink-200 bg-red-50 text-pink-600"
              }`}
            >
              {message}
            </p>
          </div>
        )}
        <button
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 px-6 py-3 text-lg font-bold text-white shadow transition-transform duration-150 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-300 disabled:cursor-not-allowed disabled:from-indigo-300 disabled:via-rose-200 disabled:to-pink-300"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5 animate-spin text-white/90" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#fff" strokeWidth="4" />
                <path className="opacity-75" fill="#fff" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Creating account...
            </span>
          ) : (
            "Register"
          )}
        </button>
        <div className="mt-6 text-center">
          <p className="text-base font-medium text-slate-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-indigo-600 underline underline-offset-4 transition-colors hover:text-pink-500"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
}
