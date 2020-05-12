import {SortType, createSortTemplate} from './../templates/sort-template.js';
import AbstractComponent from "./abstract-component.js";

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      // add active class
      const sortButtons = this.getElement().querySelectorAll(`.sort__button`);
      sortButtons.forEach((item) => {
        if (item.classList.contains(`sort__button--active`)) {
          item.classList.remove(`sort__button--active`);
        }
      });

      evt.target.classList.add(`sort__button--active`);

      this._currentSortType = sortType;
      handler(this._currentSortType);
    });
  }
}
