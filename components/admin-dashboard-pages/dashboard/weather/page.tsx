"use client";

import InfoCard from "@/components/InfoCard";
import { useState } from "react";
import type { FormEvent, ReactNode } from "react";

import {
  CloudSun,
  Cloud,
  CloudRain,
  CloudFog,
  Snowflake,
  Wind,
  Clock3,
  Search,
} from "lucide-react";

type WeatherData = {
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
    time: string;
  };

  daily: {
    time: string[];
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
};

type WeatherMood = {
  label: string;
  gradient: string;
  icon: ReactNode;
};

const defaultWeather: WeatherMood = {
  label: "Weather",
  gradient: "from-indigo-500 via-violet-500 to-pink-500",
  icon: <CloudSun className="h-14 w-14 text-white" />,
};

export default function WeatherPage() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");

  const getWeatherMood = (code: number): WeatherMood => {
    if (code === 0) {
      return {
        label: "Clear Sky",
        gradient: "from-yellow-400 via-orange-400 to-pink-500",
        icon: <CloudSun className="h-14 w-14 text-white" />,
      };
    }

    if ([1, 2, 3].includes(code)) {
      return {
        label: "Cloudy",
        gradient: "from-sky-400 via-cyan-400 to-blue-500",
        icon: <Cloud className="h-14 w-14 text-white" />,
      };
    }

    if ([45, 48].includes(code)) {
      return {
        label: "Foggy",
        gradient: "from-slate-400 via-slate-500 to-slate-700",
        icon: <CloudFog className="h-14 w-14 text-white" />,
      };
    }

    if ([51, 53, 55, 61, 63, 65].includes(code)) {
      return {
        label: "Rainy",
        gradient: "from-indigo-500 via-blue-500 to-cyan-500",
        icon: <CloudRain className="h-14 w-14 text-white" />,
      };
    }

    if ([71, 73, 75].includes(code)) {
      return {
        label: "Snow",
        gradient: "from-cyan-200 via-sky-300 to-indigo-400",
        icon: <Snowflake className="h-14 w-14 text-white" />,
      };
    }

    return defaultWeather;
  };

  const searchWeather = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setData(null);

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          city
        )}&count=1`
      );

      const geoJson = await geoRes.json();
      const location = geoJson?.results?.[0];

      if (!location) {
        setError("City not found.");
        return;
      }

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`
      );

      const weatherJson = await weatherRes.json();

      setData(weatherJson);
    } catch {
      setError("Could not fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  const weatherInfo = data
    ? getWeatherMood(data.current_weather.weathercode)
    : defaultWeather;

  const weeklyForecast =
    data?.daily.time.map((day, index) => {
      const mood = getWeatherMood(data.daily.weathercode[index]);

      return {
        day,
        label: mood.label,
        icon: mood.icon,
        gradient: mood.gradient,
        max: data.daily.temperature_2m_max[index],
        min: data.daily.temperature_2m_min[index],
      };
    }) || [];
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-100 via-white to-pink-100 p-4 sm:p-8">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-pink-300/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl" />

      <section className="relative z-10 mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-2xl backdrop-blur-xl">
          <div className={`bg-gradient-to-r ${weatherInfo.gradient} px-8 py-10 text-white`} >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
                  Weather Dashboard
                </p>

                <h1 className="mt-3 text-4xl font-black sm:text-5xl">
                  Live Weather
                </h1>

                <p className="mt-3 max-w-lg text-sm text-white/90 sm:text-base">
                  Search any city and get real-time weather updates with a
                  modern dashboard experience.
                </p>
              </div>

              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                {weatherInfo.icon}
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <form onSubmit={searchWeather} className="flex flex-col gap-4 sm:flex-row"
            >
              <div className="relative flex-1">
                <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Search city..." required
                  className="w-full rounded-2xl border-2 border-indigo-100 bg-white px-5 py-4 text-base font-medium text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100" />

                <Search className="absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              </div>

              <button
                disabled={loading}
                className={`rounded-2xl bg-gradient-to-r ${weatherInfo.gradient} px-8 py-4 font-bold text-white shadow-lg transition hover:scale-[1.03] disabled:opacity-70`}
              >
                {loading ? "Loading..." : "Get Weather"}
              </button>
            </form>

            {error && (
              <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                {error}
              </div>
            )}

            {data && (
              <>
                <div className="mt-8 grid gap-6 lg:grid-cols-4">
                  <div
                    className={`lg:col-span-2 rounded-3xl bg-gradient-to-br ${weatherInfo.gradient} p-8 text-white shadow-xl`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm uppercase tracking-widest text-white/80">
                          Current Weather
                        </p>

                        <h2 className="mt-3 text-6xl font-black">
                          {data.current_weather.temperature}°
                        </h2>

                        <p className="mt-2 text-lg font-semibold">
                          {weatherInfo.label}
                        </p>
                      </div>
                      {weatherInfo.icon}
                    </div>
                  </div>

                  <InfoCard icon={<Wind className="h-10 w-10 text-sky-600" />} badge="Wind" value={`${data.current_weather.windspeed} km/h`} subtitle="Wind speed" badgeColor="bg-sky-100 text-sky-700" />

                  <InfoCard icon={<Clock3 className="h-10 w-10 text-violet-600" />} badge="Updated" value={new Date(data.current_weather.time).toLocaleTimeString()} subtitle={new Date(data.current_weather.time).toLocaleDateString()} badgeColor="bg-violet-100 text-violet-700" />
                </div>

                {weeklyForecast.length > 0 && (
                  <div className="mt-10">
                    <h2 className="mb-5 text-2xl font-black text-slate-900">
                      7-Day Forecast
                    </h2>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                      {weeklyForecast.map((item) => (
                        <div
                          key={item.day}
                          className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-lg backdrop-blur-xl transition transform hover:scale-[1.03] hover:shadow-2xl hover:border-indigo-200 hover:bg-white"
                          style={{ cursor: "pointer" }}
                        >
                          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient}`} >
                            {item.icon}
                          </div>

                          <h3 className="mt-4 text-lg font-bold text-slate-900">
                            {new Date(item.day).toLocaleDateString("en-US", { weekday: "long" })}
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            {item.label}
                          </p>

                          <div className="mt-4 flex items-center gap-3">
                            <span className="text-2xl font-black text-slate-900">
                              {Math.round(item.max)}°
                            </span>

                            <span className="text-slate-400">
                              {Math.round(item.min)}°
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}