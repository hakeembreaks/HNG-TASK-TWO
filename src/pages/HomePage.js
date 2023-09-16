import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import HeaderImage from "../assets/Header.png";
import TitleImage from "../assets/Title.png";
import FooterImage from "../assets/Footer.png";

import { Grid, Box, Button } from "@mui/material";

function HomePage() {
  const [topMovies, setTopMovies] = useState([]);
  const apiKey = "93a36219e3d2f9ae9e33b00e6773764b"; // Replace with your TMDB API key

  useEffect(() => {
    async function fetchTopMovies() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch top movies");
        }

        const data = await response.json();
        setTopMovies(data.results);
      } catch (error) {
        console.error("Error fetching top movies:", error);
        // Handle the error here (e.g., display an error message)
      }
    }

    fetchTopMovies();
  }, [apiKey]);

  // Limit topMovies to the first 10 movies
  const top10Movies = topMovies.slice(0, 10);

  return (
    <div className="home-page">
      <img
        src={HeaderImage}
        alt="Header"
        style={{ width: "100%" }}
        className="header-image"
      />
      <Box display="flex" flexDirection="column" alignItems="center">
        <Link to="search">
          <Button variant="contained" color="primary" className="search-button">
            CLICK THIS BUTTON TO SEARCH FOR MOVIES
          </Button>
        </Link>
        <img
          src={TitleImage}
          style={{ padding: "25px" }}
          alt="Title"
          className="title-image"
        />
        <Grid container spacing={2} sx={{ gridGap: "50px 0" }}>
          {top10Movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <Link
                to={`/movies/${movie.id}`}
                style={{ textDecoration: "none" }}
              >
                <MovieCard movie={movie} />{" "}
                {/* Render the MovieCard component */}
              </Link>
            </Grid>
          ))}
        </Grid>
        <img
          src={FooterImage}
          style={{ marginTop: "95px", height: "120px" }}
          alt="Footer"
          className="Footer-image"
        />
      </Box>
    </div>
  );
}

export default HomePage;
