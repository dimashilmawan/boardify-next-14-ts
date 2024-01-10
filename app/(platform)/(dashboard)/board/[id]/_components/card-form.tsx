"use client";

import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { forwardRef } from "react";

type CardFormProps = {
  listId: string;
  boardId: string;
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
};
export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, boardId, isEditing, disableEditing, enableEditing }, ref) => {
    if (isEditing)
      return (
        <form>
          <textarea />
          <div className="flex items-center gap-2">
            <FormSubmit>Add</FormSubmit>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={disableEditing}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </form>
      );

    return (
      <div className="p-1">
        <Button
          className="w-full justify-start gap-1 text-sm text-muted-foreground"
          variant="ghost"
          size="sm"
          onClick={enableEditing}
        >
          <Plus className="h-4 w-4 " />
          <span className="-mb-[3px]">Add a Card</span>
        </Button>
      </div>
    );
  },
);

CardForm.displayName = "CardForm";
