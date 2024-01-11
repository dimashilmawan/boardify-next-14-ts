"use client";

import { Card } from "@prisma/client";

type CardItemProps = {
  data: Card;
  index: number;
};
export const CardItem = ({ data }: CardItemProps) => {
  return (
    <li>
      <button
        type="button"
        className="w-full truncate rounded-md bg-white p-2 text-left text-sm "
      >
        {data.title}
      </button>
    </li>
  );
};
