import { NextResponse } from "next/server";
import { db } from "@/db";
import { listings, matches, users } from "@/db/schema";
import { eq, ne, and, notInArray, desc } from "drizzle-orm";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const payload = verifyToken(token) as any;
        if (!payload?.userId) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

        const currentUserId = payload.userId;

        // 1. Get IDs of listings the user has already swiped on (matched)
        const swipedListings = await db
            .select({ listingId: matches.listingId })
            .from(matches)
            .where(eq(matches.userId, currentUserId));

        const swipedListingIds = swipedListings.map(m => m.listingId);

        // 2. Fetch listings that are NOT owned by user AND NOT in swipedListings
        // optimizing: if swipedListingIds is empty, don't use notInArray with empty array (might cause SQL error or be inefficient)

        const conditions = [ne(listings.userId, currentUserId)];

        if (swipedListingIds.length > 0) {
            conditions.push(notInArray(listings.id, swipedListingIds));
        }

        const feedListings = await db
            .select({
                id: listings.id,
                title: listings.title,
                description: listings.description,
                price: listings.price,
                location: listings.location,
                images: listings.images,
                amenities: listings.amenities,
                userId: listings.userId,
                createdAt: listings.createdAt,
                ownerName: users.name,
                ownerImage: users.images
            })
            .from(listings)
            .innerJoin(users, eq(listings.userId, users.id))
            .where(and(...conditions))
            .orderBy(desc(listings.createdAt))
            .limit(20);

        return NextResponse.json({ listings: feedListings }, { status: 200 });

    } catch (error) {
        console.error("Feed error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
