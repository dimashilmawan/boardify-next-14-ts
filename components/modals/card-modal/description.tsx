import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types";

export const Description = ({ data }: { data: CardWithList }) => {
  return <div>Description</div>;
};

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div>
      <Skeleton />
    </div>
  );
};
