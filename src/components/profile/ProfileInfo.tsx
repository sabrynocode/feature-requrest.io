import { UserProfile } from "@/types";
import Link from "next/link";
import React from "react";

type ProfileInfoProps = {
  user: UserProfile;
};

export default function ProfileInfo({ user }: ProfileInfoProps) {
  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-xl border bg-card text-center">
          <p className="text-2xl font-bold">{user.features.length}</p>
          <p className="text-sm text-muted-foreground">Features</p>
        </div>
        <div className="p-4 rounded-xl border bg-card text-center">
          <p className="text-2xl font-bold">{user.comments.length}</p>
          <p className="text-sm text-muted-foreground">Comments</p>
        </div>
        <div className="p-4 rounded-xl border bg-card text-center">
          <p className="text-2xl font-bold">{user.votes.length}</p>
          <p className="text-sm text-muted-foreground">Votes</p>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-4">Features</h2>
      {user.features.length === 0 ? (
        <p className="text-muted-foreground text-sm">No features yet.</p>
      ) : (
        <ul className="space-y-3">
          {user.features.map((f) => (
            <li key={f.id} className="p-4 rounded-xl border bg-card hover:bg-muted/50 transition">
              <Link href={`/feature/${f.id}`} className="font-medium hover:underline">
                {f.title}
              </Link>
              <p className="text-xs text-muted-foreground mt-1">
                {f.status} • {new Date(f.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
