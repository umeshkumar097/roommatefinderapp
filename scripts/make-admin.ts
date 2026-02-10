
const { db } = require('./src/db');
const { users } = require('./src/db/schema');
const { eq } = require('drizzle-orm');

async function main() {
    // Make user with ID 1 an admin
    await db.update(users).set({ role: 'admin' }).where(eq(users.id, 1));
    console.log("User 1 is now an admin");
    process.exit(0);
}

main().catch(console.error);
