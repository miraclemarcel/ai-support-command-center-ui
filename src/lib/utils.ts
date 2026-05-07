import { clsx, type ClassValue } from "clsx";
export function cn(...inputs: ClassValue[]) { return clsx(inputs); }
export function formatDate(value?: string | null) { if (!value) return "N/A"; const d = new Date(value); if (Number.isNaN(d.getTime())) return "N/A"; return new Intl.DateTimeFormat("en-NG", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(d); }
export function humanizeStatus(value?: string | null) { if (!value) return "N/A"; return value.replace(/_/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase().replace(/\b\w/g, c => c.toUpperCase()); }
