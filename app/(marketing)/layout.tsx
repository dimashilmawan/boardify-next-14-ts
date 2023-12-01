import { Footer } from "./(_components)/footer";
import { Navbar } from "./(_components)/navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full ">
      <header className="fixed top-0 w-full border-b">
        <Navbar />
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  );
}
