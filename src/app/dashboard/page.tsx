"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  Bot,
  CheckCircle2,
  Headphones,
  Ticket,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/Card";

import { endpoints } from "@/lib/api";

import type { DashboardAnalytics } from "@/types";

type StatProps = {
  label: string;
  value: number | string;
  icon: any;
};

function Stat({
  label,
  value,
  icon: Icon,
}: StatProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-bold">{value}</p>
        </div>

        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700">
          <Icon size={22} />
        </div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const { data, isLoading } = useQuery<DashboardAnalytics>({
    queryKey: ["analytics"],
    queryFn: endpoints.analytics,
  });

  const summary = data?.summary;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-brand-700">
          AI Support Command Center
        </p>

        <h1 className="text-2xl font-bold sm:text-3xl">
          Operations Overview
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Realtime support metrics, AI automation and ticket health.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Stat
          label="Customers"
          value={summary?.customers ?? 0}
          icon={Users}
        />

        <Stat
          label="Conversations"
          value={summary?.conversations ?? 0}
          icon={Headphones}
        />

        <Stat
          label="Tickets"
          value={summary?.tickets ?? 0}
          icon={Ticket}
        />

        <Stat
          label="Open Tickets"
          value={summary?.openTickets ?? 0}
          icon={Activity}
        />

        <Stat
          label="Resolved"
          value={summary?.resolvedTickets ?? 0}
          icon={CheckCircle2}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <h2 className="font-bold">Ticket Status</h2>
          </CardHeader>

          <CardContent>
            {isLoading ? (
              <p className="text-sm text-slate-500">Loading...</p>
            ) : (
              <div className="space-y-3">
                {data?.tickets.byStatus?.map((item: any) => (
                  <div key={item.status}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>
                        {item.status.replaceAll("_", " ")}
                      </span>

                      <b>{item._count}</b>
                    </div>

                    <div className="h-2 rounded-full bg-slate-100">
                      <div
                        className="h-2 rounded-full bg-brand-600"
                        style={{
                          width: `${Math.min(
                            100,
                            item._count * 20
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="font-bold">AI Automation</h2>
          </CardHeader>

          <CardContent>
            <div className="rounded-2xl bg-brand-50 p-5 text-center">
              <Bot className="mx-auto text-brand-700" />

              <p className="mt-3 text-4xl font-bold text-brand-700">
                {Math.round((data?.ai.automationRate ?? 0) * 100)}%
              </p>

              <p className="text-sm text-slate-500">
                Automation rate
              </p>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Average AI confidence:{" "}
              <b className="text-slate-900">
                {Math.round(
                  (data?.ai.averageConfidence ?? 0) * 100
                )}
                %
              </b>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}