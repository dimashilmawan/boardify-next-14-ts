import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ENTITY_TYPE } from "@prisma/client";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { orgId, userId } = auth();

  if (!orgId || !userId) return new Response("Unauthorized", { status: 401 });

  try {
    const auditLogsCards = await db.auditLog.findMany({
      where: { orgId, entityId: params.id, entityType: ENTITY_TYPE.CARD },
      orderBy: { createdAt: "desc" },
      take: 3,
    });

    if (!auditLogsCards) return new Response("Not Found", { status: 404 });

    return Response.json(auditLogsCards, { status: 200 });
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}
