"use client";

import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { MoreHorizontal, X } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

export const BoardOptions = ({ id }: { id: string }) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => toast.error(error),
    onComplete() {},
  });

  const onDelete = () => {
    execute({ id });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="transparent" className="h-auto w-auto  p-2">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={16}
        align="end"
        className="w-60 p-3 pt-[1.125rem]"
      >
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
        <Button
          className="mt-3 w-full justify-start rounded-sm font-normal"
          variant="destructive"
          onClick={onDelete}
          disabled={isLoading}
        >
          Delete this Board
        </Button>
      </PopoverContent>
    </Popover>
  );
};
