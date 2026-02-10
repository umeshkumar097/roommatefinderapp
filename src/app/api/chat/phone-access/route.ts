import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { phoneExchanges, users } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { getDataFromToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const user = await getDataFromToken(req);
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { targetUserId } = await req.json();

        if (!targetUserId) {
            return NextResponse.json({ error: "Target user ID is required" }, { status: 400 });
        }

        // Check if request already exists
        const [existingRequest] = await db.select().from(phoneExchanges).where(
            and(
                eq(phoneExchanges.requesterId, user.id),
                eq(phoneExchanges.targetUserId, targetUserId)
            )
        ).limit(1);

        if (existingRequest) {
            return NextResponse.json({ error: "Request already exists", data: existingRequest }, { status: 400 });
        }

        const [newRequest] = await db.insert(phoneExchanges).values({
            requesterId: user.id,
            targetUserId: targetUserId,
            status: 'pending'
        }).returning();

        return NextResponse.json(newRequest);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const user = await getDataFromToken(req);
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { requestId, status } = await req.json();

        if (!requestId || !status) {
            return NextResponse.json({ error: "Request ID and status are required" }, { status: 400 });
        }

        const [request] = await db.select().from(phoneExchanges).where(eq(phoneExchanges.id, requestId)).limit(1);

        if (!request) {
            return NextResponse.json({ error: "Request not found" }, { status: 404 });
        }

        // Only the target user can approve/reject
        if (request.targetUserId !== user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const [updatedRequest] = await db.update(phoneExchanges)
            .set({ status, updatedAt: new Date() })
            .where(eq(phoneExchanges.id, requestId))
            .returning();

        return NextResponse.json(updatedRequest);

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const user = await getDataFromToken(req);
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const targetUserId = searchParams.get('targetUserId');
        const type = searchParams.get('type');

        if (type === 'incoming') {
            // Fetch pending requests where I am the target
            const requests = await db.select({
                id: phoneExchanges.id,
                requesterId: phoneExchanges.requesterId,
                status: phoneExchanges.status,
                createdAt: phoneExchanges.createdAt,
                requesterName: users.name,
                requesterImage: users.images,
            })
                .from(phoneExchanges)
                .innerJoin(users, eq(phoneExchanges.requesterId, users.id))
                .where(
                    and(
                        eq(phoneExchanges.targetUserId, user.id),
                        eq(phoneExchanges.status, 'pending')
                    )
                );
            return NextResponse.json(requests);
        }

        if (!targetUserId) {
            return NextResponse.json({ error: "Target user ID required" }, { status: 400 });
        }

        const [request] = await db.select().from(phoneExchanges).where(
            and(
                eq(phoneExchanges.requesterId, user.id),
                eq(phoneExchanges.targetUserId, parseInt(targetUserId))
            )
        ).limit(1);

        return NextResponse.json(request || null);

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
