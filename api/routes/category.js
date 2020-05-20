const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Category = require('../models/category');

router.get('/:userID', (req, res, next) => {
  res.json({
    message: 'get cat',
  });
});

router.post('/add', (req, res, next) => {
  Category.find({
    enum: req.body.enum,
  })
    .exec()
    .then((cat) => {
      if (cat.length >= 1) {
        return res.status(409).json({
          message: 'Category exist',
        });
      } else {
        const category = new Category({
          _id: new mongoose.Types.ObjectId(),
          createdBy: req.body.userID,
          value: req.body.value,
          enum: req.body.enum,
        });

        category
          .save()
          .then((result) => {
            console.log(result);
            return res.status(201).json({
              message: 'Category added.',
            });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({
              error: err,
            });
          });
      }
    });
});

module.exports = router;
