import db from "@/lib/db";
import { Form } from "./form";
import { BoardItem } from "./board-item";

export default async function Page() {
  const boards = await db.board.findMany();
  return (
    <div className="p-8">
      <Form boards={boards} />
      <div className="space-y-2 ">
        {boards.map((board) => (
          <BoardItem key={board.id} {...board} />
        ))}
      </div>
    </div>
  );
}
