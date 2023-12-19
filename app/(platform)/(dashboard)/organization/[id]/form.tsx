"use client";

import { createBoard } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { useFormState, useFormStatus } from "react-dom";

export const Form = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title");
    if (!title || typeof title !== "string") return;

    execute({ title });
  };
  return (
    <form action={onSubmit}>
      <div className="flex gap-2">
        <input
          id="title"
          name="title"
          type="text"
          required
          placeholder="title"
          aria-describedby="title-error"
        />
        <CreateBoardButton />
      </div>
      <div id="title-error" aria-live="polite" aria-atomic="true">
        {fieldErrors?.title?.map((error: string) => (
          <span key={error} className="rounded-md bg-red-100 p-2">
            {error}
          </span>
        ))}
      </div>
    </form>
  );
};

const CreateBoardButton = () => {
  const { pending } = useFormStatus();
  return <Button disabled={pending}>Create</Button>;
};
