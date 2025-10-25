// app/profile/[id]/page.tsx
import { getUserProfile } from "@/actions/userActions";
import Image from "next/image";
import ProfileInfo from "@/components/profile/ProfileInfo";
import { currentUser } from "@clerk/nextjs/server";
import { SignedIn, UserButton } from "@clerk/nextjs";

type UserProfilePageProps = {
  params: Promise<{ id: string }>;
};

export default async function UserProfilePage({ params }: UserProfilePageProps) {
  const { id: urlId } = await params;
  const clerkUser = await currentUser();
  const user = await getUserProfile(urlId);
  const isCurrentUser = clerkUser?.id === user.clerkId;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex  gap-4">
          <Image src={clerkUser?.imageUrl || ""} alt={user.name} width={80} height={80} className="rounded-full border" />
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground text-sm">{user.email}</p>
            <p className="text-xs text-muted-foreground mt-1">Joined {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {isCurrentUser && (
          <div className="flex items-center gap-2">
            <SignedIn>
              <p className="text-muted-foreground text-sm">Profile Settings</p>
              <UserButton />
            </SignedIn>
          </div>
        )}
      </div>

      <ProfileInfo user={user} />
    </div>
  );
}
