const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    password: bycrypt.hash(req.body.password),
  });
  console.log(user);
  res.send('respond with a resource');
});

module.exports = router;
