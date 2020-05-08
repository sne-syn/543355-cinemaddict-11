import {
  createDetailsTemplate
} from '../templates/details.js';
import AbstractSmartComponent from "./abstract-smart-component.js";
import CommentsController from "./../controller/comments-controller";

export default class MovieDetails extends AbstractSmartComponent {
  constructor(movie) {
    super();
    this._movie = movie;
    this._closeDetailsHandler = null;
    this._isInWatchlist = movie.isInWatchlist;
    this._isAlreadyWatched = movie.isAlreadyWatched;
    this._isInFavorites = movie.isInFavorites;
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createDetailsTemplate(Object.assign({}, this._movie, {
      isInWatchlist: this._isInWatchlist,
      isAlreadyWatched: this._isAlreadyWatched,
      isInFavorites: this._isInFavorites
    }));
  }

  recoveryListeners() {
    this.setCloseButtonClickHandler(this._closeDetailsHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
    const detailsBottomContainer = document.querySelector(`.form-details__bottom-container`);
    const commentsController = new CommentsController(detailsBottomContainer);
    commentsController.render(this._movie);
  }

  setCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
    this._closeDetailsHandler = handler;
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    const watchlistControl = element.querySelector(`input[name="watchlist"]`);
    const alreadyWatchedControl = element.querySelector(`input[name="watched"]`);
    const favoritesControl = element.querySelector(`input[name="favorite"]`);

    element.querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, () => {
      this._isInWatchlist = !this._isInWatchlist;
      watchlistControl.checked = !watchlistControl.checked;
      this.rerender();
    });

    element.querySelector(`.film-details__control-label--watched`).addEventListener(`click`, () => {
      this._isAlreadyWatched = !this._isAlreadyWatched;
      alreadyWatchedControl.checked = !alreadyWatchedControl.checked;
      this.rerender();
    });

    element.querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, () => {
      this._isInFavorites = !this._isInFavorites;
      favoritesControl.checked = !favoritesControl.checked;
      this.rerender();
    });
  }
}
