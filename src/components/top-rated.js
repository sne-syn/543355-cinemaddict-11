import {
  createTopRatedTemplate
} from './../templates/top-rated-template.js';
import AbstractComponent from "./abstract-component.js";

export default class TopRated extends AbstractComponent {
  constructor() {
    super();
    this._container = this.getElement().querySelector(`.films-list__container`);
  }

  get listContainer() {
    return this._container;
  }

  getTemplate() {
    return createTopRatedTemplate();
  }
}
