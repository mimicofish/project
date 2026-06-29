require('dotenv').config();

const pg = require('pg');

const { Pool } = pg;

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

async function saveHistory(city) {
    await pool.query(
        "INSERT INTO history (city) VALUES ($1)",
        [city]
    )
}

async function testDB() {
    const result = await pool.query("SELECT * FROM history");

    console.log(result.rows);
}

testDB();

module.exports = {
    saveHistory
};