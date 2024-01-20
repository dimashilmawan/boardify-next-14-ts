"use client";
import { Dialog, DialogContent } from "../ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAction } from "@/hooks/use-action";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const ProModal = () => {
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

  function handleClickUpgrade() {
    execute({});
  }
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className="max-w-md">
        <div className="relative aspect-video">
          <Image
            src="/images/hero.svg"
            alt="hero image"
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6 text-neutral-700">
          <h2 className="text-xl font-semibold">
            Upgrade to Boardify Pro Today!
          </h2>
          <p className="mt-2 text-sm font-semibold text-neutral-600">
            Explore the best of Boardify
          </p>
          <ul className="list-disc pl-5 text-sm">
            <li>Unlimited boards</li>
            <li>Advanced checklists</li>
            <li>Admin and security features</li>
            <li>And more!</li>
          </ul>
          <Button
            onClick={handleClickUpgrade}
            disabled={isLoading}
            className="mt-6 block w-full"
          >
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
