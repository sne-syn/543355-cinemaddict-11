import {render} from "./../utils/render.js";


export default class NewCommentController {
  constructor(container) {
    this._container = container;
    this._newComponent = null;
  }

  render() {
    this._newComponent = new NewComment();
    render(this._container, this._newComponent);
  }
}
