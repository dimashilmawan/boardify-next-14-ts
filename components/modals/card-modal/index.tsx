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

  const {
    data: cardData,
    isError: isErrorCard,
    isSuccess: isSuccessCard,
  } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: fetcher,
    retry: 1,
    // refetchOnWindowFocus: false,
    enabled: isOpen,
  });

  const {
    data: auditLogsData,
    isError: isErrorLogs,
    isSuccess: isSuccessLogs,
  } = useQuery<AuditLog[]>({
    queryKey: ["card-logs", id],
    queryFn: fetcher,
    enabled: isOpen,
    retry: 1,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        {/* <DialogContent> */}
        {isSuccessCard && cardData ? (
          <Header data={cardData} />
        ) : (
          <Header.Skeleton isError={isErrorCard} />
        )}
        <div className="mt-3 grid grid-cols-1 md:grid-cols-4 md:gap-6">
          <div className="col-span-3 space-y-7">
            {isSuccessCard && cardData ? (
              <Description data={cardData} />
            ) : (
              <Description.Skeleton isError={isErrorCard} />
            )}
            {isSuccessLogs && auditLogsData ? (
              <Activity items={auditLogsData} />
            ) : (
              <Activity.Skeleton isError={isErrorLogs} />
            )}
          </div>
          <div className="col-span-1">
            {isSuccessCard && cardData ? (
              <Actions cardId={cardData.id} />
            ) : (
              <Actions.Skeleton />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
