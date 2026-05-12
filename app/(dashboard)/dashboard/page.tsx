import { auth } from "@/auth";
import { LayoutDashboard, User, Shield, CheckCircle, Lock, TrendingUp, Users, Activity, Bell, Rocket } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();

  const firstName =
    session?.user?.name?.split(" ")[0] || "User";

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-100 via-white to-pink-100 p-4 sm:p-8">
      {/* Background Effects */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-pink-300/30 blur-3xl" />

      <section className="relative z-10 mx-auto max-w-7xl space-y-8">

        {/* Hero Section */}
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 p-8 text-white shadow-2xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            {/* Left Content */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
                Admin Dashboard
              </p>

              <h1 className="mt-4 flex items-center gap-2 text-4xl font-black sm:text-5xl">
                <LayoutDashboard className="h-9 w-9 text-white/80" />
                Welcome Back, {firstName} 👋
              </h1>
         

              <p className="mt-4 max-w-2xl text-sm text-white/90 sm:text-base">
                Manage users, monitor analytics, track weather updates,
                and explore currency conversions all in one modern dashboard.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur-md">
                  <Rocket className="h-4 w-4" /> Productivity
                </span>

                <span className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur-md">
                  <Lock className="h-4 w-4" /> Secure Access
                </span>

                <span className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur-md">
                  <TrendingUp className="h-4 w-4" /> Fast Performance
                </span>
              </div>
         
            </div>

            {/* Right Icon */}
            <div className="flex h-40 w-40 items-center justify-center rounded-full bg-white/20 text-7xl shadow-2xl backdrop-blur-xl">
              <LayoutDashboard className="h-20 w-20 text-white/90" />
            </div>
          </div>
        </div>

        {/* User Info Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {/* Name Card */}
          <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur-md transition hover:-translate-y-1 hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="rounded-2xl bg-indigo-100 p-4 text-3xl">
                <User className="h-8 w-8 text-indigo-600" />
              </div>

              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                User
              </span>
            </div>

            <p className="mt-6 text-sm font-medium text-slate-500">
              Logged In As
            </p>

            <h2 className="mt-2 text-2xl font-black text-slate-900">
              {session?.user?.name}
            </h2>
          </div>

          {/* Role Card */}
          <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur-md transition hover:-translate-y-1 hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="rounded-2xl bg-violet-100 p-4 text-3xl">
                <Shield className="h-8 w-8 text-violet-600" />
              </div>

              <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">
                Access
              </span>
            </div>

            <p className="mt-6 text-sm font-medium text-slate-500">
              Account Role
            </p>

            <h2 className="mt-2 text-2xl font-black capitalize text-slate-900">
              {session?.user?.role}
            </h2>
          </div>

          {/* Status Card */}
          <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur-md transition hover:-translate-y-1 hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="rounded-2xl bg-emerald-100 p-4 text-3xl">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                Active
              </span>
            </div>

            <p className="mt-6 text-sm font-medium text-slate-500">
              System Status
            </p>

            <h2 className="mt-2 text-2xl font-black text-slate-900">
              Online
            </h2>
          </div>

          {/* Security Card */}
          <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur-md transition hover:-translate-y-1 hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="rounded-2xl bg-pink-100 p-4 text-3xl">
                <Lock className="h-8 w-8 text-pink-600" />
              </div>

              <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-pink-700">
                Protected
              </span>
            </div>

            <p className="mt-6 text-sm font-medium text-slate-500">
              Authentication
            </p>

            <h2 className="mt-2 text-2xl font-black text-slate-900">
              Secure
            </h2>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* Quick Overview */}
          <div className="lg:col-span-2 rounded-3xl border border-white/60 bg-white/80 p-8 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                  Overview
                </p>

                <h2 className="mt-2 text-3xl font-black text-slate-900">
                  Dashboard Insights
                </h2>
              </div>

              <div className="rounded-2xl bg-indigo-100 p-4 text-4xl">
                <TrendingUp className="h-10 w-10 text-indigo-600" />
              </div>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-3">

              <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 p-5 text-white shadow-lg">
                <p className="text-sm text-white/80">
                  Active Sessions
                </p>

                <h3 className="mt-3 text-4xl font-black">
                  12
                </h3>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 p-5 text-white shadow-lg">
                <p className="text-sm text-white/80">
                  Total Users
                </p>

                <h3 className="mt-3 text-4xl font-black">
                  248
                </h3>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 p-5 text-white shadow-lg">
                <p className="text-sm text-white/80">
                  Performance
                </p>

                <h3 className="mt-3 text-4xl font-black">
                  98%
                </h3>
              </div>
            </div>
          </div>

          {/* Activity Card */}
          <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pink-600">
                  Activity
                </p>

                <h2 className="mt-2 text-2xl font-black text-slate-900">
                  Recent
                </h2>
              </div>

              <div className="rounded-2xl bg-pink-100 p-4 text-4xl">
                <Bell className="h-8 w-8 text-pink-600" />
              </div>
            </div>

            <div className="mt-8 space-y-5">

              <div className="flex items-start gap-4">
                <div className="mt-1 rounded-full bg-emerald-100 p-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                </div>

                <div>
                  <p className="font-semibold text-slate-800">
                    Login Successful
                  </p>

                  <p className="text-sm text-slate-500">
                    Your session is active
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 rounded-full bg-indigo-100 p-2">
                  <Users className="h-5 w-5 text-indigo-600" />
                </div>

                <div>
                  <p className="font-semibold text-slate-800">
                    User Management
                  </p>

                  <p className="text-sm text-slate-500">
                    Manage team members easily
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 rounded-full bg-pink-100 p-2">
                  <Rocket className="h-5 w-5 text-pink-600" />
                </div>

                <div>
                  <p className="font-semibold text-slate-800">
                    System Optimized
                  </p>

                  <p className="text-sm text-slate-500">
                    Everything is running smoothly
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}