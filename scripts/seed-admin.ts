
import { config } from 'dotenv';
import { hash } from 'bcryptjs';
import { eq } from 'drizzle-orm';

// Load env vars BEFORE importing db
config({ path: '.env.local' });

async function main() {
    // Dynamic imports to ensure env vars are loaded first
    const { db } = await import('../src/db/index');
    const { users } = await import('../src/db/schema');

    const email = 'info@aiclex.in';
    const password = 'Umesh@2003##';
    const hashedPassword = await hash(password, 10);

    console.log(`Seeding admin user: ${email}...`);

    try {
        // Check if user exists
        const [existingUser] = await db.select().from(users).where(eq(users.email, email)).limit(1);

        if (existingUser) {
            console.log('User already exists, updating role to admin...');
            await db.update(users)
                .set({
                    role: 'admin',
                    passwordHash: hashedPassword,
                    name: 'Admin User'
                })
                .where(eq(users.email, email));
            console.log('Admin user updated successfully.');
        } else {
            console.log('Creating new admin user...');
            await db.insert(users).values({
                name: 'Admin User',
                email: email,
                passwordHash: hashedPassword,
                role: 'admin',
                isVerified: true
            });
            console.log('Admin user created successfully.');
        }
    } catch (error) {
        console.error('Error seeding admin user:', error);
        process.exit(1);
    }
}

main();
