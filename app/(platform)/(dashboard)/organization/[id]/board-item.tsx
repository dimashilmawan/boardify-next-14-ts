"use client";
import { deleteBoard } from "@/actions/board";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useFormStatus } from "react-dom";

export const BoardItem = ({ title, id }: { id: string; title: string }) => {
  const deleteBoardWithId = deleteBoard.bind(null, id);
  return (
    <form
      action={deleteBoardWithId}
      className="flex w-48 items-center justify-between rounded-md  bg-gray-100 p-2"
    >
      <p>{title}</p>
      <DeleteBoardButton />
    </form>
  );
};

const DeleteBoardButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending}>
      <Trash />
    </Button>
  );
};
