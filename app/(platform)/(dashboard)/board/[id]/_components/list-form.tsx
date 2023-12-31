"use client";
import { Plus, X } from "lucide-react";
import { ListWrapper } from "./list-wrapper";
import { useState, useRef } from "react";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { useParams, useRouter } from "next/navigation";
import { useAction } from "@/hooks/use-action";
import { createList } from "@/actions/create-list";
import { toast } from "sonner";

export const ListForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  const params = useParams();
  const router = useRouter();

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`List '${data.title}' created successfully`);
      disableEditing();
      // router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  function onSubmit(formData: FormData) {
    const title = formData.get("title") as string;
    const boardId = formData.get("board-id") as string;

    execute({ title, boardId });
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") disableEditing();
  }

  function enableEditing() {
    setIsEditing(true);
    setTimeout(() => {
      inputRef?.current?.focus();
    });
  }

  function disableEditing() {
    setIsEditing(false);
  }

  let content = (
    <button
      className="flex w-full items-center gap-2 rounded-md bg-white/80 p-3 text-sm font-medium hover:bg-white/50"
      onClick={enableEditing}
    >
      <Plus className="h-4 w-4" />
      <span>Add a List</span>
    </button>
  );

  if (isEditing) {
    content = (
      <form
        action={onSubmit}
        ref={formRef}
        className="w-full space-y-3 rounded-md bg-white p-3"
      >
        <FormInput
          id="title"
          placeholder="Enter list title..."
          ref={inputRef}
          errors={fieldErrors}
          className="h-7 border-transparent px-2 py-1 text-sm font-medium transition hover:border-input "
        />
        <input hidden name="board-id" value={params.id} readOnly />
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
  }

  return <ListWrapper>{content}</ListWrapper>;
};
