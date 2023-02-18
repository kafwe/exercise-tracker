const User = require('../models/user');

const createUser = (user, done) => {
  const userToCreate = new User(user);

  userToCreate.save((err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    }

    done(null, data);
  })
}

const getUsers = (done) => {
  User.find({}, (err, users) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    }

    done(null, users)
  });
}

const findUserById = (id, done) => {
  User.findOne({ _id: id }, (err, user) => {
    if (err) {
      console.error(err);
      res.sendStatus(404);
    }

    done(null, user);
  })
}

module.exports = {
  createUser,
  getUsers,
  findUserById,
};