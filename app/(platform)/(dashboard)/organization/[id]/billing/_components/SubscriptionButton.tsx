"use client";

import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";

export const SubscriptionButton = ({ isPro }: { isPro: boolean }) => {
  const proModal = useProModal();
  return (
    <Button onClick={proModal.onOpen}>
      {isPro ? "Manage Subscription" : "Upgrade to Pro"}
    </Button>
  );
};
