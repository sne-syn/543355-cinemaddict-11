import MovieCardComponent from "./../components/movie-card.js";
import MovieDetailsComponent from "./../components/movie-details.js";
import CommentsController from "./comments-controller.js";

import {render, appendChild, removeChild} from "./../utils/render.js";

export default class MovieController {
  constructor(onDataChange) {
    this._cardComponent = null;
    this._detailsComponent = null;
    this._onDataChange = onDataChange;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._setDefaultView = this._setDefaultView.bind(this);
  }

  _showMovieDetails(movie, commonContainer) {
    appendChild(commonContainer.getElement(), this._detailsComponent);
    const detailsBottomContainer = document.querySelector(`.form-details__bottom-container`);
    detailsBottomContainer.innerHTML = ``;
    const commentsController = new CommentsController(detailsBottomContainer);
    commentsController.render(movie);
  }

  _closeMovieDetails(commonContainer) {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    removeChild(commonContainer.getElement(), this._detailsComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this._closeMovieDetails();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _setDefaultView() {}

  render(movie, commonContainer, properContainer) {
    this._cardComponent = new MovieCardComponent(movie);
    this._detailsComponent = new MovieDetailsComponent(movie);

    this._cardComponent.setWatchlistButtonClickHandler(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isInWatchlist: !movie.isInWatchlist,
      }), commonContainer, properContainer);
    });

    this._cardComponent.setAlreadyWatchedButtonClickHandler(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isAlreadyWatched: !movie.isAlreadyWatched,
      }), commonContainer, properContainer);
    });

    this._cardComponent.setFavoriteButtonClickHandler(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isInFavorites: !movie.isInFavorites,
      }), commonContainer, properContainer);
    });

    this._cardComponent.setOnCardClickHandler(() => {
      this._showMovieDetails(movie, commonContainer, properContainer);
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._detailsComponent.setCloseButtonClickHandler(() => {
      this._closeMovieDetails(commonContainer);
    });

    render(properContainer, this._cardComponent);
  }
}
