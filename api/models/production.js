const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productionSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  productionType: { type: String, enum: ['movie', 'tv'], required: true },
  productionId: { type: Number, required: true },
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
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    comment: { type: String },
    rate: {
      id: { type: String },
      value: { type: String },
    },
  },
});

module.exports = mongoose.model('Production', productionSchema);
