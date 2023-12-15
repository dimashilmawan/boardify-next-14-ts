"use client";

import { createBoard } from "@/actions/board";
import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";

interface FormProps {
  boards: {
    id: string;
    title: string;
  }[];
}

export const Form = ({ boards }: FormProps) => {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createBoard, initialState);
  return (
    <form action={dispatch}>
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
        {state?.errors?.title?.map((error: string) => (
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
