import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { z } from "zod";

const profileSchema = z.object({
    name: z.string().min(2).optional(),
    bio: z.string().optional(),
    gender: z.string().optional(),
    dob: z.string().optional(),
    images: z.array(z.string()).optional(),
    preferences: z.record(z.any()).optional(),
});

export async function PUT(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const payload = verifyToken(token) as any;
        if (!payload?.userId) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const body = await req.json();
        const result = profileSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: "Validation failed", details: result.error.flatten() },
                { status: 400 }
            );
        }

        const { name, bio, gender, dob, images, preferences } = result.data;

        // Parse DOB if present
        const dobDate = dob ? new Date(dob) : undefined;

        // Construct update data carefully
        const updateData: any = { updatedAt: new Date() };
        if (name) updateData.name = name;
        if (bio) updateData.bio = bio;
        if (gender) updateData.gender = gender;
        if (dobDate) updateData.dob = dobDate;
        if (images) updateData.images = images;
        if (preferences) updateData.preferences = preferences;

        await db
            .update(users)
            .set(updateData)
            .where(eq(users.id, payload.userId));

        const [updatedUser] = await db
            .select()
            .from(users)
            .where(eq(users.id, payload.userId))
            .limit(1);

        return NextResponse.json({ user: updatedUser }, { status: 200 });
    } catch (error) {
        console.error("Profile update error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
