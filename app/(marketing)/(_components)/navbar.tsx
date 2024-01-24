import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="flex h-20 items-center justify-between bg-white px-3 md:h-16 ">
      <Logo />
      <div className="flex w-full justify-between gap-3 md:w-fit ">
        <Button asChild variant="outline">
          <Link href="sign-in">Login</Link>
        </Button>
        <Button asChild variant="primary">
          <Link href="sign-up">Get Boardify for Free</Link>
        </Button>
      </div>
    </nav>
  );
};
