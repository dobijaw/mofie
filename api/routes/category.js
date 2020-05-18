const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

routes.post('/add', (req, res, next) => {
  console.log(req.body);

  res.json({
    message: 'work',
  });
});

module.exports = router;
