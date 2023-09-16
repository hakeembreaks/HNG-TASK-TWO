import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";

function MovieSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const apiKey = "93a36219e3d2f9ae9e33b00e6773764b";

  useEffect(() => {
    async function fetchSearchResults() {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchQuery}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }

        const data = await response.json();
        setSearchResults(data.results);

        if (data.results.length === 0) {
          setError("NO SUCH MOVIE");
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        // Handle the error here (e.g., display an error message)
        setError("An error occurred while fetching results");
      } finally {
        setLoading(false);
      }
    }

    fetchSearchResults();
  }, [searchQuery, apiKey]);

  return (
    <div className="movie-search-page">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate("/");
          }}
        >
          Click to Go Back to Homepage
        </Button>

        <h1>Movie Search</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a movie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {loading && <p>Loading...</p>}
        {error ? (
          <p>{error}</p>
        ) : (
          <div className="movie-grid">
            {searchResults.map((movie) => (
              <Link to={`/movies/${movie.id}`} key={movie.id}>
                <MovieCard movie={movie} />
              </Link>
            ))}
          </div>
        )}
      </Box>
    </div>
  );
}

export default MovieSearchPage;
