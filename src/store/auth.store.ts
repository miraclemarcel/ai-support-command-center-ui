"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { User } from "@/types";

type SessionPayload = {
  accessToken: string;
  user: User;
};

type AuthState = {
  token: string | null;
  user: User | null;

  setSession: (
    payload: SessionPayload
  ) => void;

  logout: () => void;
};

export const useAuthStore =
  create<AuthState>()(
    persist(
      (set) => ({
        token: null,
        user: null,

        setSession: ({
          accessToken,
          user,
        }) =>
          set({
            token: accessToken,
            user,
          }),

        logout: () =>
          set({
            token: null,
            user: null,
          }),
      }),
      {
        name: "ai-support-auth",
      }
    )
  );