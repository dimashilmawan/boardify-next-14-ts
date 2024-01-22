import { Separator } from "@/components/ui/separator";
import { Info } from "../_components/info";
import { checkSubscription } from "@/lib/subscription";
import { SubscriptionButton } from "./_components/SubscriptionButton";

export default async function Page() {
  const isPro = await checkSubscription();
  return (
    <div className="w-full p-8">
      <Info isPro={isPro} />
      <Separator />
      <div className="py-4">
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  );
}
