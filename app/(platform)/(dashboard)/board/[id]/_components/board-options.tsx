"use client";

import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

export const BoardOptions = ({ id }: { id: string }) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => toast.error(error),
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
        className="w-auto rounded-md p-0"
      >
        <Button variant="destructive" onClick={onDelete} disabled={isLoading}>
          Delete this Board
        </Button>
      </PopoverContent>
    </Popover>
  );
};
