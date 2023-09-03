const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'admin_horarios',
    password: 'admin123',
    database: 'GENERADOR_HORARIOS'
});

async function connectDB() {
    let conn;
    try {
        conn = await pool.getConnection();
        console.log('Connection with GENERADOR_HORARIOS db is successful');
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
} 

async function getConnection() {
    return pool.getConnection();
}

module.exports = {
    connectDB,
    getConnection
}
