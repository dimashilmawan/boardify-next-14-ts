import { Navbar } from "./(_component)/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="fixed top-0 w-full bg-yellow-400">
        <Navbar />
      </header>
      <main>{children}</main>
    </>
  );
}
