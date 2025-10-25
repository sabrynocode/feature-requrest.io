"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { FeatureStatus, Role } from "@/generated/prisma";
import { revalidatePath } from "next/cache";

export async function getAllFeatures() {
  try {
    const features = await prisma.feature.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        user: true,

        _count: {
          select: { votes: true, comments: true },
        },
      },
    });

    return { status: "success", data: features };
  } catch (error) {
    console.log("Error fetching data: " + error);
    return { status: "failed", error: String(error) };
  }
}

export async function getFeatureById(id: string) {
  try {
    const feature = await prisma.feature.findUnique({
      where: {
        id,
      },

      include: {
        user: true,
        comments: {
          orderBy: {
            createdAt: "desc",
          },

          include: {
            user: true,
          },
        },

        _count: {
          select: {
            votes: true,
          },
        },
      },
    });

    if (!feature) throw new Error("Feature not found");

    return { status: "success", data: feature };
  } catch (error) {
    console.error("Error while fetching feature: " + error);

    return { status: "failed", error: String(error) };
  }
}

export async function createFeature(title: string, description: string) {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Not authenticated");

    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });
    if (!dbUser) throw new Error("User not found in database");

    if (!title.trim() || !description.trim()) throw new Error("Title or description needed!");
    const feature = await prisma.feature.create({
      data: {
        title,
        description,
        userId: dbUser.id,
      },
    });

    revalidatePath("/");

    return { status: "success", data: feature };
  } catch (error) {
    console.log("Error while creating feature: " + error);
    return { status: "failed", error: String(error) };
  }
}

export async function updateFeatureStatus(featureId: string, status: FeatureStatus) {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Not authenticated");

    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });
    if (!dbUser) throw new Error("User not found in database");
    if (dbUser.role !== Role.ADMIN) throw new Error("You must be an admin to make this action");

    await prisma.feature.update({
      where: {
        id: featureId,
      },

      data: {
        status,
      },
    });

    revalidatePath("/");
    revalidatePath(`/feature/${featureId}`);

    return { status: "success" };
  } catch (error) {
    console.log("Error updating feature status: " + error);
    return { status: "failed", error: String(error) };
  }
}
