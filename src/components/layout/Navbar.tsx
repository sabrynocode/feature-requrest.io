import { SignInButton, SignOutButton, SignedIn, SignedOut, UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/button";

import { syncUser } from "@/actions/userActions";
import NotificationsDropdown from "../notifications/NotificationsDropdown";
import ProfileAvatar from "../profile/ProfileAvatar";

export function Navbar() {
  syncUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold font-mono text-lg">{`> feature-request.io`}</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ProfileAvatar />

          <NotificationsDropdown />

          <ThemeToggle />

          <SignedIn>
            <SignOutButton>
              <Button variant={"destructive"}>Sign out</Button>
            </SignOutButton>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
