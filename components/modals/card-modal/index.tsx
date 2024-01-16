"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Header } from "./header";
import { FormInput } from "@/components/form/form-input";

export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  const {
    data: cardData,
    error,
    fetchStatus,
    isFetching,
  } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: fetcher,
    // retry: false,
    // refetchOnWindowFocus: false,
    enabled: isOpen,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}> */}
      <DialogContent>
        {cardData ? <Header data={cardData} /> : <Header.Skeleton />}
      </DialogContent>
    </Dialog>
  );
};
