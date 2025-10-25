"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { getFeatureById } from "./featureActions";
import { revalidatePath } from "next/cache";

export async function createComment(featureId: string, content: string) {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Not authenticated");

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });
    if (!existingUser) throw new Error("User not found in database");

    const { data: feature } = await getFeatureById(featureId);
    if (!feature) throw new Error("Feature not found");

    if (feature?.userId === existingUser.id) {
      // Do not make notification

      await prisma.comment.create({
        data: {
          content,
          featureId,
          userId: existingUser.id,
        },
      });
    } else {
      // Make a notification

      await prisma.$transaction([
        prisma.comment.create({
          data: {
            content,
            featureId,
            userId: existingUser.id,
          },
        }),

        prisma.notification.create({
          data: {
            message: `${existingUser.name.split(" ")[0]} Commented on your Feature.`,
            userId: feature.userId,
            featureId,
          },
        }),
      ]);
    }

    revalidatePath(`/feature/${featureId}`);

    return { status: "success" };
  } catch (error) {
    console.log("Error creating a comment: " + error);
    return { status: "failed", error: String(error) };
  }
}

export async function getFeatureComments(featureId: string) {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Not authenticated");

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });
    if (!existingUser) throw new Error("User not found in database");

    const { data: feature } = await getFeatureById(featureId);
    if (!feature) throw new Error("Feature not found");

    const comments = await prisma.comment.findMany({
      where: {
        featureId,
      },

      orderBy: {
        createdAt: "desc",
      },

      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return { status: "success", data: comments };
  } catch (error) {
    console.log("Error fetching comments" + error);
    return { status: "failed", error: String(error) };
  }
}
