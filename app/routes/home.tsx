import { useAuth } from "~/hooks/useAuth";
import { useLogoutMutation } from "~/features/auth/authApi";
import { useNavigate } from "react-router";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // AuthListener handles the redirect — just render nothing while waiting
  if (!user) return null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">
        Welcome, {user.displayName ?? user.email}!
      </h1>
      <p className="text-muted-foreground">{user.email}</p>
      <button
        onClick={handleLogout}
        disabled={isLoading}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
      >
        {isLoading ? "Logging out..." : "Logout"}
      </button>
    </main>
  );
}
