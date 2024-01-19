import { auth, currentUser } from "@clerk/nextjs";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { redirect } from "next/navigation";
import db from "./db";

type Props = {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
};

export const createAuditLog = async (props: Props) => {
  const { orgId } = auth();
  const user = await currentUser();

  if (!user || !orgId) throw new Error("User not found!");

  const { entityId, entityType, entityTitle, action } = props;

  try {
    await db.auditLog.create({
      data: {
        entityId,
        entityType,
        entityTitle,
        action,
        orgId,
        userId: user.id,
        userImage: user?.imageUrl,
        userName: user?.firstName + " " + user?.lastName,
      },
    });
  } catch (error) {
    console.log("Creating audit log failed ", error);
  }
};
