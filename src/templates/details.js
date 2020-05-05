import {capitalizeChar, getHoursMinutesRuntimeString} from './../utils/common.js';
import {MONTH_NAMES} from './../const.js';

// create genres template
const createMovieGenres = (movie) => {
  const {genre} = movie;
  let genreString = ``;
  genre.forEach((item) => {
    genreString += `<span class="film-details__genre">${capitalizeChar(item)}</span>`;
  });
  return genreString;
};

// format date dd month yyyy
const formatReleaseDate = (date) => {
  const formatedDate = `${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
  return formatedDate;
};

const createMovieDetailsTable = (movie) => {
  const {director, writers, actors, date, runtime, country} = movie;
  const releaseDate = formatReleaseDate(date);
  const genre = createMovieGenres(movie);
  const convertedRuntime = getHoursMinutesRuntimeString(runtime);
  // change lable for multiple genres
  let isMultiple = ([...movie.genre].length > 1) ? `Genres` : `Genre`;

  return `
        <tr class="film-details__row">
          <td class="film-details__term">Director</td>
          <td class="film-details__cell">${director}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Writers</td>
          <td class="film-details__cell">${writers}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Actors</td>
          <td class="film-details__cell">${actors}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Release Date</td>
          <td class="film-details__cell">${releaseDate}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Runtime</td>
          <td class="film-details__cell">${convertedRuntime}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Country</td>
          <td class="film-details__cell">${country}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">${isMultiple}</td>
          <td class="film-details__cell">
          ${genre}</td>
        </tr>
  `;
};

const createControls = (movie) => {
  const {isInWatchlist, isAlreadyWatched, isInFavorites} = movie;
  // mark input as checked
  const isChecked = (control) => control ? `checked` : ``;

  return `
  <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isChecked(isInWatchlist)}>
  <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist ">Add to watchlist</label>

  <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isChecked(isAlreadyWatched)}>
  <label for="watched" class="film-details__control-label film-details__control-label--watched  film-details__control-input:">Already watched</label>

  <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isChecked(isInFavorites)}>
  <label for="favorite" class="film-details__control-label film-details__control-label--favorite  film-details__control-input:">Add to favorites</label>
  `;
};

export const createDetailsTemplate = (movie) => {
  const {poster, title, rating, original, description, age} = movie;
  const controls = createControls(movie);
  const detailsTable = createMovieDetailsTable(movie);

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
  <div class="form-details__top-container">
    <div class="film-details__close">
      <button class="film-details__close-btn" type="button">close</button>
    </div>
    <div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">
        <p class="film-details__age">${age}+</p>
      </div>

      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${title}</h3>
            <p class="film-details__title-original">Original: ${original}</p>
          </div>

          <div class="film-details__rating">
            <p class="film-details__total-rating">${rating}</p>
          </div>
        </div>

        <table class="film-details__table">${detailsTable}</table>
        <p class="film-details__film-description">${description}.</p>
      </div>
    </div>
    <section class="film-details__controls">${controls}</section>
    </div>

  </form>
  <div class="form-details__bottom-container"></div>
  </section>`;
};
