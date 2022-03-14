const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: '174.129.194.186',
  database: 'test',
  password: 'hanbenjue',
});

module.exports = pool;