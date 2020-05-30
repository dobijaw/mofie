const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String, required: true },
  productions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Production',
    },
  ],
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
