import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark, faSpinner } from "@fortawesome/free-solid-svg-icons"

export default function MovieDetails( {moviesDetails, setShowDetails, detailsRef} ) {

  function removeDetails() {
    setShowDetails(false)
  }

  return (
    <section className="movie-details" ref={detailsRef}>
      <div className="poster">
        {moviesDetails.Poster ?
          <img src={moviesDetails.Poster} alt={moviesDetails.Title} /> :
          <FontAwesomeIcon
            icon={faSpinner} spin
            style={{fontSize: "40px"}}
          />
        }
      </div>
      <ul style={ { fontStyle: "normal !important" }} className="details">
        <li><span>{moviesDetails.Type}:</span> {moviesDetails.Title}</li>
        <li><span>Year:</span> {moviesDetails.Year}</li>
        <li><span>Language:</span> {moviesDetails.Language}</li>
        <li><span>Released:</span> {moviesDetails.Released}</li>
        <li><span>Rated:</span> {moviesDetails.Rated}</li>
        <li><span>Genre:</span> {moviesDetails.Genre}</li>
        <li><span>Country:</span> {moviesDetails.Country}</li>
        <li><span>Director:</span> {moviesDetails.Director}</li>
        <li><span>Writer:</span> {moviesDetails.Writer}</li>
        <li><span>Actors:</span> {moviesDetails.Actors}</li>
        <li><span>Plot:</span> {moviesDetails.Plot}</li>
      </ul>
      <FontAwesomeIcon
        className="remove-details-card"
        icon={faXmark}
        onClick={removeDetails}
      />
    </section>
  )
}