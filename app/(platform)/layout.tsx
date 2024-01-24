import { CardModal } from "@/components/modals/card-modal";
import { ProModal } from "@/components/modals/pro-modal";
import { QueryProvider } from "@/components/providers/query-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: "#059669", shadowShimmer: "black" },
      }}
    >
      <QueryProvider>
        <Toaster richColors />
        <CardModal />
        <ProModal />
        <div className="flex h-full flex-col items-center justify-center">
          {children}
        </div>
      </QueryProvider>
    </ClerkProvider>
  );
}
