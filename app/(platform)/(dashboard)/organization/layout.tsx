import React from "react";
import { Sidebar } from "../(_component)/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full gap-6">
      <aside className="hidden w-64 shrink-0 md:block">
        <Sidebar />
      </aside>
      {children}
    </div>
  );
}
