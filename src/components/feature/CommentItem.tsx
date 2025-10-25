import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Comment } from "@/types";

type CommentItemProps = {
  comment: Comment;
};

export function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="flex items-start space-x-4">
      <Avatar className="h-10 w-10">
        <AvatarImage src={comment.user.name} alt={comment.user.name} />
        <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <span className="font-semibold">{comment.user.name}</span>
          <span className="text-xs text-muted-foreground">{new Date(comment.createdAt).toLocaleDateString()}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{comment.content}</p>
      </div>
    </div>
  );
}
