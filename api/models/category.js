const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  value: { type: String, required: true },
});

module.exports = mongoose.model('Category', categorySchema);
