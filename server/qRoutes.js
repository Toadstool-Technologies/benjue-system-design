const express = require('express');
const router = express.Router();
const modelQ = require('../db/q.js');


router.get('/test', (req, res) => {
  const params = req.query.product_id;
  modelQ.getTest(params, (err, result) => {
    if (err) {
      console.log('err testing')
      res.sendStatus(501)
    } else {
      res.send(result)
    }
  })
})
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
    photos: JSON.parse(req.query.photos),
    date_written: ts
  }
  // console.log(params);
  modelQ.postA(params, (err, result) => {
    if (err) {
      console.log('err posting an answer');
      res.sendStatus(501)
    } else {
      res.sendStatus(201, 'successfuly posted an answer!')
    }
  })
});

//Updates a question to show it was found helpful.
router.put('/:question_id/helpful', (req, res) => {
  const param = req.params.question_id;
  modelQ.putQH(param, (err, result) => {
    if (err) {
      console.log('err incrementing question helpful');
      res.sendStatus(501)
    } else (
      res.sendStatus(204)
    )
  })
});

router.put('/:question_id/report', (req, res) => {
  const param = req.params.question_id;
  modelQ.putQR(param, (err, result) => {
    if (err) {
      console.log('err marking question reported');
      res.sendStatus(501)
    } else {
      res.sendStatus(204)
    }
  })
})

module.exports = router;