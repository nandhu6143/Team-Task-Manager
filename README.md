# Team Task Manager

A complete full-stack Team Task Manager web application built with the MERN stack.

## Features
- Role-based Access Control (Admin/Member)
- JWT Authentication
- Project Creation and Management
- Task Assignment and Tracking
- Dashboard with Statistics and Charts
- Fully Responsive Design (Tailwind CSS)

## Tech Stack
- **Frontend**: React (Vite), React Router, Axios, Tailwind CSS, Recharts, Lucide React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas via Mongoose
- **Auth**: JWT, bcryptjs

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas URI

### Backend Setup
1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and fill in the details.
   - Set `MONGO_URI` to your MongoDB Atlas connection string.
   - Set `JWT_SECRET` to a secure random string.
   - Optional: set `PORT` (defaults to 5000).
4. `npm run dev` (starts the server on http://localhost:5000)

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. Copy `.env.example` to `.env` (it contains `VITE_API_URL=http://localhost:5000/api`)
4. `npm run dev` (starts Vite dev server)

## Deployment (Railway)
This project is ready for deployment on platforms like Railway.

### Backend on Railway
1. Create a new service from your GitHub repo.
2. Select the `backend` folder as the root directory.
3. Add Environment Variables:
   - `PORT=8080` (or leave default, Railway auto-injects it)
   - `MONGO_URI=your_production_mongodb_uri`
   - `JWT_SECRET=your_production_jwt_secret`
4. Deploy! Railway will run `npm install` and `node server.js` (you can add a start script in package.json: `"start": "node server.js"`).

### Frontend on Railway
1. Create a new service from your GitHub repo.
2. Select the `frontend` folder as the root directory.
3. Add Environment Variables:
   - `VITE_API_URL=your_deployed_backend_url/api`
4. Change the build command to `npm run build` and publish directory to `dist`.
5. Deploy!

## Usage
1. Open the frontend URL.
2. Register a new user and select the role as "admin".
3. Log in.
4. Go to Projects and create a new project.
5. Go to Tasks and assign a task to a project.
6. Check the Dashboard for statistics!
