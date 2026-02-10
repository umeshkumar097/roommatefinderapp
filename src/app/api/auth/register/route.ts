import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword, signToken } from "@/lib/auth";
import { registerSchema } from "@/lib/validations";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const result = registerSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: "Validation failed", details: result.error.flatten() },
                { status: 400 }
            );
        }

        const { email, password, name } = result.data;

        // Check if user exists
        const existingUser = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if (existingUser.length > 0) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create user
        const [newUser] = await db
            .insert(users)
            .values({
                email,
                name,
                passwordHash: hashedPassword,
                // Role defaults to 'user'
            })
            .returning({
                id: users.id,
                email: users.email,
                name: users.name,
                role: users.role,
            });

        // Generate token
        const token = signToken({ userId: newUser.id, email: newUser.email, role: newUser.role });

        // Set cookie (optional but good for security)
        const response = NextResponse.json(
            {
                user: newUser,
                token,
                message: "Registration successful",
            },
            { status: 201 }
        );

        // Initial simple cookie setting
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
