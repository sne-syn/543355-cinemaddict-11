import {createDetailsTemplate} from '../templates/details.js';
import AbstractSmartComponent from "./abstract-smart-component.js";

export default class MovieDetails extends AbstractSmartComponent {
  constructor(movie) {
    super();
    this._movie = movie;
    this.__closeDetailsHandler = null;
    this._isInWatchlist = movie.isInWatchlist;
    this._isAlreadyWatched = movie.isAlreadyWatched;
    this._isInFavorites = movie.isInFavorites;
    this._subscribeOnEvents();
  }

  getTemplate() {
    // console.log(this._movie, {
    //   isInWatchlist: this._isInWatchlist,
    //   isAlreadyWatched: this._isAlreadyWatched,
    //   isInFavorites: this._isInFavorites
    // });

    return createDetailsTemplate(this._movie, {
      isInWatchlist: this._isInWatchlist,
      isAlreadyWatched: this._isAlreadyWatched,
      isInFavorites: this._isInFavorites
    });
  }

  recoveryListeners() {
    this.setCloseButtonClickHandler(this._closeDetailsHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  setCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
    this._closeDetailsHandler = handler;
  }

  _subscribeOnEvents() {
    const watchlistControl = this.getElement().querySelector(`.film-details__control-label--watchlist`);
    const alreadyWatchedControl = this.getElement().querySelector(`.film-details__control-label--watched`);
    const favoritesControl = this.getElement().querySelector(`.film-details__control-label--favorite`);
    const checkbox = this.getElement().querySelector(`.film-details__control-input`);

    watchlistControl.addEventListener(`click`, () => {
      this._isInWatchlist = !this._isInWatchlist;
      //watchlistControl.checkbox.checked = !checkbox.checked;
      this.rerender();
    });

    alreadyWatchedControl.addEventListener(`click`, () => {
      this._isAlreadyWatched = !this._isAlreadyWatched;
      this.rerender();
    });

    favoritesControl.addEventListener(`click`, () => {
      this._isInFavorites = !this._isInFavorites;
      this.rerender();
    });
  }
}
