import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq, or } from "drizzle-orm";
import { firebaseAdmin } from "@/lib/firebase-admin";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: NextRequest) {
    try {
        const { token } = await req.json();

        if (!token) {
            return NextResponse.json({ error: "Token is required" }, { status: 400 });
        }

        // Verify Firebase Token
        const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
        const { uid, email, picture, name, phone_number } = decodedToken;

        // Check if user exists
        let user: any = await db.select().from(users).where(
            or(
                email ? eq(users.email, email) : undefined,
                phone_number ? eq(users.phoneNumber, phone_number) : undefined,
                eq(users.firebaseUid, uid)
            )
        ).limit(1).then(res => res[0]);

        if (!user) {
            // Create new user
            const [newUser] = await db.insert(users).values({
                name: name || "New User",
                email: email || null, // Allow null if phone auth
                phoneNumber: phone_number || null,
                firebaseUid: uid,
                images: picture ? [picture] : [],
                passwordHash: "", // No password for firebase users
                isVerified: true, // Firebase verified (email/phone)
            }).returning();
            user = newUser;
        } else {
            // Update missing fields if necessary
            if (!user.firebaseUid) {
                await db.update(users).set({ firebaseUid: uid }).where(eq(users.id, user.id));
            }
        }

        // Generate Application JWT
        const sessionToken = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        const response = NextResponse.json({
            success: true,
            user: {
                ...user,
                images: user.images as string[],
            }
        });

        response.cookies.set("token", sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
        });

        return response;

    } catch (error) {
        console.error("Firebase auth error:", error);
        return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
    }
}
