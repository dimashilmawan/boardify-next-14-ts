"use client";

import { ListWithCards } from "@/types";

type ListItemProps = {
  data: ListWithCards;
  index: number;
};

export const ListItem = ({ data, index }: ListItemProps) => {
  return <li className="w-64 select-none bg-yellow-400">{data.title}</li>;
};
