import { Separator } from "@/components/ui/separator";
import { Info } from "./_components/info";
import { BoardList } from "./_components/board-list";

export default async function Page() {
  return (
    <div className="w-full p-8">
      <Info />
      <Separator />
      <div>
        <BoardList />
      </div>
    </div>
  );
}
