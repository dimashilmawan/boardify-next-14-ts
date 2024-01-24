import { Logo } from "@/components/logo";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full border-t ">
      <div className="flex h-16 items-center justify-between bg-white px-3">
        <Logo />
        <div className="flex w-full justify-between gap-3 text-sm md:w-auto">
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};
