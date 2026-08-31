"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Settings, User as UserIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { authService } from "@/features/auth/services/auth-service";
import { useUiStore } from "@/store/ui-store";
import { useToast } from "@/hooks/use-toast";

/**
 * UserMenu — 03-pages-and-layouts.md §3.1/§20.1, 05-user-flows-ui.md §24.
 *
 * Logout is NOT gated behind a confirmation modal (07-frontend-security.md
 * §21.3 restated for this concrete control) — it is non-destructive and
 * instantly reversible via re-login. On success it clears the entire
 * React Query cache and persisted UI state (theme excluded), per
 * 01-frontend-architecture.md §5.5 / 07-frontend-security.md §9.6.
 */
function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function UserMenu({ name, email }: { name: string; email: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const setSidebarCollapsed = useUiStore((state) => state.setSidebarCollapsed);

  const logout = useMutation({
    mutationFn: () => authService.logout(),
    onSettled: () => {
      // 07-frontend-security.md §9.6: clear cache/state regardless of the
      // server call's own outcome — logout is a client-side guarantee,
      // not conditional on network success.
      queryClient.clear();
      setSidebarCollapsed(false);
      router.push("/login");
    },
    onError: () => {
      toast({
        variant: "info",
        title: "Signed out locally",
        description: "We couldn't reach the server, but your session has been cleared.",
      });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Open user menu"
          className="flex items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <Avatar>
            <AvatarFallback>{getInitials(name) || <UserIcon className="size-4" />}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <p className="text-body font-medium text-foreground">{name}</p>
          <p className="text-body-sm text-muted-foreground">{email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/account">
            <Settings className="size-4" aria-hidden="true" />
            Account settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onSelect={() => logout.mutate()}
        >
          <LogOut className="size-4" aria-hidden="true" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
