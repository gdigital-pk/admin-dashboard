"use client";

import { FormEvent, useState } from "react";
import { Zap, Globe2, ShieldCheck, Rocket } from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";

export default function CurrencyPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const convert = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(
        `https://open.er-api.com/v6/latest/${from}`
      );

      const data = await res.json();
      const rate = data?.rates?.[to];
      if (!rate) {
        setError("Invalid currency selection.");
        return;
      }

      setResult(Number(amount) * rate);
    } catch {
      setError("Could not convert currency.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-violet-100 via-white to-cyan-100 p-4 sm:p-8">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-violet-300/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-300/30 blur-3xl" />

      <section className="relative z-10 mx-auto max-w-5xl">

        <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-2xl backdrop-blur-xl">
          <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 px-8 py-10 text-white">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
                  Finance Dashboard
                </p>

                <h1 className="mt-3 text-4xl font-black sm:text-5xl">
                  Currency Converter
                </h1>

                <p className="mt-3 max-w-2xl text-sm text-white/90 sm:text-base">
                  Instantly convert currencies with a modern and beautiful experience.
                </p>
              </div>

              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                <Rocket className="h-14 w-14 text-white" />
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <form onSubmit={convert} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Amount
                </label>

                <input type="number" min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} required placeholder="Enter amount"
                  className="w-full rounded-2xl border-2 border-violet-100 bg-white px-5 py-4 text-lg font-semibold text-slate-900 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100" />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    From
                  </label>

                  <input value={from} onChange={(e) => setFrom(e.target.value.toUpperCase())} required placeholder="USD"
                    className="w-full rounded-2xl border-2 border-indigo-100 bg-white px-5 py-4 text-lg font-bold uppercase text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    To
                  </label>

                  <input value={to} onChange={(e) => setTo(e.target.value.toUpperCase())} required placeholder="EUR"
                    className="w-full rounded-2xl border-2 border-cyan-100 bg-white px-5 py-4 text-lg font-bold uppercase text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100" />
                </div>
              </div>

              <button disabled={loading} className="w-full rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 px-8 py-4 text-lg font-bold text-white shadow-xl transition hover:scale-[1.02] disabled:opacity-70">
                {loading ? "Converting..." : "Convert Currency"}
              </button>
            </form>

            {error && (
              <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
                {error}
              </div>
            )}

            {result !== null && (
              <div className="mt-8 rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-8 text-white shadow-2xl">

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-white/80">
                      Conversion Result
                    </p>

                    <h2 className="mt-4 text-4xl font-black sm:text-5xl">
                      {result.toFixed(2)} {to}
                    </h2>

                    <p className="mt-3 text-lg text-white/90">
                      {amount} {from} converted successfully
                    </p>
                  </div>

                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                    <Rocket className="h-14 w-14 text-white" />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <FeatureCard icon={<Zap className="h-8 w-8 text-violet-600" />} title="Fast Conversion" text="Real-time exchange rates with instant results." />

              <FeatureCard icon={<Globe2 className="h-8 w-8 text-cyan-600" />} title="Global Currencies" text="Convert between worldwide currency formats." />

              <FeatureCard icon={<ShieldCheck className="h-8 w-8 text-emerald-600" />} title="Secure & Reliable" text="Accurate exchange data powered by live APIs." />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}