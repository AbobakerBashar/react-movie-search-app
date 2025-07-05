export default function MovieCard(probs) {
  return (
    <div className="movie-card">
      <div className="poster">
        <img src={probs.poster} alt={`Poster for ${probs.type}`} />
      </div>
      <div className="movie-info">
        <p className="title">{probs.title}</p>
        <div>
          <span className="related-year">Released: {probs.year}</span>
          <span className="type">Type: {probs.type}</span>
        </div>
        <button
          onClick={() => probs.handleShowDetails(probs.imdbId)}
          className="show-more-btn"
          aria-label={`View details for ${probs.title}`}
        >
          More...
        </button>
      </div>
    </div>
  )
}

