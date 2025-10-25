import { CommentSection } from "@/components/feature/CommentSection";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getFeatureById } from "@/actions/featureActions";
import { Feature } from "@/types";
import { Separator } from "@/components/ui/separator";
import UpvoteButton from "@/components/feature/UpvoteButton";
import { checkVote } from "@/actions/voteActions";
import { getDbUser } from "@/actions/userActions";
import { AdminControls } from "@/components/feature/AdminControls";

interface FeaturePageProps {
  params: Promise<{ id: string }>;
}

export default async function FeaturePage({ params }: FeaturePageProps) {
  const { id } = await params;
  const { data: feature } = await getFeatureById(id);
  if (!feature) {
    return <div className="flex items-center justify-center h-[60vh] text-muted-foreground font-mono text-lg">404 — Feature not found</div>;
  }

  const isVote = await checkVote(feature.id);
  const user = await getDbUser();

  const statusColors: Record<Feature["status"], string> = {
    PENDING: "bg-gray-500 hover:bg-gray-600",
    IN_PROGRESS: "bg-blue-500 hover:bg-blue-600",
    COMPLETED: "bg-green-500 hover:bg-green-600",
  };

  return (
    <div className="relative max-w-4xl mx-auto p-6 lg:p-10">
      <BackButton />
      {/* subtle nerdy grid background */}
      <div className="absolute inset-0 -z-10 bg-[url('/grid.svg')] opacity-[0.04] pointer-events-none" />

      {/* Header */}
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold mb-4 tracking-tight text-primary/90 font-mono">{feature.title}</h1>
          {user?.role === "ADMIN" && <AdminControls featureId={feature.id} currentStatus={feature.status} />}
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <Badge className={`${statusColors[feature.status]} text-white`}>{feature.status.replace("_", " ")}</Badge>

          <div className="flex items-center">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage src={feature.user.image} alt={feature.user.name} />
              <AvatarFallback>{feature.user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="font-mono">{feature.user.name}</span>
          </div>

          <span className="font-mono">{new Date(feature.createdAt).toLocaleDateString()}</span>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="grow prose dark:prose-invert leading-relaxed">
          <p>{feature.description}</p>
        </div>

        <div className="w-full md:w-32 shrink-0">
          <UpvoteButton featureId={feature.id} isVote={isVote} initialCount={feature._count.votes} />
        </div>
      </div>

      <Separator className="mt-8" />

      {/* Comments */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-6 font-mono">Comments</h2>
        <CommentSection featureId={feature.id} />
      </section>
    </div>
  );
}
