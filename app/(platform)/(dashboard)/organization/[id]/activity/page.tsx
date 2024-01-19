import { Separator } from "@/components/ui/separator";
import { ActivityList } from "./_components/ActivityList";
import { Suspense } from "react";
import { Info } from "../_components/info";

async function Page() {
  return (
    <div className="w-full p-8">
      <Info />
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
