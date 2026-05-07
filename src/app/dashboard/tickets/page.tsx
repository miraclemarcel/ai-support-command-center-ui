"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { Card, CardContent } from "@/components/ui/Card";
import { Select } from "@/components/ui/Input";

import { endpoints } from "@/lib/api";
import {
  formatDate,
  humanizeStatus,
} from "@/lib/utils";

import type {
  Ticket,
  TicketPriority,
  TicketStatus,
} from "@/types";

const statuses: TicketStatus[] = [
  "OPEN",
  "IN_PROGRESS",
  "WAITING_ON_CUSTOMER",
  "ESCALATED",
  "RESOLVED",
  "CLOSED",
];

const priorities: TicketPriority[] = [
  "LOW",
  "MEDIUM",
  "HIGH",
  "URGENT",
];

export default function TicketsPage() {
  const queryClient = useQueryClient();

  const { data = [] } = useQuery<Ticket[]>({
    queryKey: ["tickets"],
    queryFn: endpoints.tickets,
  });

  const update = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: any;
    }) => endpoints.updateTicket(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tickets"],
      });
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Ticket Board</h1>

      <p className="mt-1 text-sm text-slate-500">
        Prioritize, escalate and resolve customer issues.
      </p>

      <div className="mt-5 grid gap-4 xl:grid-cols-3">
        {statuses.map((status) => (
          <section
            key={status}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-3"
          >
            <h2 className="mb-3 px-1 text-sm font-bold text-slate-700">
              {humanizeStatus(status)}
            </h2>

            <div className="space-y-3">
              {data
                .filter((ticket) => ticket.status === status)
                .map((ticket) => (
                  <Card key={ticket.id}>
                    <CardContent>
                      <div className="mb-2 flex items-start justify-between gap-3">
                        <h3 className="font-semibold">
                          {ticket.title}
                        </h3>

                        <span className="rounded-full bg-brand-50 px-2 py-1 text-xs font-bold text-brand-700">
                          {ticket.priority}
                        </span>
                      </div>

                      <p className="line-clamp-3 text-sm text-slate-600">
                        {ticket.description}
                      </p>

                      <p className="mt-3 text-xs text-slate-400">
                        {ticket.customer?.fullName} •{" "}
                        {formatDate(ticket.updatedAt)}
                      </p>

                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <Select
                          value={ticket.status}
                          onChange={(event) =>
                            update.mutate({
                              id: ticket.id,
                              payload: {
                                status: event.target.value,
                              },
                            })
                          }
                        >
                          {statuses.map((statusOption) => (
                            <option key={statusOption}>
                              {statusOption}
                            </option>
                          ))}
                        </Select>

                        <Select
                          value={ticket.priority}
                          onChange={(event) =>
                            update.mutate({
                              id: ticket.id,
                              payload: {
                                priority: event.target.value,
                              },
                            })
                          }
                        >
                          {priorities.map((priorityOption) => (
                            <option key={priorityOption}>
                              {priorityOption}
                            </option>
                          ))}
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}