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

import type { KnowledgeArticle } from "@/types";

export default function KnowledgePage() {
  const queryClient = useQueryClient();

  const [article, setArticle] = useState({
    title: "",
    category: "Support",
    content: "",
  });

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const { data = [] } = useQuery<KnowledgeArticle[]>({
    queryKey: ["articles"],
    queryFn: endpoints.articles,
  });

  const create = useMutation({
    mutationFn: endpoints.createArticle,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });

      setArticle({
        title: "",
        category: "Support",
        content: "",
      });
    },
  });

  const search = useMutation({
    mutationFn: endpoints.searchKnowledge,
    onSuccess: setResults,
  });

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_420px]">
      <section>
        <h1 className="text-2xl font-bold">Knowledge Base</h1>

        <p className="mt-1 text-sm text-slate-500">
          RAG-ready articles used by the AI reply engine.
        </p>

        <Card className="mt-5">
          <CardHeader>
            <h2 className="font-bold">Semantic Search</h2>
          </CardHeader>

          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Search policy, refund, delivery..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />

              <Button
                onClick={() => search.mutate({ query })}
                disabled={!query}
              >
                Search
              </Button>
            </div>

            <div className="mt-4 space-y-3">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="rounded-xl bg-slate-50 p-3"
                >
                  <p className="font-semibold">{result.title}</p>

                  <p className="line-clamp-2 text-sm text-slate-600">
                    {result.content}
                  </p>

                  <p className="mt-1 text-xs text-brand-700">
                    Score: {Math.round(result.score * 100)}%
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {data.map((item) => (
            <Card key={item.id}>
              <CardContent>
                <p className="text-xs font-bold uppercase tracking-wide text-brand-700">
                  {item.category || "General"}
                </p>

                <h3 className="mt-1 font-bold">{item.title}</h3>

                <p className="mt-2 line-clamp-4 text-sm text-slate-600">
                  {item.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Card>
        <CardHeader>
          <h2 className="font-bold">Create Article</h2>
        </CardHeader>

        <CardContent className="space-y-3">
          <Input
            placeholder="Title"
            value={article.title}
            onChange={(event) =>
              setArticle({
                ...article,
                title: event.target.value,
              })
            }
          />

          <Input
            placeholder="Category"
            value={article.category}
            onChange={(event) =>
              setArticle({
                ...article,
                category: event.target.value,
              })
            }
          />

          <Textarea
            className="min-h-[220px]"
            placeholder="Article content..."
            value={article.content}
            onChange={(event) =>
              setArticle({
                ...article,
                content: event.target.value,
              })
            }
          />

          <Button
            className="w-full"
            disabled={
              !article.title ||
              !article.content ||
              create.isPending
            }
            onClick={() => create.mutate(article)}
          >
            {create.isPending ? "Creating..." : "Create article"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}