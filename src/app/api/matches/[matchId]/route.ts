import { NextResponse } from "next/server";
import { db } from "@/db";
import { matches, listings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ matchId: string }> }
) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const payload = verifyToken(token) as any;
        if (!payload?.userId) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

        const { status } = await req.json();
        if (!["accepted", "rejected"].includes(status)) {
            return NextResponse.json({ error: "Invalid status" }, { status: 400 });
        }

        const { matchId } = await params;
        const matchIdInt = parseInt(matchId);

        if (isNaN(matchIdInt)) {
            return NextResponse.json({ error: "Invalid match ID" }, { status: 400 });
        }

        // Fetch match and associated listing to verify ownership
        const matchData = await db
            .select({
                match: matches,
                listing: listings
            })
            .from(matches)
            .innerJoin(listings, eq(matches.listingId, listings.id))
            .where(eq(matches.id, matchIdInt))
            .limit(1);

        if (matchData.length === 0) {
            return NextResponse.json({ error: "Match not found" }, { status: 404 });
        }

        const { listing } = matchData[0];

        // Only the owner of the listing can accept/reject the match
        if (listing.userId !== payload.userId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // Update match status
        const [updatedMatch] = await db
            .update(matches)
            .set({ status, updatedAt: new Date() })
            .where(eq(matches.id, matchIdInt))
            .returning();

        return NextResponse.json({ match: updatedMatch }, { status: 200 });

    } catch (error) {
        console.error("Update match error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
