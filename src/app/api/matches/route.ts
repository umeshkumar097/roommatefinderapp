import { NextResponse } from "next/server";
import { db } from "@/db";
import { matches, listings, users } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const payload = verifyToken(token) as any;
        if (!payload?.userId) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

        const { listingId } = await req.json();

        if (!listingId) {
            return NextResponse.json({ error: "Missing listingId" }, { status: 400 });
        }

        // Check if match already exists
        const existingMatch = await db
            .select()
            .from(matches)
            .where(and(eq(matches.userId, payload.userId), eq(matches.listingId, listingId)))
            .limit(1);

        if (existingMatch.length > 0) {
            return NextResponse.json({ message: "Already liked" }, { status: 200 });
        }

        const [newMatch] = await db
            .insert(matches)
            .values({
                userId: payload.userId,
                listingId: listingId,
                status: "pending"
            })
            .returning();

        return NextResponse.json({ match: newMatch }, { status: 201 });

    } catch (error) {
        console.error("Create match error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const payload = verifyToken(token) as any;
        if (!payload?.userId) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

        // Get matches where the current user is the owner of the listing (received likes)
        const receivedMatches = await db
            .select({
                matchId: matches.id,
                status: matches.status,
                createdAt: matches.createdAt,
                user: { // The potential roommate
                    id: users.id,
                    name: users.name,
                    email: users.email,
                    images: users.images
                },
                listing: {
                    id: listings.id,
                    title: listings.title
                }
            })
            .from(matches)
            .innerJoin(listings, eq(matches.listingId, listings.id))
            .innerJoin(users, eq(matches.userId, users.id))
            .where(eq(listings.userId, payload.userId))
            .orderBy(desc(matches.createdAt));

        return NextResponse.json({ matches: receivedMatches }, { status: 200 });

    } catch (error) {
        console.error("Get matches error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
