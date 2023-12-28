"use client";

import { updateBoard } from "@/actions/update-board";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Board } from "@prisma/client";
import { useRef, useState } from "react";
import { toast } from "sonner";

export const BoardTitleForm = ({ data }: { data: Board }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(data.title);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board ${data.title} updated `);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const enableEditing = () => {
    setIsEditing(true);

    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onSubmit = (formData: FormData) => {
    const titleInput = formData.get("title") as string;

    if (titleInput === title) return;

    execute({ id: data.id, title: titleInput });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing)
    return (
      <form ref={formRef} action={onSubmit}>
        <FormInput
          ref={inputRef}
          id="title"
          defaultValue={title}
          onBlur={onBlur}
          className="border-none bg-transparent px-2 py-1 pb-[6px] text-lg font-bold text-white focus-visible:outline-none focus-visible:ring-transparent"
        />
      </form>
    );

  return (
    <Button
      variant="transparent"
      className="px-2 py-1 text-lg font-bold"
      onClick={enableEditing}
    >
      {title}
    </Button>
  );
};
