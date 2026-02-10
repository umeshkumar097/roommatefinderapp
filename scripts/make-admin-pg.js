
const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function main() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });
    await client.connect();

    // Assuming user 1 exists, make them admin
    const res = await client.query("UPDATE users SET role = 'admin' WHERE id = 1 RETURNING *");
    console.log(res.rows[0]);

    await client.end();
}

main().catch(e => console.error(e));
