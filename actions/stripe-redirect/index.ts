"use server";

import { auth, currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import db from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { StripeRedirect } from "./schema";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  const user = await currentUser();

  if (!userId || !orgId || !user) {
    return {
      error: "Unauthorized",
    };
  }

  let url;

  try {
    const orgSubscription = await db.orgSubscription.findUnique({
      where: { orgId },
    });

    if (orgSubscription && orgSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        return_url: absoluteUrl(`/organization/${orgId}`),
        customer: orgSubscription.stripeCustomerId,
      });

      url = stripeSession.url;
    } else {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: absoluteUrl(`/organization/${orgId}`),
        cancel_url: absoluteUrl(`/organization/${orgId}`),
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user?.emailAddresses[0].emailAddress,
        metadata: { orgId },
        line_items: [
          {
            price_data: {
              currency: "IDR",
              unit_amount: 9900000,
              product_data: {
                name: "Boardify",
                description: "Unlimited boards for your organization",
              },
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
      });
      url = stripeSession.url || "";
    }
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }

  return { data: url };
};

export const stripeRedirect = createSafeAction(StripeRedirect, handler);

////////////////////////////////////////////////////////////
