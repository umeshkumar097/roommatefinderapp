import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ user: null }, { status: 200 });
        }

        const payload = verifyToken(token) as any;

        if (!payload?.userId) {
            return NextResponse.json({ user: null }, { status: 401 });
        }

        const [user] = await db
            .select({
                id: users.id,
                email: users.email,
                name: users.name,
                role: users.role,
                bio: users.bio,
                images: users.images,
                isVerified: users.isVerified
            })
            .from(users)
            .where(eq(users.id, payload.userId))
            .limit(1);

        if (!user) {
            return NextResponse.json({ user: null }, { status: 404 });
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error("Auth check error:", error);
        return NextResponse.json({ user: null }, { status: 500 });
    }
}
