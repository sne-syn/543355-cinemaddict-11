const menuNames = [`all`, `watchlist`, `history`, `favorites`];

const generateMenu = () => {
  return menuNames.map((name) => {
    return {
      name,
      count: Math.floor(Math.random() * 10),
    };
  });
};

export {
  generateMenu
};
