import { z } from "zod";

export const UpdateList = z.object({
  id: z.string({
    required_error: "id field is required",
    invalid_type_error: "id field must be a string",
  }),
  boardId: z.string({
    required_error: "boardId field is required",
    invalid_type_error: "boardId field must be a string",
  }),
  title: z
    .string({
      required_error: "Title field is required",
      invalid_type_error: "Title field must be a string",
    })
    .min(3, {
      message: "Title field must be more than 3 characters",
    }),
});
