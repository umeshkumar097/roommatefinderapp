import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { db } from "@/db";
import { users, systemSettings } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
    try {
        // Check if payments are enabled
        const [settings] = await db
            .select()
            .from(systemSettings)
            .where(eq(systemSettings.key, "payment_config"))
            .limit(1);

        const config = settings?.value as any;
        if (config && config.enabled === false) {
            return NextResponse.json({ error: "Payments are currently disabled." }, { status: 503 });
        }

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const payload = verifyToken(token) as any;
        if (!payload?.userId) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

        const [user] = await db.select().from(users).where(eq(users.id, payload.userId)).limit(1);

        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        const { plan, currency } = await req.json();

        let priceAmount = 999; // Default fallback
        let productName = 'RoomieVibes Premium';

        if (currency === 'INR') {
            if (plan === 'premium') {
                priceAmount = 9900; // 99.00 INR (in paise)
                productName = 'RoomieVibes Premium (₹99)';
            } else if (plan === 'vip') {
                priceAmount = 59900; // 599.00 INR
                productName = 'RoomieVibes VIP (₹599)';
            }
        } else {
            // USD
            if (plan === 'premium') {
                priceAmount = 199; // $1.99
                productName = 'RoomieVibes Premium ($1.99)';
            } else if (plan === 'vip') {
                priceAmount = 999; // $9.99
                productName = 'RoomieVibes VIP ($9.99)';
            }
        }

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: currency === 'INR' ? 'inr' : 'usd',
                        product_data: {
                            name: productName,
                            description: plan === 'vip' ? 'Direct Contact Access & Unlimited Features' : 'Verified Badge, 3 Posts & Featured Listing',
                        },
                        unit_amount: priceAmount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment', // One-time payment for now (as per "1 month" descriptions imply) or 'subscription' if recurring
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/cancel`,
            customer_email: user.email || undefined,
            metadata: {
                userId: user.id.toString(),
                planType: plan,
            },
        });

        return NextResponse.json({ url: session.url });

    } catch (error) {
        console.error("Checkout error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
