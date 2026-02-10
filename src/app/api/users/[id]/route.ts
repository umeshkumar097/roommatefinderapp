import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const payload = verifyToken(token) as any;
        if (!payload?.userId) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

        const { id } = await params;
        const userId = parseInt(id);

        if (isNaN(userId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const [user] = await db
            .select({
                id: users.id,
                name: users.name,
                email: users.email, // Maybe mask this or only show if matched?
                bio: users.bio,
                images: users.images,
                gender: users.gender,
                dob: users.dob,
                profession: users.profession,
                languages: users.languages,
                lifestyle: users.lifestyle,
                preferences: users.preferences,
                isVerified: users.isVerified,
                createdAt: users.createdAt,
                budgetMin: users.budgetMin,
                budgetMax: users.budgetMax,
                preferredLocation: users.preferredLocation,
                moveInDate: users.moveInDate,
            })
            .from(users)
            .where(eq(users.id, userId))
            .limit(1);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error("Get user error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
