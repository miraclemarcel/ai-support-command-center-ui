"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bot, Sparkles } from "lucide-react";

import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { endpoints } from "@/lib/api";
import { useAuthStore } from "@/store/auth.store";

type AuthMode = "login" | "register";

export default function LoginPage() {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);

  const [mode, setMode] = useState<AuthMode>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    organizationName: "Demo Company",
    fullName: "Demo Admin",
    email: "admin@demo.com",
    password: "Password123!",
  });

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response =
        mode === "login"
          ? await endpoints.login({
              email: form.email,
              password: form.password,
            })
          : await endpoints.register(form);

      setSession(response);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Unable to authenticate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <section className="hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div>
          <div className="mb-8 inline-flex items-center gap-3 rounded-2xl bg-white/10 p-3">
            <Bot />
            <span className="font-bold">AI Support Command Center</span>
          </div>

          <h1 className="max-w-xl text-5xl font-bold tracking-tight">
            Enterprise support desk powered by AI workflows.
          </h1>

          <p className="mt-5 max-w-lg text-slate-300">
            Manage customers, conversations, tickets, AI replies, live takeover,
            and knowledge base from one command center.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 text-sm text-slate-300">
          <div className="rounded-2xl bg-white/10 p-4">RAG-ready KB</div>
          <div className="rounded-2xl bg-white/10 p-4">Realtime inbox</div>
          <div className="rounded-2xl bg-white/10 p-4">AI analytics</div>
        </div>
      </section>

      <section className="flex items-center justify-center p-5">
        <form
          onSubmit={submit}
          className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8"
        >
          <div className="mb-6">
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-brand-600 text-white">
              <Sparkles />
            </div>

            <h2 className="text-2xl font-bold">
              {mode === "login" ? "Welcome back" : "Create workspace"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Use the seeded demo credentials or create a fresh organization.
            </p>
          </div>

          {mode === "register" && (
            <>
              <label className="text-sm font-medium">Organization</label>
              <Input
                className="mt-1 mb-3"
                value={form.organizationName}
                onChange={(event) =>
                  setForm({
                    ...form,
                    organizationName: event.target.value,
                  })
                }
              />

              <label className="text-sm font-medium">Full name</label>
              <Input
                className="mt-1 mb-3"
                value={form.fullName}
                onChange={(event) =>
                  setForm({
                    ...form,
                    fullName: event.target.value,
                  })
                }
              />
            </>
          )}

          <label className="text-sm font-medium">Email</label>
          <Input
            className="mt-1 mb-3"
            value={form.email}
            onChange={(event) =>
              setForm({
                ...form,
                email: event.target.value,
              })
            }
          />

          <label className="text-sm font-medium">Password</label>
          <Input
            type="password"
            className="mt-1 mb-4"
            value={form.password}
            onChange={(event) =>
              setForm({
                ...form,
                password: event.target.value,
              })
            }
          />

          {error && (
            <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <Button className="w-full" disabled={loading}>
            {loading
              ? "Please wait..."
              : mode === "login"
                ? "Login"
                : "Create account"}
          </Button>

          <button
            type="button"
            onClick={() =>
              setMode((currentMode) =>
                currentMode === "login" ? "register" : "login"
              )
            }
            className="mt-4 w-full text-center text-sm font-semibold text-brand-700"
          >
            {mode === "login" ? "Create new workspace" : "Back to login"}
          </button>
        </form>
      </section>
    </main>
  );
}