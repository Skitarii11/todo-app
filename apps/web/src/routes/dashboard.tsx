import { CheckSquareIcon, ClockIcon } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import type React from "react";
import { useEffect, useRef } from "react";
import { useTodos } from "../hooks/useTodos";
import type { Task } from "../services/mockData";

export const DashboardComponent: React.FC = () => {
  const { allTasks, tasksByGroup, customGroups, updateStatus } = useTodos();
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timelineRef.current) {
      const currentHour = new Date().getHours();
      const targetHour = currentHour >= 8 ? currentHour - 1 : 8;
      const hourElement = document.getElementById(`timeline-hour-${targetHour}`);
      if (hourElement) {
        timelineRef.current.scrollTop = hourElement.offsetTop - 20;
      }
    }
  }, []);

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-cyan-100 dark:border-gray-800 shadow-sm flex flex-col min-h-0">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 shrink-0 flex items-center gap-2">
            <CheckSquareIcon size={20} className="text-cyan-500" />
            Today's View by Groups
          </h2>
          <div className="space-y-6 flex-1 overflow-y-auto pr-2">
            {customGroups.map((group: string) => {
              const groupTasks = tasksByGroup[group] || [];
              const completedCount = groupTasks.filter(
                (t: Task) => t.status === "Completed",
              ).length;
              const progressPct =
                groupTasks.length > 0 ? Math.round((completedCount / groupTasks.length) * 100) : 0;

              return (
                <div
                  key={group}
                  className="bg-cyan-50/40 dark:bg-gray-800/40 p-4 rounded-2xl border border-cyan-100/50 dark:border-gray-700/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-cyan-800 dark:text-cyan-300">
                      {group}
                    </span>
                    <span className="text-xs font-semibold text-gray-500">{progressPct}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mb-3 overflow-hidden">
                    <div
                      className="bg-cyan-500 h-full transition-all duration-300"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>

                  <div className="space-y-2">
                    {groupTasks.map((t: Task) => (
                      <div
                        key={t.id}
                        className="flex items-center justify-between bg-white dark:bg-gray-800 p-2.5 rounded-xl text-xs shadow-xs"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={t.status === "Completed"}
                            onChange={(e) =>
                              updateStatus({
                                id: t.id,
                                status: e.target.checked ? "Completed" : "To Do",
                              })
                            }
                            className="rounded text-cyan-500 focus:ring-cyan-400"
                          />
                          <span
                            className={
                              t.status === "Completed"
                                ? "line-through text-gray-400"
                                : "font-medium"
                            }
                          >
                            {t.title}
                          </span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-500">
                          {t.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-cyan-100 dark:border-gray-800 shadow-sm flex flex-col min-h-0">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 shrink-0 flex items-center gap-2">
            <ClockIcon size={20} className="text-cyan-500" />
            Today's Timeline
          </h2>
          <div ref={timelineRef} className="space-y-3 flex-1 overflow-y-auto pr-2 relative">
            {Array.from({ length: 24 }).map((_, i) => {
              const hour = i;
              const hourLabel =
                hour === 0
                  ? "12 AM"
                  : hour < 12
                    ? `${hour} AM`
                    : hour === 12
                      ? "12 PM"
                      : `${hour - 12} PM`;
              const task = allTasks.find((t: Task) => t.timeSlot === hour);
              const itemKey = `hour-${hour}`;

              return (
                <div
                  id={`timeline-hour-${hour}`}
                  key={itemKey}
                  className="flex items-center gap-4 text-xs border-b border-gray-50 dark:border-gray-800/80 pb-2 min-h-9"
                >
                  <span className="w-16 font-semibold text-gray-400 text-right shrink-0">
                    {hourLabel}
                  </span>
                  <div className="flex-1">
                    {task ? (
                      <div className="bg-cyan-100 dark:bg-cyan-900/40 text-cyan-800 dark:text-cyan-200 px-3 py-1.5 rounded-xl font-medium flex justify-between items-center shadow-xs">
                        <span>{task.title}</span>
                        <span className="text-[10px] uppercase font-bold text-cyan-600 dark:text-cyan-400">
                          {task.group}
                        </span>
                      </div>
                    ) : (
                      <div className="h-4 border-b border-dashed border-gray-100 dark:border-gray-800/50" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/dashboard")({
  component: DashboardComponent,
});
