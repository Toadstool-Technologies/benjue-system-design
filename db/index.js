const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'test_user',
  host: '54.85.6.224',
  database: 'test',
  password: 'testpassword',
  port: 5432,
});

module.exports = pool;