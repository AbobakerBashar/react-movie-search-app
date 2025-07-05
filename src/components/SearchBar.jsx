import axios from "axios"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons'

export default function SearchBar({setMovies}) {

  const [isLoading, setIsLoading] = useState(false)
  const [showMessage, setShowMessage] = useState({
    errorType: "",
    isShown: false
  })

  const getMovie = async query => {
    if (!query || isLoading) return;

    try {
      setIsLoading(true)
      const API_KEY=import.meta.env.VITE_MOVIE_APIKEY
      const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
      const data = await response.data.Search
      // set movie data
      const movies = data.map(movie => (
        {
          title: movie.Title,
          poster: movie.Poster,
          type: movie.Type,
          year: movie.Year,
          imdbId: movie.imdbID
        }
      ))
      setMovies(movies)
    } catch (error) {
      const errorType = error.message
      setShowMessage({
        errorType,
        isShown: true
      })
      setTimeout(() => {
        setShowMessage({
          errorType: "",
          isShown: false
        })
      }, 4000)
    } finally {
      setIsLoading(false)
    }
  }
  
  useEffect(() => {
    getMovie("title")
  }, [])
  
  function searchMovie(formData) {
    const query  = formData.get("movie").trim()
    getMovie(query)
  }

  function removeMessage() {
    setShowMessage({
      errorType: "",
      isShown: false
    })
  }
  return (
    <div className="serch-form">
      <form action={searchMovie}>
        <input type="text"
          name="movie"
          placeholder="Search for your movie"
          aria-label="Search for your movie"
        />
        <button
          disabled ={isLoading}
        >
          {isLoading ?
            <FontAwesomeIcon icon={faSpinner} spin />
          : <FontAwesomeIcon icon={faSearch} />
          }
        </button>
      </form>
      {showMessage.isShown && <div className="message">
        <FontAwesomeIcon icon={faXmark}
          className="icon"
          onClick={removeMessage}
        />
        <p className="message">
          {showMessage.errorType === "Network Error" ?
            <span>Please! Check yoyr network connection.</span>
            :<span>Sorry! This movie not found.</span>
          }
        </p>
      </div>}
    </div>
  )
}