"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import { createComment } from "@/actions/commentActions"; // your server action
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "next/navigation";
import { User } from "@/types";
import { useState } from "react";

const formSchema = z.object({
  content: z.string().min(3, {
    message: "Comment must be at least 3 characters.",
  }),
});

type CommentInputProps = {
  user: User;
};

export default function CommentInput({ user }: CommentInputProps) {
  const params = useParams();
  const featureId = params.id as string;
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.content.trim()) return;

    setIsLoading(true);
    try {
      await createComment(featureId, values.content);
      toast.success("Comment added successfully");
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add comment");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start space-x-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.image} alt={user.name} />
          <AvatarFallback>{user.name}</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Write a comment..."
                    rows={3}
                    className="bg-muted/50 border-muted-foreground/20 focus-visible:ring-1 focus-visible:ring-primary/80 focus-visible:bg-background transition-colors"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} type="submit" className="hover:shadow-md hover:shadow-primary/30 transition">
            Post Comment
          </Button>
        </div>
      </form>
    </Form>
  );
}
