const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: '44.202.124.25',
  database: 'test',
  password: 'hanbenjue',
});

module.exports = pool;