import { Logo } from "@/components/logo";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <nav className="flex h-20 w-full items-center justify-between px-4 md:h-16">
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
              rootBox: "flex items-center justify-between ",
            },
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "w-9 h-9",
            },
          }}
        />
      </div>
    </nav>
  );
};
