import { Navbar } from "./(_component)/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="fixed top-0 w-full border-b">
        <Navbar />
      </header>
      <main className="h-full w-full  pt-16">{children}</main>
    </>
  );
}
