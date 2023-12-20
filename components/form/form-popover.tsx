"use client";

import { X } from "lucide-react";

import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Button } from "../ui/button";

import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { toast } from "sonner";

type FormPopoverProps = {
  children: React.ReactNode;
  align?: "center" | "end" | "start";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
};

export const FormPopover = ({
  children,
  align,
  side = "bottom",
  sideOffset = 0,
}: FormPopoverProps) => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: () => {
      toast.success("Board successfully created");
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const onSubmit = (formData: FormData) => {
    execute({ title: formData.get("title") as string });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        className="w-80 p-4 pt-8"
      >
        <h2 className="text-center text-sm font-medium">Create Board</h2>
        <form action={onSubmit} className="mt-3">
          <div>
            <FormInput
              id="title"
              label="Board title"
              errors={fieldErrors}
              type="text"
            />
          </div>
          <FormSubmit className="mt-4 w-full">Save</FormSubmit>
        </form>
        <PopoverClose asChild>
          <Button
            className="absolute right-1 top-1 h-8 w-8 rounded-lg p-0"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
};
