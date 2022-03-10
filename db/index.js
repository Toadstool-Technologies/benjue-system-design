const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: '54.85.6.224',
  database: 'test',
  password: 'hanbenjue',
});

module.exports = pool;