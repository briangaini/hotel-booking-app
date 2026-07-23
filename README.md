# Hotel Booking App

A full-stack hotel booking and blog platform built with the MERN stack (MongoDB, Express, React, Node.js), featuring JWT-based authentication, an admin dashboard, and a commenting system.

## Features

- User registration and login with JWT authentication
- Admin dashboard for managing posts, users, and viewing analytics
- Blog post creation, editing, and deletion (admin)
- Public blog browsing and search
- Comment system on blog posts
- Role-based access control (admin vs. regular user routes)
- Responsive UI built with React and Tailwind CSS

## Tech Stack

**Frontend**
- React (Vite)
- Redux Toolkit for state management
- Tailwind CSS for styling
- React Router for navigation

**Backend**
- Node.js with Express
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- Middleware for route protection and admin verification

## Project Structure

```
hotel-booking-app/
├── BE/                     # Backend (Express + MongoDB)
│   └── src/
│       ├── data/
│       ├── middleware/     # Auth & admin verification
│       ├── model/          # Mongoose schemas
│       └── routes/         # API routes
├── FE/                     # Frontend (React + Vite)
│   └── vite-project/
│       └── src/
│           ├── components/
│           ├── pages/
│           ├── redux/
│           └── router/
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- npm
- A MongoDB connection (local or Atlas)

### Backend Setup
```bash
cd BE
npm install
```

Create a `.env` file in the `BE` directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Run the backend:
```bash
npm start
```

### Frontend Setup
```bash
cd FE/vite-project
npm install
npm run dev
```

The frontend will typically run on `http://localhost:5173` and the backend on `http://localhost:5000` (or as configured).

## Environment Variables

This project requires a `.env` file (not committed to this repository) containing your database connection string and JWT secret. See the Backend Setup section above for the required variables.

## Author

Brian Gaini

## License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.
