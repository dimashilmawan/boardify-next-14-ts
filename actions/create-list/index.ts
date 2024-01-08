"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import db from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateList } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, boardId } = data;

  let list;

  try {
    list = await db.list.create({ data: { title, order: 1, boardId } });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to create list.",
    };
  }

  // revalidatePath(`/board/${board.id}`);
  return { data: list };
};

export const createList = createSafeAction(CreateList, handler);

////////////////////////////////////////////////////////////
