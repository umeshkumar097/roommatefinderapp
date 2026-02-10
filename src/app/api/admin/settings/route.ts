import { NextResponse } from "next/server";
import { db } from "@/db";
import { systemSettings, users } from "@/db/schema";
import { eq } from "drizzle-orm";
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

        const [settings] = await db
            .select()
            .from(systemSettings)
            .where(eq(systemSettings.key, "payment_config"))
            .limit(1);

        return NextResponse.json({
            settings: settings?.value || { enabled: true, stripe: { enabled: true } }
        }, { status: 200 });

    } catch (error) {
        console.error("Get settings error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
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

        const { enabled, stripeEnabled } = await req.json();

        // Upsert settings
        await db.insert(systemSettings)
            .values({
                key: "payment_config",
                value: { enabled, stripe: { enabled: stripeEnabled } }
            })
            .onConflictDoUpdate({
                target: systemSettings.key,
                set: { value: { enabled, stripe: { enabled: stripeEnabled } }, updatedAt: new Date() }
            });

        return NextResponse.json({ message: "Settings updated" }, { status: 200 });

    } catch (error) {
        console.error("Update settings error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
