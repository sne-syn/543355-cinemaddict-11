import CommentSectionComponent from "../components/comment-section";
import CommentComponent from "./../components/comment.js";
import {
  render
} from "./../utils/render.js";
import {
  generateComments
} from "./../mock/comment.js";

const keyCodes = {
  CTRL: 17,
  ENTER: 13,
};

let flag = false;

export default class CommentsController {
  constructor(container) {
    this._container = container;
    this._commentComponent = null;
    this._commentSection = null;
    this._renderCommentList = this._renderCommentList.bind(this);
    this._changeEmoji = this._changeEmoji.bind(this);
    this._addCommentHandler = this._addCommentHandler.bind(this);
  }

  render(movie) {
    this._commentSection = new CommentSectionComponent(movie);
    render(this._container, this._commentSection);

    if (movie.comments > 0) {
      this._renderCommentList(movie);
    }

    this._commentSection.addEmojiHandler(this._changeEmoji);
    document.querySelector(`.film-details__comment-input`).addEventListener(`keydown`, this._addCommentHandler);
  }

  _renderCommentList(movie) {
    this._comments = generateComments(movie.comments);
    const commentListElement = document.querySelector(`.film-details__comments-list`);
    commentListElement.innerHTML = ``;
    // render new comments
    this._comments.forEach((comment) => {
      const commentComponent = new CommentComponent(comment);
      render(commentListElement, commentComponent);
    });
  }

  _changeEmoji(evt) {
    const newCommentElement = document.querySelector(`.film-details__new-comment`);
    const addEmojiLabel = document.querySelector(`.film-details__add-emoji-label`);

    let emojiImg = document.createElement(`span`);
    emojiImg.classList.add(`film-details__comment-emoji`);
    emojiImg.innerHTML = `<img src="./images/emoji/${evt.target.value}.png" width="55" height="55" alt="emoji-${evt.target.value}">`;

    if (newCommentElement.contains(addEmojiLabel)) {
      newCommentElement.removeChild(addEmojiLabel);
    }
    newCommentElement.replaceChild(emojiImg, newCommentElement.firstChild);
  }

  _addCommentHandler(evt) {
    if(evt.keyCode === keyCodes.CTRL) flag = true;
    if(evt.keyCode === keyCodes.ENTER && flag) {
      flag = false;
      // create an object with emoji, comment, timestamp, and push it into array for the next render process. Check if emoji && comment exists
      console.log(document.querySelector(`.film-details__comment-input`).value);
      console.log('gotcha comment');
    }
  }
}

