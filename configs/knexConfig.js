const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: process.env.MYSQLHOST,
        user: process.env.MYSQLUSER,
        password: process.env.MYSQLPASSWORD,
        port: process.env.MYSQLPORT,
        database: process.env.MYSQLDATABASE
    }
});

module.exports = knex;