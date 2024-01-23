"use client";

import { stripeRedirect } from "@/actions/stripe-redirect";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { useProModal } from "@/hooks/use-pro-modal";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const SubscriptionButton = ({ isPro }: { isPro: boolean }) => {
  const proModal = useProModal();
  const router = useRouter();

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess(data) {
      router.replace(data);
    },
    onError(error) {
      toast.error(error);
    },
  });

  function handleClick() {
    if (isPro) {
      execute({});
    } else {
      console.log("onclose");
      proModal.onOpen();
    }
  }
  return (
    <Button onClick={handleClick} disabled={isLoading} variant="primary">
      {isPro ? "Manage Subscription" : "Upgrade to Pro"}
    </Button>
  );
};
