const mongoose = require('mongoose');
const { uri } = require('../config/db.config');

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const exerciseSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: new Date()
  },
  userId: {
    type: String,
    required: true
  }
});

exerciseSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.__v;
    ret.date = ret.date.toDateString();
    ret._id = ret.userId;
    delete ret.userId;
    return ret;
  }
});

module.exports = mongoose.model('Exercise', exerciseSchema);