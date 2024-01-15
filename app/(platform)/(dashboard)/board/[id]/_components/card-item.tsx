"use client";

import { useCardModal } from "@/hooks/use-card-modal";
import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@prisma/client";

type CardItemProps = {
  data: Card;
  index: number;
};
export const CardItem = ({ data, index }: CardItemProps) => {
  const onOpen = useCardModal((state) => state.onOpen);

  return (
    <Draggable
      index={index}
      draggableId={data.id}
      disableInteractiveElementBlocking
    >
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="rounded-md bg-white "
        >
          <button
            className="block w-full truncate rounded-md p-2 text-left text-sm "
            onClick={() => onOpen(data.id)}
            type="button"
          >
            {data.title}
          </button>
        </li>
        // <li
        //   ref={provided.innerRef}
        //   {...provided.draggableProps}
        //   {...provided.dragHandleProps}
        //   onClick={() => onOpen(data.id)}
        //   className="w-full truncate rounded-md bg-white p-2 text-left text-sm "
        // >
        //   {data.title}
        // </li>
      )}
    </Draggable>
  );
};
