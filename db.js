const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "sa123",
  database: "pandaisikek",
  key: "74b0b64c-3e77-4d3c-a2f2-d4a5d5fc0f54",
  host: "localhost",
  port: 5432,
});

module.exports = pool;
