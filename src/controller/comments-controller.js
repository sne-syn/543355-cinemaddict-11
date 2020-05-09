import CommentSectionComponent from "../components/comment-section";
import CommentComponent from "./../components/comment.js";
import {
  capitalizeEveryFirstChar, formateDate
} from "./../utils/common.js";
import {
  render
} from "./../utils/render.js";
import {
  generateComments
} from "./../mock/comment.js";

export default class CommentsController {
  constructor(container, profile) {
    this._container = container;
    this._comments = [];
    this._profile = profile;
    this._commentComponent = null;
    this._commentSection = null;
    this._renderCommentList = this._renderCommentList.bind(this);
    this._changeEmoji = this._changeEmoji.bind(this);
    this._addComment = this._addComment.bind(this);
    this._update = this._update.bind(this);
    this._deleteComment = this._deleteComment.bind(this);
  }

  render(movie) {
    this._comments = generateComments(movie.comments);
    this._commentSection = new CommentSectionComponent(movie);
    render(this._container, this._commentSection);
    if (movie.comments > 0) {
      this._renderCommentList(this._comments);
    }

    this._commentSection.addEmojiHandler(this._changeEmoji);
    this._commentSection.addCommentHandler(this._addComment);
    this._commentSection.deleteCommentHandler(this._deleteComment);
  }

  _update(movie) {
    let commentsFixed = ++movie.comments;
    const newObj = Object.assign({}, movie, {comments: commentsFixed});
    const parent = new CommentSectionComponent(newObj);
    //render(this._container, this._commentSection);
    const oldElement = parent.getElement();
    console.log(oldElement);
    console.log(newObj);
    this._renderCommentList(this._comments);
  }

  _renderCommentList(comments) {
    const commentListElement = document.querySelector(`.film-details__comments-list`);
    commentListElement.innerHTML = ``;
    // render new comments
    comments.forEach((comment) => {
      const commentComponent = new CommentComponent(comment);
      render(commentListElement, commentComponent);
    });
  }

  _changeEmoji(evt) {
    const addEmojiLabel = document.querySelector(`.film-details__add-emoji-label`);
    let emojiImg = document.createElement(`img`);
    emojiImg.src = `./images/emoji/${evt.target.value}.png`;
    emojiImg.width = `55`;
    emojiImg.height = `55`;
    addEmojiLabel.innerHTML = ``;
    addEmojiLabel.appendChild(emojiImg);
  }

  _addComment(movie) {
    const newComment = {
      emoji: `smile`,
      text: document.querySelector(`.film-details__comment-input`).value,
      author: capitalizeEveryFirstChar(this._profile.rating),
      date: formateDate(new Date()),
    };
    this._comments.push(newComment);
    this._update(movie);
  }

  _deleteComment(evt) {
    const commentToRemove = evt.target.closest(`.film-details__comment`);
    commentToRemove.parentElement.removeChild(commentToRemove);
  }
}
