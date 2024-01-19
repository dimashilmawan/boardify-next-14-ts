"use client";
import { ActivityItem } from "@/components/ActivityItem";
import { Skeleton } from "@/components/ui/skeleton";
import { AuditLog } from "@prisma/client";
import { ActivityIcon } from "lucide-react";

export const Activity = ({ items }: { items: AuditLog[] }) => {
  return (
    <div className="flex w-full items-start gap-3">
      <ActivityIcon className="h-5 w-5 text-neutral-700" />
      <div className="w-full space-y-[0.625rem]">
        <p className="font-semibold text-neutral-700">Activity</p>
        <ol>
          {items.map((item) => (
            <ActivityItem key={item.id} data={item} />
          ))}
        </ol>
      </div>
    </div>
  );
};

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex w-full items-start gap-3">
      <Skeleton className="h-5 w-5 rounded-full" />
      <div className="w-full space-y-[0.625rem]">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
};
