import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type FormSubmitProps = {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
};

export const FormSubmit = ({
  children,
  className,
  variant = "default",
  disabled,
  size = "sm",
}: FormSubmitProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      size={size}
      className={cn("", className)}
      disabled={pending || disabled}
      variant={variant}
      type="submit"
    >
      {children}
    </Button>
  );
};
