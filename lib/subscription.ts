import { auth } from "@clerk/nextjs";
import db from "./db";

export const checkSubscription = async () => {
  const { orgId } = auth();
  if (!orgId) return false;

  const orgSubscription = await db.orgSubscription.findUnique({
    where: { orgId },
    select: {
      stripeCustomerId: true,
      stripeSubscriptionId: true,
      stripePriceId: true,
      stripeCurrentPeriodEnd: true,
    },
  });

  if (!orgSubscription) return false;

  const isValid =
    orgSubscription.stripePriceId &&
    orgSubscription.stripeCurrentPeriodEnd?.getTime()! + 86400000 > Date.now();

  return !!isValid;
};
