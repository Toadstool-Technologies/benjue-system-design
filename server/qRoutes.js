const express = require('express');
const router = express.Router();
const modelQ = require('../db/q.js');

//Retrieves a list of questions for a particular product. This list does not include any reported questions.
router.get('/', (req, res) => {
  const params = req.query.product_id;
  console.log('here is the get param', params)
  modelQ.getAllQ(params, (err, result)=> {
    if (err) {
      console.log('err getting all questions')
      res.sendStatus(501);
    } else {
      res.send(result);
    }
  })
});

//Returns answers for a given question. This list does not include any reported answers.
router.get('/:question_id/answers', (req, res) => {
  const questionId = req.params.question_id;
  const page = req.query.page;
  const count = req.query.count;
  const params = [questionId, page, count];
  modelQ.getAllA(params, (err, result) => {
    if (err) {
      console.log('err getting all answers');
      res.sendStatus(501);
    } else {
      const data = {
        question: questionId,
        page: page,
        count: count,
        result: result
      }
      res.send(data);
    }
  })
});

//Adds a question for the given product
router.post('/', (req, res) => {
  const ts = Math.round((new Date()).getTime() / 1000);
  const params = {
    body: req.query.body,
    name: req.query.name,
    email: req.query. email,
    product_id: Number(req.query.product_id),
    date_written: ts
  }
  modelQ.postQ(params, (err, result) => {
    if (err) {
      console.log('err posting a question');
      res.sendStatus(501);
    } else {
      res.sendStatus(201, 'successfully posted a question!')
    }
  })
});

//Adds an answer for the given question
router.post('/:question_id/answers', (req, res) => {
  const ts = Math.round((new Date()).getTime() / 1000);
  const params = {
    question_id: req.params.question_id,
    body: req.query.body,
    name: req.query.name,
    email: req.query.email,
    photos: req.query.photos,
    date_written: ts
  }
  console.log(params);
  modelQ.postA(params, (err, result) => {
    if (err) {
      console.log('err posting an answer');
      res.send(501)
    } else {
      res.sendStatus(201, 'successfuly posted an answer!')
    }
  })
})



module.exports = router;