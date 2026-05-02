import { useAuth } from "~/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Home() {
  const { user, isInitialized } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isInitialized) return;
    if (user) navigate("/dashboard", { replace: true });
    else navigate("/login", { replace: true });
  }, [user, isInitialized]);

  return null;
}
