import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type HintProps = {
  children: React.ReactNode;
  description: string;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
};

export const Hint = ({
  children,
  description,
  side = "bottom",
  sideOffset = 0,
}: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          sideOffset={sideOffset}
          className="max-w-xs break-words p-2 text-center text-xs"
        >
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
