import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link className="hidden md:block" href="/">
      <div className="flex items-center gap-2">
        <Image
          src="/logo.svg"
          width={30}
          height={30}
          alt="logo"
          className="h-6 w-auto"
        />
        <p>Boardify</p>
      </div>
    </Link>
  );
};
