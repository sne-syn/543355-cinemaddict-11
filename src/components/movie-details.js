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
    const element = this.getElement();
    const watchlistControl = this.getElement().querySelector(`input[name="watchlist"]`);
    const alreadyWatchedControl = this.getElement().querySelector(`input[name="watched"]`);
    const favoritesControl = this.getElement().querySelector(`input[name="favorite"]`);

    function switchCheckbox(input) {
      if (input.checked) {
        input.checked = false;
      } else {
        input.checked = true;
      }
    }

    element.querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, () => {
      this._isInWatchlist = !this._isInWatchlist;
      console.log(watchlistControl);
      console.log(watchlistControl.checked);
      switchCheckbox(watchlistControl);
      console.log(watchlistControl.checked);
      this.rerender();
    });

    element.querySelector(`.film-details__control-label--watched`).addEventListener(`click`, () => {
      this._isAlreadyWatched = !this._isAlreadyWatched;
      switchCheckbox(alreadyWatchedControl);
      this.rerender();
    });

    element.querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, () => {
      this._isInFavorites = !this._isInFavorites;

      switchCheckbox(favoritesControl);
      this.rerender();
    });
  }
}
