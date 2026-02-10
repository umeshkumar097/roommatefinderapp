import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const payload = verifyToken(token) as any;
        if (!payload?.userId) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

        const [admin] = await db.select().from(users).where(eq(users.id, payload.userId)).limit(1);
        if (!admin || admin.role !== 'admin') {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const allUsers = await db
            .select({
                id: users.id,
                name: users.name,
                email: users.email,
                role: users.role,
                createdAt: users.createdAt
            })
            .from(users)
            .orderBy(desc(users.createdAt));

        return NextResponse.json({ users: allUsers }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
