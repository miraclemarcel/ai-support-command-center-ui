import { cn } from "@/lib/utils";

type InputProps =
  React.InputHTMLAttributes<HTMLInputElement>;

type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

type SelectProps =
  React.SelectHTMLAttributes<HTMLSelectElement>;

export function Input({
  className,
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-100",
        className
      )}
    />
  );
}

export function Textarea({
  className,
  ...props
}: TextareaProps) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-100",
        className
      )}
    />
  );
}

export function Select({
  className,
  ...props
}: SelectProps) {
  return (
    <select
      {...props}
      className={cn(
        "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-600 focus:ring-4 focus:ring-brand-100",
        className
      )}
    />
  );
}