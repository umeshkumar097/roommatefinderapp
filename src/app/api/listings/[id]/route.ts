import { NextResponse } from "next/server";
import { db } from "@/db";
import { listings, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { listingSchema } from "@/lib/validations";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const listingId = parseInt(id);

        if (isNaN(listingId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const [listing] = await db
            .select({
                id: listings.id,
                title: listings.title,
                description: listings.description,
                price: listings.price,
                location: listings.location,
                images: listings.images,
                amenities: listings.amenities,
                houseRules: listings.houseRules,
                availableDate: listings.availableDate,
                leaseDuration: listings.leaseDuration,
                deposit: listings.deposit,
                roomType: listings.roomType,
                furnishingStatus: listings.furnishingStatus,
                createdAt: listings.createdAt,
                userId: listings.userId,
                user: {
                    id: users.id,
                    name: users.name,
                    email: users.email, // Only show if needed, maybe hide for privacy until matched?
                    images: users.images
                }
            })
            .from(listings)
            .leftJoin(users, eq(listings.userId, users.id))
            .where(eq(listings.id, listingId))
            .limit(1);

        if (!listing) {
            return NextResponse.json({ error: "Listing not found" }, { status: 404 });
        }

        return NextResponse.json({ listing }, { status: 200 });
    } catch (error) {
        console.error("Get listing error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const payload = verifyToken(token) as any;
        if (!payload?.userId) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

        const { id } = await params;
        const listingId = parseInt(id);

        // Check ownership
        const [existing] = await db.select().from(listings).where(eq(listings.id, listingId)).limit(1);

        if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

        if (existing.userId !== payload.userId) { // Admin check could go here too
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        await db.delete(listings).where(eq(listings.id, listingId));

        return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
