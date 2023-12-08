"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useOrganizationList } from "@clerk/nextjs";

export const OrgControl = () => {
  const params = useParams();
  const { isLoaded, setActive } = useOrganizationList();
  useEffect(() => {
    if (!isLoaded) return;

    setActive({ organization: params.id as string });
  }, [isLoaded, params.id, setActive]);
  return null;
};
