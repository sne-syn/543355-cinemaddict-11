import {createElement} from '../utils.js';

const createMenuMarkup = (menuItem) => {
  const {name, count} = menuItem;

  const countMark = createMenuCount(count);
  if (name === `All`) {
    return `<a href="#${name}" class="main-navigation__item">${name} movies</a>`;
  } else {
    return `<a href="#${name}" class="main-navigation__item">${name} ${countMark}</a>`;
  }
};

const createMenuCount = (count) => {
  return `<span class="main-navigation__item-count">${count}</span>`;
};

const createMenuTemplate = (menuItems) => {
  const menuMarkup = menuItems.map((it) => createMenuMarkup(it)).join(`\n`);
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${menuMarkup}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class Menu {
  constructor (menuItems) {
    this._menuItems = menuItems;
    this._element = null;
  }

  getTemplate() {
    return createMenuTemplate(this._menuItems);
  }

  getElement() {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
