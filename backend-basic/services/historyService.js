const { pool } = require('../db');

async function getHistory() {
    const result = await pool.query("SELECT * FROM history");

    return result.rows;
}

async function deleteHistory(id) {
    await pool.query(
        'DELETE FROM history WHERE id = $1',
        [id]
    )
}

module.exports = {
    getHistory,
    deleteHistory
}