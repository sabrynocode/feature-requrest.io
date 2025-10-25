import { getAllNotifications, markAllNotificationsAsRead, markNotificationAsRead } from "@/actions/notificationActions";
import MarkAsReadButton from "@/components/notifications/MarkAsReadButton";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function NotificationsPage() {
  const { data: notifications = [] } = await getAllNotifications();

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>

        <form action={markAllNotificationsAsRead}>
          <Button type="submit" variant="outline" size="sm" className="hover:bg-primary/10">
            Mark all as read
          </Button>
        </form>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center text-muted-foreground">You have no notifications.</div>
      ) : (
        <ul className="space-y-4">
          {notifications.map((n) => (
            <li key={n.id} className={`border rounded-xl p-4 transition-all ${n.read ? "bg-background" : "bg-muted/40 border-primary/20"}`}>
              <div className="flex flex-col gap-1">
                <p className="text-sm">{n.message}</p>

                {n.feature && <MarkAsReadButton id={n.id} featureId={n.feature.id} />}

                <span className="text-xs text-muted-foreground">{new Date(n.createdAt).toLocaleString()}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
