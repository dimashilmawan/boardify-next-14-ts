import { ClerkProvider } from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <div className="flex h-full flex-col items-center justify-center bg-sky-400">
        {children}
      </div>
    </ClerkProvider>
  );
}
