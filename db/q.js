//requesting the bd connection
const pool = require('./index.js');

module.exports = {
  getAllQ: function(params, callback) {
    const queryString = 'select * from questions where reported = false and product_id = $1';
    pool.query(queryString, [params], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result.rows);
      }
    })
  },

  getAllA: function(params, callback) {
    const questionId = params[0];
    const skip = (params[1] - 1) * params[2];
    const count = params[2];
    const queryString = 'select * from answers where question_id = $1 and reported = false limit $2 offset $3';
    pool.query(queryString, [questionId, count, skip], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result.rows)
      }
    })
  },

  postQ: function(params, callback) {
    const body = params.body;
    const name = params.name;
    const email = params.email;
    const product_id = params.product_id;
    const date_written = params.date_written;
    const queryString = 'insert into questions (product_id, body, date_written, asker_name, asker_email, reported, helpful) values ($1, $2, $3, $4, $5, false, 0)';
    pool.query(queryString, [product_id, body, date_written, name, email], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    })
  },

  postA: function(params, callback) {
    const question_id = params.question_id;
    const body = params.body;
    const name = params.name;
    const email = params.email;
    const photos = params.photos;
    const date_written = params.date_written;


  }
}