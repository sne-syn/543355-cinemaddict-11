import MovieCardComponent from "./../components/movie-card.js";
import MovieDetailsComponent from "./../components/movie-details.js";
import CommentsController from "./comments-controller.js";

import {render, replace, appendChild, removeChild} from "./../utils/render.js";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class MovieController {
  constructor(onDataChange, onViewChange) {
    this._cardComponent = null;
    this._detailsComponent = null;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  _showMovieDetails(movie, commonContainer) {
    appendChild(commonContainer.getElement(), this._detailsComponent);
    const detailsBottomContainer = document.querySelector(`.form-details__bottom-container`);
    detailsBottomContainer.innerHTML = ``;
    const commentsController = new CommentsController(detailsBottomContainer);
    commentsController.render(movie);
    this._mode = Mode.EDIT;
  }

  _closeMovieDetails(commonContainer) {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    removeChild(commonContainer.getElement(), this._detailsComponent);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this._closeMovieDetails();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeMovieDetails();
    }
  }

  render(movie, commonContainer, properContainer) {
    const oldCardComponent = this._cardComponent;
    const oldMovieDetailsComponent = this._detailsComponent;

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

    if (oldCardComponent) {
      const parentElement = oldCardComponent.getElement().parentElement;
      console.log(parentElement);
      parentElement.replaceChild(this._cardComponent.getElement(), oldCardComponent.getElement());
    } else {
      render(properContainer, this._cardComponent);
    }
  }
}
