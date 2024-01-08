"use client";

import { ListWithCards } from "@/types";
import { ListForm } from "./list-form";

type ListContainerProps = {
  boardId: string;
  data: ListWithCards[];
};

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
  return (
    <ol className="flex h-full gap-3">
      <ListForm />
      <li className="w-1 shrink-0 " />
    </ol>
  );
};
