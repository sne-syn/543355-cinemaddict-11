export default class MovieController {
  constructor(container) {
    this._container = container;
  }

  render(movies) {
    renderMovie(this._container, movies);
  }
}
