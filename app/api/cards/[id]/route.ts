import db from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { orgId, userId } = auth();

  if (!userId || !orgId) return new Response("Unauthorized", { status: 401 });

  try {
    const card = await db.card.findUnique({
      where: { id: params.id, list: { board: { orgId } } },
      include: { list: { select: { title: true } } },
    });

    if (!card) return new Response("not found", { status: 404 });

    return Response.json(card, { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
