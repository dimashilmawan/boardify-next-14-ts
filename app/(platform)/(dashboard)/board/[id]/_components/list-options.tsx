"use client";

import { copyList } from "@/actions/copy-list";
import { deleteList } from "@/actions/delete-list";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import { MoreHorizontal, X } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

type ListOptionsProps = {
  data: List;
  onAddCard: () => void;
};

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess(data) {
      toast.success(`List '${data.title} deleted`);
    },
    onError(error) {
      toast.error(error);
    },
    onComplete() {
      closeRef?.current?.click();
    },
  });
  const { execute: executeCopy } = useAction(copyList, {
    onSuccess(data) {
      toast.success(`List '${data.title} copied`);
    },
    onError(error) {
      toast.error(error);
    },
    onComplete() {
      closeRef?.current?.click();
    },
  });

  function onDelete(formData: FormData) {
    const id = formData.get("id") as string;
    const boardId = formData.get("board-id") as string;

    executeDelete({ id, boardId });
  }

  function onCopy(formData: FormData) {
    const id = formData.get("id") as string;
    const boardId = formData.get("board-id") as string;

    executeCopy({ id, boardId });
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2 " variant="ghost">
          <MoreHorizontal className="h-4 w-4 " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60  p-3 pt-[1.125rem]" sideOffset={10}>
        <PopoverClose asChild>
          <Button
            ref={closeRef}
            variant="ghost"
            className="absolute right-1 top-1 h-auto w-auto rounded-full p-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <h2 className="text-center text-sm font-medium">List Actions</h2>
        <div className="mt-3 ">
          <Button
            className="w-full justify-start  font-normal hover:rounded-sm"
            variant="ghost"
            onClick={onAddCard}
          >
            Add Card
          </Button>
          <Separator />
          <form action={onCopy}>
            <input hidden id="id" name="id" defaultValue={data.id} />
            <input
              hidden
              id="board-id"
              name="board-id"
              defaultValue={data.boardId}
            />
            <FormSubmit
              variant="ghost"
              className="w-full justify-start font-normal hover:rounded-sm"
            >
              Copy List
            </FormSubmit>
          </form>
          <Separator />
          <form action={onDelete}>
            <input hidden id="id" name="id" defaultValue={data.id} />
            <input
              hidden
              id="board-id"
              name="board-id"
              defaultValue={data.boardId}
            />
            <FormSubmit
              variant="destructive"
              className="mt-1 w-full justify-start rounded-sm font-normal"
            >
              Delete List
            </FormSubmit>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
};
