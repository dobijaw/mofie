const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productionSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('Production', productionSchema);
