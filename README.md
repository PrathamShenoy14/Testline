# Quiz

**Project Description**  
A gamified quiz app for Testline.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Run the App](#run-the-app)
- [Project Structure](#project-structure)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Recommended version: 16.x or higher)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

### Optional (For Windows Users):
If you are running the app on Windows, you might also want to install [Git Bash](https://git-scm.com/) for a better command-line experience.

---

## Backend Setup

The backend is built using Node.js, Express, and MongoDB.

1. **Navigate to the backend directory**:

   ```bash
   cd quiz-backend
   ```

2. **Install backend dependencies**:

   Install the necessary packages using npm:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the `backend` folder and add the following environment variables (or adjust them according to your setup):

   ```
   PORT=8000
   MONGO_URI=mongodb://localhost:27017/your-database-name
   JWT_SECRET="your-secret"
   ```

   - `PORT`: The port where the backend server will run.
   - `MONGO_URI`: The URI for your MongoDB instance (local or remote).

4. **Run the backend server**:

   Start the backend server by running:

   ```bash
   npm run start
   ```

   The backend will be available at [http://localhost:8000](http://localhost:8000).

---

## Frontend Setup

The frontend is built using React.

1. **Navigate to the frontend directory**:

   ```bash
   cd quiz-frontend
   ```

2. **Install frontend dependencies**:

   Install the necessary packages using npm:

   ```bash
   npm install
   ```

3. **Run the frontend application**:

   Start the React development server by running:

   ```bash
   npm run dev
   ```

   The frontend will be available at [http://localhost:5173](http://localhost:5173).

---

## Run the App

1. Make sure the backend and frontend are both running by following the steps above.
2. Open your browser and go to [http://localhost:5173](http://localhost:5173) to interact with the app.
3. If everything is set up correctly, the frontend will be connected to the backend, and you'll be able to use the app.

---

## Project Structure

Here's an overview of the project structure:

```
/your-repo-name
│
├── /quiz-backend              # Backend code
│   ├── /models           # MongoDB models
│   ├── /routes           # API routes
│   ├── index.js         # Main server file
│   ├── .env              # Environment variables
│
├── /frontend             # Frontend code (React)
│   ├── /public           # Static assets (images, etc.)
│   ├── /src              # React components and logic
│   ├── /App.jsx           # Main app file
│   ├── /main.jsx         # Entry point for React
│
├── README.md             # This file
└── .gitignore            # Git ignore file
```

---

## Troubleshooting

- **Backend not starting**: Ensure that your MongoDB instance is running and the `DB_URI` in the `.env` file is correct.
- **Frontend not loading**: Make sure the frontend is running on [http://localhost:5173](http://localhost:5173) and the backend is reachable from it.
- **Port conflicts**: If you encounter a port conflict (e.g., another service running on the same port), you can change the ports in the `.env` files of both the frontend and backend.

---

## License

Specify your project license here if applicable (e.g., MIT, GPL-3.0, etc.).

---

**Enjoy using the app!**
```

### Instructions:
1. Replace `your-repo-name` with the name of your repository.
2. Adjust any project-specific details where necessary (like the database URI or port numbers).
3. Add or change any instructions for additional steps you might have specific to your project.

This `README.md` will provide all the necessary instructions to run both the backend and frontend parts of your application. Let me know if you need further modifications!
