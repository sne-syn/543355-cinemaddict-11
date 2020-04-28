import MovieCardComponent from "./../components/movie-card.js";
import MovieDetailsComponent from "./../components/movie-details.js";
import CommentComponent from "./../components/comment.js";

import {render,remove, appendChild,removeChild} from "./../utils/render.js";
import {generateComments} from "./../mock/comment.js";


// create comments list
const renderCommentList = (movie) => {
  const comments = generateComments(movie.comments);
  const commentListElement = document.querySelector(`.film-details__comments-list`);
  commentListElement.innerHTML = ``;
  // render new comments
  comments.forEach((comment) => {
    const commentComponent = new CommentComponent(comment);
    render(commentListElement, commentComponent);
  });
};


export default class MovieController {
  constructor(container) {
    this._container = container;
    this._cardComponent = null;
    this._detailsComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  _showMovieDetails(section) {
    console.log(this._container);
    appendChild(section.getElement(), this._detailsComponent);
    //renderCommentList(movie);
  }

  _closeMovieDetails(section) {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    removeChild(section.getElement(), this._detailsComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this._closeMovieDetails();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  render(movie, section) {
    this._cardComponent = new MovieCardComponent(movie);
    this._detailsComponent = new MovieDetailsComponent(movie);

    this._cardComponent.setOnCardClickHandler(() => {
      this._showMovieDetails(section);
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._detailsComponent.setCloseButtonClickHandler(() => {
      this._closeMovieDetails(section);
    });

    render(this._container, this._cardComponent);
  }
}
