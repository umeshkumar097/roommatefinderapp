import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getDataFromToken } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        // Authenticate admin
        const adminUser = await getDataFromToken(req as any);
        if (!adminUser || adminUser.role !== 'admin') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { email, plan } = await req.json();

        if (!email || !plan) {
            return NextResponse.json({ error: "Email and plan are required" }, { status: 400 });
        }

        // Find target user
        const targetUserRequest = await db.select().from(users).where(eq(users.email, email)).limit(1);
        const targetUser = targetUserRequest[0];

        if (!targetUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Determine limits
        let postsLimit = 1;
        let featuredLimit = 0;

        if (plan === 'premium') {
            postsLimit = 3;
            featuredLimit = 1;
        } else if (plan === 'vip') {
            postsLimit = 1000;
            featuredLimit = 1000;
        } else {
            // Free
            postsLimit = 1;
            featuredLimit = 0;
        }

        // Update user
        await db.update(users)
            .set({
                subscriptionStatus: 'active',
                subscriptionPlan: plan,
                planPostsLimit: postsLimit,
                planFeaturedLimit: featuredLimit,
                isVerified: plan !== 'free', // Auto verify for paid plans
            })
            .where(eq(users.id, targetUser.id));

        return NextResponse.json({ success: true, message: `Updated ${email} to ${plan}` });

    } catch (error) {
        console.error("Manual plan activation error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
