"use client";

import { ListWithCards } from "@/types";
import { ListHeader } from "./list-header";
import { useRef, useState } from "react";
import { CardForm } from "./card-form";
import { CardItem } from "./card-item";
import { Draggable, Droppable } from "@hello-pangea/dnd";

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
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="h-min w-64 shrink-0 rounded-md bg-white/90 shadow-lg transition-colors hover:bg-white/80"
        >
          <ListHeader data={data} onAddCard={enableEditing} />
          <Droppable droppableId={data.id} type="card">
            {(provided) => (
              <ol
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-col gap-2 px-3 py-0.5"
              >
                {data.cards.map((card, index) => (
                  <CardItem key={card.id} data={card} index={index} />
                ))}
                {provided.placeholder}
              </ol>
            )}
          </Droppable>
          <CardForm
            ref={textareaRef}
            listId={data.id}
            boardId={data.boardId}
            isEditing={isEditing}
            enableEditing={enableEditing}
            disableEditing={disableEditing}
          />
        </li>
      )}
    </Draggable>
  );
};
