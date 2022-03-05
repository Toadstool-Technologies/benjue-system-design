const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'vivianhan',
  host: 'localhost',
  database: 'qanda',
  password: '',
  port: 5432,
});

module.exports = pool;