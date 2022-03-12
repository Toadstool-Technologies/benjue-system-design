const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: '54.80.71.22',
  database: 'test',
  password: 'hanbenjue',
});

module.exports = pool;