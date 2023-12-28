import { Board } from "@prisma/client";
import { BoardOptions } from "./board-options";
import { BoardTitleForm } from "./board-title-form";

export const BoardNav = ({ data }: { data: Board }) => {
  return (
    <div className="fixed top-16 flex h-14 w-full items-center justify-between bg-black/30 px-4">
      <BoardTitleForm data={data} />
      <div>
        <BoardOptions />
      </div>
    </div>
  );
};
