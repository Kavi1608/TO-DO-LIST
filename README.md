# Todo Task Management Web Application

A full-stack Todo Task Management Web Application that allows users to log in via social login (Google, GitHub), and perform full CRUD (Create, Read, Update, Delete) operations on personal “to-do” tasks.

---

## Features

- Social login authentication using Google and GitHub.
- JWT-based user authentication and authorization.
- User-specific task management with CRUD operations.
- Task model includes: title, description, due date, status (Open/Complete).
- Responsive UI for both mobile and desktop.
- Validation and error handling on backend and frontend.

---

## Tech Stack

- **Backend:** Node.js, Express.js, MongoDB (using Mongoose)
- **Frontend:** React.js
- **Authentication:** OAuth 2.0 for social login, JWT for session management

---

## Setup Instructions

### Backend

1. Clone the repository.
2. Navigate to the backend folder.
3. Install dependencies:
   ```bash
   npm install
   
Create a .env file with your environment variables:
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>

start the backend server:

node server.js

Frontend
Navigate to the frontend folder.

Install dependencies:

bash
Copy
Edit
npm install
Create a .env file for frontend environment variables (if needed, e.g. API URL).

Start the frontend development server:
npm run dev
