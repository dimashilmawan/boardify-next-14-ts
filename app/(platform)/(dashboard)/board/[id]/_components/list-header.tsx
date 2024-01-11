"use client";

import { updateList } from "@/actions/update-list";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import { ListOptions } from "./list-options";
import { List } from "@prisma/client";

type ListHeaderProps = {
  data: List;
  onAddCard: () => void;
};

export const ListHeader = ({ data, onAddCard }: ListHeaderProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(data.title);

  const { execute } = useAction(updateList, {
    onSuccess(data) {
      toast.success(`Renamed to '${data.title}'`);
      setTitle(data.title);
    },
    onError(error) {
      toast.success(error);
    },
    onComplete() {
      disableEditing();
    },
  });

  function onSubmit(formData: FormData) {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("board-id") as string;

    if (title === data.title) return disableEditing();

    execute({ id, title, boardId });
  }

  function onBlur() {
    formRef?.current?.requestSubmit();
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") formRef?.current?.requestSubmit();
  }

  function enableEditing() {
    setIsEditing(true);
    setTimeout(() => {
      inputRef?.current?.select();
    });
  }

  function disableEditing() {
    setIsEditing(false);
  }

  useEventListener("keydown", onKeyDown);

  return (
    <div className="flex items-center justify-between pr-1 text-sm font-semibold">
      {isEditing ? (
        <form ref={formRef} action={onSubmit} className="w-full p-3 ">
          <FormInput
            id="title"
            ref={inputRef}
            onBlur={onBlur}
            defaultValue={title}
            placeholder="Enter list title.."
            className=" h-5 truncate rounded-[3px] border-0 px-2 pb-[9px] transition focus-visible:bg-white/90 "
          />
          <input hidden id="id" name="id" defaultValue={data.id} />
          <input
            hidden
            id="board-id"
            name="board-id"
            defaultValue={data.boardId}
          />
          <button type="submit" hidden />
        </form>
      ) : (
        <Button
          className="h-auto w-full justify-start bg-inherit p-3 px-5 text-inherit hover:bg-inherit "
          onClick={enableEditing}
        >
          {title}
        </Button>
      )}
      <ListOptions data={data} onAddCard={onAddCard} />
    </div>
  );
};
