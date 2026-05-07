"use client";

import { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import Button from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/Card";
import {
  Input,
  Textarea,
} from "@/components/ui/Input";

import { endpoints } from "@/lib/api";
import { formatDate } from "@/lib/utils";

import type { Customer } from "@/types";

export default function CustomersPage() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "Nigeria",
    notes: "",
  });

  const { data = [] } = useQuery<Customer[]>({
    queryKey: ["customers"],
    queryFn: endpoints.customers,
  });

  const create = useMutation({
    mutationFn: endpoints.createCustomer,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });

      setForm({
        fullName: "",
        email: "",
        phone: "",
        country: "Nigeria",
        notes: "",
      });
    },
  });

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
      <section>
        <h1 className="text-2xl font-bold">
          Customers
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          CRM layer for support customers across channels.
        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {data.map((customer) => (
            <Card key={customer.id}>
              <CardContent>
                <div className="mb-3 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 font-bold text-brand-700">
                    {customer.fullName?.[0]}
                  </div>

                  <div>
                    <p className="font-semibold">
                      {customer.fullName}
                    </p>

                    <p className="text-xs text-slate-500">
                      {customer.email ||
                        customer.phone ||
                        "No contact"}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-600">
                  {customer.notes || "No notes yet."}
                </p>

                <p className="mt-4 text-xs text-slate-400">
                  Added {formatDate(customer.createdAt)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Card>
        <CardHeader>
          <h2 className="font-bold">
            Add Customer
          </h2>
        </CardHeader>

        <CardContent className="space-y-3">
          <Input
            placeholder="Full name"
            value={form.fullName}
            onChange={(event) =>
              setForm({
                ...form,
                fullName: event.target.value,
              })
            }
          />

          <Input
            placeholder="Email"
            value={form.email}
            onChange={(event) =>
              setForm({
                ...form,
                email: event.target.value,
              })
            }
          />

          <Input
            placeholder="Phone"
            value={form.phone}
            onChange={(event) =>
              setForm({
                ...form,
                phone: event.target.value,
              })
            }
          />

          <Input
            placeholder="Country"
            value={form.country}
            onChange={(event) =>
              setForm({
                ...form,
                country: event.target.value,
              })
            }
          />

          <Textarea
            placeholder="Notes"
            value={form.notes}
            onChange={(event) =>
              setForm({
                ...form,
                notes: event.target.value,
              })
            }
          />

          <Button
            className="w-full"
            disabled={
              !form.fullName || create.isPending
            }
            onClick={() => create.mutate(form)}
          >
            {create.isPending
              ? "Saving..."
              : "Create customer"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}