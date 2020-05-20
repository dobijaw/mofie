const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  createdBy: { type: String, required: true },
  value: { type: String, required: true },
  enum: { type: String, required: true },
});

module.exports = mongoose.model('Category', categorySchema);
