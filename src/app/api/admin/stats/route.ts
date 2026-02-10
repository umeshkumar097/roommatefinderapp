import { NextResponse } from "next/server";
import { db } from "@/db";
import { users, listings, matches } from "@/db/schema";
import { count, eq } from "drizzle-orm";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const payload = verifyToken(token) as any;
        if (!payload?.userId) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

        // Verify admin role
        const [user] = await db.select().from(users).where(eq(users.id, payload.userId)).limit(1);
        if (!user || user.role !== 'admin') {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const [userCount] = await db.select({ count: count() }).from(users);
        const [listingCount] = await db.select({ count: count() }).from(listings);
        const [matchCount] = await db.select({ count: count() }).from(matches);

        return NextResponse.json({
            stats: {
                users: userCount.count,
                listings: listingCount.count,
                matches: matchCount.count
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Admin stats error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
