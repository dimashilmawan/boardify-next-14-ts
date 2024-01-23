import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus, PlusIcon } from "lucide-react";
import { MobileSidebar } from "./mobile-sidebar";
import { FormPopover } from "@/components/form/form-popover";

export const Navbar = () => {
  return (
    <nav className="flex h-16 w-full items-center justify-between px-4">
      <MobileSidebar />
      <div className="flex items-center gap-4">
        <Logo />
        {/* <FormPopover side="bottom" align="start" sideOffset={32}>
          <Button variant="primary" className="hidden  md:flex" size="icon">
            <PlusIcon className="h-5 w-5" />
          </Button>
        </FormPopover>
        <FormPopover sideOffset={32}>
          <Button className="md:hidden">
            <Plus />
          </Button>
        </FormPopover> */}
      </div>
      <div className="flex items-center gap-2">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organization/:id"
          afterLeaveOrganizationUrl="/select-org"
          afterSelectOrganizationUrl="/organization/:id"
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{ elements: { avatarBox: { height: 30, width: 30 } } }}
        />
      </div>
    </nav>
  );
};
