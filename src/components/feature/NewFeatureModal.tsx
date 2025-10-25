import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewFeatureForm } from "./NewFeatureForm";
import { Plus } from "lucide-react";

export function NewFeatureModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="rounded-full shadow-lg hover:scale-105 transition-transform">
          <Plus className="h-5 w-5 mr-2" />
          New Feature
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Submit New Feature</DialogTitle>
          <DialogDescription>
            Have an idea? Share it with us! We'll review it for future implementation.
          </DialogDescription>
        </DialogHeader>
        <div className="pt-4">
          <NewFeatureForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
