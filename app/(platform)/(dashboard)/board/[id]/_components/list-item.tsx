"use client";

import { ListWithCards } from "@/types";
import { ListHeader } from "./list-header";

type ListItemProps = {
  data: ListWithCards;
  index: number;
};

export const ListItem = ({ data, index }: ListItemProps) => {
  return (
    <li className="w-64 select-none ">
      <div className="rounded-md bg-white/80 shadow-md">
        <ListHeader data={data} />
      </div>
    </li>
  );
};
