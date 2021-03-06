//requesting the bd connection
const pool = require('./index.js');
const format = require('pg-format');

module.exports = {
  // getTest: function(params, callback) {
  //   // const queryString = 'select questions.id, product_id, questions.body, answers.body as answer_body from questions inner join answers on questions.id = answers.question_id where questions.reported = false and answers.reported = false and product_id = $1';
  //   // const queryString = "select json_build_object ( 'product_id', p.id, 'results', questions) products from products p left join ( select product_id, json_agg( json_build_object( 'question_id', q.question_id, 'question_body', q.question_body, 'question_date', q.question_date, 'asker_name', q.asker_name, 'question_helpfulness', q.question_helpfulness, 'reported', q.reported, 'answers', answers ) ) questions from questions q left join ( select question_id, json_agg( json_build_object( 'id', a.id, 'body', a.body, 'date', a.date, 'answerer_name', a.answerer_name, 'helpfulness', a.helpfulness, 'photos', photos ) ) answers from answers a left join ( select answer_id, json_agg( json_build_object( 'id', p.id, 'url', p.url ) ) photos from photos p group by answer_id ) p on a.id = p.answer_id group by question_id ) a on q.question_id = a.question_id group by product_id) q on p.id = q.product_id where p.id =$1";
  //   // const queryString = 'select question_body, to_timestamp(questions.question_date::bigint/1000) as question_date from questions where product_id = $1'
  //   const queryString = `select q.question_id,
  //   q.question_body,
  //   q.question_date,
  //   q.asker_name,
  //   q.question_helpfulness,
  //   q.reported,
  //   (select
  //     json_object_agg(
  //       a.id,
  //       row_to_json(a)
  //     )
  //     from (select id, body, date, answerer_name, helpfulness, (select json_agg(p.url) from photos as p where p.answer_id = answers.id) photos from answers where question_id = q.question_id) a) answers from questions as q where product_id = $1;
  // `
  //   pool.query(queryString, [params], (err, result) => {
  //     if (err) {
  //       callback(err, null);
  //     } else {
  //       const results = result.rows;
  //       callback(null, {product_id: params, results});
  //     }
  //   })
  // },

  getAllQ: function(params, callback) {
    const queryString = `select q.question_id,
    q.question_body,
    q.question_date,
    q.asker_name,
    q.question_helpfulness,
    q.reported,
    (select
      json_object_agg(
        a.id,
        row_to_json(a)
      )
      from (select id, body, date, answerer_name, helpfulness, (select json_agg(p.url) from photos as p where p.answer_id = answers.id) photos from answers where question_id = q.question_id and reported = false) a) answers from questions as q where product_id = $1 and reported = false;`;
    pool.query(queryString, [params], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        const results = result.rows;
        callback(null, {product_id: params, results});
      }
    })
  },

  getAllA: function(params, callback) {
    const questionId = params[0];
    const skip = (params[1] - 1) * params[2];
    const count = params[2];
    const queryString = `
    select a.id,
      a.body,
      a.date,
      a.answerer_name,
      a.helpfulness,
      (select
        json_agg(
          json_build_object(
            'id', p.id,
            'url', p.url
          )
        )
        from photos as p
        where p.answer_id = a.id
      ) as photos
      from answers as a
      where question_id = $1 and reported = false limit $2 offset $3;`;
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
    const queryString = 'insert into questions (product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness) values ($1, $2, $3, $4, $5, false, 0)';
    pool.query(queryString, [product_id, body, date_written, name, email], (err, result) => {
      if (err) {
        console.log(err);
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
    const queryString = 'insert into answers (question_id, body, date, answerer_name, answerer_email, reported, helpfulness) values ($1, $2, $3, $4, $5, false, 0) returning id';
    pool.query(queryString, [question_id, body, date_written, name, email])
    .then((res) => {
      const answer_id = res.rows[0].id;
      const newArr = photos.map((photo) => {
        return newPhoto = [answer_id, photo];
      })
      // console.log(answer_id, newArr)
      pool.query(format('insert into photos (answer_id, url) values %L', newArr), [], (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result)
        }
      })
    })
  },

  putQH: function(param, callback) {
    const queryString = 'update questions set question_helpfulness = question_helpfulness + 1 where question_id = $1';
    pool.query(queryString, [param], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    })
  },

  putQR: function(param, callback) {
    const queryString = 'update questions set reported = true where question_id = $1';
    pool.query(queryString, [param], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    })
  }
}