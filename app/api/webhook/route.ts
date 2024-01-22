import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
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

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    );

    if (!session?.metadata?.orgId)
      return new Response("Missing organization ID", { status: 400 });

    await db.orgSubscription.create({
      data: {
        orgId: session.metadata.orgId,
        stripeSubscriptionId: subscription.id,
        stripeCurrentPeriodEnd: new Date(subscription.current_period_end),
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
      },
    });
  }

  return Response.json({ message: "success" });
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
