import { createRootRouteWithContext, Outlet, redirect, useLocation } from "@tanstack/react-router";
import { Suspense } from "react";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import type { AuthContextType } from "../context/AuthContext";

interface MyRouterContext {
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated && location.pathname !== "/login") {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
    if (context.auth.isAuthenticated && location.pathname === "/login") {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
  component: RootComponent,
});

function RootComponent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  if (isLoginPage) {
    return (
      <ErrorBoundary>
        <Suspense fallback={<div className="p-8 text-center text-cyan-600">Loading...</div>}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    );
  }
  return (
    <div className="flex min-h-screen bg-cyan-50/30 dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <Header />
        <ErrorBoundary>
          <Suspense fallback={<div className="p-8 text-center text-cyan-600">Loading...</div>}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}
