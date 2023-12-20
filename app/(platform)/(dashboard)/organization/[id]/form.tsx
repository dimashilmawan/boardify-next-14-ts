"use client";

import { createBoard } from "@/actions/create-board";
import { useAction } from "@/hooks/use-action";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";

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
      <FormInput
        id="title"
        type="text"
        required
        label="title"
        errors={fieldErrors}
      />
      <FormSubmit>Save</FormSubmit>
    </form>
  );
};
