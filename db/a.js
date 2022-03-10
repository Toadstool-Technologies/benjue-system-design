const pool = require('./index.js');

module.exports = {
  putAH: function(param, callback) {
    const queryString = 'update answers set helpfulness = helpfulness + 1 where id = $1';
    pool.query(queryString, [param], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    })
  },

  putAR: function(param, callback) {
    const queryString = 'update answers set reported = true where id = $1';
    pool.query(queryString, [param], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    })
  }
}