import { Button } from "@/components/ui/button";
import { calFont, poppins } from "@/fonts";
import { cn } from "@/lib/utils";
import { Medal } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    // <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
    <div className=" pt-36">
      <div className="flex flex-col items-center justify-center">
        <div
          className={cn(
            "flex flex-col items-center justify-center gap-4",
            calFont.className,
          )}
        >
          <div className="flex items-center gap-2 rounded-full bg-amber-100 p-4 font-semibold text-amber-700">
            <Medal />
            <span className="text-lg uppercase">no 1 task management</span>
          </div>
          <h1 className="text-3xl font-semibold md:text-6xl">
            Boardify helps team move
          </h1>
          <p className="rounded-md bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 text-3xl text-white md:text-6xl">
            work forward
          </p>
        </div>
        <p
          className={cn(
            "mt-4 max-w-md text-center text-slate-700 md:max-w-xl",
            poppins.className,
          )}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus
          exercitationem, maxime velit, tempore, quas dolore natus molestiae
          quidem aspernatur aliquam eos soluta repellat! Sit accusantium, nobis
          doloribus quisquam similique recusandae?
        </p>
        <Button className="mt-8" asChild>
          <Link href="/sign-up">Get Boardify for free</Link>
        </Button>
      </div>
    </div>
  );
}
