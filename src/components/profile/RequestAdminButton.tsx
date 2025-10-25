'use client';

import { Button } from "@/components/ui/button";
import { requestAdminAccess } from "@/actions/userActions";
import { useTransition } from "react";
import toast from "react-hot-toast";

export function RequestAdminButton() {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      const result = await requestAdminAccess();
      if (result.status === "success") {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Button onClick={handleClick} disabled={isPending}>
      {isPending ? "Submitting..." : "Request Admin Access"}
    </Button>
  );
}
