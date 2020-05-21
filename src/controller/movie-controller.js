import MovieCardComponent from "./../components/movie-card.js";
import MovieDetailsComponent from "./../components/movie-details.js";
import CommentsController from "./comments-controller.js";
import CommentsModel from "./../models/comments-model.js";

import {
  render,
  replace,
  appendChild,
  removeChild,
  remove,
  RenderPosition
} from "./../utils/render.js";

const State = {
  DEFAULT: `default`,
  MODAL: `modal-open`,
};



export default class MovieController {
  constructor(onDataChange, onViewChange, commonContainer, profile) {
    this._profile = profile;
    this._commonContainer = commonContainer;
    this._cardComponent = null;
    this._detailsComponent = null;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._state = State.DEFAULT;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  _showMovieDetails(movie) {
    this._onViewChange();
    appendChild(this._commonContainer.getElement(), this._detailsComponent);
    this._state = State.MODAL;

    const detailsBottomContainer = document.querySelector(`.form-details__bottom-container`);
    detailsBottomContainer.innerHTML = ``;
    // const commentsModel = new CommentsModel();
    // commentsModel.setComments(comments);
    const commentsController = new CommentsController(detailsBottomContainer, this._profile);
    commentsController.render(movie);
  }

  _closeMovieDetails() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    if (this._state === State.MODAL) {
      removeChild(this._commonContainer.getElement(), this._detailsComponent);
    }
    this._state = State.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this._closeMovieDetails();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  setDefaultView() {
    if (this._state === State.MODAL) {
      this._closeMovieDetails();
    }
  }

  destroy() {
    remove(this._detailsComponent);
    remove(this._cardComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  render(movie, properContainer) {
    const oldCardComponent = this._cardComponent;

    this._cardComponent = new MovieCardComponent(movie);
    this._detailsComponent = new MovieDetailsComponent(movie, this._profile);

    this._cardComponent.setWatchlistButtonClickHandler(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isInWatchlist: !movie.isInWatchlist,
      }), this._commonContainer, properContainer);
    });

    this._cardComponent.setAlreadyWatchedButtonClickHandler(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isAlreadyWatched: !movie.isAlreadyWatched,
        watchingDate: !movie.isAlreadyWatched ? new Date().toISOString() : null,
      }), this._commonContainer, properContainer);
    });

    this._cardComponent.setFavoriteButtonClickHandler(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isInFavorites: !movie.isInFavorites,
      }), this._commonContainer, properContainer);
    });

    this._cardComponent.setOnCardClickHandler(() => {
      this._showMovieDetails(movie);
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._detailsComponent.setCloseButtonClickHandler(() => {
      this._closeMovieDetails();
    });

    if (oldCardComponent) {
      replace(this._cardComponent.getElement(), oldCardComponent.getElement());
    } else {
      render(properContainer, this._cardComponent, RenderPosition.BEFOREEND);
    }
  }
}
