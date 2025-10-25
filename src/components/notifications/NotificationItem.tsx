import { cn } from "@/lib/utils";
import Link from "next/link";

export type Notification = {
  id: string;
  message: string;
  featureTitle: string;
  featureId: string;
  date: string;
  read: boolean;
};

type NotificationItemProps = {
  notification: Notification;
};

export function NotificationItem({ notification }: NotificationItemProps) {
  return (
    <div className="relative flex items-start p-4 rounded-lg transition-colors hover:bg-muted/50">
      {!notification.read && (
        <span className="absolute left-2 top-1/2 -translate-y-1/2 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
      )}
      <div className={cn("ml-4 flex-1", notification.read ? "text-muted-foreground" : "")}>
        <p className="text-sm">
          {notification.message}{' '}
          <Link href={`/feature/${notification.featureId}`} className="font-semibold text-primary/90 hover:underline">
            {notification.featureTitle}
          </Link>
        </p>
        <p className="text-xs mt-1">{new Date(notification.date).toLocaleString()}</p>
      </div>
    </div>
  );
}
