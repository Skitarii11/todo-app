import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import type React from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export const SettingsComponent: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [username, setUsername] = useState(user?.name || "");
  const [password, setPassword] = useState("••••••••");
  const [savedMessage, setSavedMessage] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name: username });
    setSavedMessage("Settings updated successfully!");
    setTimeout(() => setSavedMessage(""), 3000);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-cyan-100 dark:border-gray-800 shadow-sm max-w-xl mx-auto">
      <h1 className="text-xl font-extrabold text-gray-900 dark:text-white mb-6">
        Account & Theme Settings
      </h1>

      {savedMessage && (
        <div className="p-3 mb-4 text-xs text-emerald-700 bg-emerald-50 rounded-xl border border-emerald-200">
          {savedMessage}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label
            className="block text-xs font-semibold text-gray-500 mb-1"
            htmlFor="usernameSetting"
          >
            Username
          </label>
          <input
            type="text"
            id="usernameSetting"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label
            className="block text-xs font-semibold text-gray-500 mb-1"
            htmlFor="passwordSetting"
          >
            New Password
          </label>
          <input
            type="password"
            id="passwordSetting"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
          <div>
            <div className="text-sm font-bold text-gray-800 dark:text-gray-200">Dark Mode</div>
            <div className="text-xs text-gray-400">Toggle light and dark color theme</div>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className={`w-14 h-8 flex items-center rounded-full p-1 transition duration-300 ${
              theme === "dark" ? "bg-cyan-500 justify-end" : "bg-gray-300 justify-start"
            }`}
          >
            <div className="bg-white w-6 h-6 rounded-full shadow-md flex items-center justify-center text-gray-700">
              {theme === "dark" ? (
                <MoonIcon size={14} className="text-cyan-600" />
              ) : (
                <SunIcon size={14} className="text-amber-500" />
              )}
            </div>
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-2xl text-xs transition shadow-md"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export const Route = createFileRoute("/settings")({
  component: SettingsComponent,
});
