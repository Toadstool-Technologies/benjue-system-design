const express = require('express');
const app = express();
const port = 3001;

const qRouter = require('./qRoutes.js');
const aRouter = require('./aRoutes.js');

app.use('/qa/questions', qRouter);
app.use('/qa/answers', aRouter)

app.get('/loaderio-9c1145f8c0d60645957dad52077891fd', (req, res) => {
  res.send('loaderio-9c1145f8c0d60645957dad52077891fd');
})

app.listen(port, () => {
  console.log('hi there, server is listening on port 3001')
})