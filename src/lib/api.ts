import { useAuthStore } from "@/store/auth.store";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api/v1";

type ApiOptions = RequestInit & { auth?: boolean };

export class ApiError extends Error { constructor(public status: number, message: string) { super(message); } }

export async function api<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const token = typeof window !== "undefined" ? useAuthStore.getState().token : null;
  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type") && options.body) headers.set("Content-Type", "application/json");
  if (options.auth !== false && token) headers.set("Authorization", `Bearer ${token}`);
  const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers, cache: "no-store" });
  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json") ? await res.json() : await res.text();
  if (!res.ok) throw new ApiError(res.status, typeof data === "string" ? data : data.message || "Request failed");
  return data as T;
}

export const endpoints = {
  login: (payload: { email: string; password: string }) => api<{ user: any; accessToken: string }>("/auth/login", { method: "POST", body: JSON.stringify(payload), auth: false }),
  register: (payload: { organizationName: string; fullName: string; email: string; password: string }) => api<{ user: any; accessToken: string }>("/auth/register", { method: "POST", body: JSON.stringify(payload), auth: false }),
  me: () => api<{ user: any }>("/auth/me"),
  analytics: () => api<any>("/analytics/dashboard"),
  customers: () => api<any[]>("/customers"),
  createCustomer: (payload: any) => api<any>("/customers", { method: "POST", body: JSON.stringify(payload) }),
  conversations: () => api<any[]>("/conversations"),
  conversation: (id: string) => api<any>(`/conversations/${id}`),
  createConversation: (payload: any) => api<any>("/conversations", { method: "POST", body: JSON.stringify(payload) }),
  sendMessage: (id: string, payload: any) => api<any>(`/conversations/${id}/messages`, { method: "POST", body: JSON.stringify(payload) }),
  aiReply: (id: string) => api<any>(`/conversations/${id}/ai-reply`, { method: "POST" }),
  takeover: (id: string) => api<any>(`/conversations/${id}/takeover`, { method: "POST" }),
  tickets: () => api<any[]>("/tickets"),
  createTicket: (payload: any) => api<any>("/tickets", { method: "POST", body: JSON.stringify(payload) }),
  updateTicket: (id: string, payload: any) => api<any>(`/tickets/${id}`, { method: "PATCH", body: JSON.stringify(payload) }),
  articles: () => api<any[]>("/knowledge-base/articles"),
  createArticle: (payload: any) => api<any>("/knowledge-base/articles", { method: "POST", body: JSON.stringify(payload) }),
  searchKnowledge: (payload: { query: string }) => api<any[]>("/knowledge-base/search", { method: "POST", body: JSON.stringify(payload) })
};
