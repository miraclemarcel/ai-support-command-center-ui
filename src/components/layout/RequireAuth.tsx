"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/auth.store";

type RequireAuthProps = {
  children: React.ReactNode;
};

export default function RequireAuth({
  children,
}: RequireAuthProps) {
  const router = useRouter();

  const token = useAuthStore((state) => state.token);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);

    if (!token) {
      router.replace("/login");
    }
  }, [token, router]);

  if (!ready || !token) {
    return (
      <div className="grid min-h-screen place-items-center text-sm text-slate-500">
        Loading secure workspace...
      </div>
    );
  }

  return <>{children}</>;
}