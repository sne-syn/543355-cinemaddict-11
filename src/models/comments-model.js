export default class CommentsModel {
  constructor (container, profile) {
    this._container = container;
    this._profile = profile;
    this._comments = [];
   // this._dataChangeHandlers = [];
  }

  getComments() {
    return this._comments;
  }

  setComments(comments) {
    this._comments = Array.from(comments);
    this._callHandlers(this._dataChangeHandlers);
  }

  addComment(textComment, emojiComment, dateComment, authorComment) {
    const comment = {
      id: String(`_` + Math.random().toString(36).substr(2, 9)),
      author: authorComment,
      emotion: emojiComment,
      comment: textComment,
      date: dateComment,
    };

    this.comments.push(comment);
  }

  deleteComment(id) {
    this.comments = this.comments.filter((comment) => comment.id !== id);
  }
}
