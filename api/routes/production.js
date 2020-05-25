const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Production = require('../models/production');

router.post('/add', (req, res, next) => {
  console.log('to co przychodzi w request');
  console.log(req.body);

  Production.find({
    productionID: req.body.productionID,
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
          productionID: req.body.productionID,
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
            category: {
              value: req.body.customData.category.value,
              id: req.body.customData.category.id,
              key: req.body.customData.category.key,
            },
            comment: req.body.customData.comment,
            rate: {
              value: req.body.customData.rate.value,
              id: req.body.customData.rate.id,
              key: req.body.customData.rate.key,
            },
          },
        });

        production
          .save()
          .then((result) => {
            // console.log(result);

            return res.status(200).json({
              message: 'Production added',
              production,
            });
          })
          .catch();
      }
    })
    .catch();

  // res.json({
  //   message: 'Work fine I have request',
  //   data: req.body,
  // });
});

router.get('/:userID', (req, res, next) => {
  Production.find({
    creator: req.params.userID,
  })
    .exec()
    .then((prod) => {
      // console.log(prod);

      return res.status(200).json({
        message: 'Great',
        collection: prod,
      });
    })
    .catch();
});

router.delete('/:id', (req, res, next) => {
  Production.findOneAndRemove({
    _id: req.params.id,
  })
    .then((result) => {
      console.log(result);

      res.status(200).json({
        message: 'Production removed from collection',
      });
    })
    .catch((err) => {
      res.status(500).json({
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
      res.json('err');
    });
});

module.exports = router;
