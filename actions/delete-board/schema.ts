import { z } from "zod";

export const DeleteBoard = z.object({
  id: z.string({
    required_error: "id field is required",
    invalid_type_error: "id field must be a string",
  }),
});
