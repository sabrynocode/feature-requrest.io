"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import { upvoteFeature } from "@/actions/voteActions";
import { useTransition, useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function UpvoteButton({ featureId, initialCount = 0, isVote = false }: { featureId: string; initialCount: number; isVote: boolean | undefined }) {
  const { isSignedIn } = useUser();
  const [count, setCount] = useState(initialCount);
  const [isPending, startTransition] = useTransition();
  const [isVoted, setIsVoted] = useState<boolean>(isVote);
  const isDisabled = !isSignedIn || isPending;
  console.log(isDisabled);

  return (
    <Button
      variant="outline"
      disabled={isDisabled}
      className="group hover:border-primary/80"
      onClick={() =>
        startTransition(async () => {
          const res = await upvoteFeature(featureId);
          if (res?.action === "voted") setCount((c) => c + 1);
          else if (res?.action === "unvoted") setCount((c) => c - 1);

          setIsVoted((v) => !v);
        })
      }
    >
      {isVoted ? <ArrowDown className="h-4 w-4 mr-2 group-hover:text-primary transition-colors" /> : <ArrowUp className="h-4 w-4 mr-2 group-hover:text-primary transition-colors" />}
      {isPending ? "..." : count}
    </Button>
  );
}
