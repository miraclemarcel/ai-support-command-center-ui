import { cn } from "@/lib/utils";
export default function Button({ className, variant = "primary", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "danger" }) {
  const styles = { primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-sm", secondary: "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50", ghost: "bg-transparent text-slate-700 hover:bg-slate-100", danger: "bg-red-600 text-white hover:bg-red-700" };
  return <button className={cn("inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60", styles[variant], className)} {...props} />;
}
