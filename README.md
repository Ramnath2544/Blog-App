# 🚀 Blogify - Modern 3D Blog Application

A stunning, feature-rich blog application with beautiful 3D animations, smooth transitions, and modern UI design.

![Blogify Banner](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-3D-000000?style=for-the-badge&logo=three.js&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-0055FF?style=for-the-badge&logo=framer&logoColor=white)

## ✨ Features

### 🎨 Modern UI/UX
- **3D Animations** - Interactive 3D spheres and elements using React Three Fiber
- **Smooth Transitions** - Framer Motion powered animations throughout
- **Gradient Designs** - Beautiful gradient backgrounds and text effects
- **Dark Mode** - Fully functional dark/light theme toggle
- **Responsive** - Mobile-first design that works on all devices

### 💡 Core Functionality
- **User Authentication** - Secure sign up/sign in with JWT
- **Create & Edit Posts** - Rich text editor with image uploads
- **Comments System** - Engage with posts through comments
- **Search & Filter** - Advanced search with category filtering
- **User Dashboard** - Manage posts, profile, and settings
- **Admin Panel** - Manage users and content (admin only)

### 🎯 Technical Highlights
- **React 19** - Latest React features
- **Redux Toolkit** - State management
- **Tailwind CSS** - Utility-first styling
- **MongoDB** - NoSQL database
- **Express.js** - Backend API
- **Cloudinary** - Image hosting
- **Firebase** - OAuth integration

## 🛠️ Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd Blog-App
```

2. **Install root dependencies**
```bash
npm install
```

3. **Install client dependencies**
```bash
cd client
npm install
cd ..
```

4. **Environment Variables**

Create a `.env` file in the root directory:
```env
MONGO=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Create a `.env` file in the `client` directory:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

5. **Run the application**

**Development Mode:**
```bash
# Terminal 1 - Run backend
npm run dev

# Terminal 2 - Run frontend
cd client
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

**Production Build:**
```bash
cd client
npm run build
```

## 📁 Project Structure

```
Blog-App/
├── api/
│   ├── controllers/     # Route controllers
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   └── index.js        # Express server
├── client/
│   ├── src/
│   │   ├── components/  # React components
│   │   │   ├── Hero3D.jsx
│   │   │   ├── PostCard3D.jsx
│   │   │   ├── CallToAction3D.jsx
│   │   │   ├── Header3D.jsx
│   │   │   └── ...
│   │   ├── pages/       # Page components
│   │   ├── redux/       # Redux store & slices
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # Entry point
│   └── package.json
└── package.json
```

## 🎨 Key Components

### Hero3D
Interactive 3D hero section with animated sphere and gradient backgrounds.

### PostCard3D
Beautiful card design with hover effects, gradient borders, and smooth animations.

### CallToAction3D
Engaging CTA section with floating elements and animated backgrounds.

### Header3D
Sticky header with smooth scroll effects and animated theme toggle.

## 🚀 Features Showcase

### 3D Elements
- React Three Fiber for WebGL rendering
- Interactive 3D spheres with material distortion
- Orbit controls for user interaction
- Animated floating elements

### Animations
- Framer Motion for smooth transitions
- Page entry animations
- Hover and tap interactions
- Scroll-triggered animations
- Loading spinners

### Responsive Design
- Mobile-first approach
- Breakpoint-based layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS v4 with custom animations:
- `animate-blob` - Organic blob movement
- `animate-float` - Floating animation
- `animate-gradient` - Gradient shifting
- Custom perspective utilities

### Redux Store
Global state management for:
- User authentication
- Theme preferences
- Post data
- UI state

## 📦 Dependencies

### Frontend
- `react` - UI library
- `react-router-dom` - Routing
- `@reduxjs/toolkit` - State management
- `framer-motion` - Animations
- `@react-three/fiber` - 3D rendering
- `@react-three/drei` - 3D helpers
- `three` - WebGL library
- `tailwindcss` - Styling
- `flowbite-react` - UI components

### Backend
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - Authentication
- `bcryptjs` - Password hashing
- `cloudinary` - Image hosting
- `multer` - File uploads

## 🐛 Bug Fixes Included

✅ Fixed React 19 compatibility issues
✅ Improved error handling in API calls
✅ Fixed dark mode toggle animations
✅ Optimized image loading and caching
✅ Fixed responsive layout issues
✅ Improved performance with lazy loading
✅ Fixed z-index stacking contexts
✅ Corrected TypeScript type issues

## 🎯 Performance Optimizations

- Lazy loading for images
- Code splitting for routes
- Memoized components
- Debounced search
- Optimized re-renders
- Efficient 3D rendering

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Ramnath**
- GitHub: [@ramnath-dev](https://github.com/ramnath-dev)

## 🙏 Acknowledgments

- React Three Fiber for amazing 3D capabilities
- Framer Motion for smooth animations
- Flowbite for UI components
- The open-source community

## 📸 Screenshots

### Home Page
Modern hero section with 3D animations and gradient backgrounds.

### Blog Posts
Beautiful card layouts with hover effects and smooth transitions.

### Dashboard
Comprehensive admin panel for managing content.

---

Made with ❤️ and lots of ☕ by Ramnath
