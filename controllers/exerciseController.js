const Exercise = require('../models/exercise');

createExercise = (exercise, done) => {
  const exerciseToCreate = new Exercise(exercise);

  exerciseToCreate.save((err, exercise) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    }

    done(null, exercise);
  });
}

const findExercisesByUserId = (id, done, from = null, to = null, limit = null) => {
  const query = { userId: id };

  if (from && to) {
    query.date = { $gte: from, $lte: to };
  }

  let queryExecutor = Exercise.find(query);

  if (limit) {
    queryExecutor = queryExecutor.limit(limit);
  }

  queryExecutor.exec((err, exercises) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    }

    const transformedExercises = exercises.map(exercise => {
      const { _id, username, __v, userId, ...transformedExercise } = exercise.toObject();
      transformedExercise.date = transformedExercise.date.toDateString();
      return transformedExercise;
    });



    done(null, transformedExercises);
  });
}

module.exports = {
  createExercise,
  findExercisesByUserId,
};