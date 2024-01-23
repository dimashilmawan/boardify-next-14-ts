import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { format } from "date-fns";
import { headers } from "next/headers";
import Stripe from "stripe";
export async function POST(req: Request) {
  // req.text
  const signature = headers().get("stripe-signature") as string;
  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    if (err instanceof Error) {
      return new Response(`Stripe Webhook error: ${err.message}`, {
        status: 400,
      });
    } else {
      return new Response(`Stripe Webhook error`, {
        status: 400,
      });
    }
  }

  try {
    // user create new subscription
    if (event.type === "checkout.session.completed") {
      const checkoutSession = event.data.object;

      const subscriptionId = checkoutSession.subscription as string;
      const subscriptionSession =
        await stripe.subscriptions.retrieve(subscriptionId);

      if (!checkoutSession?.metadata?.orgId)
        return new Response("Missing organization ID", { status: 400 });

      await db.orgSubscription.create({
        data: {
          orgId: checkoutSession.metadata.orgId,
          stripeSubscriptionId: subscriptionSession.id,
          stripeCustomerId: subscriptionSession.customer as string,
          stripePriceId: subscriptionSession.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscriptionSession.current_period_end * 1000,
          ),
        },
      });
    }

    // user renewal a subscription.
    if (
      event.type === "invoice.payment_succeeded" &&
      event.data.object.billing_reason === "subscription_cycle"
    ) {
      const invoiceSession = event.data.object;

      const subscriptionId = invoiceSession.subscription as string;
      const subscriptionSession =
        await stripe.subscriptions.retrieve(subscriptionId);

      await db.orgSubscription.update({
        where: { stripeSubscriptionId: subscriptionId },
        data: {
          stripePriceId: subscriptionSession.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscriptionSession.current_period_end * 1000,
          ),
        },
      });
    }

    // user's subscription ends.
    if (event.type === "customer.subscription.deleted") {
      await db.orgSubscription.delete({
        where: { stripeSubscriptionId: event.data.object.id },
      });
    }
  } catch (err) {
    return new Response("Something went wrong", { status: 500 });
  }

  return new Response(null, { status: 200 });
}

// 4242 4242 4242 4242

// stripe listen --forward-to localhost:3000/api/webhook

/*
payment_method.attached
customer.created
customer.updated
customer.subscription.created
customer.subscription.updated
payment_intent.succeeded
payment_intent.created
invoice.created
invoice.finalized
invoice.updated
invoice.paid
invoice.payment_succeeded
charge.succeeded
checkout.session.completed
*/

// cancal plan
/*
billing_portal.session.created
customer.subscription.updated
customer.subscription.updated
*/

// renew plan
/*
billing_portal.session.created
customer.subscription.updated
customer.subscription.updated
*/
