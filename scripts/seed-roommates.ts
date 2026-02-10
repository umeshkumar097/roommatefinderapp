
import { config } from 'dotenv';
import { hash } from 'bcryptjs';
import { eq } from 'drizzle-orm';

// Load env vars BEFORE importing db
config({ path: '.env.local' });

async function main() {
    // Dynamic imports to ensure env vars are loaded first
    const { db } = await import('../src/db/index');
    const { users, listings } = await import('../src/db/schema');

    console.log('Seeding roommate data...');

    const password = 'password123';
    const hashedPassword = await hash(password, 10);

    const roommates = [
        {
            name: 'Aarav Patel',
            email: 'aarav@example.com',
            gender: 'Male',
            bio: 'Software engineer looking for a chill place near Tech Park. love gaming and coding.',
            profession: 'Software Engineer',
            preferredLocation: 'Koramangala, Bangalore',
            budgetMin: 15000,
            budgetMax: 25000,
            moveInDate: new Date('2026-03-01'),
            isVerified: true,
            lifestyle: ['Non-smoker', 'Gamer', 'Night owl'],
            images: ['https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80']
        },
        {
            name: 'Sneha Gupta',
            email: 'sneha@example.com',
            gender: 'Female',
            bio: 'Designer by day, artist by night. Looking for a clean and creative space.',
            profession: 'UX Designer',
            preferredLocation: 'Indiranagar, Bangalore',
            budgetMin: 20000,
            budgetMax: 30000,
            moveInDate: new Date('2026-02-15'),
            isVerified: true,
            lifestyle: ['Pet lover', 'Early bird', 'Vegetarian'],
            images: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80']
        },
        {
            name: 'Rohan Mehta',
            email: 'rohan@example.com',
            gender: 'Male',
            bio: 'MBA student. Quiet, organized, and focused on studies.',
            profession: 'Student',
            preferredLocation: 'HSR Layout, Bangalore',
            budgetMin: 10000,
            budgetMax: 18000,
            moveInDate: new Date('2026-04-01'),
            isVerified: false,
            verificationStatus: 'unverified',
            lifestyle: ['Non-smoker', 'Studious', 'Clean'],
            images: ['https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80']
        },
        {
            name: 'Vikram Singh',
            email: 'vikram.s@email.com',
            gender: 'Male',
            bio: 'Looking for a flatmate in Indiranagar. Chill marketing guy.',
            profession: 'Marketing Executive',
            preferredLocation: 'Indiranagar, Bangalore',
            budgetMin: 18000,
            budgetMax: 22000,
            moveInDate: new Date('2026-02-20'),
            isVerified: false,
            verificationStatus: 'pending',
            verificationDocument: 'Aadhaar Card',
            lifestyle: ['Social butterfly', 'Foodie', 'Music lover'],
            images: ['https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80']
        }
    ];

    for (const r of roommates) {
        const [existing] = await db.select().from(users).where(eq(users.email, r.email)).limit(1);
        if (!existing) {
            const [newUser] = await db.insert(users).values({
                ...r,
                passwordHash: hashedPassword,
                role: 'user'
            }).returning();
            console.log(`Created user: ${r.name}`);

            // Create a dummy listing for the first user
            if (r.name === 'Aarav Patel') {
                await db.insert(listings).values({
                    userId: newUser.id,
                    title: 'Spacious Room in 3BHK',
                    description: 'One room available in a fully furnished 3BHK flat. Gated society with gym and pool.',
                    price: 18000,
                    location: 'Koramangala 4th Block',
                    roomType: 'Private Room',
                    furnishingStatus: 'Fully Furnished',
                    availableDate: new Date('2026-03-01'),
                    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'],
                    amenities: ['WiFi', 'AC', 'Gym', 'Pool'],
                    houseRules: ['No smoking inside', 'No loud parties']
                });
                console.log('Created listing for Aarav');
            }
        } else {
            console.log(`User ${r.name} already exists.`);
            // Optional: Update fields if needed
            await db.update(users).set({
                budgetMin: r.budgetMin,
                budgetMax: r.budgetMax,
                preferredLocation: r.preferredLocation,
                moveInDate: r.moveInDate,
                images: r.images,
                lifestyle: r.lifestyle,
                profession: r.profession,
                bio: r.bio,
                // @ts-ignore
                verificationStatus: r.verificationStatus || 'unverified',
                // @ts-ignore
                verificationDocument: r.verificationDocument
            }).where(eq(users.id, existing.id));
        }
    }

    console.log('Seeding complete.');
    process.exit(0);
}

main();
