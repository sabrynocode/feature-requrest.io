import { getUserProfile } from "@/actions/userActions";
import { Prisma } from "@/generated/prisma";

export enum FeatureStatus {
  PENDING,
  IN_PROGRESS,
  COMPLETED,
}

export enum Role {
  USER,
  ADMIN,
  PENDING_ADMIN,
}

export type Feature = Prisma.FeatureGetPayload<{
  include: {
    user: true;
    _count: { select: { votes: true; comments: true } };
  };
}>;

export type User = Prisma.UserGetPayload<{
  include?: {
    _count: {
      select: {
        comments: true;
        votes: true;
      };
    };
  };
}>;

export type Comment = Prisma.CommentGetPayload<{
  include: {
    user: {
      select: {
        image: true;
        name: true;
      };
    };
  };
}>;

export type Notification = Prisma.NotificationGetPayload<{
  include: { feature: { select: { id: true; title: true } } };
}>;

export type UserProfile = Awaited<ReturnType<typeof getUserProfile>>;

export type Vote = {
  id: string;
  createdAt: Date;
  userId: string;
  featureId: string;
};
