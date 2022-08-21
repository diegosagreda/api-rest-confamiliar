const {Pool} = require('pg');
const {db} = require('./config');

const pool = new Pool({
    user: db.user,
    host: db.host,
    database: db.database,
    port: db.port,
    password: db.password,
    ssl:{
        rejectUnauthorized: false
    }
});

module.exports = pool;