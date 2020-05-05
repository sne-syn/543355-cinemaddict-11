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
    const element = this.getElement();
    element.querySelector(`.film-details__control-label--watchlist`)
    .addEventListener(`click`, () => {
      this._isInWatchlist = !this._isInWatchlist;
      
      this.rerender();
    });

    element.querySelector(`.film-details__control-label--watched`)
    .addEventListener(`click`, () => {
      this._isAlreadyWatched = !this._isAlreadyWatched;

      this.rerender();
    });

    element.querySelector(`.film-details__control-label--favorite`)
    .addEventListener(`click`, () => {
      this._isInFavorites = !this._isInFavorites;

      this.rerender();
    });
  }
}
