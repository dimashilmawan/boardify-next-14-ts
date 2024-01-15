import { CardModal } from "@/components/modals/card-modal";
import { ModalProvider } from "@/components/providers/modal-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <Toaster richColors />
      {/* <CardModal /> */}
      <ModalProvider />
      <div className="flex h-full flex-col items-center justify-center">
        {children}
      </div>
    </ClerkProvider>
  );
}
