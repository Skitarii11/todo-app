import type React from "react";
import { useState } from "react";
import type { Task } from "../services/mockData";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, "id">) => void;
  groups: string[];
}

export const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSubmit, groups }) => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [deadline, setDeadline] = useState("");
  const [group, setGroup] = useState(groups[0] || "General");
  const [status, setStatus] = useState<Task["status"]>("To Do");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title,
      details,
      deadline: deadline || new Date().toISOString(),
      group,
      status,
      timeSlot: deadline ? new Date(deadline).getHours() : 10,
    });

    setTitle("");
    setDetails("");
    setDeadline("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-md p-6 shadow-2xl border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Create New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              required
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Task Title..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1" htmlFor="details">
              Details
            </label>
            <textarea
              rows={3}
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Task description..."
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1" htmlFor="deadline">
                Deadline Date & Time
              </label>
              <input
                type="datetime-local"
                value={deadline}
                id="deadline"
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1" htmlFor="group">
                Group
              </label>
              <select
                value={group}
                id="group"
                onChange={(e) => setGroup(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-xs"
              >
                {groups.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1" htmlFor="status">
              Initial Status
            </label>
            <select
              value={status}
              id="status"
              onChange={(e) => setStatus(e.target.value as Task["status"])}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-xs"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-200 dark:shadow-none"
            >
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
