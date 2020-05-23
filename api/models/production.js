const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productionSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  addedBy: { type: String, required: true },
  type: { type: String, enum: ['movie', 'tv'], required: true },
  productionID: { type: Number, required: true },
  data: {
    genres: [{ type: String }],
    image: { type: String },
    overview: { type: String },
    rate: { type: Number },
    releaseDate: { type: String },
    tagline: { type: String },
    title: { type: String },
  },
  customData: {
    category: {
      value: { type: String },
      id: { type: String },
      key: { type: String },
    },
    comment: { type: String },
    rate: { value: { type: String }, id: { type: String } },
  },
});

module.exports = mongoose.model('Production', productionSchema);
