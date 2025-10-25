import { getUserProfile } from "@/actions/userActions";
import ProfileInfo from "@/components/profile/ProfileInfo";
import { RequestAdminButton } from "@/components/profile/RequestAdminButton";
import { Button } from "@/components/ui/button";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const user = await currentUser();
  if (!user) return <div className="text-center py-20">Not signed in</div>;

  const dbUser = await getUserProfile();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex  gap-4">
          <Image src={user.imageUrl} alt={dbUser.name} width={80} height={80} className="rounded-full border" />
          <div>
            <h1 className="text-2xl font-bold">{dbUser.name}</h1>
            <p className="text-muted-foreground text-sm">{dbUser.email}</p>
            <p className="text-xs text-muted-foreground mt-1">Joined {new Date(dbUser.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {dbUser.clerkId === user.id && (
            <div className="flex items-center gap-2">
              <SignedIn>
                <p className="text-muted-foreground text-sm">Profile Settings</p>
                <UserButton />
              </SignedIn>
            </div>
          )}
          {dbUser.role === "USER" && <RequestAdminButton />}
          {dbUser.role === "PENDING_ADMIN" && <Button disabled>Request Pending</Button>}
          {dbUser.role === "ADMIN" && <Button disabled>Admin</Button>}
        </div>
      </div>

      <ProfileInfo user={dbUser} />
    </div>
  );
}
