"use client";

import { createCard } from "@/actions/create-card";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Plus, X } from "lucide-react";
import { KeyboardEventHandler, forwardRef, useRef } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

type CardFormProps = {
  listId: string;
  boardId: string;
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
};
export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, boardId, isEditing, disableEditing, enableEditing }, ref) => {
    const formRef = useRef<HTMLFormElement>(null);

    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess(data) {
        toast.success(`Card ${data.title} created`);
        formRef?.current?.reset();
      },
      onError(error) {
        toast.error(error);
      },
    });

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> =
      function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          formRef?.current?.requestSubmit();
        }
      };

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") disableEditing();
    }

    function onSubmit(formData: FormData) {
      const title = formData.get("title") as string;

      execute({ title, listId, boardId });
    }

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown);

    if (isEditing)
      return (
        <form className="p-3 pt-1" ref={formRef} action={onSubmit}>
          <FormTextarea
            id="title"
            ref={ref}
            onKeyDown={onTextareaKeyDown}
            placeholder="Enter title for a Card"
            errors={fieldErrors}
          />
          <div className="mt-3 flex items-center gap-2">
            <FormSubmit>Add Card</FormSubmit>
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
      <div className="p-3 pt-1">
        <Button
          className="w-full justify-start gap-1 px-2 text-sm text-muted-foreground"
          variant="ghost"
          size="sm"
          type="button"
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
