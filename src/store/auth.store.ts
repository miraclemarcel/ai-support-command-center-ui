"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";

type AuthState = { token: string | null; user: User | null; setSession: (payload: { accessToken: string; user: User }) => void; logout: () => void; };
export const useAuthStore = create<AuthState>()(persist((set) => ({ token: null, user: null, setSession: ({ accessToken, user }) => set({ token: accessToken, user }), logout: () => set({ token: null, user: null }) }), { name: "ai-support-auth" }));
