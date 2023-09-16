import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage.js";
import MovieDetailsPage from "./pages/MovieDetailsPage.js";
import MovieSearchPage from "./components/MovieSearchPage.js";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="search" element={<MovieSearchPage />} />
        <Route path="/movies/:id" element={<MovieDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
