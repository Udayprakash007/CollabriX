import { Briefcase, Trophy, Medal, User, LayoutDashboard, Search, MessageSquare, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isClient?: boolean;
}

const developerNavItems = [
  { id: "jobs", label: "Jobs", icon: Briefcase },
  { id: "connect", label: "Connect", icon: Users },
  { id: "leaderboard", label: "Board", icon: Medal },
  { id: "profile", label: "Profile", icon: User },
];

const clientNavItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "find", label: "Find Talent", icon: Search },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "profile", label: "Profile", icon: User },
];

export const BottomNav = ({ activeTab, onTabChange, isClient = false }: BottomNavProps) => {
  const navItems = isClient ? clientNavItems : developerNavItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50 pb-safe">
      <div className="container flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id || (isClient && item.id === 'dashboard' && activeTab === 'projects');
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 min-w-[60px]",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div
                className={cn(
                  "p-2 rounded-xl transition-all duration-200",
                  isActive && "gradient-primary shadow-md"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isActive && "text-primary-foreground"
                  )}
                />
              </div>
              <span className={cn("text-[10px] font-medium", isActive && "font-semibold")}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
