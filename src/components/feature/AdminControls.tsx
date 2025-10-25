"use client";

import { updateFeatureStatus } from "@/actions/featureActions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FeatureStatus } from "@/generated/prisma";
import { useTransition } from "react";
import toast from "react-hot-toast";

interface AdminControlsProps {
  featureId: string;
  currentStatus: FeatureStatus;
}

export function AdminControls({ featureId, currentStatus }: AdminControlsProps) {
  const [isPending, startTransition] = useTransition();

  const onStatusChange = (status: FeatureStatus) => {
    startTransition(async () => {
      const result = await updateFeatureStatus(featureId, status);
      if (result.status === "success") {
        toast.success("Feature status updated.");
      } else {
        toast.error("Failed to update status.");
      }
    });
  };

  return (
    <div>
      <Select onValueChange={onStatusChange} defaultValue={currentStatus} disabled={isPending}>
        <SelectTrigger className="w-fit h-8">
          <SelectValue placeholder="Change status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={FeatureStatus.PENDING}>Pending</SelectItem>
          <SelectItem value={FeatureStatus.IN_PROGRESS}>In Progress</SelectItem>
          <SelectItem value={FeatureStatus.COMPLETED}>Completed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
