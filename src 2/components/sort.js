import {
  createSortTemplate
} from './../templates/sort-template.js';
import {
  SortType
} from "./../utils/const";
import AbstractComponent from "./abstract-component.js";

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
    this._markSortedType = this._markSortedType.bind(this);
  }

  getTemplate() {
    return createSortTemplate();
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortType() {
    this._currentSortType = SortType.DEFAULT;
    return this._currentSortType;
  }

  setDefaultSortTypeView() {
    const sortButtons = this.getElement().querySelectorAll(`.sort__button`);
    const defaultButton = this.getElement().querySelector(`[data-sort-type="default"]`);
    sortButtons.forEach((item) => {
      if (item.classList.contains(`sort__button--active`)) {
        item.classList.remove(`sort__button--active`);
      }
    });
    defaultButton.classList.add(`sort__button--active`);
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
      this._currentSortType = sortType;
      handler(this._currentSortType);
      this._markSortedType(evt);
    });
  }

  _markSortedType(evt) {
    const sortButtons = this.getElement().querySelectorAll(`.sort__button`);
    sortButtons.forEach((item) => {
      if (item.classList.contains(`sort__button--active`)) {
        item.classList.remove(`sort__button--active`);
      }
    });
    evt.target.classList.add(`sort__button--active`);
  }
}
