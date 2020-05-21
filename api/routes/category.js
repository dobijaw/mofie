const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Category = require('../models/category');

router.get('/:userID', (req, res, next) => {
  Category.find({
    userID: req.params.userID,
  })
    .exec()
    .then((categories) => {
      return res.status(200).json({
        data: categories,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        error: err,
      });
    });
});

router.post('/add', (req, res, next) => {
  Category.find({
    key: req.body.key,
  })
    .exec()
    .then((cat) => {
      if (cat.length >= 1) {
        return res.status(409).json({
          warning: 'Category exist',
        });
      } else {
        const category = new Category({
          _id: new mongoose.Types.ObjectId(),
          userID: req.body.userID,
          value: req.body.value,
          key: req.body.key,
        });

        category
          .save()
          .then((result) => {
            console.log(result);
            return res.status(201).json({
              message: 'Category added.',
              id: category._id,
              value: category.value,
              key: category.key,
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
