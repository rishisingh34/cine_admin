# **Express API with TypeScript**

This project is a backend system built using **TypeScript** and the **Express.js** framework. It manages functionalities like student registration, quiz handling, and feedback collection. Additionally, it integrates **Google reCAPTCHA** for enhanced security in the authentication system.

## **Tech Stack**
- **Express**: Web framework for Node.js
- **TypeScript**: Strongly typed JavaScript
- **MongoDB**: NoSQL database for storing data
- **Google reCAPTCHA**: Used for bot protection in authentication routes
- **NodeCache**: In-memory caching for storing quiz questions temporarily

## **Project Structure**
The project follows an MVC (Model-View-Controller) pattern, dividing responsibilities between the following components:
- **Controllers**: Handle business logic and request/response processing.
- **Models**: Represent the database schema for different entities like Students, Questions, and Responses.
- **Routes**: Define API endpoints and map them to corresponding controllers.

---

## **Routes**

### **Authentication Routes**
These routes handle user authentication, including Google reCAPTCHA verification.

- **POST** `/login`
    - **Description**: Logs in a student after verifying credentials.
    - **Body**: `{ "studentNumber": "string", "password": "string", "token": "string" }`
    - Google reCAPTCHA token is verified before authentication.

---

### **Admin Routes**
These routes are for administrative functionalities like adding students and managing questions.

- **POST** `/admin/login`
    - **Description**: Logs in an admin.
    - **Body**: `{ "adminid": "string", "password": "string" }`

- **POST** `/admin/addStudent`
    - **Description**: Adds a new student to the system.
    - **Body**: `{ "name": "string", "studentNumber": "string", "branch": "string", "gender": "string", "residency": "string", "email": "string", "phone": "string" }`

- **POST** `/admin/addQuestion`
    - **Description**: Adds a new quiz question.
    - **Body**: `{ "question": "string", "options": "array", "subject": "string", "answer": "number" }`

- **PATCH** `/admin/updateQuestion`
    - **Description**: Updates an existing question.
    - **Body**: `{ "quesId": "string", "question": "string", "options": "array", "subject": "string", "answer": "number" }`

- **DELETE** `/admin/deleteQuestion`
    - **Description**: Deletes a question.
    - **Body**: `{ "quesId": "string" }`

- **GET** `/admin/questions`
    - **Description**: Fetches all questions, grouped by subject.

- **GET** `/admin/getStudentTypes`
    - **Description**: Gets the count of students by gender and residency type (Hostel/Day Scholar).

---

### **Student Routes**

- **POST** `/response`
    - **Description**: Records or updates a student's response to a quiz question.
    - **Body**: `{ "userId": "string", "quesId": "string", "status": "string", "ansId": "string" }`

- **POST** `/preferences`
    - **Description**: Sets a student's language preference.
    - **Body**: `{ "userId": "string", "preference": "number" }`

- **GET** `/questions`
    - **Description**: Fetches randomized questions for a subject.
    - **Query**: `{ "subject": "string", "userId": "string" }`

- **GET** `/getPreference`
    - **Description**: Gets the student's language preference.
    - **Query**: `{ "userId": "string" }`

- **GET** `/getResponses`
    - **Description**: Gets the responses of a student.
    - **Query**: `{ "userId": "string" }`

- **GET** `/timeRemaining`
    - **Description**: Retrieves the remaining quiz time for a student.
    - **Query**: `{ "userId": "string" }`

---

### **Feedback Routes**

- **POST** `/feedback/addFeedBackQuestion`
    - **Description**: Adds a feedback question.
    - **Body**: `{ "question": "string" }`

- **GET** `/feedback/getFeedBackQuestions`
    - **Description**: Fetches all feedback questions.

- **PATCH** `/feedback/updateFeedBackQuestion`
    - **Description**: Updates a feedback question.
    - **Body**: `{ "quesId": "string", "question": "string" }`

- **DELETE** `/feedback/deleteFeedBackQuestion`
    - **Description**: Deletes a feedback question.
    - **Body**: `{ "quesId": "string" }`

- **GET** `/feedback/feedbacks`
    - **Description**: Fetches feedback responses.

- **GET** `/feedback/searchFeedback`
    - **Description**: Searches feedback based on student information.
    - **Query**: `{ "name": "string", "studentNumber": "string" }`

---

## **How to Run the Project**

1. Clone the repository:
   ```bash
   git clone https://github.com/rishisingh34/cine_admin
   cd cine_admin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in `.env`:
   ```bash
   RECAPTCHA_SECRET_KEY=<your_recaptcha_secret_key>
   ADMIN_ID=<admin_id>
   ADMIN_PASS=<admin_password>
   ```

4. Run the project:
   ```bash
   nodemon app.ts
   ```

---
