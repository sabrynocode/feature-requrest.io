"use server";

import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function upvoteFeature(featureId: string) {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) throw new Error("Not authenticated");
    const { id: clerkId } = clerkUser;

    const user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user) throw new Error("User not found");

    // Check if already voted
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_featureId: {
          userId: user.id,
          featureId,
        },
      },
    });

    if (existingVote) {
      // Optional: handle unvote toggle
      await prisma.$transaction([
        prisma.vote.delete({
          where: { id: existingVote.id },
        }),
      ]);

      return { success: true, action: "unvoted" as const };
    }

    // Fetch feature and owner
    const feature = await prisma.feature.findUnique({
      where: { id: featureId },
      select: { id: true, title: true, userId: true },
    });

    if (!feature) throw new Error("Feature not found");

    await prisma.$transaction(async (tx) => {
      // 1️⃣ Create the vote
      await tx.vote.create({
        data: {
          userId: user.id,
          featureId,
        },
      });

      // 2️⃣ Create notification (if not voting on own feature)
      if (feature.userId !== user.id) {
        await tx.notification.create({
          data: {
            userId: feature.userId,
            featureId: feature.id,
            message: `${user.name || "Someone"} upvoted your feature "${feature.title}"`,
          },
        });
      }
    });

    return { success: true, action: "voted" as const };
  } catch (error) {
    console.error("Error upvoting feature:", error);
    return { success: false, message: "Failed to upvote feature" };
  }
}

export async function checkVote(featureId: string) {
  const user = await currentUser();
  if (!user) return;

  const existingUser = await prisma.user.findUnique({ where: { clerkId: user.id } });
  if (!existingUser) return;

  const vote = await prisma.vote.findUnique({
    where: {
      userId_featureId: {
        userId: existingUser.id,
        featureId,
      },
    },
  });

  return vote ? true : false;
}
