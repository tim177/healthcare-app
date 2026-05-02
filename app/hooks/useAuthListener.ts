import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "~/firebase";
import { setUser } from "~/features/auth/authSlice";
import type { RootState } from "~/store";

const PUBLIC_ROUTES = ["/login", "/signup", "/"];

export function useAuthListener() {
  const dispatch = useDispatch();
  const { user, isInitialized } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      dispatch(
        setUser(
          firebaseUser
            ? {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
              }
            : null,
        ),
      );
    });
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (!isInitialized) return;

    const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);

    if (user && isPublicRoute) {
      navigate("/dashboard");
      return;
    }

    if (!user && !isPublicRoute) {
      navigate("/login");
    }
  }, [user, isInitialized, location.pathname, navigate]);
}
