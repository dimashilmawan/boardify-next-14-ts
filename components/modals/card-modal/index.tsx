"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Header } from "./header";
import { FormInput } from "@/components/form/form-input";
import { Description } from "./description";
import { Actions } from "./actions";

export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  const { data: cardData, isSuccess } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: fetcher,
    // retry: false,
    // refetchOnWindowFocus: false,
    enabled: isOpen,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        {/* <DialogContent> */}
        {isSuccess && cardData ? (
          <Header data={cardData} />
        ) : (
          <Header.Skeleton />
        )}
        <div className="mt-3 grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            {isSuccess && cardData ? (
              <Description data={cardData} />
            ) : (
              <Description.Skeleton />
            )}
          </div>
          <div className="col-span-1">
            {isSuccess && cardData ? (
              <Actions data={cardData} />
            ) : (
              <Actions.Skeleton />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
