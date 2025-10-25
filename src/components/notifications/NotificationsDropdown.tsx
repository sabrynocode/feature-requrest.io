"use client";

import { useState, useTransition, useRef } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import Link from "next/link";
import { getAllNotifications, markNotificationAsRead } from "@/actions/notificationActions";
import { Notification } from "@/types";
import { useUser } from "@clerk/nextjs";

export default function NotificationsDropdown() {
  const { user } = useUser();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  // Simple in-memory cache (lives as long as the page)
  const hasFetchedOnce = useRef(false);

  if (!user) return null;

  const fetchNotifications = async (silent = false) => {
    try {
      if (!silent) hasFetchedOnce.current = true;
      const { data } = await getAllNotifications();
      if (Array.isArray(data)) setNotifications(data);
    } catch (error) {
      console.error("Failed to load notifications:", error);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      // On first open → show instantly but also refresh quietly
      if (!hasFetchedOnce.current) {
        startTransition(() => fetchNotifications());
      } else {
        fetchNotifications(true);
      }
    }
  };

  const handleRead = async (n: Notification) => {
    if (!n.read && n.id) {
      try {
        await markNotificationAsRead(n.id);
        fetchNotifications(true);
      } catch (error) {
        console.error("Error marking notification as read:", error);
      }
    }
  };

  const unreadExists = notifications.some((n) => !n.read);

  return (
    <DropdownMenu open={open} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <button className="relative rounded-full p-2 hover:bg-muted transition" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          {unreadExists && <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80">
        <DropdownMenuLabel className="font-semibold">Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {notifications.length === 0 ? (
          <DropdownMenuItem disabled>No notifications yet</DropdownMenuItem>
        ) : (
          notifications.slice(0, 7).map((n) => (
            <DropdownMenuItem key={n.id} asChild className={`transition-colors ${n.read ? "bg-background hover:bg-muted/50" : "bg-primary/10 hover:bg-primary/20 font-medium"}`}>
              <Link href={n.featureId ? `/feature/${n.featureId}` : "#"} onClick={() => handleRead(n)}>
                <div className="flex flex-col gap-0.5">
                  <span>{n.message}</span>
                  <span className="text-xs text-muted-foreground">{new Date(n.createdAt).toLocaleString()}</span>
                  {n.feature && <span className="text-xs font-medium text-primary">Related: {n.feature.title}</span>}
                </div>
              </Link>
            </DropdownMenuItem>
          ))
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/notifications" className="text-sm text-muted-foreground text-center w-full">
            View all
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
