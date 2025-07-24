# Cine Admin API Documentation

This document provides a comprehensive overview and documentation for the Cine Admin API. This API is responsible for managing students, questions, and feedback within the Cine platform.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
  - [Admin](#admin)
  - [Feedback](#feedback)
- [Data Models](#data-models)
  - [Student](#student)
  - [Question](#question)
  - [Response](#response)
  - [Feedback](#feedback-model)
  - [Feedback Response](#feedback-response)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```
2. **Navigate to the project directory:**
   ```bash
   cd cine_admin
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the server:**
   ```bash
   npm start
   ```

## Configuration

The application's configuration is located in the `config` directory. Key configuration files include:

- `db.config.ts`: Configures the database connection.
- `env.config.ts`: Manages environment variables.
- `cors.config.ts`: Configures Cross-Origin Resource Sharing (CORS).

## API Endpoints

### Admin

- **POST /admin/login**
  - **Description:** Authenticates an admin user.
  - **Request Body:**
    ```json
    {
      "adminid": "string",
      "password": "string"
    }
    ```
  - **Response:**
    - `200 OK`: Login successful.
    - `400 Bad Request`: Invalid credentials.
    - `500 Internal Server Error`: Server error.

- **POST /admin/addStudent**
  - **Description:** Adds a new student to the system.
  - **Request Body:**
    ```json
    {
      "name": "string",
      "studentNumber": "string",
      "branch": "string",
      "gender": "string",
      "residency": "string",
      "email": "string",
      "phone": "string"
    }
    ```
  - **Response:**
    - `201 Created`: Student registered successfully.
    - `400 Bad Request`: Student already exists.
    - `500 Internal Server Error`: Server error.

- **POST /admin/addQuestion**
  - **Description:** Adds a new question.
  - **Request Body:**
    ```json
    {
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "subject": "string",
      "answer": "number"
    }
    ```
  - **Response:**
    - `201 Created`: Question added successfully.
    - `400 Bad Request`: Invalid input.
    - `500 Internal Server Error`: Server error.

- **PUT /admin/updateQuestion**
  - **Description:** Updates an existing question.
  - **Request Body:**
    ```json
    {
      "quesId": "string",
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "subject": "string",
      "answer": "number"
    }
    ```
  - **Response:**
    - `200 OK`: Question updated successfully.
    - `400 Bad Request`: Invalid input.
    - `404 Not Found`: Question does not exist.
    - `500 Internal Server Error`: Server error.

- **DELETE /admin/deleteQuestion**
  - **Description:** Deletes a question.
  - **Request Body:**
    ```json
    {
      "quesId": "string"
    }
    ```
  - **Response:**
    - `200 OK`: Question deleted successfully.
    - `400 Bad Request`: Question does not exist.
    - `500 Internal Server Error`: Server error.

- **GET /admin/questions**
  - **Description:** Retrieves all questions, grouped by subject.
  - **Response:**
    - `200 OK`: A map of subjects to lists of questions.
    - `500 Internal Server Error`: Server error.

- **GET /admin/students**
  - **Description:** Retrieves a paginated list of verified students.
  - **Query Parameters:**
    - `page`: The page number to retrieve.
  - **Response:**
    - `200 OK`: A list of student objects.
    - `500 Internal Server Error`: Server error.

- **GET /admin/getStudentTypes**
  - **Description:** Retrieves the count of students by gender and residency.
  - **Response:**
    - `200 OK`: An object with counts for different student types.
    - `500 Internal Server Error`: Server error.

- **POST /admin/responses**
  - **Description:** Retrieves the responses of a specific student.
  - **Request Body:**
    ```json
    {
      "studentNumber": "string"
    }
    ```
  - **Response:**
    - `200 OK`: A map of subjects to lists of responses.
    - `400 Bad Request`: Student does not exist.
    - `500 Internal Server Error`: Server error.

- **GET /admin/searchStudent**
  - **Description:** Searches for students by name and student number.
  - **Query Parameters:**
    - `name`: The name to search for.
    - `studentNumber`: The student number to search for.
  - **Response:**
    - `200 OK`: A list of matching student objects.
    - `500 Internal Server Error`: Server error.

### Feedback

- **POST /admin/feedback/addFeedBackQuestion**
  - **Description:** Adds a new feedback question.
  - **Request Body:**
    ```json
    {
      "question": "string"
    }
    ```
  - **Response:**
    - `201 Created`: Feedback question added successfully.
    - `400 Bad Request`: Invalid input.
    - `500 Internal Server Error`: Server error.

- **GET /admin/feedback/getFeedBackQuestions**
  - **Description:** Retrieves all feedback questions.
  - **Response:**
    - `200 OK`: A list of feedback question objects.
    - `500 Internal Server Error`: Server error.

- **PUT /admin/feedback/updateFeedBackQuestion**
  - **Description:** Updates a feedback question.
  - **Request Body:**
    ```json
    {
      "quesId": "string",
      "question": "string"
    }
    ```
  - **Response:**
    - `200 OK`: Feedback entry updated successfully.
    - `400 Bad Request`: Invalid input.
    - `404 Not Found`: Feedback entry not found.
    - `500 Internal Server Error`: Server error.

- **DELETE /admin/feedback/deleteFeedBackQuestion**
  - **Description:** Deletes a feedback question.
  - **Request Body:**
    ```json
    {
      "quesId": "string"
    }
    ```
  - **Response:**
    - `200 OK`: Feedback entry deleted successfully.
    - `404 Not Found`: Feedback entry not found.
    - `500 Internal Server Error`: Server error.

- **GET /admin/feedback/feedbacks**
  - **Description:** Retrieves a paginated list of feedback responses.
  - **Query Parameters:**
    - `page`: The page number to retrieve.
  - **Response:**
    - `200 OK`: A list of feedback response objects.
    - `500 Internal Server Error`: Server error.

- **GET /admin/feedback/searchFeedbacks**
  - **Description:** Searches for feedback responses by student name and number.
  - **Query Parameters:**
    - `name`: The name to search for.
    - `studentNumber`: The student number to search for.
  - **Response:**
    - `200 OK`: A list of matching feedback response objects.
    - `500 Internal Server Error`: Server error.

## WebSockets

The application uses WebSockets to provide real-time updates for the leaderboard.

- **Connection:** Clients can connect to the WebSocket server to receive leaderboard updates.
- **Event:** `leaderboard`
  - **Description:** The server emits the `leaderboard` event every 15 seconds, sending the updated leaderboard data to all connected clients.
  - **Payload:** An array of student objects with their scores and ranks.

## Aggregation Pipeline

The application uses a MongoDB aggregation pipeline to calculate the leaderboard. This pipeline is executed every 15 seconds to generate the data that is then emitted through the WebSocket.

The pipeline performs the following stages:

1.  **`$lookup`**: Joins the `responses` collection with the `questions` collection to get the correct answer for each question.
2.  **`$unwind`**: Deconstructs the `questionDetails` array created by the `$lookup` stage.
3.  **`$project`**: Calculates whether the student's answer was correct and assigns a score of 4 for a correct answer and 0 for an incorrect answer.
4.  **`$group`**: Groups the documents by `userId` and calculates the total score for each student.
5.  **`$lookup`**: Joins the result with the `students` collection to get the student's details.
6.  **`$unwind`**: Deconstructs the `studentDetails` array.
7.  **`$project`**: Selects the required fields for the leaderboard.
8.  **`$sort`**: Sorts the students by score in descending order.

## Data Models

### Student

- `name`: `string` (required)
- `studentNumber`: `string` (required, unique)
- `branch`: `string` (required)
- `gender`: `string` (required)
- `residency`: `string` (required)
- `email`: `string` (required, unique)
- `phone`: `string` (required)
- `isVerified`: `boolean` (default: `false`)
- `password`: `string` (required)

### Question

- `subject`: `string` (required)
- `question`: `string` (required)
- `options`: `[string]` (required)
- `answer`: `number` (required)

### Response

- `userId`: `mongoose.Schema.Types.ObjectId` (ref: 'Student', required)
- `quesId`: `mongoose.Schema.Types.ObjectId` (ref: 'Question', required)
- `status`: `number` (required)

### Feedback Model

- `question`: `string` (required)

### Feedback Response

- `student`: `mongoose.Schema.Types.ObjectId` (ref: 'Student', required)
- `responses`: `[{ question: string, answer: string }]`