# CineStream — Development Prompts

This document records the major development requirements and prompts used while building CineStream Media Explorer.

---

# Phase 1 — Project Foundation

## Objective

Create the initial React/Vite application structure and establish the base UI.

## Requirements

* Set up React with Vite
* Create reusable components
* Create page-based routing
* Establish global CSS
* Create the main application layout
* Build the navigation header
* Build the hero section
* Create the search interface

---

# Phase 2 — OMDb API Integration

## Objective

Connect the application to the OMDb API.

## Requirements

* Store API configuration in environment variables
* Create a reusable Axios API client
* Implement movie search
* Implement movie details
* Handle API errors
* Handle empty search results
* Handle loading states

## Environment Variables

```env
VITE_OMDB_API_KEY=
VITE_OMDB_BASE_URL=https://www.omdbapi.com/
```

## API Functions

```text
searchMovies()
getMovieDetails()
```

---

# Phase 3 — Movie Experience

## Objective

Build the core movie browsing and interaction experience.

## Requirements

* Create movie cards
* Create horizontally scrollable movie rows
* Add category-based movie sections
* Implement search results
* Add debounced search
* Implement movie details page
* Add React Router navigation
* Add favorite functionality
* Add trailer functionality
---

# Phase 4 — Advanced Functionality & UI Polish

## Objective

Complete the core application and improve the overall user experience.

## Requirements

### Search

* Add debounced search
* Prevent unnecessary API requests
* Display search loading state
* Display search empty state
* Display search results

### Movie Discovery

* Implement multiple movie categories
* Implement infinite scrolling
* Prevent unnecessary requests
* Handle empty API responses
* Display loading indicators
* Display end-of-results state

### Movie Details

Create a detailed movie page containing:

* Movie poster
* Movie title
* IMDb rating
* Release year
* Runtime
* Rating
* Plot
* Genre
* Director
* Actors
* Release date
* Language
* Awards

### Favorites

Implement:

* Add to favorites
* Remove from favorites
* Favorite state indicator
* Favorites page
* Favorites count
* Empty favorites state
* Persistent browser storage

### Trailer

Implement an official trailer discovery option.

When an actual trailer video ID is unavailable through the selected API, provide a fallback to the official YouTube trailer search.

---

# Responsive Design

The application must work across:

```text
Desktop
Tablet
Mobile
```

### Mobile requirements

* No horizontal page overflow
* Responsive movie cards
* Responsive movie details
* Full-width action buttons
* Responsive favorites page
* Properly scaled hero content
* Touch-friendly controls

---

# Error Handling

The application should gracefully handle:

* Invalid movie IDs
* Empty searches
* API failures
* Missing posters
* Missing movie information
* Missing trailer information
* Network failures

---

# Production Requirements

Before deployment:

```bash
npm install
npm run build
```


