import React from "react";
import { Card, CardMedia } from "@mui/material";

function MovieCard({ movie }) {
  return (
    <Card
      sx={{
        maxWidth: "185px",
        width: "230px",
        height: "410px",
        marginLeft: "70px",
        marginRight: "70px",
      }}
    >
      <CardMedia sx={{ width: "100%" }} component="img" />
      <div className="movie-card" data-testid="movie-card">
        <img
          src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
          alt={movie.title}
          data-testid="movie-poster"
        />
        <div className="movie-info">
          <h2 data-testid="movie-title">{movie.title}</h2>
          <p data-testid="movie-release-date">
            Release Date: {movie.release_date}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default MovieCard;
