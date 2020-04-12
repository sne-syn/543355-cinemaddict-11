const isActive = (control) =>  control ? `active` : ``;

const createControls = (movie) => {
  const {isInWatchlist, isAlreadyWatched, isInFavorites} = movie;

  return `
  <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist film-card__controls-item--${isActive(isInWatchlist)}">Add to watchlist</button>
  <button class="film-card__controls-item button film-card__controls-item--mark-as-watched  film-card__controls-item--${isActive(isAlreadyWatched)}">Mark as watched</button>
  <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--${isActive(isInFavorites)}">Mark as favorite</button>
  `;
};

const createFilmCardTemplate = (movie) => {
  const {poster, title, rating, year, runtime, genre, description, comments} = movie;
  const controls = createControls(movie);

  return `
  <article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${runtime}</span>
      <span class="film-card__genre">${genre[0]}</span>
    </p>
    <img src="./images/posters/${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${comments}  comments</a>
    <form class="film-card__controls">${controls}</form>
  </article>
  `;
};

export {createFilmCardTemplate};
