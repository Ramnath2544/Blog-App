# 📝 Full‑Stack Modern Blog App

A modern, robust **full-stack blog application** built with **React (Frontend)** and a custom **Node.js + Express API (Backend)**. 
Supports **rich text post creation**, comprehensive **user authentication (including OAuth)**, **dark mode**, and an intuitive **admin dashboard** for complete content and user management.

---

**<h2>Table of Contents</h2>**

### •	 <ins>[Features](#-features)</ins>

### •	 <ins>[Documentation](#-documentation)</ins>

### •	 <ins>[Usage](#-usage)</ins>

### •	 <ins>[Tech Stack](#-tech-stack)</ins>

### •	 <ins>[Project Structure](#-project-structure)</ins>

### •	 <ins>[Getting Started](#-getting-started)</ins>

### •	 <ins>[Environment Variables](#-environment-variables)</ins>

### •	 <ins>[Commit History Highlights](#-commit-history-highlights)</ins>

### •	 <ins>[Future Enhancements](#️-future-enhancements)</ins>

### •	 <ins>[Contributing](#-contributing)</ins>

### •	 <ins>[Contact](#-contact)</ins>

---

## ✨ Features

### 🖥️ Frontend (React + Tailwind CSS)
- **Responsive & Modern UI:** Fully styled responsive user interface utilizing **Tailwind CSS**.
- **Dark Mode:** Built-in dark/light mode functionality for an optimal reading and user experience.
- **Global State Management:** Implemented **Redux Toolkit** and **Redux Persist** for seamless state retention across sessions.
- **Interactive Dashboards:** Private, protected dashboards featuring an intuitive sidebar, infinite scrolling ("show more" functionality), and dynamic data rendering.
- **Rich Media & Post UI:** Advanced image upload functionality with visual effects and dedicated landing pages for posts featuring Calls to Action (CTAs).

### ⚙️ Backend & API (Node.js + Express)
- **Robust API Routing:** Dedicated API routes for Authentication, Users, and Posts.
- **Advanced Authentication:** Seamless standard Sign Up / Sign In alongside **OAuth Integration** for quick social logins.
- **Role-Based Access Control:** Secure routes isolating standard users from **Admin** users.
- **Error Handling:** Custom global error-handling functions and middleware to ensure stable API communication. 

### 📦 Database & Models
- Dynamic models created for `User` and `Post` entities.
- Persistent database connections mapping relations between authors and their respective blog entries.
- Image uploads smoothly integrated into both User Profiles (avatars) and Posts (cover images).

### 🛡️ Dashboard & Admin Capabilities
- **Admin Dashboard:** Admins can view all users, oversee all posts, and securely delete users or inappropriate content.
- **User Dashboard:** Standard users can update their profile information, upload a new profile image, create posts, edit posts, and delete their own account/posts.

---

## 📖 Documentation
Here's a list of all the primary API routes derived from the application structure and what each path does.

**Authentication Routes**
- `POST /api/auth/signup` - Creates a new user in the database.
- `POST /api/auth/signin` - Authenticates an existing user and returns a token.
- `POST /api/auth/google` - Handles OAuth login/signup.
- `POST /api/auth/signout` - Clears the user's session/cookies.

**User Routes**
- `GET /api/user/getusers` - (Admin) Retrieves a list of users for the dashboard.
- `PUT /api/user/update/:id` - Updates user profile data and avatar.
- `DELETE /api/user/delete/:id` - Deletes a user account entirely.

**Post Routes**
- `POST /api/post/create` - Creates a new blog post with an image and rich text content.
- `GET /api/post/getposts` - Fetches a paginated list of posts (supports "Show More").
- `PUT /api/post/updatepost/:id` - Updates an existing post's content or image.
- `DELETE /api/post/deletepost/:id` - Removes a post from the database.

---

## 💻 Usage
- **Readers** can browse available blog posts, toggle dark mode, and read complete articles with rich image formatting.
- **Users** can sign up via standard email or OAuth, update their profile picture, write new blog posts, and edit/delete their own articles through their private dashboard.
- **Admins** have elevated dashboard access enabling them to view the entire user base, oversee all platform content, and moderate (delete) posts or users as necessary.

---

## 🚀 Tech Stack

**Frontend:**  
- React.js
- Tailwind CSS (Utility-first styling)
- Redux Toolkit & Redux Persist (State Management)
- React Router (Client-side routing)

**Backend:**  
- Node.js & Express.js (API Routing & Middleware)
- OAuth (Social Authentication)
- MongoDB / SQL (Database)

**Other Tools:**  
- Git / GitHub (Version Control)
- npm (Package management)

---

## 📂 Project Structure

### Overview
This project separates frontend interactive logic (React components and pages) from the backend robust API routes and database models, ensuring high scalability and a clean codebase.

### Example Directory Structure
```text
blog-app/<br>
├── client/                 # React Frontend<br>
│   ├── src/<br>
│   │   ├── components/     # Reusable UI components (Header, Footer, Sidebar)<br>
│   │   ├── pages/          # App routes (SignIn, SignUp, Dashboard, PostPage)<br>
│   │   └── redux/          # Redux slices and store configuration<br>
├── api/                    # Node.js Express Backend<br>
│   ├── controllers/        # Business logic for auth, user, and post routes<br>
│   ├── models/             # Database Schemas (User, Post)<br>
│   ├── routes/             # API Endpoints definition<br>
│   └── utils/              # Middleware (Error handlers, Auth verification)<br>
└── package.json            # Project dependencies and scripts<br>
```

---

## 🔧 Getting Started

### 1. Install dependencies
Run this in both your client and server directories (if separated), or the root directory.
```bash
npm install
```

### 2. Setup Tailwind CSS (if customizing)
```bash
npx tailwindcss -i ./src/input.css -o ./public/output.css --watch
```

### 3. Run the development server
```bash
npm run dev
```
The React client will typically start on `http://localhost:5173` (Vite) or `http://localhost:3000` (CRA), and the API server on another configured port.

---

## 🌐 Environment Variables

Create a `.env` file in your root backend directory to map the following variables:

| Variable    | Description             | Example      |
| ----------- | ----------------------- | ------------ |
| PORT        | Server port             | 5000         |
| DB_URI      | Database Connection URI | mongodb+srv://... |
| JWT_SECRET  | Secret for Auth Tokens  | supersecret123 |
| OAUTH_KEYS  | Client IDs for OAuth    | google-client-id |

---

## 📈 Commit History Highlights
- **Foundation:** Initialized React and Tailwind CSS scaffolding to lay out the core UI concepts.
- **Database & Auth Integration:** Seamlessly integrated database connections, created User models, and established a secure, custom Auth loop alongside OAuth integration.
- **State Management:** Incorporated Redux Toolkit and Redux Persist for flawless client-side data management (theme switching, current user session).
- **Dashboard & User Experience:** Built a protected user dashboard featuring a customizable profile, dark mode toggle, and rich-image uploading functionality.
- **Content Management & Admin Access:** Scaled the application by adding a full CRUD API for blog posts, integrating "Show More" pagination, and finalizing admin-level permissions for ultimate content moderation.

---

## 🛠️ Future Enhancements
- 💬 **Comment Section:** Allow users to comment on posts and interact with authors.
- 🔍 **Search & Filters:** Implement advanced category tagging and search bar functionality for easy post discovery.
- 📊 **Analytics:** Add views and read-time estimators to posts for better author insights.

---

## 🤝 Contributing
Contributions are welcome. Please fork the repository and open a pull request. For major changes, open an issue first to discuss what you would like to change.

---

## 📧 Contact
For support or inquiries, please open an issue or email: [ramnath2544@gmail.com](mailto:ramnath2544@gmail.com).
