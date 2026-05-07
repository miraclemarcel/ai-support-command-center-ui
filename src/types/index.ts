export type UserRole = "ADMIN" | "MANAGER" | "AGENT" | "VIEWER";
export type Channel = "WEB_CHAT" | "WHATSAPP" | "EMAIL" | "VOICE" | "API";
export type SenderType = "CUSTOMER" | "AGENT" | "AI" | "SYSTEM";
export type TicketStatus = "OPEN" | "IN_PROGRESS" | "WAITING_ON_CUSTOMER" | "ESCALATED" | "RESOLVED" | "CLOSED";
export type TicketPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type User = { id: string; fullName: string; email: string; role: UserRole; organizationId: string; isActive?: boolean };
export type Customer = { id: string; fullName: string; email?: string | null; phone?: string | null; country?: string | null; notes?: string | null; createdAt?: string; updatedAt?: string };
export type Message = { id: string; conversationId: string; senderType: SenderType; body: string; sentiment?: string | null; createdAt?: string; aiMeta?: unknown };
export type Conversation = { id: string; customerId: string; customer?: Customer; channel: Channel; subject?: string | null; status?: string; sentiment?: string | null; aiConfidence?: number | null; humanTakeover?: boolean; messages?: Message[]; createdAt?: string; updatedAt?: string };
export type Ticket = { id: string; customerId: string; customer?: Customer; conversationId?: string | null; title: string; description: string; status: TicketStatus; priority: TicketPriority; assignedToId?: string | null; aiSummary?: string | null; createdAt?: string; updatedAt?: string };
export type KnowledgeArticle = { id: string; title: string; content: string; category?: string | null; isPublished?: boolean; createdAt?: string; updatedAt?: string };
export type DashboardAnalytics = { summary: { customers: number; conversations: number; tickets: number; openTickets: number; resolvedTickets: number }; tickets: { byPriority: Array<{ priority: TicketPriority; _count: number }>; byStatus: Array<{ status: TicketStatus; _count: number }> }; ai: { automationRate: number; averageConfidence: number }; sentiment: Record<string, number> };
