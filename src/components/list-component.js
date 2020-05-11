import AbstractComponent from "./abstract-component.js";

export default class ListComponent extends AbstractComponent {
  constructor() {
    super();
    this._container = this.getElement().querySelector(`.films-list__container`);

    this.getListContainer = function () {
      return this._container;
    };
  }
}
