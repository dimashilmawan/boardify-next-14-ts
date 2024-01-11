"use client";

import { ListWithCards } from "@/types";
import { ListHeader } from "./list-header";
import { useRef, useState } from "react";
import { CardForm } from "./card-form";
import { CardItem } from "./card-item";

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
    <li className="w-64 shrink-0 select-none ">
      <div className="rounded-md bg-white/80 shadow-md backdrop-blur-[2px] transition [&:has(button:hover)]:bg-white/70">
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
  );
};
