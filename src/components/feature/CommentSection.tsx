import { getDbUser } from "@/actions/userActions";
import CommentInput from "./CommentInput";
import { CommentItem } from "./CommentItem";
import { getFeatureComments } from "@/actions/commentActions";
import { Comment } from "@/types";

type CommentSectionProps = {
  featureId: string;
};

export async function CommentSection({ featureId }: CommentSectionProps) {
  const user = await getDbUser();
  const { data: comments } = await getFeatureComments(featureId);

  return (
    <div className="space-y-8">
      {/* Comment Input */}
      {user && <CommentInput user={user} />}

      {/* Comment List */}
      {!comments?.length ? (
        <div>no comments on this feature yet</div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment: Comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}
