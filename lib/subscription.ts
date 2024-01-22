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
  console.log(orgSubscription.stripeCurrentPeriodEnd?.getTime() * 1000);

  // console.log(Date.now());

  const isValid =
    orgSubscription.stripePriceId &&
    orgSubscription.stripeCurrentPeriodEnd?.getTime()! * 1000 + 86400000 >
      Date.now();

  return !!isValid;
};
