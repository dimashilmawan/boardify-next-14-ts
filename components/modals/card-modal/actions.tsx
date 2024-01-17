import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types";

export const Actions = ({ data }: { data: CardWithList }) => {
  return <div>Actions</div>;
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div>
      <Skeleton />
    </div>
  );
};
