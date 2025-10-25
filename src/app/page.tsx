import { FeatureCard } from "@/components/feature/FeatureCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NewFeatureModal } from "@/components/feature/NewFeatureModal";
import { currentUser } from "@clerk/nextjs/server";
import { getAllFeatures } from "@/actions/featureActions";
import { Feature } from "@/types";

export default async function Home() {
  const existingUser = await currentUser();
  const { status, data: features } = await getAllFeatures();

  if (status === "failed" || !features) {
    return <div className="text-center text-red-500 mt-10">Failed to load features</div>;
  }

  const renderFeatureList = (features: Feature[]) => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => (
        <FeatureCard key={feature.id} feature={feature} />
      ))}
    </div>
  );

  return (
    <div className="relative">
      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="planned">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all">{renderFeatureList(features)}</TabsContent>
        <TabsContent value="planned">{renderFeatureList(features.filter((f) => f.status === "PENDING"))}</TabsContent>
        <TabsContent value="in-progress">{renderFeatureList(features.filter((f) => f.status === "IN_PROGRESS"))}</TabsContent>
        <TabsContent value="completed">{renderFeatureList(features.filter((f) => f.status === "COMPLETED"))}</TabsContent>
      </Tabs>

      {existingUser && (
        <div className="fixed bottom-10 right-10">
          <NewFeatureModal />
        </div>
      )}
    </div>
  );
}
