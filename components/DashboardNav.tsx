import { User } from "@supabase/supabase-js";
import { Badge } from "@/components/ui/badge";
import { UserAvatarDropdown } from "@/components/UserAvatarDropdown";

interface DashboardNavProps {
  user: User | null;
  hasAccess: boolean;
  isInitialLoading: boolean;
}

export function DashboardNav({ user, hasAccess, isInitialLoading }: DashboardNavProps) {
  return (
    <nav className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="font-bold text-xl flex items-center gap-2">
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="13 19 22 12 13 5 13 19" />
            <polygon points="2 19 11 12 2 5 2 19" />
          </svg>
          quik
        </div>
        <div className="flex items-center gap-4">
          {!isInitialLoading && (
            <>
              <Badge variant={hasAccess ? "default" : "secondary"}>
                {hasAccess ? "Active" : "Inactive"}
              </Badge>
              <UserAvatarDropdown user={user} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
} 