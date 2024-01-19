import { AuditLog } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { generateLogMessage } from "@/lib/generate-log-message";
import { format } from "date-fns";

export const ActivityItem = ({ data }: { data: AuditLog }) => {
  return (
    <li className="flex items-center gap-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={data.userImage} />
        <AvatarFallback className="text-xs">IMG</AvatarFallback>
      </Avatar>
      <div className="-mb-1">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold lowercase text-neutral-700">
            {data.userName}
          </span>
          <span> {generateLogMessage(data)}</span>
        </p>
        <p className="text-xs text-muted-foreground">
          {format(new Date(data.createdAt), "MMM d, yyy 'at' p")}
        </p>
      </div>
    </li>
  );
};
