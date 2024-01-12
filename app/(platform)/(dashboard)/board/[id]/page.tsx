import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ListContainer } from "./_components/list-container";

export default async function Page({ params }: { params: { id: string } }) {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const lists = await db.list.findMany({
    where: { boardId: params.id },
    include: { cards: { orderBy: { order: "asc" } } },
    orderBy: { order: "asc" },
  });

  return (
    <div className="h-full w-full overflow-x-auto p-4 ">
      <ListContainer boardId={params.id} data={lists} />
    </div>
  );
}
