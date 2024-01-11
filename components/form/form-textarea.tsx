"use client";
import { KeyboardEventHandler, forwardRef } from "react";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { FormErrors } from "./form-errors";

type FormTextareaProps = {
  id: string;
  label?: string;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  errors?: Record<string, string[] | undefined>;
  onBlur?: () => void;
  onClick?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
};

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      id,
      label,
      required,
      defaultValue = "",
      placeholder,
      disabled,
      className,
      errors,
      onBlur,
      onClick,
      onKeyDown,
    },
    ref,
  ) => {
    const { pending } = useFormStatus();
    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label && (
            <Label
              htmlFor={id}
              className="text-sm font-semibold text-neutral-700"
            >
              {label}
            </Label>
          )}
          <Textarea
            id={id}
            name={id}
            ref={ref}
            required={required}
            defaultValue={defaultValue}
            placeholder={placeholder}
            disabled={pending || disabled}
            className={cn("resize-none", className)}
            aria-describedby={`${id}-error`}
            onBlur={onBlur}
            onClick={onClick}
            onKeyDown={onKeyDown}
          />
        </div>
        {errors && <FormErrors id={id} errors={errors} />}
      </div>
    );
  },
);

FormTextarea.displayName = "FormTextarea";
