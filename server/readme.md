# 🛍️ Product Management App

A full-stack **Product Management Application** built using **React (Context API)** for the frontend and **Node.js, Express, MongoDB** for the backend. This app allows users to manage products with full **CRUD operations** and **image uploads** using Cloudinary.

---

## 🚀 Features

- ✅ CRUD functionality (Add, Update, Delete, View Products)
- ☁️ Image upload via Cloudinary
- 🔐 Basic Authentication
- 🗂️ Category & Subcategory management
- 📱 Fully responsive UI
- ⚛️ React Context API for global state management
- 🌐 RESTful APIs built with Express
- 🐬 MongoDB for data storage

---

## 🛠️ Tech Stack

### 🔧 Frontend
- React
- Context API
- React Router DOM
- React Icons
- Axios
- Tailwind CSS

### 🧰 Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Cloudinary
- Multer
- dotenv

---

## 📁 Folder Structure

root/
├── client/ # React Frontend
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ ├── App.js
│ │ └── ...
├── server/ # Node.js Backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── config/
│ ├── uploads/
│ ├── .env
│ └── server.js
├── README.md




---

## 🧪 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Neeraj799/Amazon-app.git
cd Amazon-app

### 2. Clone the repository

Backend

cd server
npm install

Frontend

cd ../client    
npm install

⚙️ Environment Variables

PORT=5000
MONGO_URL=your_mongodb_connection_string
SECRET_KEY=your_secret_key
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

▶️ Running the App

Start Backend Server

cd server
npm run dev


Start Frontend (React)

cd client
npm start

✍️ Author
Neeraj P C
https://github.com/Neeraj799






