import CommentSectionComponent from "../components/comment-section";
import CommentComponent from "./../components/comment.js";
import {render} from "./../utils/render.js";
import {generateComments} from "./../mock/comment.js";

export default class CommentsController {
  constructor(container) {
    this._container = container;
    this._commentComponent = null;
    this._commentSection = null;
    this._renderCommentList = this._renderCommentList.bind(this);
    this._changeEmoji = this._changeEmoji.bind(this);
  }

  render(movie) {
    this._commentSection = new CommentSectionComponent(movie);
    render(this._container, this._commentSection);

    if (movie.comments > 0) {
      this._renderCommentList(movie);
    }
    this._commentSection.addEmojiHandler(this._changeEmoji);
  }

  _renderCommentList(movie) {
    const comments = generateComments(movie.comments);
    const commentListElement = document.querySelector(`.film-details__comments-list`);
    commentListElement.innerHTML = ``;
    // render new comments
    comments.forEach((comment) => {
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
}
