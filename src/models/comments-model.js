export default class CommentsModel {
  constructor(container, profile) {
    this._container = container;
    this._profile = profile;
    this._comments = [];
    this._dataChangeHandlers = [];
  }

  getComments() {
    return this._comments;
  }

  setComments(comments) {
    this._comments = Array.from(comments);
    this._callHandlers(this._dataChangeHandlers);
  }

  addComment(authorComment, emojiComment, textComment, dateComment) {
    const comment = {
      id: this._comments.length > 0 ? this._comments[this._comments.length - 1].id + 1 : 1,
      author: authorComment,
      emotion: emojiComment,
      comment: textComment,
      date: dateComment,
    };

    this._comments.push(comment);
  }

  deleteComment(id) {
    this._comments = this._comments.filter((comment) => comment.id !== id);
  }

  updateComments(id, comment) {
    const index = this._comments.findIndex((comment) => comment.id === id);
    if (index === -1) {
      return false;
    }

    this._comments = [].concat(this._comments.slice(0, index), comment, this._comments.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);
    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
