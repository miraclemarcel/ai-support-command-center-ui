"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
export default function RequireAuth({ children }: { children: React.ReactNode }) { const router = useRouter(); const token = useAuthStore(s=>s.token); const [ready,setReady]=useState(false); useEffect(()=>{ setReady(true); if(!token) router.replace('/login'); },[token,router]); if(!ready || !token) return <div className="grid min-h-screen place-items-center text-sm text-slate-500">Loading secure workspace...</div>; return <>{children}</>; }
