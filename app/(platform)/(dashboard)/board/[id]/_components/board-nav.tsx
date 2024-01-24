import { Board } from "@prisma/client";
import { BoardOptions } from "./board-options";
import { BoardTitleForm } from "./board-title-form";

export const BoardNav = ({ data }: { data: Board }) => {
  return (
    <div className="fixed top-20 z-50 flex h-20 w-full items-center justify-between bg-black/30 px-4 backdrop-blur-sm md:top-16 md:h-16">
      <BoardTitleForm data={data} />
      <BoardOptions id={data.id} />
    </div>
  );
};
