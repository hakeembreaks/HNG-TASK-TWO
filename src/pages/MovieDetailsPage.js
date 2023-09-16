import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function MovieDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState(null);
  const apiKey = "93a36219e3d2f9ae9e33b00e6773764b"; // Replace with your TMDB API key

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }

        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        // Handle the error here (e.g., display an error message)
      }
    }

    fetchMovieDetails();
  }, [id, apiKey]);

  if (!movieDetails) {
    return <div data-testid="loading">Loading...</div>;
  }

  return (
    <div className="movie-details-page">
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          navigate("/");
        }}
      >
        Click to Go Back to Homepage
      </Button>
      <h1 data-testid="movie-title">{movieDetails.title}</h1>
      <p data-testid="movie-release-date">
        Release Date: {movieDetails.release_date}
      </p>
      <p data-testid="movie-runtime">Runtime: {movieDetails.runtime} minutes</p>
      <p data-testid="movie-overview">{movieDetails.overview}</p>
    </div>
  );
}

export default MovieDetailsPage;
