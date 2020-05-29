import {
  createMenuTemplate
} from "./../templates/menu-template.js";
import AbstractComponent from "./abstract-component.js";

export default class Menu extends AbstractComponent {
  constructor(menuItems) {
    super();
    this._menuItems = menuItems;
    this._markActiveMenuLink = this._markActiveMenuLink.bind(this);
  }

  getTemplate() {
    return createMenuTemplate(this._menuItems);
  }

  setStatsClickHandler(handler) {
    this.getElement().querySelector(`.main-navigation__additional`).addEventListener(`click`, handler);
  }
  
  setMenuChangeHandler(handler) {
    this.getElement().querySelector(`.main-navigation__items`).addEventListener(`click`, (evt) => {
      if (evt.target.getAttribute(`href`)) {
        const target = evt.target.getAttribute(`href`);
        const menuName = target.substring(1).toLowerCase();
        handler(menuName);
        this._markActiveMenuLink(evt);
      }
    });
  }

  _markActiveMenuLink(evt) {
    const menuLinks = this.getElement().querySelectorAll(`.main-navigation__item`);
    menuLinks.forEach((item) => {
      if (item.classList.contains(`main-navigation__item--active`)) {
        item.classList.remove(`main-navigation__item--active`);
      }
    });
    evt.target.classList.add(`main-navigation__item--active`);
  }

  setActiveMenu(menuType) {
    const menuLinks = this.getElement().querySelectorAll(`.main-navigation__item`);
    menuLinks.forEach((item) => {
      const itemForCheck = item.getAttribute(`href`).toLowerCase().substr(1);
      if (itemForCheck !== menuType || item.classList.contains(`main-navigation__item--active`)) {
        item.classList.remove(`main-navigation__item--active`);
      } else {
        item.classList.add(`main-navigation__item--active`);
      }
    });
  }

}
