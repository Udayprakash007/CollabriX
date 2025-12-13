import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface RatingStatCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  variant?: "default" | "primary" | "accent";
  className?: string;
  delay?: number;
}

const variantStyles = {
  default: "bg-card border-border/50",
  primary: "gradient-primary border-transparent text-primary-foreground",
  accent: "bg-accent/10 border-accent/20",
};

export const RatingStatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  variant = "default",
  className,
  delay = 0,
}: RatingStatCardProps) => {
  const isPrimary = variant === "primary";

  return (
    <div
      className={cn(
        "relative rounded-2xl border p-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 animate-fade-in overflow-hidden",
        variantStyles[variant],
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background decoration */}
      <div
        className={cn(
          "absolute -right-4 -top-4 h-20 w-20 rounded-full opacity-10",
          isPrimary ? "bg-primary-foreground" : "gradient-primary"
        )}
      />

      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <span
            className={cn(
              "text-sm font-medium",
              isPrimary ? "text-primary-foreground/80" : "text-muted-foreground"
            )}
          >
            {title}
          </span>
          <div
            className={cn(
              "p-2 rounded-xl",
              isPrimary ? "bg-primary-foreground/20" : "bg-primary/10"
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5",
                isPrimary ? "text-primary-foreground" : "text-primary"
              )}
            />
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <span
              className={cn(
                "text-3xl font-bold block",
                isPrimary ? "text-primary-foreground" : "text-foreground"
              )}
            >
              {value}
            </span>
            {subtitle && (
              <span
                className={cn(
                  "text-xs",
                  isPrimary ? "text-primary-foreground/70" : "text-muted-foreground"
                )}
              >
                {subtitle}
              </span>
            )}
          </div>

          {trend && trendValue && (
            <div
              className={cn(
                "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                trend === "up" && "bg-success/10 text-success",
                trend === "down" && "bg-destructive/10 text-destructive",
                trend === "neutral" && "bg-muted text-muted-foreground"
              )}
            >
              {trend === "up" && "↑"}
              {trend === "down" && "↓"}
              {trendValue}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
