"use client";
import { updateCard } from "@/actions/update-card";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { AlignLeft, ShieldAlert } from "lucide-react";
import { useParams } from "next/navigation";
import { KeyboardEventHandler, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

export const Description = ({ data }: { data: CardWithList }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(data.description);

  const params = useParams();

  const queryClient = useQueryClient();

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["card", data.id] });
      queryClient.invalidateQueries({ queryKey: ["card-logs", data.id] });

      toast.success(`card '${data.title}' updated`);

      setDescription(data.description);
      disableEditing();
    },
    onError(error) {
      toast.error(error);
    },
  });

  function enableEditing() {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef?.current?.focus();
    });
  }
  function disableEditing() {
    setIsEditing(false);
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") disableEditing();
  }

  const onKeyDownTextarea: KeyboardEventHandler<HTMLTextAreaElement> =
    function (e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef?.current?.requestSubmit();
      }
    };

  function onSubmit(formData: FormData) {
    const description = formData.get("description") as string;
    const boardId = params.id as string;

    if (description === data.description) return;

    execute({ id: data.id, description, boardId });
  }

  useOnClickOutside(formRef, disableEditing);
  useEventListener("keydown", onKeyDown);

  return (
    <div className="flex w-full items-start gap-3">
      <AlignLeft className="h-5 w-5 text-neutral-700" />
      <div className="w-full space-y-[0.625rem]">
        <p className=" font-semibold  text-neutral-700">Description</p>
        {isEditing ? (
          <form action={onSubmit} ref={formRef}>
            <FormTextarea
              id="description"
              ref={textareaRef}
              onKeyDown={onKeyDownTextarea}
              defaultValue={data.description || undefined}
              className="h-20 w-full rounded-md "
              placeholder="Add a more detailed description.."
              errors={fieldErrors}
            />
            <div className="mt-3 flex items-center gap-2">
              <FormSubmit>Save</FormSubmit>
              <Button
                size="sm"
                onClick={disableEditing}
                variant="ghost"
                type="button"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <Button
            type="button"
            onClick={enableEditing}
            variant="gray"
            className="flex h-20 w-full items-start justify-start rounded-md px-3 py-2 text-sm  font-medium text-neutral-600"
          >
            {description || "Add a more detailed description.."}
          </Button>
        )}
      </div>
    </div>
  );
};

Description.Skeleton = function DescriptionSkeleton({
  isError,
}: {
  isError: boolean;
}) {
  if (isError) {
    return (
      <div className="flex items-center gap-3 rounded-md bg-rose-100 p-2 text-neutral-700">
        <ShieldAlert className="h-5 w-5" />
        <p className="-mb-1 text-sm font-semibold">
          Failed to fetch Activity Logs
        </p>
      </div>
    );
  }
  return (
    <div className="flex items-start gap-3">
      <Skeleton className="h-5 w-5 " />
      <div className="w-full space-y-3">
        <Skeleton className=" h-6 w-1/2" />
        <Skeleton className="h-20 w-full" />
      </div>
    </div>
  );
};
