import {createDetailsTemplate} from '../templates/details.js';
import AbstractSmartComponent from "./abstract-smart-component.js";

export default class MovieDetails extends AbstractSmartComponent {
  constructor(movie) {
    super();

    this._movie = movie;
    this.__closeDetailsHandler = null;
    this._subscribeOnEvents();
  }

  getTemplate() {
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

    watchlistControl.addEventListener(`click`, () => {
      this._isInWatchlist = !this._isInWatchlist;
      watchlistControl.querySelector(`.film-details__control-input`).checked = true;
      this.rerender();
    });

    alreadyWatchedControl.addEventListener(`click`, () => {
      this._isAlreadyWatched = !this._isAlreadyWatched;
      alreadyWatchedControl.querySelector(`.film-details__control-input`).checked = true;
      this.rerender();
    });

    favoritesControl.addEventListener(`click`, () => {
      this._isInFavorites = !this._isInFavorites;
      favoritesControl.querySelector(`.film-details__control-input`).checked = true;
      this.rerender();
    });
  }
}
