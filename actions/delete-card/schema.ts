import { z } from "zod";

export const DeleteCard = z.object({
  id: z.string({
    required_error: "id field is required",
    invalid_type_error: "id field must be a string",
  }),
  boardId: z.string({
    required_error: "board id field is required",
    invalid_type_error: "board id field must be a string",
  }),
});
