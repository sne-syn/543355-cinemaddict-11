import {createMenuTemplate} from './../templates/menu-template.js';
import AbstractComponent from "./abstract-component.js";

export default class Menu extends AbstractComponent {
  constructor(menuItems) {
    super();
    this._menuItems = menuItems;
  }

  setStatsClickHandler(handler) {
    this.getElement().querySelector(`.main-navigation__additional`).addEventListener(`click`, handler);
  }

  setMenuClickHandler(handler) {
    this.getElement().querySelector(`.main-navigation__items`).addEventListener(`click`, handler);
  }

  getTemplate() {
    return createMenuTemplate(this._menuItems);
  }
}
