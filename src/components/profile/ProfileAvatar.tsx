"use client";

import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function ProfileAvatar() {
  const { user } = useUser();

  if (!user) return null;

  const imageUrl = user.imageUrl;
  const initials = user.firstName?.[0] + (user.lastName?.[0] ?? "");

  return (
    <Link href="/profile">
      <Avatar className="h-9 w-9 border border-border hover:opacity-80 transition">
        <AvatarImage src={imageUrl} alt={user.fullName || "User"} />
        <AvatarFallback className="bg-muted text-sm font-medium">{initials || "?"}</AvatarFallback>
      </Avatar>
    </Link>
  );
}
