"use client";

import { useTransition } from "react";
import { markNotificationAsRead } from "@/actions/notificationActions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function MarkAsReadButton({ id, featureId }: { id: string; featureId?: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="link"
      className="text-sm text-primary hover:underline p-0 h-auto justify-start"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await markNotificationAsRead(id);
          router.push(`/feature/${featureId}`);
        })
      }
    >
      View Feature
    </Button>
  );
}
