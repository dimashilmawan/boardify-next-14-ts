import { XCircle } from "lucide-react";

type FormErrorsProps = {
  id: string;
  errors?: Record<string, string[] | undefined>;
};
export const FormErrors = ({ id, errors }: FormErrorsProps) => {
  if (!errors) return;

  return (
    <div
      className="mt-2 space-y-2 rounded-md border border-rose-300 p-2 text-sm text-rose-500"
      aria-live="polite"
    >
      {errors?.[id]?.map((error: string) => (
        <div key={error} className="flex items-center gap-2">
          <XCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      ))}
    </div>
  );
};
