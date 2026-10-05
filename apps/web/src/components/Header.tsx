import { SunIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import type React from "react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchWeather } from "../services/api";

export const Header: React.FC = () => {
  const { user } = useAuth();
  const [time, setTime] = useState<string>("");
  const [dateStr, setDateStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false }));
      setDateStr(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const { data: weather } = useQuery({
    queryKey: ["weather", user?.location],
    queryFn: () => fetchWeather("Ulaanbaatar"),
    staleTime: 1000 * 60 * 15,
  });

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-gray-100 dark:border-gray-800 gap-4">
      <div>
        <div className="text-3xl font-extrabold tracking-tight text-gray-800 dark:text-gray-100">
          {time}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{dateStr}</div>
      </div>

      <div className="flex items-center gap-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50">
        <div className="text-right">
          <div className="text-xs font-semibold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
            {user?.location || "Ulaanbaatar, Mongolia"}
          </div>
          <div className="text-sm font-bold text-gray-800 dark:text-gray-200">
            {weather
              ? `${Math.round(weather.main.temp)}°C ${weather.weather[0]?.main}`
              : "11°C Partly Cloudy"}
          </div>
        </div>
        <div className="p-2 bg-amber-50 dark:bg-amber-900/30 rounded-xl text-amber-500">
          <SunIcon size={24} weight="fill" />
        </div>
      </div>
    </header>
  );
};
