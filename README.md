# Real-Time MERN Stack Chat Application

This project is a full-stack, real-time chat application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and powered by Socket.io for instant messaging capabilities. It allows users to register, log in, manage their profiles (including profile pictures), see online users, and engage in private real-time conversations.

---

## ✨ Features

* **User Authentication:** Secure user registration (`Sign up`) and login (`Login Now`) with password hashing (bcryptjs) and JSON Web Tokens (JWT) for session management.
* **Real-Time Messaging:** Instantaneous, bi-directional message exchange between users using Socket.io.
* **Online User Status:** Displays a list of currently online users.
* **Private Conversations:** Users can select another user to initiate a one-on-one chat.
* **Unread Message Tracking:** Keeps track of unread messages from other users, providing visual notifications.
* **Profile Management:**
    * Users can update their full name and a short biography (`bio`).
    * Ability to upload and update a profile picture, with image storage handled by Cloudinary.
* **Persistent Chat History:** All messages are stored in MongoDB, ensuring chat history is preserved.
* **Responsive User Interface:** Built with Tailwind CSS for a modern and adaptive design across different devices.
* **Global State Management:** Utilizes React Context API for efficient and centralized management of authentication and chat-related states.
* **User-Friendly Notifications:** Integrates `react-hot-toast` for toast notifications for success and error messages.

---

## 🛠️ Tech Stack

This application leverages a robust set of technologies for both its frontend and backend:

### Frontend

* **React.js:** A JavaScript library for building dynamic and interactive user interfaces.
* **React Context API:** For managing global state (authentication, chat data) across components.
* **React Router DOM:** For client-side routing within the application (e.g., navigation to `ProfilePage`).
* **Socket.io-client:** The client-side library for establishing and managing real-time WebSocket connections with the server.
* **Axios:** A promise-based HTTP client for making API requests to the backend.
* **Tailwind CSS:** A utility-first CSS framework used for rapid UI development and responsive design.
* **React Hot Toast:** A simple library for displaying highly customizable toast notifications.

### Backend

* **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
* **Express.js:** A fast, unopinionated, minimalist web framework for Node.js, used to build the RESTful API.
* **MongoDB:** A NoSQL document database used for storing application data (users, messages).
* **Mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js, simplifying data interactions.
* **Socket.io:** The server-side library that enables real-time, bidirectional, and event-based communication.
* **JSON Web Token (JWT):** Used for secure, stateless authentication.
* **bcryptjs:** A library to hash passwords, ensuring user credentials are stored securely.
* **Cloudinary:** A cloud-based image and video management service, used for storing user profile pictures.
* **`dotenv`:** For loading environment variables from a `.env` file.
* **`cors`:** A Node.js package for providing a Connect/Express middleware that can be used to enable Cross-Origin Resource Sharing (CORS).

---

## 🚀 Getting Started

Follow these steps to set up and run the application on your local machine.

### Prerequisites

Ensure you have the following installed on your system:

* **Node.js & npm:** Download and install from [nodejs.org](https://nodejs.org/).
* **MongoDB:** Install a local MongoDB instance or set up a cloud-based MongoDB Atlas account.
* **Cloudinary Account:** Sign up for a free account at [cloudinary.com](https://cloudinary.com/) to get your cloud name, API key, and API secret.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Backend Setup:**
    * Navigate into the `backend` directory:
        ```bash
        cd backend
        ```
    * Install backend dependencies:
        ```bash
        npm install
        ```
    * Create a `.env` file in the `backend` directory and add your environment variables. **Replace placeholders with your actual credentials.**
        ```env
        PORT=5000
        MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/chat-app?retryWrites=true&w=majority # Or your local MongoDB URI
        JWT_SECRET=your_very_strong_jwt_secret_key_here
        CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
        CLOUDINARY_API_KEY=your_cloudinary_api_key
        CLOUDINARY_API_SECRET=your_cloudinary_api_secret
        ```
    * Start the backend server:
        ```bash
        npm start
        ```
        The server will start on `http://localhost:5000` (or your specified PORT).

3.  **Frontend Setup:**
    * Navigate into the `frontend` directory (from the project root):
        ```bash
        cd ../frontend # If you're currently in the backend directory
        # Or if you're in the project root: cd frontend
        ```
    * Install frontend dependencies:
        ```bash
        npm install
        ```
    * Create a `.env` file in the `frontend` directory and add the backend URL. Ensure it matches the backend port.
        ```env
        VITE_BACKEND_URL=http://localhost:5000
        ```
    * Start the frontend development server:
        ```bash
        npm run dev
        ```
        The frontend application will typically open in your browser at `http://localhost:5173` (or a similar port).

You should now have the full MERN Stack Chat Application running locally!

---

## 📝 Code Overview

The project is logically separated into `frontend` (React app) and `backend` (Node.js/Express app).

### Frontend Structure

* **`src/context/`**: Contains React Context providers for global state management.
    * `AutoContext.js`: Manages user authentication state, handles login/signup/logout, profile updates, and the main Socket.io connection for tracking online users. It also configures `axios` with the authentication token.
    * `ChatContext.js`: Manages chat-specific state, including messages, user lists, selected conversations, and unseen message counts. It handles fetching messages and subscribing/unsubscribing to real-time message events via Socket.io.
* **`src/pages/`**: Contains the main page components.
    * `LoginPages.jsx`: The entry point for user authentication, providing forms for both "Sign up" and "Login Now".
    * `HomePages.jsx`: The primary chat interface, orchestrating the `Sidebar` (user list), `ChartContainer` (active chat), and `RightSidebar` (user profile/details).
    * `ProfilePage.jsx`: Allows authenticated users to view and update their profile details (full name, bio, and profile picture).
* **`src/assets/`**: Likely contains static assets like `logo_big`, `arrow_icon`, `avatar_icon`, `logo_icon` used in the UI.

### Backend Structure

* **`server.js`**:
    * The main entry point for the Node.js server.
    * Initializes Express app and HTTP server.
    * Sets up the Socket.io server with CORS configuration.
    * Manages online users through `userSocketMap` and emits `get Online users` events.
    * Configures Express middleware for JSON parsing (`express.json`) and CORS.
    * Defines API routes for authentication (`/api/auth`) and messages (`/api/messages`).
    * Connects to MongoDB using `connectDB()`.
* **`models/`**: Defines Mongoose schemas for MongoDB collections.
    * `Message.js`: Schema for chat messages, including `senderId`, `receiverId`, `text`, `image`, and `seen` status.
    * `User.js`: Schema for user accounts, including `email`, `fullName`, `password`, `profilePic`, and `bio`.
* **`middleware/protectRoute.js`**:
    * An Express middleware function that verifies the JWT from incoming requests (`Authorization: Bearer <token>`).
    * If the token is valid, it attaches the authenticated user's details (`req.user`) to the request object, allowing subsequent route handlers to access user information.
    * Protects routes that require authentication.
* **`lib/cloudinary.js`**: Configures the Cloudinary SDK using environment variables for image upload and management.
* **`lib/db.js`**: Contains the `connectDB` function responsible for establishing a connection to the MongoDB database.
* **`lib/generateToken.js`**: A utility function to sign a new JSON Web Token for a given user ID.
* **`routes/`**: (Inferred, based on `server.js` usage) These directories would contain the route definitions for different parts of your API.
    * `userRoutes.js`: Handles user authentication (signup, login) and profile-related actions.
    * `messageRoutes.js`: Handles sending messages, retrieving chat history, and marking messages as seen.

---