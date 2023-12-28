import { Board } from "@prisma/client";
import { BoardOptions } from "./board-options";
import { BoardTitleForm } from "./board-title-form";

export const BoardNav = ({ data }: { data: Board }) => {
  return (
    <div className="fixed top-16 z-50 flex h-14 w-full items-center justify-between bg-black/40 px-4 backdrop-blur-sm">
      <BoardTitleForm data={data} />
      <BoardOptions id={data.id} />
    </div>
  );
};
