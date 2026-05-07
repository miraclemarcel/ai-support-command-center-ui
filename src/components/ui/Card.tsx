import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white shadow-soft",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "border-b border-slate-100 p-5",
        className
      )}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn("p-5", className)}
      {...props}
    />
  );
}