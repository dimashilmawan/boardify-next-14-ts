"use client";

import { ListWithCards } from "@/types";
import { ListHeader } from "./list-header";
import { useRef, useState } from "react";
import { CardForm } from "./card-form";
import { CardItem } from "./card-item";
import { Draggable } from "@hello-pangea/dnd";

type ListItemProps = {
  data: ListWithCards;
  index: number;
};

export const ListItem = ({ data, index }: ListItemProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  function enableEditing() {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef?.current?.focus();
    });
  }

  function disableEditing() {
    setIsEditing(false);
  }

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          className="w-64 shrink-0 select-none "
        >
          {/* <div
            {...provided.dragHandleProps}
            className="rounded-md bg-white/80 shadow-md backdrop-blur-[2px] transition [&:has(button:hover)]:bg-white/70"
          > */}
          <div className="rounded-md bg-emerald-600 shadow-md backdrop-blur-[2px] transition [&:has(button:hover)]:bg-white/70">
            <ListHeader data={data} onAddCard={enableEditing} />
            <ol className="flex flex-col gap-2 px-3">
              {data.cards.map((card, index) => (
                <CardItem key={card.id} data={card} index={index} />
              ))}
            </ol>
            <CardForm
              ref={textareaRef}
              listId={data.id}
              boardId={data.boardId}
              isEditing={isEditing}
              enableEditing={enableEditing}
              disableEditing={disableEditing}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
};
