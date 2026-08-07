import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./styles/App.css";

import Header from "./components/Header";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {

  const [searchTerm, setSearchTerm] = useState("");

  return (

    <div className="app">

      <Header />

      <Routes>

        <Route

          path="/"

          element={

            <>
    <Hero />

    <div className="search-wrapper">

        <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
        />

    </div>

    <Home searchTerm={searchTerm} />
</>

          }

        />

        <Route

          path="/favorites"

          element={<Favorites />}

        />

      </Routes>

    </div>

  );

}

export default App;