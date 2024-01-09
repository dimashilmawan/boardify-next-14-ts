"use client";

import { updateList } from "@/actions/update-list";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { ListWithCards } from "@/types";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";

export const ListHeader = ({ data }: { data: ListWithCards }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(data.title);

  const {} = useAction(updateList, {
    onSuccess(data) {
      toast.success(`Renamed to '${data.title}'`);
      setTitle(data.title);
      disableEditing();
    },
    onError(error) {
      toast.success(error);
    },
  });

  function onSubmit(formData: FormData) {}

  function onBlur() {
    formRef?.current?.requestSubmit();
    disableEditing();
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") disableEditing();
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
    <div className="flex items-center justify-between text-sm font-semibold">
      {isEditing ? (
        <form ref={formRef} action={onSubmit} className="w-full p-3">
          <FormInput
            id="title"
            ref={inputRef}
            onBlur={onBlur}
            defaultValue={title}
            placeholder="Enter list title.."
            className=" h-5 truncate rounded-[3px] border-0 px-2 pb-[9px] transition focus-visible:bg-white/90 "
          />
          <input type="hidden" name="id" value={data.id} />
          <input type="hidden" name="board-id" value={data.boardId} />
        </form>
      ) : (
        <button className="w-full p-3 px-5 text-left" onClick={enableEditing}>
          {title}
        </button>
      )}
    </div>
  );
};
