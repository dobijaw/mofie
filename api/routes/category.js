const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Category = require('../models/category');
const Production = require('../models/production');

router.post('/add', (req, res, next) => {
  Category.find({
    creator: req.body.userId,
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
          creator: req.body.userId,
          value: req.body.value,
        });

        category
          .save()
          .then((result) => {
            return res.status(201).json({
              message: 'Category created.',
              _id: category._id,
              value: category.value,
            });
          })
          .catch((err) => {
            return res.status(500).json({
              error: err,
            });
          });
      }
    });
});

router.get('/:userId', (req, res, next) => {
  Category.find({
    creator: req.params.userId,
  })
    .exec()
    .then((categories) => {
      return res.status(200).json({
        categories,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

router.put('/:id', (req, res, next) => {
  Category.findOne({
    _id: req.params.id,
  })
    .exec()
    .then((category) => {
      if (!category) {
        return res.status(404).json({
          warning: 'Category not found.',
        });
      } else {
        category.value = req.body.value;

        category
          .save()
          .then((result) => {
            return res.status(201).json({
              _id: category._id,
              value: category.value,
            });
          })
          .catch((err) => {
            return res.status(500).json({
              error: err,
            });
          });
      }
    })
    .catch();
});

router.delete('/:id', (req, res, next) => {
  Category.remove({
    _id: req.params.id,
  })
    .exec()
    .then((result) => {
      return res.status(200).json({
        message: 'Category deleted.',
        _id: req.params.id,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
