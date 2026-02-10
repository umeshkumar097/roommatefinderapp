import { NextResponse } from "next/server";
import { db } from "@/db";
import { messages } from "@/db/schema";
import { eq, or, and, asc } from "drizzle-orm";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

// GET: Fetch conversation with a specific user
export async function GET(req: Request, { params }: { params: Promise<{ userId: string }> }) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const payload = verifyToken(token) as any;
        if (!payload?.userId) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

        const { userId } = await params;
        const otherUserId = parseInt(userId);

        const conversation = await db
            .select()
            .from(messages)
            .where(
                or(
                    and(eq(messages.senderId, payload.userId), eq(messages.receiverId, otherUserId)),
                    and(eq(messages.senderId, otherUserId), eq(messages.receiverId, payload.userId))
                )
            )
            .orderBy(asc(messages.createdAt));

        return NextResponse.json({ messages: conversation }, { status: 200 });

    } catch (error) {
        console.error("Get messages error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
