import MovieCardComponent from "./../components/movie-card.js";
import MovieDetailsComponent from "./../components/movie-details.js";
import CommentsController, {EmptyComment} from "./comments-controller.js";
import {
  render,
  replace,
  appendChild,
  removeChild,
  remove
} from "./../utils/render.js";

const State = {
  DEFAULT: `default`,
  MODAL: `modal-open`,
};

export default class MovieController {
  constructor(onDataChange, commonContainer, profile, commentsModel) {
    this._commentsModel = commentsModel;
    this._commentsController = null;
    this._profile = profile;
    this._commonContainer = commonContainer;
    this._cardComponent = null;
    this._detailsComponent = null;
    this._onDataChange = onDataChange;
    this._state = State.DEFAULT;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._renderComments = this._renderComments.bind(this);
    this._onCommentsChange = this._onCommentsChange.bind(this);
  }

  _renderComments(movie) {
    const detailsBottomContainer = document.querySelector(`.form-details__bottom-container`);
    detailsBottomContainer.innerHTML = ``;
    this._commentsController = new CommentsController(detailsBottomContainer, this._profile, this._onCommentsChange);
    this._commentsController.render(movie, this._commentsModel);
  }

  _onCommentsChange(movie, oldData, newData) {
    if (oldData === EmptyComment) {
      this._commentsModel.addComment(newData);
      movie.comments.push(newData.id);
    }
    console.log(movie);
    console.log(this._commentsModel);
  }

  _showMovieDetails(movie) {
    appendChild(this._commonContainer.getElement(), this._detailsComponent);
    this._state = State.MODAL;
    this._renderComments(movie);
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

  destroy() {
    remove(this._detailsComponent);
    remove(this._cardComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  render(movie, properContainer) {
    const oldCardComponent = this._cardComponent;

    this._cardComponent = new MovieCardComponent(movie);
    this._detailsComponent = new MovieDetailsComponent(movie, this._profile, this._commentsModel);

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
      render(properContainer, this._cardComponent);
    }
  }
}
