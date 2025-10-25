"use client";

import { Bell } from "lucide-react";

export default function NotificationsTrigger({ unread }: { unread: boolean }) {
  return (
    <button className="relative p-2">
      <Bell className="h-5 w-5" />
      {unread && <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />}
    </button>
  );
}
