import { createRootRoute, Link, Outlet, Scripts } from '@tanstack/react-router';
import { AuthProvider, useAuth } from '../context/AuthContext';

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => {
    return <p>Custom Root Not Found Component</p>
  },
});



function Navigation() {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <nav style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <Link to="/" activeProps={{ style: { fontWeight: 'bold' } }}>
        Home (Todos)
      </Link>
      <Link to="/settings" activeProps={{ style: { fontWeight: 'bold' } }}>
        Settings (Protected)
      </Link>
      <button type="button" onClick={isAuthenticated ? logout : login}>
        {isAuthenticated ? 'Logout' : 'Login'}
      </button>
    </nav>
  );
}

function RootLayout() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>TanStack Start Todo</title>
      </head>
      <body>
        <AuthProvider>
          <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <Navigation />
            <hr />
            <Outlet />
          </div>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}