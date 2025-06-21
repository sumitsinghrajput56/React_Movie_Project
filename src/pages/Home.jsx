import { useState } from "react";
import MovieCard from "../components/MovieCard";

function Home() {
    const [searchQuery,setSearchQuery]=useState("");
  const movies = [
    { id: 1, title: "Ashiqui 2", release_date: 2020 },
    { id: 2, title: "BlockBluster", release_date: 2021 },
    { id: 3, title: "Karan Arjun", release_date: 2022 },
  ];

  const handleSearch=(e)=>{
    e.preventDefault();
    setSearchQuery("");

  }
  return (
    <>
      <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input type="text" placeholder="search for movies..." className="search-input" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>
            <button type="submit" className="search-button">search</button>
        </form>
        <div className="movies-grid">
          {movies.map((movie) =>( 
            movie.title.toLowerCase().startsWith(searchQuery) &&
            <MovieCard movie={movie} key={movie.id} />
            ))}
        </div>
      </div>
    </>
  );
}

export default Home
