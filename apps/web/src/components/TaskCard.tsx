import { ClockIcon, TrashIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import type React from "react";
import type { Task } from "../services/mockData";

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: string, status: Task["status"]) => void;
  onDelete?: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onStatusChange, onDelete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-cyan-100 dark:border-gray-700 hover:shadow-md transition group">
      <div className="flex items-start justify-between mb-2">
        <Link
          to="/todos/$id"
          params={{ id: task.id }}
          className="font-semibold text-gray-800 dark:text-gray-100 hover:text-cyan-600 dark:hover:text-cyan-400 text-sm"
        >
          {task.title}
        </Link>
        <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300">
          {task.group}
        </span>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{task.details}</p>

      <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-50 dark:border-gray-700/50 pt-2">
        <span className="flex items-center gap-1">
          <ClockIcon size={14} />{" "}
          {new Date(task.deadline).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>

        <div className="flex items-center gap-1">
          {task.status !== "To Do" && (
            <button
              onClick={() => onStatusChange(task.id, "To Do")}
              className="px-2 py-0.5 rounded text-[10px] bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200"
            >
              To Do
            </button>
          )}
          {task.status !== "In Progress" && (
            <button
              onClick={() => onStatusChange(task.id, "In Progress")}
              className="px-2 py-0.5 rounded text-[10px] bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 hover:bg-amber-200"
            >
              In Progress
            </button>
          )}
          {task.status !== "Completed" && (
            <button
              onClick={() => onStatusChange(task.id, "Completed")}
              className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200"
            >
              Done
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(task.id)}
              className="ml-1 text-red-400 hover:text-red-600 p-0.5"
              title="Delete Task"
            >
              <TrashIcon size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
