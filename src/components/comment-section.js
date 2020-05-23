import {
  createDetailsCommentTemplate
} from '../templates/comment-section-template';
import AbstractSmartComponent from "./abstract-smart-component.js";

const keyCodes = {
  CTRL: 17,
  ENTER: 13,
};

export default class CommentSectionComponent extends AbstractSmartComponent {
  constructor(movie) {
    super();
    this._movie = movie;
    this._addCommentHandler = null;
    this._deleteCommentHandler = null;
    this._addEmojiHandler = null;
    this._emojiLabelInput = this.getElement().querySelector(`.film-details__add-emoji-label`);
    this._commentTextInput = this.getElement().querySelector(`.film-details__comment-input`);
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

  _resetInput() {
    this._emojiLabelInput.innerHTML = ``;
    this._commentTextInput.value = ``;
    const emojis = this.getElement().querySelectorAll(`.film-details__emoji-item`);
    emojis.forEach((emoji) => {
      emoji.checked = false;
    });
  }

  setAddCommentHandler(handler) {
    this._commentTextInput.addEventListener(`keydown`, (evt) => {
      if (evt.ctrlKey && evt.keyCode === keyCodes.ENTER) {
        if (this._emojiLabelInput.innerHTML !== `` &&
          this._commentTextInput.value !== ``) {
          handler(this._movie);
        }
      }
    });
    this._addCommentHandler = handler;
  }

  setDeleteCommentHandler(handler) {
    const comments = this.getElement().querySelectorAll(`.film-details__comment`);
    comments.forEach((comment) => {
      comment.addEventListener(`click`, (evt) => {
        handler(evt, this._movie);
      });

    });
    this._deleteCommentHandler = handler;
  }

  setAddEmojiHandler(handler) {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, handler);
    this._addEmojiHandler = handler;
  }
}
