"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Header } from "./header";
import { Description } from "./description";
import { Actions } from "./actions";
import { Activity } from "./activity";
import { AuditLog } from "@prisma/client";

export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  const { data: cardData, isSuccess: isSuccessCard } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: fetcher,
    // retry: false,
    // refetchOnWindowFocus: false,
    enabled: isOpen,
  });
  const { data: auditLogsData, isSuccess: isSuccessLogs } = useQuery<
    AuditLog[]
  >({
    queryKey: ["card-logs", id],
    queryFn: fetcher,
    enabled: isOpen,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        {/* <DialogContent> */}
        {isSuccessCard && cardData ? (
          <Header data={cardData} />
        ) : (
          <Header.Skeleton />
        )}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-6">
          <div className="col-span-3 space-y-4">
            {isSuccessCard && cardData ? (
              <Description data={cardData} />
            ) : (
              <Description.Skeleton />
            )}
            {isSuccessLogs && auditLogsData ? (
              <Activity items={auditLogsData} />
            ) : (
              <Activity.Skeleton />
            )}
          </div>
          <div className="col-span-1">
            {isSuccessCard && cardData ? (
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
