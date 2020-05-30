const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Category = require('../models/category');

router.get('/:userID', (req, res, next) => {
  Category.find({
    creator: req.params.userID,
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

router.delete('/:id', (req, res, next) => {
  Category.remove({
    _id: req.params.id,
  })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: 'Category deleted',
      });
    })
    .catch();

  res.json({
    message: req.params.id,
  });
});

router.put('/:id', (req, res, next) => {
  Category.findOne({
    _id: req.params.id,
  })
    .exec()
    .then((category) => {
      if (!category) {
        return res.status(409).json({
          warning: 'Category not found.',
        });
      }

      category.value = req.body.value;

      category
        .save()
        .then((result) => {
          console.log(result);

          res.status(201).json({
            id: category._id,
            value: category.value,
          });
        })
        .catch((err) => {
          console.log(err);

          res.status(500).json({
            error: err,
          });
        });
    })
    .catch();
});

router.post('/add', (req, res, next) => {
  Category.find({
    value: req.body.value,
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
          creator: req.body.userID,
          value: req.body.value,
        });

        category
          .save()
          .then((result) => {
            console.log(result);
            return res.status(201).json({
              message: 'Category added.',
              id: category._id,
              value: category.value,
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
