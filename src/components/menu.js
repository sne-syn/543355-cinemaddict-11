import {createMenuTemplate} from "./../templates/menu-template.js";
import AbstractComponent from "./abstract-component.js";

export default class Menu extends AbstractComponent {
  constructor(menuItems) {
    super();
    this._menuItems = menuItems;
  }

  getTemplate() {
    return createMenuTemplate(this._menuItems);
  }

  setMenuChangeHandler(handler) {
    this.getElement().querySelector(`.main-navigation__items`).addEventListener(`click`, (evt) => {
      const target = evt.target.getAttribute('href');
      const menuName = target.substring(1).toLowerCase();
      handler(menuName);
    });
  }
}
