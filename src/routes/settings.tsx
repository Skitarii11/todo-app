import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '../context/AuthContext';

export const Route = createFileRoute('/settings')({
  component: SettingsPage,
});

function SettingsPage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div style={{ color: 'red' }}>
        Access Denied! Please click "Login" in the navigation bar to view settings.
      </div>
    );
  }

  return (
    <div>
      <h1>Settings Page</h1>
      <p>This route is protected by authentication state.</p>
    </div>
  );
}