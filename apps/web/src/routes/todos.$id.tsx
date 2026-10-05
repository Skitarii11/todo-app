import { ArrowLeftIcon, CheckCircleIcon, ClockIcon, FolderIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import type React from "react";
import { fetchTaskById } from "../services/api";

export const TodoDetailComponent: React.FC = () => {
  const { id } = Route.useParams();

  const {
    data: task,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todo", id],
    queryFn: () => fetchTaskById(id),
  });

  if (isLoading)
    return <div className="p-8 text-center text-cyan-600">Loading task details...</div>;
  if (error || !task) return <div className="p-8 text-center text-red-500">Task not found</div>;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-cyan-100 dark:border-gray-800 shadow-sm max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link
          to="/tasks"
          className="text-xs font-bold text-cyan-600 hover:underline flex items-center gap-1"
        >
          <ArrowLeftIcon size={16} /> Back to Tasks
        </Link>
        <span className="text-xs px-3 py-1 rounded-full font-semibold bg-cyan-100 dark:bg-cyan-900/50 text-cyan-800 dark:text-cyan-200 flex items-center gap-1">
          <CheckCircleIcon size={14} /> {task.status}
        </span>
      </div>

      <div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{task.title}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {task.details || "No detailed description provided."}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-gray-800 text-xs">
        <div>
          <span className="text-gray-400 font-medium flex items-center gap-1 mb-1">
            <FolderIcon size={14} /> Group
          </span>
          <span className="font-bold text-gray-700 dark:text-gray-200">{task.group}</span>
        </div>
        <div>
          <span className="text-gray-400 font-medium flex items-center gap-1 mb-1">
            <ClockIcon size={14} /> Deadline
          </span>
          <span className="font-bold text-gray-700 dark:text-gray-200">
            {new Date(task.deadline).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/todos/$id")({
  component: TodoDetailComponent,
});
