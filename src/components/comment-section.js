import {
  createDetailsCommentTemplate
} from '../templates/comment-section-template';
import AbstractComponent from "./abstract-component.js";

export default class CommentSectionComponent extends AbstractComponent {
  constructor(movie) {
    super();
    this._movie = movie;
  }

  getTemplate() {
    return createDetailsCommentTemplate(this._movie);
  }

  addCommentHandler(handler2) {
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`click`, handler2);
  }
  
  deleteCommentHandler(handler) {}

  addEmojiHandler(handler) {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, handler);
  }
}
