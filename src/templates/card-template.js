const addEllipsisToString = (str) => {
  let sliced = str.slice(0, 140);
  sliced += (sliced.length < str.length) ? `...` : `.`;
  return sliced;
};

const createControls = (movie) => {
  const {
    isInWatchlist,
    isAlreadyWatched,
    isInFavorites
  } = movie;
  const isActive = (control) => control ? `active` : ``;
  return `
  <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist film-card__controls-item--${isActive(isInWatchlist)}">Add to watchlist</button>
  <button class="film-card__controls-item button film-card__controls-item--mark-as-watched  film-card__controls-item--${isActive(isAlreadyWatched)}">Mark as watched</button>
  <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--${isActive(isInFavorites)}">Mark as favorite</button>
  `;
};

export const createMovieCardTemplate = (movie) => {
  const {
    poster,
    title,
    rating,
    date,
    runtime,
    genre,
    description,
    comments
  } = movie;
  const controls = createControls(movie);
  const ellipsisDescription = addEllipsisToString(description);
  const releaseYear = date.getFullYear();
  const firstGenre = genre[0];

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${releaseYear}</span>
      <span class="film-card__duration">${runtime}</span>
      <span class="film-card__genre">${firstGenre}</span>
    </p>
    <img src="./images/posters/${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${ellipsisDescription}</p>
    <a class="film-card__comments">${comments}  comments</a>
    <form class="film-card__controls">${controls}</form>
  </article>`;
};
