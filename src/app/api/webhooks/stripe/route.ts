import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("Stripe-Signature") as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        return NextResponse.json({ error: "Missing webhook secret" }, { status: 500 });
    }

    let event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error: any) {
        console.error("Webhook signature verification failed.", error.message);
        return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 });
    }

    try {
        switch (event.type) {
            case "checkout.session.completed":
                const session = event.data.object as any;
                const userId = session.metadata?.userId;
                const subscriptionId = session.subscription;
                const customerId = session.customer;
                const planType = session.metadata?.planType || 'premium';

                if (userId) {
                    const updates: any = {
                        stripeCustomerId: customerId,
                        subscriptionId: subscriptionId,
                        subscriptionStatus: "active",
                        subscriptionPlan: planType,
                        isVerified: true, // Auto-verify paid users
                        postsUsed: 0,
                        featuredUsed: 0,
                    };

                    if (planType === 'vip') {
                        updates.planPostsLimit = 1000; // Unlimited effectively
                        updates.planFeaturedLimit = 1000;
                    } else {
                        // Premium
                        updates.planPostsLimit = 3;
                        updates.planFeaturedLimit = 1;
                    }

                    await db.update(users)
                        .set(updates)
                        .where(eq(users.id, parseInt(userId)));
                    console.log(`User ${userId} upgraded to ${planType}`);
                }
                break;

            case "invoice.payment_succeeded":
                // Handle recurring usage updates if needed
                break;

            case "customer.subscription.deleted":
                // Handle cancellation
                const subscription = event.data.object as any;
                await db.update(users)
                    .set({ subscriptionStatus: "inactive", subscriptionPlan: "free" })
                    .where(eq(users.subscriptionId, subscription.id));
                break;

            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    } catch (error) {
        console.error("Webhook handler error", error);
        return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
    }

    return NextResponse.json({ received: true }, { status: 200 });
}
