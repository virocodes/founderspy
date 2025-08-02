import { User } from "@supabase/supabase-js";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserAvatarDropdown } from "@/components/UserAvatarDropdown";
import { SignInModal } from "@/components/SignInModal";
import { GetAccessModal } from "@/components/GetAccessModal";
import { Users } from "lucide-react";
import { useState } from "react";

interface DashboardNavProps {
  user: User | null;
  hasAccess: boolean;
  isInitialLoading: boolean;
}

export function DashboardNav({ user, hasAccess, isInitialLoading }: DashboardNavProps) {
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [getAccessModalOpen, setGetAccessModalOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="font-bold text-xl flex items-center gap-2">
          <Users className="w-6 h-6" />
          founderspy
        </div>
        <div className="flex items-center gap-4">
          {!isInitialLoading && (
            <>
              {user ? (
                <>
                  <Badge variant={hasAccess ? "default" : "secondary"}>
                    {hasAccess ? "Active" : "Inactive"}
                  </Badge>
                  <UserAvatarDropdown user={user} />
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Button onClick={() => setSignInModalOpen(true)} variant="ghost">
                    Sign In
                  </Button>
                  <Button onClick={() => setGetAccessModalOpen(true)} variant="default">
                    Get Access
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <SignInModal open={signInModalOpen} onOpenChange={setSignInModalOpen} />
      <GetAccessModal open={getAccessModalOpen} onOpenChange={setGetAccessModalOpen} />
    </nav>
  );
} 