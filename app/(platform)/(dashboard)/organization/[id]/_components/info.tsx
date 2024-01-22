"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import Image from "next/image";

export const Info = ({ isPro }: { isPro: boolean }) => {
  const { isLoaded, organization } = useOrganization();
  if (!isLoaded) return <Info.Skeleton />;

  return (
    <div className="flex items-center gap-3 py-4">
      <div className="relative h-14 w-14">
        <Image
          fill
          className="rounded-md object-cover"
          src={organization?.imageUrl!}
          sizes="97vw"
          alt="organization image"
        />
      </div>
      <div>
        <p className="text-xl font-semibold">{organization?.name}</p>
        <div className="flex items-center gap-2 text-xs text-neutral-600">
          <CreditCard className="h-5 w-5" />
          <span>{isPro ? "Pro" : "Free"}</span>
        </div>
      </div>
    </div>
  );
};

Info.Skeleton = function SkeletonInfo() {
  return (
    <div className="flex items-center gap-3 py-4">
      <Skeleton className="h-14 w-14 rounded-md" />
      <div className="space-y-1">
        <Skeleton className="h-6 w-24" />
        <div className="flex items-center gap-2 text-xs text-neutral-600">
          <Skeleton className="h-5 w-4" />
          <Skeleton className="h-5 w-8" />
        </div>
      </div>
    </div>
  );
};
