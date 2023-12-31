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
    const board = await db.board.findUnique({ where: { id: boardId, orgId } });

    if (!board) return { error: "Board not found" };

    const lastList = await db.list.findFirst({
      where: { boardId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    console.log(lastList);

    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await db.list.create({ data: { title, order: newOrder, boardId } });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to create list.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const createList = createSafeAction(CreateList, handler);

////////////////////////////////////////////////////////////
