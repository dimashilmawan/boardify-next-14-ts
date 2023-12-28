import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { BoardNav } from "./_components/board-nav";

const keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

const hex2rgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return { r, g, b };
};

const generateBlurDataUrl = (hex: string) => {
  const { r, g, b } = hex2rgb(hex);

  return rgbDataURL(r, g, b);
};

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
    <div
      // className="relative h-full w-full bg-cover bg-center bg-no-repeat"
      className="relative h-full w-full "
      // style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <Image
        src={board.imageFullUrl}
        priority
        fill
        alt="board backgroud image"
        className="object-cover object-center"
        placeholder="blur"
        blurDataURL={generateBlurDataUrl(board.imageColor)}
      />
      <div className="absolute inset-0 bg-black/30" />
      <BoardNav data={board} />
      <div>{children}</div>
    </div>
  );
}
