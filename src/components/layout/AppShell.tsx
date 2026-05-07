"use client";

import { useState } from "react";
import Link from "next/link";
import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  BarChart3,
  BookOpenText,
  Bot,
  Headphones,
  LayoutDashboard,
  LogOut,
  Menu,
  Ticket,
  Users,
  X,
} from "lucide-react";

import Button from "@/components/ui/Button";

import { cn } from "@/lib/utils";

import { useAuthStore } from "@/store/auth.store";

const nav = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/conversations",
    label: "Conversations",
    icon: Headphones,
  },
  {
    href: "/dashboard/tickets",
    label: "Tickets",
    icon: Ticket,
  },
  {
    href: "/dashboard/customers",
    label: "Customers",
    icon: Users,
  },
  {
    href: "/dashboard/knowledge",
    label: "Knowledge Base",
    icon: BookOpenText,
  },
];

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({
  children,
}: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const { user, logout } = useAuthStore();

  const sidebar = (
    <aside className="flex h-full w-72 flex-col border-r border-slate-200 bg-white p-4">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-600 text-white">
          <Bot size={22} />
        </div>

        <div>
          <p className="text-sm font-bold">
            AI Support
          </p>

          <p className="text-xs text-slate-500">
            Command Center
          </p>
        </div>
      </div>

      <nav className="space-y-1">
        {nav.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                active
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              )}
            >
              <Icon size={18} />

              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-900">
          {user?.fullName || "Agent"}
        </p>

        <p className="break-all text-xs text-slate-500">
          {user?.email}
        </p>

        <Button
          variant="ghost"
          className="mt-3 w-full justify-start px-2"
          onClick={() => {
            logout();
            router.push("/login");
          }}
        >
          <LogOut size={16} />
          Logout
        </Button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#f6f8fb] lg:flex">
      <div className="hidden lg:sticky lg:top-0 lg:block lg:h-screen">
        {sidebar}
      </div>

      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/90 p-4 backdrop-blur lg:hidden">
        <div className="flex items-center gap-2 font-bold">
          <BarChart3 className="text-brand-600" />
          Command Center
        </div>

        <button onClick={() => setOpen(true)}>
          <Menu />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-950/40"
            onClick={() => setOpen(false)}
          />

          <div className="absolute left-0 top-0 h-full">
            {sidebar}
          </div>

          <button
            className="absolute right-4 top-4 rounded-full bg-white p-2"
            onClick={() => setOpen(false)}
          >
            <X />
          </button>
        </div>
      )}

      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}