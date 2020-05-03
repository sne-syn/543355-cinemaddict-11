// import CommentSectionComponent from "../components/comment-section";
// import CommentComponent from "./../components/comment.js";
// import {
//   render
// } from "./../utils/render.js";
// import {
//   generateComments
// } from "./../mock/comment.js";

// export default class CommentsController {
//   constructor(container) {
//     this._container = container;
//     //this._commentSection = null;
//     this._commentComponent = null;
//     // this._renderComment = this._renderComment.bind(this);
//     // this._renderCommentsList = this._renderCommentsList.bind(this);
//   }

//   render(movie) {    console.log(commentSection);
    // const commentSection = new CommentSectionComponent(movie);

    // render(this._container, commentSection);

    // if (movie.comments > 0) {
    //   this._renderCommentsList(movie, this._commentSection);
    // }
  //}

  // _renderComment(comment, container) {
  //   this._commentComponent = new CommentComponent(comment);
  //   render(container, this._commentComponent);
  // }

  // _renderCommentsList(movie) {
  //   const commentListContainer = document.querySelector(`.film-details__comments-list`);
  //   console.log(commentListContainer);
  //   const comments = generateComments(movie.comments);
  //   commentListContainer.innerHTML = ``;
  //   return comments.map((comment) => {
  //     this._renderComment(comment, commentListContainer);
  //     return this;
  //   });
  // }

//}
