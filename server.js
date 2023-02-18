const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userController = require('./userController');
const exerciseController = require('./exerciseController');
require('dotenv').config();


app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/api/users', (req, res) => {
  const username = req.body.username;

  if (!username) res.sendStatus(400);

  userController.createUser({ username }, (err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    }

    return res.json(data.toJSON());
  })
});

app.get('/api/users', (req, res) => {
  userController.getUsers((err, users) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    }

    return res.send(users);
  })
});

app.post('/api/users/:id/exercises', (req, res) => {
  const userId = req.params.id;

  if (!req.body.description || !req.body.duration) {
    res.sendStatus(400);
  }
  userController.findUserById(userId, (err, user) => {
    if (err) {
      console.error(err);
      res.sendStatus(404);
    }

    if (!user) res.sendStatus(404);

    const exercise = {
      username: user.username,
      description: req.body.description,
      duration: req.body.duration,
      userId: user._id
    }

    if (req.body.date) {
      exercise.date = req.body.date;
    }

    exerciseController.createExercise(exercise, (err, data) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      }

      return res.send(data.toJSON());
    })
  })
});

app.get('/api/users/:id/logs', (req, res) => {
  userController.findUserById(req.params.id, (err, user) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    }

    if (!user) res.sendStatus(404);

    exerciseController.findExercisesByUserId(user.id, (err, exercises) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      }

      data = {
        username: user.username,
        count: exercises.length,
        _id: user._id,
        log: exercises
      }

      res.json(data);

    }, req.query.from, req.query.to, req.query.limit)
  })
});


const port = process.env.NODE_LOCAL_PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
