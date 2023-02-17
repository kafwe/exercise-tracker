const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

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