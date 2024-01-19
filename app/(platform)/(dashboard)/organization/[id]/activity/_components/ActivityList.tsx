import { ActivityItem } from "@/components/ActivityItem";
import { Skeleton } from "@/components/ui/skeleton";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const ActivityList = async () => {
  const { orgId } = auth();

  if (!orgId) redirect("/select-org");

  const auditLogs = await db.auditLog.findMany({
    where: { orgId },
    orderBy: { createdAt: "desc" },
  });
  if (auditLogs.length === 0)
    return (
      <div className="p-10">
        <p className="hidden text-center text-sm text-muted-foreground last:block">
          No activity found inside this organization
        </p>
      </div>
    );

  return (
    <ol className="space-y-4 p-4">
      {auditLogs.map((log) => (
        <ActivityItem key={log.id} data={log} />
      ))}
    </ol>
  );
};

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <div className="space-y-4 p-4">
      <Skeleton className="h-10 w-1/2" />
      <Skeleton className="h-10 w-1/2" />
      <Skeleton className="h-10 w-1/2" />
      <Skeleton className="h-10 w-1/2" />
      <Skeleton className="h-10 w-1/2" />
      <Skeleton className="h-10 w-1/2" />
      <Skeleton className="h-10 w-1/2" />
      <Skeleton className="h-10 w-1/2" />
    </div>
  );
};
