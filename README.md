# User Feedback Application

This is a full-stack application for managing user feedback. Users can submit feedback, update it, and mark feedback as important. The application is built using **Node.js**, **Express**, **MongoDB**, and **React**.

---

## Features

- User authentication (login and signup)
- Submit feedback with title, description, suggestions, and bug reports
- Update feedback details
- Mark feedback as important (like functionality)
- Delete feedback

---

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- [Git](https://git-scm.com/) (optional, for cloning the repository)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/user-feedback.git
   cd user-feedback

   # Navigate to the backend folder and install dependencies
cd backend
npm install

# Navigate to the frontend folder and install dependencies
cd ../frontend
npm install

Create a .env file in the backend folder and add the following environment variables:

PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret

Replace your-mongodb-connection-string with your MongoDB connection string (local or cloud).

Replace your-jwt-secret with a secure secret key for JWT authentication.

Running the Application
Start the Backend Server
Navigate to the backend folder:
cd backend

Start the server:

npm start