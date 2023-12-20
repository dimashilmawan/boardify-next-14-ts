import { forwardRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { FormErrors } from "./form-errors";

type FormInputProps = {
  id: string;
  label?: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  errors?: Record<string, string[] | undefined>;
  onBlur?: () => void;
};

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      type,
      required,
      defaultValue = "",
      placeholder,
      disabled,
      className,
      errors,
      onBlur,
    },
    ref,
  ) => {
    const { pending } = useFormStatus();
    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label && (
            <Label htmlFor={id} className="text-sm font-semibold">
              {label}
            </Label>
          )}
          <Input
            id={id}
            name={id}
            ref={ref}
            type={type}
            required={required}
            defaultValue={defaultValue}
            placeholder={placeholder}
            disabled={pending || disabled}
            className={cn("px-2 py-1 text-sm", className)}
            aria-describedby={`${id}-error`}
            onBlur={onBlur}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  },
);

FormInput.displayName = "FormInput";
