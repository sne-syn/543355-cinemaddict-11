import {capitalizeChar} from "../utils/common.js";

const menuNames = [`All`, `Watchlist`, `History`, `Favorites`];

const generateMenu = () => {
  return menuNames.map((name) => {
    return {
      name: (name),
      count: Math.floor(Math.random() * 10),
    };
  });
};

export {generateMenu};
