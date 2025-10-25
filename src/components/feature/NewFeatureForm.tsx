"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import { createFeature } from "@/actions/featureActions";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

export function NewFeatureForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.title.trim() || !values.description.trim()) return null;

    try {
      createFeature(values.title, values.description);
      toast.success("Feature Created Successfully");
      form.reset();
    } catch (error) {
      console.log(error);
      toast.error("Error Creating Feature");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='e.g. "Add GraphQL API Support"' {...field} className="focus-visible:ring-1 focus-visible:ring-primary/80" />
              </FormControl>
              <FormDescription>A short, descriptive title for your feature request.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us more about your idea..." className="resize-none focus-visible:ring-1 focus-visible:ring-primary/80" rows={5} {...field} />
              </FormControl>
              <FormDescription>Provide a detailed description of the feature.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full hover:shadow-lg hover:shadow-primary/40 transition-shadow">
          Submit Feature Request
        </Button>
      </form>
    </Form>
  );
}
