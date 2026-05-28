# MERN Notes App

A React + Vite frontend for a MERN notes application. Users can sign up, log in, create notes, view their own notes, update notes, delete notes, and search through saved notes.

## Features

- User signup and login with JWT stored in local storage
- Protected notes pages for authenticated users
- Create notes with a title and description
- View all notes for the logged-in user
- Edit and delete existing notes
- Search notes by title or content in real time
- Case-insensitive search that resets automatically when the search box is cleared

## Tech Stack

- React
- Vite
- React Router
- Axios
- Tailwind CSS
- Express, MongoDB, and JWT on the backend

## Getting Started

Install dependencies from the frontend folder:

```bash
npm install
```

Start the backend API from the `Expressjs,MongoDb` folder:

```bash
npm run dev
```

Start the frontend from the `Expressjs,MongoDb/client/NotesApp` folder:

```bash
npm run dev
```

Open the Vite URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Backend Requirements

The frontend expects the API to run on:

```text
https://notesapplicationwithauthentication.onrender.com
```

Required backend environment variables:

```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

## Netlify Deployment

Use these Netlify settings:

```text
Base directory: client/NotesApp
Build command: npm run build
Publish directory: dist
```

After deploying the Express backend separately, add this Netlify environment variable:

```env
VITE_API_URL=https://your-backend-url
```

Netlify hosts the React frontend only. The Express API must run on a backend host such as Render, Railway, or another Node.js hosting service.

## Search Behavior

The search box on the View Notes page filters the already fetched notes on the client side. It checks both note titles and note descriptions, ignores letter case, and shows the full notes list again when the input is empty or only spaces.

## Available Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

Developed by @bhargavpasupuleti
