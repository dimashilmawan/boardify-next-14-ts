"use client";

import { ListWithCards } from "@/types";
import { ListHeader } from "./list-header";
import { useRef, useState } from "react";
import { CardForm } from "./card-form";

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
      <div className="rounded-md bg-white/80 shadow-md transition [&:has(button:hover)]:bg-white/60">
        <ListHeader data={data} onAddCard={enableEditing} />
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
