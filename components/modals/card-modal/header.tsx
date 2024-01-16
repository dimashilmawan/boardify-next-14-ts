"use client";

import { updateCard } from "@/actions/update-card";
import { FormInput } from "@/components/form/form-input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { Layout } from "lucide-react";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

export const Header = ({ data }: { data: CardWithList }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(data.title);

  const params = useParams();

  const queryClient = useQueryClient();

  const { execute } = useAction(updateCard, {
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      toast.success(`Renamed to ${data.title}`);
      setTitle(data.title);
    },
    onError(error) {
      toast.error(error);
    },
  });

  function onBlur() {
    inputRef?.current?.form?.requestSubmit();
  }

  function onSubmit(formData: FormData) {
    console.log("submit");
    const title = formData.get("title") as string;
    const boardId = params.id as string;

    if (title === data.title) return;

    execute({ id: data.id, boardId, title });
  }

  return (
    <div className="flex items-start gap-3 ">
      <Layout className="h-5 w-5 text-neutral-700" />
      <div className="w-full space-y-0.5">
        <form className="" action={onSubmit}>
          <FormInput
            id="title"
            ref={inputRef}
            onBlur={onBlur}
            defaultValue={title}
            className="-ml-1 -mt-[0.625rem] w-2/3 truncate border-none px-1 text-xl font-semibold text-neutral-700 focus-visible:ring-input"
          />
        </form>
        <p className="text-sm text-muted-foreground">
          In list <span className="underline">{data.list.title}</span>
        </p>
      </div>
    </div>
  );
};

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="flex items-start gap-3 ">
      <Skeleton className="h-5 w-5 " />
      <div className="w-full space-y-3">
        <Skeleton className=" h-6 w-2/3" />
        <Skeleton className="h-4 w-10" />
      </div>
    </div>
  );
};
