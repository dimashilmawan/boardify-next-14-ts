import { OrgControl } from "./_components/org-control";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
}
