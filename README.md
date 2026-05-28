# MERN Notes App

A full-stack notes application built with MongoDB, Express.js, React, Node.js, JWT authentication, and Tailwind CSS.

Users can sign up, log in, create notes, view their own notes, update notes, delete notes, and search through saved notes. Notes are protected by authentication, so each logged-in user only sees notes created by their account.

## Features

- User signup and login
- Password hashing with `bcryptjs`
- JWT-based protected routes
- Create personal notes
- View notes for the logged-in user
- Edit and delete notes
- Real-time search by note title or content
- React Router navigation
- Tailwind CSS styling
- MongoDB database with Mongoose models

## Tech Stack

- Frontend: React, Vite, React Router, Axios, Tailwind CSS
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Authentication: JWT, bcryptjs

## Project Structure

```text
Expressjs,MongoDb/
|-- Server.js
|-- Middleware/
|   `-- Authentication.js
|-- model/
|   |-- NotesModel.js
|   `-- UserModel3.js
|-- client/
|   `-- NotesApp/
|       |-- src/
|       |   |-- App.jsx
|       |   |-- NotesInterface/
|       |   |   |-- Notes.jsx
|       |   |   |-- ViewNotes.jsx
|       |   |   |-- ProtectedRoute.jsx
|       |   |   `-- OpeningPage.jsx
|       |   `-- signupAndloginpages/
|       |       |-- LoginPage.jsx
|       |       `-- SignupPage.jsx
|       `-- package.json
|-- package.json
`-- README.md
```

## Environment Variables

Create a `.env` file inside `Expressjs,MongoDb/`.

```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

## Installation

Install backend dependencies:

```bash
npm install
```

Install frontend dependencies:

```bash
cd client/NotesApp
npm install
```

## Running the Project

Start the backend server from `Expressjs,MongoDb/`:

```bash
npm run dev
```

Start the frontend app from `Expressjs,MongoDb/client/NotesApp/`:

```bash
npm run dev
```

Backend URL:

```text
http://localhost:5000
```

Frontend URL:

```text
http://localhost:5173
```

## API Routes

### Auth

| Method | Route | Description |
| --- | --- | --- |
| POST | `/signup` | Create a new user |
| POST | `/login` | Login user and return JWT token |

### Notes

These routes require an `Authorization` header:

```text
Authorization: Bearer <token>
```

| Method | Route | Description |
| --- | --- | --- |
| POST | `/notes` | Create a note |
| GET | `/notes` | Get logged-in user's notes |
| GET | `/notes/:id` | Get one note |
| PUT | `/notes/:id` | Update one note |
| DELETE | `/notes/:id` | Delete one note |

## Frontend Routes

| Route | Page |
| --- | --- |
| `/` | Opening page |
| `/signup` | Signup page |
| `/login` | Login page |
| `/notes` | Create notes page |
| `/viewnotes` | View notes page |

## Build and Lint

From `Expressjs,MongoDb/client/NotesApp/`:

```bash
npm run build
npm run lint
```

## Important Notes

- The backend must be running before login, signup, or notes requests will work.
- MongoDB must be connected through `MONGODB_URL`.
- After login/signup, the token and user data are stored in `localStorage`.
- Protected pages check for a token before allowing access.
- `.env`, `node_modules`, and build output are intentionally ignored by Git.

## Author

Bhargav Pasupuleti
