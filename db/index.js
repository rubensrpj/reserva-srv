const { Pool } = require('pg')

const pool = new Pool({
    user: "doadmin",
    password: "t203xtuhtyyvb8ak",
    database: "reserva",
    port: 25061,
    host: "db-postgresql-nyc1-31959-do-user-3042206-0.db.ondigitalocean.com",
    ssl: true
}); 

module.exports = {
  query: (text, params) => pool.query(text, params),
}