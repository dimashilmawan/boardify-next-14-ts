import { Separator } from "@/components/ui/separator";
import { ActivityList } from "./_components/ActivityList";
import { Suspense } from "react";
import { Info } from "../_components/info";
import { checkSubscription } from "@/lib/subscription";

async function Page() {
  const isPro = await checkSubscription();

  return (
    <div className="w-full p-8">
      <Info isPro={isPro} />
      <Separator />
      <div>
        <Suspense fallback={<ActivityList.Skeleton />}>
          <ActivityList />
        </Suspense>
      </div>
    </div>
  );
}
export default Page;
