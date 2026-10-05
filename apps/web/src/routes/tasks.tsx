import { PlusIcon } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import type React from "react";
import { useState } from "react";
import { TaskCard } from "../components/TaskCard";
import { TaskModal } from "../components/TaskModal";
import { useTodos } from "../hooks/useTodos";
import type { Task } from "../services/mockData";

export const TasksComponent: React.FC = () => {
  const { tasks, addTask, updateStatus, deleteTask } = useTodos();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [groups, setGroups] = useState<string[]>(["General", "Work", "Hobby", "Team 1"]);

  const handleAddGroup = () => {
    if (newGroupName.trim() && !groups.includes(newGroupName.trim())) {
      setGroups([...groups, newGroupName.trim()]);
      setNewGroupName("");
    }
  };

  const todoTasks = tasks.filter((t: Task) => t.status === "To Do");
  const inProgressTasks = tasks.filter((t: Task) => t.status === "In Progress");
  const completedTasks = tasks.filter((t: Task) => t.status === "Completed");

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] gap-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="New Group Name..."
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button
            onClick={handleAddGroup}
            className="flex items-center gap-1 px-3 py-1.5 bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 text-xs font-bold rounded-xl hover:bg-cyan-200 transition"
          >
            <PlusIcon size={14} /> Create Group
          </button>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl text-xs font-bold shadow-md transition"
        >
          <PlusIcon size={14} /> Add New Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0">
        <div className="bg-cyan-50/50 dark:bg-gray-900/50 rounded-3xl p-4 border border-cyan-100 dark:border-gray-800 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-4 px-2 shrink-0">
            <h3 className="font-extrabold text-gray-800 dark:text-gray-100 text-base">To Do</h3>
            <span className="w-6 h-6 rounded-full bg-cyan-200 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 text-xs flex items-center justify-center font-bold">
              {todoTasks.length}
            </span>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto pr-1">
            {todoTasks.map((task: Task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={(id, status) => updateStatus({ id, status })}
                onDelete={(id) => deleteTask(id)}
              />
            ))}
          </div>
        </div>

        <div className="bg-cyan-50/50 dark:bg-gray-900/50 rounded-3xl p-4 border border-cyan-100 dark:border-gray-800 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-4 px-2 shrink-0">
            <h3 className="font-extrabold text-gray-800 dark:text-gray-100 text-base">
              In Progress
            </h3>
            <span className="w-6 h-6 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-xs flex items-center justify-center font-bold">
              {inProgressTasks.length}
            </span>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto pr-1">
            {inProgressTasks.map((task: Task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={(id, status) => updateStatus({ id, status })}
                onDelete={(id) => deleteTask(id)}
              />
            ))}
          </div>
        </div>

        <div className="bg-cyan-50/50 dark:bg-gray-900/50 rounded-3xl p-4 border border-cyan-100 dark:border-gray-800 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-4 px-2 shrink-0">
            <h3 className="font-extrabold text-gray-800 dark:text-gray-100 text-base">Completed</h3>
            <span className="w-6 h-6 rounded-full bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs flex items-center justify-center font-bold">
              {completedTasks.length}
            </span>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto pr-1">
            {completedTasks.map((task: Task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={(id, status) => updateStatus({ id, status })}
                onDelete={(id) => deleteTask(id)}
              />
            ))}
          </div>
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) => addTask(data)}
        groups={groups}
      />
    </div>
  );
};

export const Route = createFileRoute("/tasks")({
  component: TasksComponent,
});
