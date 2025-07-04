import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import { searchMovies, getPopularMovies } from "../services/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        setError("failed to load movies...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if(!searchQuery.trim()) return

    if(loading) return 

    setLoading(true)
    try{
        const searchResult= await searchMovies(searchQuery);
        setMovies(searchResult)
        setError(null)

    }
    catch(err)
    {
        setError("Failed to search Movies...");
    }
    finally
    {
        setLoading(false);
    }
    setSearchQuery("");
  };
  return (
    <>
      <div className="home">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="search for movies..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            search
          </button>
        </form>
        {error && <div className="error-message">{error}</div>}
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="movies-grid">
            {movies.map(
              (movie) =>
                movie.title.toLowerCase().startsWith(searchQuery) && (
                  <MovieCard movie={movie} key={movie.id} />
                )
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
