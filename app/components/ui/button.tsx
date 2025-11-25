import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  const baseClass = "px-4 py-2 rounded-md font-medium transition-colors inline-flex items-center justify-center gap-2";
  
  const variantClass = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  }[variant];

  const sizeClass = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }[size];

  return (
    <button
      className={cn(baseClass, variantClass, sizeClass, className)}
      {...props}
    >
      {children}
    </button>
  );
}
