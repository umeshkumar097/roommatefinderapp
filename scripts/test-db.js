
const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function main() {
    console.log("Connecting to DB:", process.env.DATABASE_URL.substring(0, 20) + "...");
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });
    try {
        await client.connect();
        const res = await client.query('SELECT NOW()');
        console.log("DB Connected:", res.rows[0]);
        await client.end();
    } catch (err) {
        console.error("DB Connection Error:", err);
    }
}
main();
