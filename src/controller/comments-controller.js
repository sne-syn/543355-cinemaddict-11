import CommentSectionComponent from "../components/comment-section";
import CommentComponent from "./../components/comment.js";
import {
  capitalizeEveryFirstChar
} from "./../utils/common.js";
import {
  render
} from "./../utils/render.js";
let idGen = 80;
export const EmptyComment = {};

export default class CommentsController {
  constructor(container, profile, onCommentsChange) {
    this._container = container;
    this._comments = [];
    this._userName = profile.rating;
    this._commentComponent = null;
    this._commentSection = null;
    this._newSection = null;
    this._onCommentsChange = onCommentsChange;
    this._renderCommentList = this._renderCommentList.bind(this);
    this._changeEmoji = this._changeEmoji.bind(this);
    this._addComment = this._addComment.bind(this);
    this._deleteComment = this._deleteComment.bind(this);
  }

  render(movie, comments) {
    const commentsArray = comments.getComments();
    let currentComments = [];
    for (let i = 0; i < movie.comments.length; i++) {
      for (let j = 0; j < commentsArray.length; j++) {
        if (commentsArray[j].id === movie.comments[i]) {
          currentComments.push(commentsArray[j]);
        }
      }
    }

    this._comments = currentComments;
    this._commentSection = new CommentSectionComponent(movie);
    render(this._container, this._commentSection);
    if (movie.comments.length > 0) {
      this._renderCommentList(this._comments, movie);
    }
    this._commentSection.setAddEmojiHandler(this._changeEmoji);
    this._commentSection.setAddCommentHandler(this._addComment);
  }

  _renderCommentList(comments, movie) {
    const commentListElement = this._container.querySelector(`.film-details__comments-list`);
    commentListElement.innerHTML = ``;
    // render new comments
    comments.forEach((comment) => {
      this._commentComponent = new CommentComponent(comment, movie);
      render(commentListElement, this._commentComponent);
      this._commentComponent.setDeleteCommentHandler(this._deleteComment);
    });
  }

  _changeEmoji(evt) {
    const addEmojiLabel = this._container.querySelector(`.film-details__add-emoji-label`);
    let emojiImg = document.createElement(`img`);
    emojiImg.src = `./images/emoji/${evt.target.value}.png`;
    emojiImg.width = `55`;
    emojiImg.height = `55`;
    addEmojiLabel.innerHTML = ``;
    addEmojiLabel.appendChild(emojiImg);
    evt.target.setAttribute(`checked`, `checked`);
  }

  _addComment(movie) {
    const emojis = this._container.querySelectorAll(`.film-details__emoji-item`);
    let selectedEmoji = ``;
    emojis.forEach((emoji) => {
      if (emoji.getAttribute(`checked`)) {
        selectedEmoji = emoji.value;
      }
    });

    const newComment = {
      id: idGen++,
      emoji: selectedEmoji,
      text: this._container.querySelector(`.film-details__comment-input`).value,
      author: (this._userName.length > 0) ? capitalizeEveryFirstChar(this._userName) : ``,
      date: new Date().toISOString(),
    };

    this._comments.push(newComment);
    this._onCommentsChange(movie, EmptyComment, newComment);
    this._commentSection.rerender();
    this._renderCommentList(this._comments);
  }

  _deleteComment(evt, movie, removedComment) {
    const commentToRemove = evt.target.closest(`.film-details__comment`);
    commentToRemove.parentElement.removeChild(commentToRemove);
    this._comments = this._comments.filter((comment) => comment.id !== removedComment.id);
    this._onCommentsChange(movie, removedComment, null);
    this._commentSection.rerender();
    this._renderCommentList(this._comments);
    console.log(this._comments);
  }
}
