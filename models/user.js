const mongoose = require('mongoose');
const { uri } = require('../config/db.config');

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  }
})

userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('User', userSchema);