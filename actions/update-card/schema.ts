import { z } from "zod";

export const UpdateCard = z.object({
  id: z.string({
    required_error: "id field is required",
    invalid_type_error: "id field must be a string",
  }),
  boardId: z.string({
    required_error: "board id field is required",
    invalid_type_error: "board id field must be a string",
  }),
  title: z.optional(
    z
      .string({
        required_error: "Title field is required",
        invalid_type_error: "Title field must be a string",
      })
      .min(3, {
        message: "Title field must be more than 3 characters",
      }),
  ),
  description: z.optional(
    z
      .string({
        required_error: "Description field is required",
        invalid_type_error: "Description field must be a string",
      })
      .min(3, {
        message: "Description field must be more than 3 characters",
      }),
  ),
});
