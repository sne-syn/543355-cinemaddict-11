import {capitalizeChar, createElement} from '../utils.js';
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
          <td class="film-details__cell">${runtime}</td>
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

const createEmojiList = () => {
  return `
  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
  <label class="film-details__emoji-label" for="emoji-smile">
  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
  </label>

  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
  <label class="film-details__emoji-label" for="emoji-sleeping">
  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
  </label>

  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
  <label class="film-details__emoji-label" for="emoji-puke">
  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
  </label>

  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
  <label class="film-details__emoji-label" for="emoji-angry">
  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
  </label>
  `;
};

const createCommentSection = (movie) => {
  const {comments} = movie;
  const emojiList = createEmojiList();
  return `
  <section class="film-details__comments-wrap">
  <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments}</span></h3>

  <ul class="film-details__comments-list"></ul>

  <div class="film-details__new-comment">
  <div for="add-emoji" class="film-details__add-emoji-label"></div>

  <label class="film-details__comment-label">
    <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
  </label>

  <div class="film-details__emoji-list">${emojiList}</div>
  </div>
  </section>
  `;
};

const createDetailsTemplate = (movie) => {
  const {poster, title, rating, original, description, age} = movie;
  const controls = createControls(movie);
  const comments = createCommentSection(movie);
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
    <div class="form-details__bottom-container">${comments}</div>
  </form>
  </section>`;
};

export default class MovieDetailes {
  constructor(movie) {
    this._movie = movie;
    this._element = null;
  }

  getTemplate() {
    return createDetailsTemplate(this._movie);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}