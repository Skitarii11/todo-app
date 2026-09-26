import { createRootRoute, Link, Outlet, Scripts } from '@tanstack/react-router';
import { AuthProvider, useAuth } from '../context/AuthContext';
import '../styles.css';

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-100">404 - Page Not Found</h1>
        <p className="mt-2 text-slate-400">The page you are looking for doesn't exist.</p>
        <Link to="/" className="mt-4 inline-block text-blue-500 hover:underline">
          Go back home
        </Link>
      </div>
    );
  },
});

function Navigation() {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="text-slate-400 font-medium hover:text-white transition-colors"
          activeProps={{ className: '!text-blue-500 font-semibold border-b-2 border-blue-500 pb-0.5' }}
        >
          Home (Todos)
        </Link>
        <span className="text-slate-700">|</span>
        <Link
          to="/settings"
          className="text-slate-400 font-medium hover:text-white transition-colors"
          activeProps={{ className: '!text-blue-500 font-semibold border-b-2 border-blue-500 pb-0.5' }}
        >
          Settings (Protected)
        </Link>
      </div>

      <button
        type="button"
        onClick={isAuthenticated ? logout : login}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-200 bg-transparent border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
      >
        <span>↪</span>
        <span>{isAuthenticated ? 'Logout' : 'Login'}</span>
      </button>
    </nav>
  );
}

function RootLayout() {
  return (
    <html lang="en" className="bg-[#111625] min-h-screen text-slate-100 antialiased">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Todo Dashboard</title>
      </head>
      <body className="bg-[#111625] p-6 min-h-screen">
        <AuthProvider>
          <div className="max-w-4xl mx-auto">
            <Navigation />
            <Outlet />
          </div>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}