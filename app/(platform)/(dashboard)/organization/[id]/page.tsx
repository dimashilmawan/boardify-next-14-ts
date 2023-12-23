import { Separator } from "@/components/ui/separator";
import { Info } from "./_components/info";
import { BoardList } from "./_components/board-list";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div className="w-full p-8">
      <Info />
      <Separator />
      <div>
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  );
}
