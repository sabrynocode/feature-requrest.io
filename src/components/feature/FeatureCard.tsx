import { MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Feature } from "@/types";
import UpvoteButton from "./UpvoteButton";
import { checkVote } from "@/actions/voteActions";
import { getDbUser } from "@/actions/userActions";
import { AdminControls } from "./AdminControls";

type FeatureCardProps = {
  feature: Feature;
};

const statusColors: Record<Feature["status"], string> = {
  PENDING: "bg-gray-500 hover:bg-gray-600",
  IN_PROGRESS: "bg-blue-500 hover:bg-blue-600",
  COMPLETED: "bg-green-500 hover:bg-green-600",
};

export async function FeatureCard({ feature }: FeatureCardProps) {
  const isVote = await checkVote(feature.id);
  const user = await getDbUser();

  return (
    <Card className="hover:border-primary/60 transition-colors duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="hover:underline">
            <Link href={`/feature/${feature.id}`}>{feature.title}</Link>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge className={`${statusColors[feature.status]} text-white`}>{feature.status}</Badge>
            {user?.role === "ADMIN" && <AdminControls featureId={feature.id} currentStatus={feature.status} />}
          </div>
        </div>
        <CardDescription className="pt-2">{feature.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={`/profile/${feature.user.id}`} className="flex items-center">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage src={feature.user.image} alt={feature.user.image} />
            <AvatarFallback>{feature.user.name}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{feature.user.name}</span>
        </Link>
      </CardContent>
      <CardFooter className="flex justify-between">
        <UpvoteButton featureId={feature.id} isVote={isVote} initialCount={feature._count.votes} />
        <div className="flex items-center text-muted-foreground hover:text-primary transition-colors">
          <MessageSquare className="h-4 w-4 mr-2" />
          <span className="text-sm">{feature._count.comments}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
