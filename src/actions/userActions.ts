"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getDbUser() {
  try {
    const existingUser = await currentUser();
    if (!existingUser) throw new Error("Not authenticated");

    const user = await prisma.user.findUnique({
      where: {
        clerkId: existingUser.id,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function syncUser() {
  const user = await currentUser();
  if (!user) return;

  const existingUser = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: user.fullName || user.emailAddresses[0].emailAddress.split("@")[0],
        image: user.imageUrl,
      },
    });
  }
}

export async function getUserProfile(userId?: string) {
  const user = await currentUser();
  if (!user && !userId) throw new Error("Not authenticated");

  const existingUser = await prisma.user.findUnique({
    where: {
      id: userId || (await prisma.user.findUnique({ where: { clerkId: user?.id } }))?.id,
    },
    include: {
      features: {
        select: { id: true, title: true, createdAt: true, status: true },
      },
      comments: true,
      votes: true,
    },
  });

  if (!existingUser) throw new Error("User not found");

  return existingUser;
}

export async function requestAdminAccess() {
  try {
    const user = await getDbUser();
    if (!user) throw new Error("Not authenticated");

    if (user.role !== "USER") {
      return {
        status: "failed",
        message: "You are not eligible to request admin access.",
      };
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        role: "PENDING_ADMIN",
      },
    });

    revalidatePath("/profile");

    return {
      status: "success",
      message: "Your request for admin access has been submitted.",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "failed",
      message: "An error occurred while submitting your request.",
    };
  }
}
