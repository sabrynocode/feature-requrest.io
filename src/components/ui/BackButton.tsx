"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();
  return (
    <Button variant="ghost" onClick={() => router.back()} className="mb-6 group">
      <ArrowLeft className="h-4 w-4 mr-2 group-hover:text-primary transition-colors" /> Back
    </Button>
  );
}
