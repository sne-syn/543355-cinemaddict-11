import {capitalizeChar} from "./../utils/common.js";

const createMenuMarkup = (menuItem) => {
  const {name, count} = menuItem;

  const countMark = createMenuCount(count);
  if (name === `all`) {
    return `<a href="#${capitalizeChar(name)}" class="main-navigation__item  main-navigation__item--active">${capitalizeChar(name)} movies</a>`;
  } else {
    return `<a href="#${capitalizeChar(name)}" class="main-navigation__item">${capitalizeChar(name)} ${countMark}</a>`;
  }
};

const createMenuCount = (count) => {
  return `<span class="main-navigation__item-count">${count}</span>`;
};

export const createMenuTemplate = (menuItems) => {
  const menuMarkup = menuItems.map((it) => createMenuMarkup(it)).join(`\n`);
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${menuMarkup}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};
