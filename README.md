# 🎬 CineStream — Media Explorer

CineStream is a responsive movie discovery web application built with **React and Vite**. It allows users to search for movies, explore movie collections, view detailed movie information, save favorites, and access official movie trailers.

## 🚀 Features

* 🎬 Movie discovery
* 🔎 Movie search
* ⏱️ Debounced search
* 🎞️ Movie cards
* 📚 Multiple movie categories
* ♾️ Infinite scrolling
* 📖 Movie details page
* ❤️ Favorites collection
* 💾 Persistent favorites
* ▶️ Official trailer search
* ⬅️ Back navigation
* ⏳ Loading states
* ⚠️ Error handling
* 📱 Responsive design
* 🌙 Dark cinematic UI
* ✨ Smooth hover effects

## 🛠️ Tech Stack

* React
* Vite
* JavaScript
* CSS
* React Router
* Axios
* React Icons
* OMDb API

## 📁 Project Structure

```text
cine-stream/
│
├── public/
│
├── src/
│   ├── api/
│   │   └── omdb.js
│   │
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── SearchBar.jsx
│   │   ├── MovieCard.jsx
│   │   ├── MovieRow.jsx
│   │   └── TrailerModal.jsx
│   │
│   ├── context/
│   │   └── FavoritesContext.jsx
│   │
│   ├── hooks/
│   │   └── useDebounce.js
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Favorites.jsx
│   │   └── MovieDetails.jsx
│   │
│   ├── styles/
│   │   ├── App.css
│   │   ├── Home.css
│   │   ├── MovieRow.css
│   │   ├── MovieDetails.css
│   │   ├── Favorites.css
│   │   └── TrailerModal.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
├── Prompt.md
└── README.md
```

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
VITE_OMDB_API_KEY=your_omdb_api_key
VITE_OMDB_BASE_URL=https://www.omdbapi.com/
```

Do **not** upload `.env` to GitHub.

Your `.gitignore` should contain:

```gitignore
node_modules/
dist/
.env
.env.local
.env.*.local
```

## ⚙️ Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Open the project:

```bash
cd cine-stream
```

Install dependencies:

```bash
npm install
```

## ▶️ Run the Application

Start the development server:

```bash
npm run dev
```

Then open the local URL displayed by Vite.

## 🏗️ Production Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 🎯 Movie Categories

CineStream currently provides categories such as:

* Trending Now
* Marvel Universe
* Avengers Collection
* Batman Collection
* Spider-Verse
* Star Wars
* Wizarding World
* Disney Classics

## 🔎 Search

The search system uses debouncing to reduce unnecessary API requests.

Users can:

1. Enter a movie title.
2. Wait for the search to trigger.
3. View matching movies.
4. Open a movie's details page.

## ❤️ Favorites

Users can add movies to their favorites collection.

The Favorites page provides:

* Saved movie count
* Saved movies
* Remove favorite functionality
* Empty collection state
* Browse movies button

Favorites are persisted using browser storage.

## 📖 Movie Details

The details page displays:

* Poster
* Title
* IMDb rating
* Release year
* Runtime
* Certification
* Plot
* Genre
* Director
* Actors
* Release date
* Language
* Awards

## ▶️ Trailer

CineStream provides an **Official Trailer** option.

When a direct trailer video ID is unavailable through the available movie API, the application opens an official YouTube trailer search for the selected movie.

## 📱 Responsive Design

The application is optimized for:

* Desktop
* Laptop
* Tablet
* Mobile

The UI includes responsive:

* Movie cards
* Movie rows
* Navigation
* Search
* Movie details
* Favorites
* Buttons
* Spacing

## 🎨 UI Design

CineStream uses a dark cinematic interface inspired by modern streaming platforms.

The design focuses on:

* Clean spacing
* Strong visual hierarchy
* Consistent typography
* Tight controls
* Smooth transitions
* Responsive layouts
* Minimal red accent styling

## 🚀 Future Improvements

Possible future improvements include:

* User authentication
* Genre filtering
* Advanced sorting
* Rating filters
* Watchlist
* Personalized recommendations
* Backend API proxy
* Secure server-side API requests
* Direct trailer video integration
* Skeleton loading
* PWA support

## 👩‍💻 Author

**Sakshi Gupta**

## 📄 License

This project was created for learning, development, and portfolio purposes.
