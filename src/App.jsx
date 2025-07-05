import SearchBar from "./components/SearchBar"
import MovieCard from "./components/MovieCard"
import MovieDetails from "./components/MovieDetails"
import { useState, useRef, useEffect } from "react"
import "./App.css"
import axios from "axios"

function App() {
  const detailsRef = useRef(null)
  const [movies, setMovies] = useState([])
  const [moviesDetails, setMoviesDetails] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  const getMovieDetails = async imdbId => {
    try {
      const API_KEY = import.meta.env.VITE_MOVIE_APIKEY
      const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbId}`)
      const data = await response.data
      if (response.data.Error)
        throw new Error(response.data.Error)
      setMoviesDetails({
        ...data
      })
    } catch {
      setShowDetails(false)
    }
  }
  function handleShowDetails(imdbId) {
    getMovieDetails(imdbId)
    setShowDetails(true)
  }
  
  useEffect(() => {
    if(showDetails && detailsRef.current)
      detailsRef.current.scrollIntoView({behavior: "smooth"})
  }, [showDetails, moviesDetails])

  const moviesCards = movies.map(movie => (
    <MovieCard
      key={movie.imdbId}
      poster={movie.poster}
      title={movie.title}
      year={movie.year}
      type={movie.type}
      imdbId={movie.imdbId}
      handleShowDetails={handleShowDetails}
    />
  ))

  return (
    <main>
      <SearchBar
        setMovies={setMovies}
      />
      {showDetails && moviesDetails && <MovieDetails
        moviesDetails={moviesDetails}
        setShowDetails={setShowDetails}
        detailsRef={detailsRef}
        showDetails={showDetails}
      />}
      <section className="movies-container">
        {moviesCards}
      </section>
    </main>
  )
}

export default App
