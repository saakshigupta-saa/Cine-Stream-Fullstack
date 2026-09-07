# 🎬 Cine-Stream Fullstack

A full-stack movie discovery platform that combines a modern React/Vite frontend with a Node.js REST API for creating and displaying posts.

## ✨ Features

### 🎥 Movie Explorer

* Browse movies by categories
* Search movies using keywords
* View movie details
* Explore movie collections
* Infinite scrolling for movie discovery
* Movie posters and trailers

### 🤖 Mood Matcher

* Find movies based on your mood
* Interactive movie recommendation experience

### ❤️ Favorites

* Save favorite movies
* Manage favorites from a dedicated page

### 📝 Data Hub Integration

* Fetch posts from a local Node.js REST API
* Display posts from the backend
* Create new posts directly from the Cine-Stream interface
* Loading states while fetching data
* Error handling for failed API requests

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* REST API
* CORS

### APIs

* OMDb API
* Data Hub REST API

## 📁 Project Structure

```text
Cine-Stream-Fullstack/
│
├── public/
│
├── src/
│   ├── api/
│   │   ├── omdb.js
│   │   ├── watchmode.js
│   │   └── dataHub.js
│   │
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Loader.jsx
│   │   ├── MoodMatcher.jsx
│   │   ├── MovieCard.jsx
│   │   ├── MovieGrid.jsx
│   │   ├── MovieRow.jsx
│   │   ├── SearchBar.jsx
│   │   └── TrailerModal.jsx
│   │
│   ├── context/
│   │   └── FavoritesContext.jsx
│   │
│   ├── hooks/
│   │   └── useDebounce.js
│   │
│   ├── pages/
│   │   ├── Favorites.jsx
│   │   ├── Home.jsx
│   │   └── MovieDetails.jsx
│   │
│   └── styles/
│
├── .env
├── .gitignore
├── package.json
├── README.md
└── vite.config.js
```

## 🔌 Data Hub API Integration

Cine-Stream communicates with the Data Hub REST API to manage posts.

### Get Posts

```http
GET /posts
```

### Create Post

```http
POST /posts
```

Example request:

```json
{
  "title": "My First Post",
  "content": "I love watching movies!"
}
```

The frontend automatically updates the posts list after successfully creating a post.

## ⚙️ Environment Variables

Create a `.env` file in the frontend project:

```env
VITE_OMDB_BASE_URL=your_omdb_base_url
VITE_OMDB_API_KEY=your_omdb_api_key
VITE_DATA_HUB_BASE_URL=http://localhost:5000
```

> Never commit real API keys or secrets to GitHub.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/saakshigupta-saa/Cine-Stream-Fullstack.git
```

### 2. Open the project

```bash
cd Cine-Stream-Fullstack
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create `.env` and add the required API configuration.

### 5. Start the frontend

```bash
npm run dev
```

The Vite development server will start locally.

## 🔗 Related Project

### Data Hub API

The backend REST API used by Cine-Stream provides the post management functionality.

GitHub: https://github.com/saakshigupta-saa/Data-Hub-Mongodb

## 🎯 Project Goal

The goal of this project is to demonstrate **full-stack system integration** by connecting a React/Vite SPA with a Node.js REST API and MongoDB-backed data.

## 👩‍💻 Author

**Sakshi Gupta**

BSc Computer Science & Data Analytics
IIT Patna

GitHub: https://github.com/saakshigupta-saa
