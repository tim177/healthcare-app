import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "~/firebase";

interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface EmailLoginArgs {
  email: string;
  password: string;
}

interface EmailSignupArgs {
  name: string;
  email: string;
  password: string;
}

function toAuthUser(user: {
  uid: string;
  email: string | null;
  displayName: string | null;
}): AuthUser {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
  };
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({

    loginWithEmail: builder.mutation<AuthUser, EmailLoginArgs>({
      queryFn: async ({ email, password }) => {
        try {
          const { user } = await signInWithEmailAndPassword(auth, email, password);
          return { data: toAuthUser(user) };
        } catch (err: any) {
          return { error: { status: "CUSTOM_ERROR" as const, error: err.message } };
        }
      },
    }),

    signupWithEmail: builder.mutation<AuthUser, EmailSignupArgs>({
      queryFn: async ({ name, email, password }) => {
        try {
          const { user } = await createUserWithEmailAndPassword(auth, email, password);
          await updateProfile(user, { displayName: name });
          return { data: toAuthUser(user) };
        } catch (err: any) {
          return { error: { status: "CUSTOM_ERROR" as const, error: err.message } };
        }
      },
    }),

    loginWithGoogle: builder.mutation<AuthUser, void>({
      queryFn: async () => {
        try {
          const { user } = await signInWithPopup(auth, googleProvider);
          return { data: toAuthUser(user) };
        } catch (err: any) {
          return { error: { status: "CUSTOM_ERROR" as const, error: err.message } };
        }
      },
    }),

    logout: builder.mutation<void, void>({
      queryFn: async () => {
        try {
          await signOut(auth);
          return { data: undefined };
        } catch (err: any) {
          return { error: { status: "CUSTOM_ERROR" as const, error: err.message } };
        }
      },
    }),

  }),
});

export type { AuthUser };

export const {
  useLoginWithEmailMutation,
  useSignupWithEmailMutation,
  useLoginWithGoogleMutation,
  useLogoutMutation,
} = authApi;