import { NextResponse } from "next/server";
import { db } from "@/db";
import { listings, users } from "@/db/schema";
import { eq, desc, and, gte, lte } from "drizzle-orm";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { listingSchema } from "@/lib/validations";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 20;

        const allListings = await db
            .select({
                id: listings.id,
                title: listings.title,
                price: listings.price,
                location: listings.location,
                latitude: listings.latitude,
                longitude: listings.longitude,
                images: listings.images,
                createdAt: listings.createdAt,
                user: {
                    name: users.name,
                    image: users.images
                }
            })
            .from(listings)
            .leftJoin(users, eq(listings.userId, users.id))
            .orderBy(desc(listings.createdAt))
            .limit(limit);

        return NextResponse.json({ listings: allListings }, { status: 200 });
    } catch (error) {
        console.error("Fetch listings error:", error);
        return NextResponse.json({ error: "Failed to fetch listings" }, { status: 500 });
    }
}

export async function POST(req: Request) {
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
        // Allow latitude/longitude to pass through even if not in strict validation schema yet, 
        // or update schema to include them. For now, we extract them from body directly if schema strips them.
        const result = listingSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: "Validation failed", details: result.error.flatten() },
                { status: 400 }
            );
        }

        const { title, description, price, location, images, amenities, availableDate, leaseDuration } = result.data;

        let { latitude, longitude } = body;

        // If client didn't provide coordinates, try server-side geocoding
        if ((!latitude || !longitude) && location) {
            try {
                const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`, {
                    headers: {
                        'User-Agent': 'RoommateFinderApp/1.0'
                    }
                });
                const geoData = await geoRes.json();
                if (geoData && geoData.length > 0) {
                    latitude = parseFloat(geoData[0].lat);
                    longitude = parseFloat(geoData[0].lon);
                }
            } catch (error) {
                console.error("Geocoding failed:", error);
            }
        }

        const [newListing] = await db
            .insert(listings)
            .values({
                userId: payload.userId,
                title,
                description,
                price,
                location,
                latitude,
                longitude,
                leaseDuration,
                availableDate: availableDate ? new Date(availableDate) : null,
                images: images || [],
                amenities: amenities || [],
            })
            .returning();

        return NextResponse.json({ listing: newListing }, { status: 201 });
    } catch (error) {
        console.error("Create listing error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
