import { cn } from "@/lib/utils";
import { Award, Check, Lock } from "lucide-react";

interface BadgeCardProps {
  name: string;
  icon?: React.ReactNode;
  variant: "gold" | "silver" | "bronze" | "special";
  earned?: boolean;
  description?: string;
  className?: string;
  delay?: number;
}

const variantStyles = {
  gold: {
    bg: "bg-gradient-to-br from-amber-100 to-yellow-50 dark:from-amber-900/40 dark:to-yellow-900/20",
    border: "border-amber-300 dark:border-amber-700",
    icon: "text-amber-600 dark:text-amber-400",
    glow: "shadow-amber-200/50 dark:shadow-amber-800/30",
  },
  silver: {
    bg: "bg-gradient-to-br from-slate-100 to-gray-50 dark:from-slate-800/40 dark:to-gray-800/20",
    border: "border-slate-300 dark:border-slate-600",
    icon: "text-slate-500 dark:text-slate-400",
    glow: "shadow-slate-200/50 dark:shadow-slate-700/30",
  },
  bronze: {
    bg: "bg-gradient-to-br from-orange-100 to-amber-50 dark:from-orange-900/40 dark:to-amber-900/20",
    border: "border-orange-300 dark:border-orange-700",
    icon: "text-orange-600 dark:text-orange-400",
    glow: "shadow-orange-200/50 dark:shadow-orange-800/30",
  },
  special: {
    bg: "gradient-primary",
    border: "border-transparent",
    icon: "text-primary-foreground",
    glow: "shadow-glow",
  },
};

export const BadgeCard = ({
  name,
  icon,
  variant,
  earned = true,
  description,
  className,
  delay = 0,
}: BadgeCardProps) => {
  const styles = variantStyles[variant];
  const isSpecial = variant === "special";

  return (
    <div
      className={cn(
        "relative flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-300 hover:scale-105 animate-fade-in",
        styles.bg,
        styles.border,
        earned && `shadow-lg ${styles.glow}`,
        !earned && "opacity-50 grayscale",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Earned indicator */}
      {earned && (
        <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-success flex items-center justify-center shadow-md">
          <Check className="h-3.5 w-3.5 text-success-foreground" />
        </div>
      )}

      {!earned && (
        <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-muted flex items-center justify-center">
          <Lock className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
      )}

      {/* Badge Icon */}
      <div
        className={cn(
          "p-3 rounded-xl",
          isSpecial ? "bg-primary-foreground/20" : "bg-background/50"
        )}
      >
        {icon || <Award className={cn("h-8 w-8", styles.icon)} />}
      </div>

      {/* Badge Name */}
      <span
        className={cn(
          "text-sm font-semibold text-center leading-tight",
          isSpecial ? "text-primary-foreground" : "text-foreground"
        )}
      >
        {name}
      </span>

      {description && (
        <span
          className={cn(
            "text-xs text-center",
            isSpecial ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          {description}
        </span>
      )}
    </div>
  );
};
