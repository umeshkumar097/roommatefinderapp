import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
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

        const { id } = await params;
        const userIdToDelete = parseInt(id);

        // Prevent deleting self
        if (userIdToDelete === admin.id) {
            return NextResponse.json({ error: "Cannot delete yourself" }, { status: 400 });
        }

        await db.delete(users).where(eq(users.id, userIdToDelete));

        return NextResponse.json({ message: "User deleted" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
