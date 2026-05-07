"use client";

import { useEffect, useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Bot, Send, UserCheck } from "lucide-react";

import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Input";

import { endpoints } from "@/lib/api";
import { getSocket } from "@/lib/socket";
import { formatDate } from "@/lib/utils";

import type { Conversation } from "@/types";

export default function ConversationsPage() {
  const queryClient = useQueryClient();

  const [active, setActive] = useState<string | null>(null);
  const [body, setBody] = useState("");

  const { data = [] } = useQuery<Conversation[]>({
    queryKey: ["conversations"],
    queryFn: endpoints.conversations,
  });

  const selectedId = active || data[0]?.id;

  const { data: conversation } = useQuery<Conversation>({
    queryKey: ["conversation", selectedId],
    queryFn: () => endpoints.conversation(selectedId!),
    enabled: !!selectedId,
  });

  useEffect(() => {
    const socket = getSocket();

    const refresh = () => {
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });

      if (selectedId) {
        queryClient.invalidateQueries({
          queryKey: ["conversation", selectedId],
        });
      }
    };

    socket.on("conversation:new-message", refresh);
    socket.on("conversation:ai-reply", refresh);

    return () => {
      socket.off("conversation:new-message", refresh);
      socket.off("conversation:ai-reply", refresh);
    };
  }, [queryClient, selectedId]);

  const send = useMutation({
    mutationFn: () =>
      endpoints.sendMessage(selectedId!, {
        body,
        senderType: "AGENT",
      }),

    onSuccess: () => {
      setBody("");

      queryClient.invalidateQueries({
        queryKey: ["conversation", selectedId],
      });
    },
  });

  const ai = useMutation({
    mutationFn: () => endpoints.aiReply(selectedId!),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversation", selectedId],
      });
    },
  });

  const takeover = useMutation({
    mutationFn: () => endpoints.takeover(selectedId!),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversation", selectedId],
      });
    },
  });

  return (
    <div className="grid min-h-[calc(100vh-120px)] gap-4 xl:grid-cols-[360px_1fr]">
      <aside className="rounded-2xl border border-slate-200 bg-white p-3">
        <h1 className="mb-3 px-2 text-xl font-bold">
          Inbox
        </h1>

        <div className="space-y-2">
          {data.map((conversationItem) => (
            <button
              key={conversationItem.id}
              onClick={() => setActive(conversationItem.id)}
              className={`w-full rounded-xl p-3 text-left transition ${
                selectedId === conversationItem.id
                  ? "bg-brand-50"
                  : "hover:bg-slate-50"
              }`}
            >
              <div className="flex justify-between gap-2">
                <p className="font-semibold">
                  {conversationItem.customer?.fullName || "Customer"}
                </p>

                <span className="text-xs text-slate-400">
                  {conversationItem.channel}
                </span>
              </div>

              <p className="line-clamp-1 text-sm text-slate-500">
                {conversationItem.subject ||
                  conversationItem.messages?.[0]?.body ||
                  "Support conversation"}
              </p>
            </button>
          ))}
        </div>
      </aside>

      <section className="flex min-h-0 flex-col rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-4">
          <div>
            <h2 className="font-bold">
              {conversation?.customer?.fullName ||
                "Select conversation"}
            </h2>

            <p className="text-xs text-slate-500">
              Sentiment: {conversation?.sentiment || "N/A"} • AI
              Confidence:{" "}
              {Math.round(
                (conversation?.aiConfidence || 0) * 100
              )}
              %
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => ai.mutate()}
              disabled={!selectedId || ai.isPending}
            >
              <Bot size={16} />
              AI Reply
            </Button>

            <Button
              variant="secondary"
              onClick={() => takeover.mutate()}
              disabled={!selectedId}
            >
              <UserCheck size={16} />
              Takeover
            </Button>
          </div>
        </div>

        <div className="scrollbar-thin flex-1 space-y-3 overflow-auto p-4">
          {conversation?.messages?.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.senderType === "AGENT"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <Card
                className={`max-w-[82%] ${
                  message.senderType === "AGENT"
                    ? "bg-brand-600 text-white"
                    : "bg-white"
                }`}
              >
                <CardContent className="p-3">
                  <p className="mb-1 text-xs opacity-70">
                    {message.senderType} •{" "}
                    {formatDate(message.createdAt)}
                  </p>

                  <p className="whitespace-pre-wrap text-sm">
                    {message.body}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-100 p-4">
          <div className="flex gap-2">
            <Textarea
              placeholder="Type a reply..."
              value={body}
              onChange={(event) =>
                setBody(event.target.value)
              }
              className="min-h-[48px]"
            />

            <Button
              disabled={!body || send.isPending}
              onClick={() => send.mutate()}
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}