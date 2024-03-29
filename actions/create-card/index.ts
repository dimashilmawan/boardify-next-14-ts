"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import db from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateCard } from "./schema";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { createAuditLog } from "@/lib/create-audit-log";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId, user } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, listId, boardId } = data;

  let card;

  try {
    const list = await db.list.findUnique({ where: { id: listId } });

    if (!list) return { error: "List not found" };

    const lastCard = await db.card.findFirst({
      where: { listId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 0;

    card = await db.card.create({ data: { title, order: newOrder, listId } });

    await createAuditLog({
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.CREATE,
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to create card.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const createCard = createSafeAction(CreateCard, handler);

////////////////////////////////////////////////////////////
