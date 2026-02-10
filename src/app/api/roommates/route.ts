import { NextResponse } from "next/server";
import { db } from "@/db"; // Adjust path as needed
import { users } from "@/db/schema"; // Adjust path as needed
import { eq, desc, and, gte, lte, like, not, or } from "drizzle-orm";
import { verifyToken } from "@/lib/auth"; // Adjust path as needed
import { cookies } from "next/headers";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 20;

        // Basic filtering query params
        const location = searchParams.get("location");
        const minBudget = searchParams.get("minBudget") ? parseInt(searchParams.get("minBudget")!) : undefined;
        const maxBudget = searchParams.get("maxBudget") ? parseInt(searchParams.get("maxBudget")!) : undefined;

        // Start building query
        let query = db
            .select({
                id: users.id,
                name: users.name,
                email: users.email,
                image: users.images, // Note: Schema uses 'images' jsonb, UI expects 'image' string or we handle it
                bio: users.bio,
                occupation: users.profession,
                age: users.dob, // We'll need to calculate age from DOB in frontend or here
                location: users.preferredLocation,
                budgetMin: users.budgetMin,
                budgetMax: users.budgetMax,
                moveInDate: users.moveInDate,
                preferences: users.preferences,
                isVerified: users.isVerified,
                gender: users.gender,
                lifestyle: users.lifestyle
            })
            .from(users)
            .where(
                and(
                    // Filter out users who haven't set up a profile for roommate finding (e.g. no location)
                    // or verified status if strict. For now, let's just get active users.
                    // not(eq(users.role, 'admin')) // Maybe exclude admins?
                )
            )
            .limit(limit);

        // Apply filters if provided
        // Note: Drizzle query building with conditional where clauses is a bit nuanced.
        // For simplicity in this v1, we fetch and filter or use raw SQL if complex.

        // Actually, let's use the .where() method properly
        const conditions = [];

        if (location) {
            conditions.push(like(users.preferredLocation, `%${location}%`));
        }

        if (minBudget !== undefined) {
            conditions.push(gte(users.budgetMax, minBudget)); // Their max budget should be >= our min
        }

        if (maxBudget !== undefined) {
            conditions.push(lte(users.budgetMin, maxBudget)); // Their min budget should be <= our max
        }

        // Exclude current user if logged in
        // const cookieStore = cookies();
        // const token = cookieStore.get("token")?.value;
        // if (token) {
        //     const payload = verifyToken(token) as any;
        //     if (payload?.userId) {
        //         conditions.push(not(eq(users.id, payload.userId)));
        //     }
        // }

        if (conditions.length > 0) {
            // @ts-ignore - straightforward AND construction
            query = query.where(and(...conditions));
        }

        const roommates = await query;

        // Transform data for UI if needed (e.g. calculate age, pick primary image)
        const formattedRoommates = roommates.map(user => {
            const age = user.age ? new Date().getFullYear() - new Date(user.age).getFullYear() : 25; // Default or calc
            const image = (user.image && Array.isArray(user.image) && user.image.length > 0) ? user.image[0] : null;

            return {
                id: user.id,
                name: user.name,
                age: age,
                occupation: user.occupation || 'Professional',
                location: user.location || 'Flexible',
                budget: `₹${user.budgetMin || 0}-${user.budgetMax || 'Any'}`,
                image: image || 'https://github.com/shadcn.png', // Fallback
                bio: user.bio || 'No bio yet.',
                preferences: user.lifestyle || [], // Use lifestyle tags
                moveInDate: user.moveInDate ? new Date(user.moveInDate).toLocaleDateString() : 'Flexible',
                verified: user.isVerified || false
            };
        });

        return NextResponse.json({ roommates: formattedRoommates }, { status: 200 });
    } catch (error) {
        console.error("Fetch roommates error:", error);
        return NextResponse.json({ error: "Failed to fetch roommates" }, { status: 500 });
    }
}
