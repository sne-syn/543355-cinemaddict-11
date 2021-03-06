import MenuComponent from "./../components/menu";
import {
  MenuType
} from "./../utils/const.js";
import {
  render,
  replace
} from "./../utils/render.js";
import {
  getMoviesByMenu
} from "./../utils/menu.js";

export default class MenuController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._activeMenuType = MenuType.ALL;
    this._menuComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onMenuChange = this._onMenuChange.bind(this);
    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const allMovies = this._moviesModel.getMoviesAll();

    const menuItems = Object.values(MenuType).map((menuType) => {
      return {
        name: menuType,
        count: getMoviesByMenu(allMovies, menuType).length,
      };
    });
    const oldComponent = this._menuComponent;

    this._menuComponent = new MenuComponent(menuItems);
    this._menuComponent.setMenuChangeHandler(this._onMenuChange);

    if (oldComponent) {
      replace(this._menuComponent.getElement(), oldComponent.getElement());
    } else {
      render(container, this._menuComponent);
    }
  }

  _onMenuChange(menuType) {
    this._moviesModel.setMenu(menuType);
    this._activeMenuType = menuType;
  }

  _onDataChange() {
    this.render();
  }
}
