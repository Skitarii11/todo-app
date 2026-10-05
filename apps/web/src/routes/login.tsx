import { SignInIcon, WarningCircleIcon } from "@phosphor-icons/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type React from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export const LoginComponent: React.FC = () => {
  const [username, setUsername] = useState("Javkhlan Tselmeg");
  const [password, setPassword] = useState("password123");
  const [errorMessage, setErrorMessage] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const success = login(username, password);
    if (success) {
      navigate({ to: "/dashboard" });
    } else {
      setErrorMessage("Invalid username or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-50 dark:bg-gray-950 p-4">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl w-full max-w-md border border-cyan-100 dark:border-gray-800">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-cyan-500 rounded-2xl mx-auto flex items-center justify-center text-white shadow-lg mb-3">
            <SignInIcon size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
          <p className="text-xs text-gray-400 mt-1">
            Sign in to manage your daily tasks and schedule
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-2xl text-xs flex items-center gap-2">
            <WarningCircleIcon size={18} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-2xl text-sm transition shadow-lg shadow-cyan-200 dark:shadow-none"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/login")({
  component: LoginComponent,
});
