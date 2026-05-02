import { useSelector } from "react-redux";
import type { RootState } from "~/store";

// Just a convenience hook — no wrapper needed
export const useAuth = () => useSelector((state: RootState) => state.auth);
