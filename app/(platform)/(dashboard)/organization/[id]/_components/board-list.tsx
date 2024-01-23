import { FormPopover } from "@/components/form/form-popover";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import db from "@/lib/db";
import { getAvailableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { HelpCircle, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export const BoardList = async () => {
  const { orgId } = auth();
  if (!orgId) return redirect("/select-org");

  const boards = await db.board.findMany({ where: { orgId } });
  const availableCount = await getAvailableCount();
  const isPro = await checkSubscription();

  return (
    <div className="space-y-3 py-4">
      <div className="flex items-center gap-2">
        <User2 className="h-6 w-6 " />
        <span className="text-lg font-semibold">Your Boards</span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {boards.map((board) => {
          return (
            <Link
              key={board.id}
              href={`/board/${board.id}`}
              className="group relative aspect-video overflow-hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-400"
              // style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
            >
              <Image
                src={board.imageThumbUrl}
                alt="board image"
                fill
                sizes="97vw"
                className="object-cover transition-all group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40  opacity-100 transition-all group-hover:bg-black/0 group-focus-visible:bg-emerald-500/50">
                <p className="p-2 text-center capitalize text-white lg:text-xl">
                  {board.title}
                </p>
              </div>
            </Link>
          );
        })}
        <FormPopover side="right" sideOffset={20}>
          <Button
            type="button"
            variant="ghostBrand"
            className="group relative aspect-video h-full w-full flex-col ring-2 ring-neutral-500 hover:ring-transparent"
          >
            <p>Create new board</p>
            <span className="mt-1 text-sm text-neutral-700 group-hover:text-inherit">
              {isPro ? "Unlimited" : `${availableCount} remaining`}{" "}
            </span>
            <Hint
              sideOffset={20}
              description="Free Workspaces can have up to 5 open boards. For unlimited boards,      upgrade this workspace."
            >
              <HelpCircle className="absolute bottom-2 right-2 h-4 w-4" />
            </Hint>
          </Button>
        </FormPopover>
      </div>
    </div>
  );
};

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="mt-28 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      <Skeleton className="aspect-video " />
      <Skeleton className="aspect-video " />
      <Skeleton className="aspect-video " />
      <Skeleton className="aspect-video " />
      <Skeleton className="aspect-video " />
      <Skeleton className="aspect-video " />
    </div>
  );
};
