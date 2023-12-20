import { FormPopover } from "@/components/form/form-popover";
import { Hint } from "@/components/hint";
import { HelpCircle, User2 } from "lucide-react";
const boards = ["first", "second", "third"];
export const BoardList = () => {
  return (
    <div className="space-y-3 py-4">
      <div className="flex items-center gap-2">
        <User2 className="h-6 w-6 " />
        <span className="text-lg font-semibold">Your Boards</span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {/* {boards.map((board) => {
          return (
            <div
              key={board}
              className="relative flex aspect-video flex-col items-center justify-center rounded-md bg-muted"
            >
              {board}
            </div>
          );
        })} */}
        <FormPopover side="right" sideOffset={20}>
          <button
            type="button"
            className="relative flex aspect-video flex-col items-center justify-center rounded-md bg-muted"
          >
            <p>Create new board</p>
            <span className="mt-1 text-sm">5 remaining</span>
            <Hint
              sideOffset={20}
              description="Free Workspaces can have up to 5 open boards. For unlimited boards upgrade this workspace."
            >
              <HelpCircle className="absolute bottom-2 right-2 h-4 w-4" />
            </Hint>
          </button>
        </FormPopover>
      </div>
    </div>
  );
};
