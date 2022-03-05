const express = require('express');
const router = express.Router();
const modelA = require('../db/a.js');

//Updates an answer to show it was found helpful.
router.put('/:answer_id/helpful', (req, res) => {
  const param = req.params.answer_id;
  modelA.putAH(param, (err, result) => {
    if (err) {
      console.log('err incrementing answer helpful');
      res.sendStatus(501)
    } else (
      res.sendStatus(204)
    )
  })
});

router.put('/:answer_id/report', (req, res) => {
  const param = req.params.answer_id;
  modelA.putAR(param, (err, result) => {
    if (err) {
      console.log('err marking answer reported');
      res.sendStatus(501)
    } else {
      res.sendStatus(204)
    }
  })
})




module.exports = router;