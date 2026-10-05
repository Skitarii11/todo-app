import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import type React from "react";
import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import type { Task } from "../services/mockData";

function getStartOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

const groupColorMap: Record<string, string> = {
  Work: "bg-emerald-500 text-white",
  Hobby: "bg-amber-500 text-white",
  "Team 1": "bg-purple-500 text-white",
  General: "bg-cyan-500 text-white",
};

export const ScheduleComponent: React.FC = () => {
  const { allTasks } = useTodos();
  const [weekStart, setWeekStart] = useState<Date>(() => getStartOfWeek(new Date()));

  const handlePrevWeek = () => {
    setWeekStart((prev) => {
      const next = new Date(prev);
      next.setDate(next.getDate() - 7);
      return next;
    });
  };

  const handleNextWeek = () => {
    setWeekStart((prev) => {
      const next = new Date(prev);
      next.setDate(next.getDate() + 7);
      return next;
    });
  };

  const handleToday = () => {
    setWeekStart(getStartOfWeek(new Date()));
  };

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(weekStart);
    day.setDate(day.getDate() + i);
    return day;
  });

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const endOfWeek = new Date(weekStart);
  endOfWeek.setDate(endOfWeek.getDate() + 6);
  const weekRangeLabel = `${weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${endOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-4 sm:p-6 border border-cyan-100 dark:border-gray-800 shadow-sm flex flex-col h-[calc(100vh-120px)] md:h-[calc(100vh-140px)] min-h-0">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 shrink-0">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1 border border-gray-200 dark:border-gray-700">
            <button
              onClick={handlePrevWeek}
              className="p-1.5 hover:bg-white dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-200 transition font-bold"
              title="Previous Week"
            >
              <CaretLeftIcon size={16} />
            </button>
            <button
              onClick={handleNextWeek}
              className="p-1.5 hover:bg-white dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-200 transition font-bold"
              title="Next Week"
            >
              <CaretRightIcon size={16} />
            </button>
          </div>

          <button
            onClick={handleToday}
            className="px-3 py-1.5 bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 font-bold text-xs rounded-xl hover:bg-cyan-100 dark:hover:bg-cyan-900 transition border border-cyan-200 dark:border-cyan-800"
          >
            Today
          </button>

          <h2 className="text-sm sm:text-base font-extrabold text-gray-800 dark:text-gray-100">
            {weekRangeLabel}
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-[11px] sm:text-xs">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Work
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Hobby
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Team 1
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> General
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto min-h-0 flex flex-col">
        <div className="min-w-175 flex flex-col flex-1 min-h-0">
          <div className="grid grid-cols-8 border-b border-gray-200 dark:border-gray-800 pb-2 text-center text-xs font-bold text-gray-500 shrink-0">
            <div className="text-left pl-2">Time</div>
            {weekDays.map((day) => (
              <div
                key={day.toISOString()}
                className={`py-1 px-1.5 sm:px-2 rounded-xl ${
                  isToday(day)
                    ? "bg-cyan-500 text-white shadow-xs"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                <div>{day.toLocaleDateString("en-US", { weekday: "short" })}</div>
                <div className="text-xs sm:text-sm font-extrabold">{day.getDate()}</div>
              </div>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto pr-1 divide-y divide-gray-100 dark:divide-gray-800/60 mt-1">
            {hours.map((hour) => {
              const hourLabel = `${
                hour === 0
                  ? "12 AM"
                  : hour < 12
                    ? `${hour} AM`
                    : hour === 12
                      ? "12 PM"
                      : `${hour - 12} PM`
              }`;

              return (
                <div key={hour} className="grid grid-cols-8 min-h-12.5 items-stretch text-xs">
                  <div className="py-2 text-[10px] sm:text-[11px] font-semibold text-gray-400 pl-2 border-r border-gray-100 dark:border-gray-800/50">
                    {hourLabel}
                  </div>

                  {weekDays.map((day) => {
                    const cellTasks = allTasks.filter((t: Task) => {
                      const taskDate = new Date(t.deadline);
                      const isSameDay =
                        taskDate.getDate() === day.getDate() &&
                        taskDate.getMonth() === day.getMonth() &&
                        taskDate.getFullYear() === day.getFullYear();
                      return isSameDay && t.timeSlot === hour;
                    });

                    return (
                      <div
                        key={day.toISOString()}
                        className="p-1 border-r border-gray-50 dark:border-gray-800/30 min-h-12 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition flex flex-col gap-1"
                      >
                        {cellTasks.map((t: Task) => (
                          <div
                            key={t.id}
                            className={`p-1.5 rounded-lg text-[10px] sm:text-[11px] font-semibold shadow-xs ${
                              groupColorMap[t.group] || "bg-cyan-500 text-white"
                            }`}
                          >
                            <div className="truncate">{t.title}</div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/schedule")({
  component: ScheduleComponent,
});
