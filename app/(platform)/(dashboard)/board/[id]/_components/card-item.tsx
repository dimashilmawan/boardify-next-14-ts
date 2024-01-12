"use client";

import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@prisma/client";

type CardItemProps = {
  data: Card;
  index: number;
};
export const CardItem = ({ data, index }: CardItemProps) => {
  return (
    <Draggable index={index} draggableId={data.id}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="w-full truncate rounded-md bg-white p-2 text-left text-sm first:mt-1 last:mb-1"
        >
          {data.title}
        </li>
      )}
    </Draggable>
  );
};
