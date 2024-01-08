import { z } from "zod";

export const CreateList = z.object({
  title: z
    .string({
      required_error: "Title field is required",
      invalid_type_error: "Title field must be a string",
    })
    .min(3, {
      message: "Title field must be more than 3 characters",
    }),
  boardId: z.string({
    required_error: "board id field is required",
    invalid_type_error: "board id field must be a string",
  }),
});
