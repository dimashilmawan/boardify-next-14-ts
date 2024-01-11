import { z } from "zod";

export const CreateCard = z.object({
  title: z
    .string({
      required_error: "Title field is required",
      invalid_type_error: "Title field must be a string",
    })
    .min(3, {
      message: "Title field must be more than 3 characters",
    }),
  listId: z.string({
    required_error: "list id field is required",
    invalid_type_error: "list id field must be a string",
  }),
  boardId: z.string({
    required_error: "board id field is required",
    invalid_type_error: "board id field must be a string",
  }),
});
