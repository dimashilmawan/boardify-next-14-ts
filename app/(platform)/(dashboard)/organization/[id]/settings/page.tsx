import { OrganizationProfile } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full md:w-3/4">
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: {
              boxShadow: "none ",
              width: "100%",
            },
            card: {
              border: "1px solid #e5e5e5",
              boxShadow: "none",
              width: "100%",
            },
          },
        }}
      />
    </div>
  );
}
