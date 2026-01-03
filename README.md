# 🎨 Creative Showcase

A responsive full-stack web application where artists can upload and showcase
their digital memories or artwork.

## 🚀 Features
- User authentication (Signup / Login)
- Private dashboard for artists
- Image upload using Cloudinary
- Public artist profiles
- Responsive masonry image layout

## 🛠 Tech Stack
- Frontend: React (Vite)
- Backend: Node.js, Express
- Database: MongoDB
- Image Storage: Cloudinary

## 📂 Project Structure
creative-showcase/
├── client (React frontend)
└── server (Node + Express backend)


## ⚙️ Installation & Execution

### Backend
```bash
cd server
npm install
npm run dev

Create a .env file in server/:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_key
CLOUD_API_SECRET=your_secret
