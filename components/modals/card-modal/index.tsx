"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";
import { useEffect, useState } from "react";

export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);
  const [data, setData] = useState(null);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>hello there</DialogContent>
    </Dialog>
  );
};
