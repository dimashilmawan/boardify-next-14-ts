"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";

import { NavItem, Organization } from "./nav-item";
import { LogoSideBarMobile } from "@/components/logo";

interface SidebarProps {
  storageKey?: string;
}

export const Sidebar = ({ storageKey = "sidebar-state" }: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, boolean>>(
    storageKey,
    {},
  );

  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization();
  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  // const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
  //   (acc: string[], key: string) => {
  //     if (expanded[key]) {
  //       acc.push(key);
  //     }
  //     return acc;
  //   },
  //   [],
  // );
  const defaultAccordionValue: string[] = Object.keys(expanded).filter(
    (key) => expanded[key],
  );

  const handleExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !curr[id],
    }));
  };

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <>
        <div className="mb-2 flex items-center justify-between">
          <Skeleton className="h-10 w-[50%]" />
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      </>
    );
  }

  return (
    <>
      <LogoSideBarMobile />
      <div className="flex items-center py-1.5 pl-5 pr-1 pt-6 text-sm font-medium md:pt-3">
        <span>Workspaces</span>
        <Button
          asChild
          type="button"
          size="icon"
          variant="primary"
          className="ml-auto from-emerald-500 to-emerald-500"
        >
          <Link href="/select-org">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="mt-1.5 space-y-2 px-3"
      >
        {userMemberships.data.map(({ organization }) => (
          <NavItem
            key={organization.id}
            isActive={activeOrganization?.id === organization.id}
            isExpanded={expanded[organization.id]}
            organization={organization as Organization}
            onExpand={handleExpand}
          />
        ))}
      </Accordion>
    </>
  );
};
