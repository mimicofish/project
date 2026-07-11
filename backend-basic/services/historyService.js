const { pool } = require('../db');

async function getHistory() {
    const result = await pool.query("SELECT * FROM history");

    return result.rows;
}

module.exports = {
    getHistory
}