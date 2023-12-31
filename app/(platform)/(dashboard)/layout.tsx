import { Navbar } from "./(_component)/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b bg-white">
        <Navbar />
      </header>
      <main className="h-full w-full pt-16">{children}</main>
    </>
  );
}
