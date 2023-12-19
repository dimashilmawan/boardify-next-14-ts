"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const BoardSchema = z.object({
  title: z
    .string({
      invalid_type_error: "Field must be a string",
      required_error: "Field is required",
    })
    .min(3, { message: "Title field minimum length is 3 characters" }),
});

export type State = {
  errors?: {
    title?: string[];
  };
  message?: string | null;
};

export const createBoard = async (prevState: State, formData: FormData) => {
  const validatedFields = BoardSchema.safeParse({
    title: formData.get("title"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Boards.",
    };
  }

  const title = validatedFields.data.title;

  try {
    await db.board.create({ data: { title: title } });
  } catch (error) {
    return {
      message: "Database Error: Failed to Create boards.",
    };
  }

  revalidatePath("/organization/org_2YtiTus8LS2hdoKfURLB3lGBA2n");
  redirect("/organization/org_2YtiTus8LS2hdoKfURLB3lGBA2n");
};

export const deleteBoard = async (id: string) => {
  try {
    await db.board.delete({ where: { id } });
  } catch (error) {
    throw new Error("Delete board failed");
  }

  revalidatePath("/organization/org_2YtiTus8LS2hdoKfURLB3lGBA2n");
  // redirect("/organization/org_2YtiTus8LS2hdoKfURLB3lGBA2n");
};
