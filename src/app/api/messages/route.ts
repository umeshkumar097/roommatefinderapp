import { NextResponse } from "next/server";
import { db } from "@/db";
import { messages } from "@/db/schema";
import { eq, or, and, asc } from "drizzle-orm";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

// POST: Send a message
export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const payload = verifyToken(token) as any;
        if (!payload?.userId) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

        const { receiverId, content, matchId } = await req.json();

        if (!receiverId || !content) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const [newMessage] = await db
            .insert(messages)
            .values({
                senderId: payload.userId,
                receiverId,
                content,
                matchId: matchId || null
            })
            .returning();

        // In a real production app, we would emit the socket event here using a Redis adapter or similar
        // Since we are using the Next.js pages/api socket setup, we rely on the client to emit the event OR 
        // simply use polling/invalidation for now if socket is tricky to access from app route server action.
        // However, the client will likely handle the immediate UI update or socket emission.

        return NextResponse.json({ message: newMessage }, { status: 201 });

    } catch (error) {
        console.error("Send message error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
