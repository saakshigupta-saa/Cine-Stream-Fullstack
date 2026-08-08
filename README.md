# 🎬 CineStream — Media Explorer

> A modern, responsive movie discovery platform built with React and Vite, powered by the OMDb API.

CineStream is a frontend movie discovery application designed to provide a smooth, cinematic browsing experience. Users can explore curated movie collections, search for movies, view detailed information, save favorites, and find official trailers.

---

## ✨ Overview

CineStream combines a clean streaming-platform-inspired interface with real-time movie data from the **OMDb API**.

The project focuses on:

* Clean component architecture
* Responsive UI design
* Reusable React components
* API integration
* Client-side routing
* Search optimization
* Persistent favorites
* Loading and error handling
* Production-ready frontend structure

---

## 🚀 Features

### 🎥 Movie Discovery

* Curated movie categories
* Trending-style movie sections
* Horizontal movie sliders
* Interactive movie cards
* Infinite scrolling

### 🔎 Smart Search

* Real-time movie search
* Debounced search input
* Search loading state
* Empty search state
* API error handling

### 📖 Movie Details

Each movie has a dedicated details page containing:

* Movie poster
* Movie title
* IMDb rating
* Release year
* Runtime
* Certification
* Plot
* Genre
* Director
* Cast
* Release date
* Language
* Awards

### ❤️ Favorites

Users can:

* Add movies to favorites
* Remove movies from favorites
* View saved movies
* See total favorites count
* Access an empty-state experience
* Persist favorites using browser storage

### ▶️ Official Trailers

The application provides an **Official Trailer** option that searches YouTube for the selected movie's official trailer.

### 📱 Responsive Design

CineStream is designed for:

* Desktop
* Laptop
* Tablet
* Mobile

---

## 🛠️ Tech Stack

| Technology   | Purpose                     |
| ------------ | --------------------------- |
| React        | UI development              |
| Vite         | Development & build tooling |
| JavaScript   | Application logic           |
| CSS          | Styling & responsive design |
| React Router | Client-side routing         |
| Axios        | API requests                |
| React Icons  | Interface icons             |
| OMDb API     | Movie data                  |

---

## 🏗️ Project Architecture

```text
cine-stream/
│
├── public/
│
├── src/
│   │
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
├── .env
├── .gitignore
├── index.html
├── package.json
├── Prompt.md
└── README.md
```

## 🔐 Environment Configuration

Create a `.env` file in the project root:

```env
VITE_OMDB_API_KEY=your_api_key
VITE_OMDB_BASE_URL=https://www.omdbapi.com/
```

### Important

Never commit your `.env` file to GitHub.

Your `.gitignore` should include:

```gitignore
node_modules/
dist/
.env
.env.local
.env.*.local
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/saakshigupta-saa/Cine-Stream.git
```

### 2. Navigate to the project

```bash
cd cine-stream
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create `.env` and add your OMDb API credentials.

### 5. Start the development server

```bash
npm run dev
```

The application will be available at the local URL provided by Vite.

---

## 🏗️ Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🎨 Design System

CineStream follows a dark cinematic design language inspired by modern streaming services.

### UI Principles

* Strong visual hierarchy
* Consistent spacing
* Compact controls
* Responsive layouts
* Smooth transitions
* Interactive hover states
* Accessible contrast
* Minimal visual clutter

---

## 🧠 Key Implementation Concepts

### Debounced Search

Search requests are delayed until the user pauses typing to reduce unnecessary API calls.

### Infinite Scrolling

Additional movie results are loaded when the user approaches the bottom of the page.

### Context API

Favorites are managed globally using React Context.

### Local Storage

Favorite movies persist between browser sessions.

### Dynamic Routing

Movie details are accessed using the movie's IMDb ID:

```text
/movie/:imdbID
```

---

## 📸 Screenshots

Add screenshots of the application here after deployment.

### Home

```text
<img width="1913" height="983" alt="Screenshot 2026-08-08 193202" src="https://github.com/user-attachments/assets/d5bfb74d-9c3e-458e-a3be-167e6e8a97e5" />



```

### Movie Details

```text
<img width="1917" height="988" alt="Screenshot 2026-08-08 195247" src="https://github.com/user-attachments/assets/2ef439c8-765a-45b7-9cb9-5eb268fc9b18" />


```

### Favorites

```text
<img width="1917" height="987" alt="Screenshot 2026-08-08 195205" src="https://github.com/user-attachments/assets/075829b8-750b-42cc-8682-1f881eabcaca" />


```



## 🚀 Deployment

https://cine-stream-steel-sigma.vercel.app/
---

## 👩‍💻 Author

### Sakshi Gupta

---

## 📄 License

This project was developed for educational, portfolio, and learning purposes.

---


### 🎬 CineStream

**Discover. Explore. Save. Watch.**
