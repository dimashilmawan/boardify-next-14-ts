import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { BoardNav } from "./_components/board-nav";
import { blurHashToDataURL } from "@/lib/blurhash-to-base64";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { orgId } = auth();
  if (!orgId) return { title: "Board" };

  const board = await db.board.findUnique({ where: { id: params.id, orgId } });

  return {
    title: board?.title || "Board",
  };
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { orgId } = auth();

  if (!orgId) return redirect("/select-org");

  const board = await db.board.findUnique({ where: { id: params.id, orgId } });

  if (!board) return notFound();

  return (
    <div className="relative h-full w-full ">
      <Image
        src={board.imageFullUrl}
        fill
        priority
        alt="board backgroud image"
        className="object-cover object-center"
        placeholder="blur"
        blurDataURL={blurHashToDataURL(board.imageBlurhash)}
      />
      <div className="absolute inset-0 bg-black/20" />
      <BoardNav data={board} />
      <div className="relative z-30 h-full pt-24 md:pt-16">{children}</div>
    </div>
  );
}
