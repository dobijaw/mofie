const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Production = require('../models/production');

router.post('/add', (req, res, next) => {
  Production.find({
    productionID: req.body.productionID,
    type: req.body.type,
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
          addedBy: req.body.userID,
          type: req.body.type,
          productionID: req.body.id,
          data: {
            genres: req.body.genres,
            image: req.body.image,
            overview: req.body.overview,
            rate: req.body.rate,
            releaseDate: req.body.releaseDate,
            tagline: req.body.tagline,
            title: req.body.title,
          },
          customData: {
            category: {
              value: req.body.category,
              id: req.body.categoryID,
              key: req.body.categoryKey,
            },
            comment: req.body.comment,
            rate: { value: req.body.rateValue, id: req.body.rateID },
          },
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
