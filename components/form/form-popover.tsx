// "use client";

// import { X } from "lucide-react";

// import { useAction } from "@/hooks/use-action";
// import { createBoard } from "@/actions/create-board";

// import {
//   Popover,
//   PopoverClose,
//   PopoverContent,
//   PopoverTrigger,
// } from "../ui/popover";
// import { Button } from "../ui/button";

// import { FormInput } from "./form-input";
// import { FormSubmit } from "./form-submit";
// import { toast } from "sonner";
// import { FormPicker } from "./form-picker";
// import { useRouter } from "next/navigation";
// import { useRef } from "react";
// import { useProModal } from "@/hooks/use-pro-modal";

// type FormPopoverProps = {
//   children: React.ReactNode;
//   align?: "center" | "end" | "start";
//   side?: "top" | "right" | "bottom" | "left";
//   sideOffset?: number;
// };

// export const FormPopover = ({
//   children,
//   align,
//   side = "bottom",
//   sideOffset = 0,
// }: FormPopoverProps) => {
//   const closeRef = useRef<HTMLButtonElement>(null);
//   const router = useRouter();
//   const proModal = useProModal();

//   const { execute, fieldErrors } = useAction(createBoard, {
//     onSuccess: (data) => {
//       toast.success("Board successfully created");
//       closeRef.current?.click();
//       router.push(`/board/${data.id}`);
//     },
//     onError: (error) => {
//       toast.error(error);
//       closeRef.current?.click();

//       proModal.onOpen();
//     },
//   });
//   const onSubmit = (formData: FormData) => {
//     const title = formData.get("title") as string;
//     const image = formData.get("image") as string;
//     execute({ title, image });
//   };

//   return (
//     <Popover>
//       <PopoverTrigger asChild>{children}</PopoverTrigger>
//       <PopoverContent
//         align={align}
//         side={side}
//         sideOffset={sideOffset}
//         avoidCollisions={false}
//         className="w-[22rem] p-4 pt-8 shadow-xl"
//       >
//         <h2 className="text-center text-sm font-medium">Create Board</h2>
//         <form action={onSubmit} className="mt-3">
//           <div>
//             <FormPicker id="image" errors={fieldErrors} />
//             <FormInput
//               id="title"
//               label="Board title"
//               errors={fieldErrors}
//               type="text"
//             />
//           </div>
//           <FormSubmit className="mt-4 w-full">Save</FormSubmit>
//         </form>
//         <PopoverClose asChild>
//           <Button
//             className="absolute right-1 top-1 h-8 w-8 rounded-lg p-0"
//             variant="ghost"
//             ref={closeRef}
//           >
//             <X className="h-4 w-4" />
//           </Button>
//         </PopoverClose>
//       </PopoverContent>
//     </Popover>
//   );
// };
"use client";

import { X } from "lucide-react";

import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";

import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { toast } from "sonner";
import { FormPicker } from "./form-picker";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useProModal } from "@/hooks/use-pro-modal";

type FormPopoverProps = {
  children: React.ReactNode;
};

export const FormPopover = ({ children }: FormPopoverProps) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const proModal = useProModal();

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success("Board successfully created");
      closeRef.current?.click();
      router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      toast.error(error);
      closeRef.current?.click();

      proModal.onOpen();
    },
  });
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;
    execute({ title, image });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[22rem] p-4 pt-8 shadow-xl">
        <h2 className="text-center text-sm font-medium">Create Board</h2>
        <form action={onSubmit} className="mt-3">
          <div>
            <FormPicker id="image" errors={fieldErrors} />
            <FormInput
              id="title"
              label="Board title"
              errors={fieldErrors}
              type="text"
            />
          </div>
          <FormSubmit className="mt-4 w-full">Save</FormSubmit>
        </form>
        <DialogClose asChild className="text-3xl">
          {/* <Button
            className="absolute right-1 top-1 h-8 w-8 rounded-lg p-0"
            variant="ghost"
            ref={closeRef}
          >
            <X className="h-4 w-4" />
          </Button> */}
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
