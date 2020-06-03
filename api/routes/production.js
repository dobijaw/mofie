const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Production = require('../models/production');

router.post('/add', (req, res, next) => {
  Production.find({
    creator: req.body.creator,
    productionId: req.body.productionId,
    productionType: req.body.productionType,
  })
    .exec()
    .then((prod) => {
      if (prod.length >= 1) {
        return res.status(409).json({
          warning: 'Production exist',
        });
      } else {
        const production = new Production({
          _id: new mongoose.Types.ObjectId(),
          creator: req.body.creator,
          productionType: req.body.productionType,
          productionId: req.body.productionId,
          data: {
            genres: req.body.data.genres,
            image: req.body.data.image,
            overview: req.body.data.overview,
            rate: req.body.data.rate,
            releaseDate: req.body.data.releaseDate,
            tagline: req.body.data.tagline,
            title: req.body.data.title,
          },
          customData: {
            categoryId: req.body.customData.categoryId,
            comment: req.body.customData.comment,
            rate: {
              id: req.body.customData.rate.id,
              value: req.body.customData.rate.value,
            },
          },
        });

        production
          .save()
          .then((result) => {
            return res.status(200).json({
              message: 'Production added',
              production,
            });
          })
          .catch((err) => {
            console.log(err);

            return res.status(500).json({
              error: err,
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);

      return res.status(500).json({
        error: err,
      });
    });
});

router.get('/:userID', (req, res, next) => {
  Production.find({
    creator: req.params.userID,
  })
    .exec()
    .then((prod) => {
      return res.status(200).json({
        collection: prod,
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
  Production.findOneAndRemove({
    _id: req.params.id,
  })
    .then((result) => {
      console.log(result);

      return res.status(200).json({
        message: 'Production removed from collection',
      });
    })
    .catch((err) => {
      console.log(err);

      return res.status(500).json({
        error: err,
      });
    });
});

router.put('/:id', (req, res, next) => {
  Production.findOne({
    _id: req.params.id,
  })
    .exec()
    .then((production) => {
      production.customData = req.body;

      production
        .save()
        .then((result) => {
          return res.status(201).json({
            message: 'Updated.',
            _id: req.params.id,
            data: production,
          });
        })
        .catch();
    })
    .catch((err) => {
      console.log(err);

      return res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
