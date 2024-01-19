"use client";

import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { useCardModal } from "@/hooks/use-card-modal";
import { CardWithList } from "@/types";
import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export const Actions = ({ data }: { data: CardWithList }) => {
  const onClose = useCardModal((state) => state.onClose);
  const params = useParams();

  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess(data) {
        toast.success(`Card '${data.title}' copied`);
        onClose();
      },
      onError(error) {
        toast.error(error);
      },
    },
  );
  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess(data) {
        toast.success(`Card '${data.title}' deleted`);
        onClose();
      },
      onError(error) {
        toast.error(error);
      },
    },
  );

  function onCopy() {
    const boardId = params.id as string;

    executeCopyCard({ boardId, id: data.id });
  }
  function onDelete() {
    const boardId = params.id as string;

    executeDeleteCard({ boardId, id: data.id });
  }

  return (
    <div className="h-full ">
      <p className="text-xs font-semibold text-neutral-700">Actions</p>
      <div className="mt-4 space-y-2">
        <Button
          onClick={onCopy}
          size="inline"
          className="w-full justify-start gap-2"
          variant="gray"
          disabled={isLoadingCopy}
        >
          <Copy className="h-5 w-5" />
          <span>Copy</span>
        </Button>
        <Button
          onClick={onDelete}
          size="inline"
          className="w-full justify-start gap-2"
          variant="destructive"
          disabled={isLoadingDelete}
        >
          <Trash className="h-5 w-5" />
          <span>Delete</span>
        </Button>
      </div>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <>
      <Skeleton className=" h-6 w-full" />
      <Skeleton className="mt-4 h-8 w-full" />
      <Skeleton className="mt-2 h-8 w-full" />
    </>
  );
};
