import {
  createDetailsCommentTemplate
} from '../templates/comment-section-template';
import AbstractSmartComponent from "./abstract-smart-component.js";

const keyCodes = {
  CTRL: 17,
  ENTER: 13,
};
let flag = false;

export default class CommentSectionComponent extends AbstractSmartComponent {
  constructor(movie) {
    super();
    this._movie = movie;
    this._addCommentHandler = null;
    this._deleteCommentHandler = null;
    this._addEmojiHandler = null;
  }

  getTemplate() {
    return createDetailsCommentTemplate(this._movie);
  }

  recoveryListeners() {
    this.setAddCommentHandler(this._addCommentHandler);
    this.setDeleteCommentHandler(this._deleteCommentHandler);
    this.setAddEmojiHandler(this._addEmojiHandler);
  }

  rerender() {
    super.rerender();
  }

  setAddCommentHandler(handler) {
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`keydown`, (evt) => {
      if (evt.keyCode === keyCodes.CTRL) flag = true;
      if (evt.keyCode === keyCodes.ENTER && flag) {
        flag = false;
        handler(this._movie);
        this.getElement().querySelector(`.film-details__add-emoji-label`).innerHTML = ``;
        this.getElement().querySelector(`.film-details__comment-input`).value = ``;
      }
    });
    this._addCommentHandler = handler;
  }

  setDeleteCommentHandler(handler) {
    const comments = this.getElement().querySelectorAll(`.film-details__comment`);
    comments.forEach((comment) => {
      comment.addEventListener(`click`, (evt) =>  handler(evt));
    });
    this._deleteCommentHandler = handler;
  }

  setAddEmojiHandler(handler) {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, handler);
    this._addEmojiHandler = handler;
  }
}
