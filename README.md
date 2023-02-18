# Exercise Tracker API

This project is a RESTful API for exercise tracking. Users can create an account, log exercises they have done, and view their exercise history. The API also includes optional query parameters for filtering exercise logs.

## API Endpoints

The API has the following endpoints:

- `POST /api/users`: creates a new user account
- `GET /api/users`: retrieves a list of all users
- `POST /api/users/:id/exercises`: logs a new exercise for a specific user
- `GET /api/users/:id/logs`: retrieves the exercise history for a specific user. The exercise logs can be filtered using the following optional query parameters: 
  - `from`: Retrieve exercises starting from this date (YYYY-MM-DD)
  - `to`: Retrieve exercises up to and including this date (YYYY-MM-DD)
  - `limit`: Limit the number of exercises returned

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Docker

## Getting Started

### Installation

1. Clone the repository:

```
git clone https://github.com/kafwe/exercise-tracker.git

cd exercise-tracker
```

2. Create a `.env` file in the root of the project and add the following environment variables:

```
# MongoDB connection settings
MONGODB_USER=your_mongodb_username
MONGODB_PASSWORD=your_mongodb_password
MONGODB_DATABASE=your_mongodb_database_name
MONGODB_DOCKER_PORT=27017
MONGODB_LOCAL_PORT=27017

# Node.js server settings
NODE_ENV=development
NODE_LOCAL_PORT=3000
NODE_DOCKER_PORT=3000
```

### Running with Docker Compose

Make sure you have Docker and Docker Compose installed.

Run the following command to start the app and MongoDB:

```
docker compose up
```

The API is now running on `http://localhost:3000`. You can test the API by visiting `http://localhost:3000` in your browser or using a tool such as [Postman](https://www.postman.com/).

## Acknowledgements

freeCodeCamp.org for the [project prompt](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/exercise-tracker).
