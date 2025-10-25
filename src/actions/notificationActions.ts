"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getAllNotifications() {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Not authenticated");

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });
    if (!existingUser) throw new Error("User not found in database");

    const notifications = await prisma.notification.findMany({
      where: {
        userId: existingUser.id,
      },

      orderBy: {
        createdAt: "desc",
      },

      include: {
        feature: {
          select: { id: true, title: true },
        },
      },
    });

    return { status: "success", data: notifications };
  } catch (error) {
    console.log("Error fetching notifications" + error);
    return { status: "failed", error: String(error) };
  }
}

export async function markAllNotificationsAsRead() {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Not authenticated");

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });
    if (!existingUser) throw new Error("User not found in database");

    await prisma.notification.updateMany({
      where: {
        userId: existingUser.id,
        read: false,
      },

      data: {
        read: true,
      },
    });

    revalidatePath("");
  } catch (error) {
    console.log("Error marking notifications as read");
  }
}

export async function markNotificationAsRead(notificationId: string) {
  try {
    await prisma.notification.update({
      where: {
        id: notificationId,
      },

      data: {
        read: true,
      },
    });
  } catch (error) {
    console.log("Error marking notification as read" + error);
  }
}
