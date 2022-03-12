const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: '18.234.101.6',
  database: 'test',
  password: 'hanbenjue',
});

module.exports = pool;