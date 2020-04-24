import {capitalizeChar, capitalizeEveryFirstChar, convertSecondsToHoursMinutes} from './../utils/common';

export const countWatchedMovies = (data) => {
  let count = 0;
  for (let movie of data) {
    count += (movie.isAlreadyWatched === true) ? 1 : 0;
  }
  return count;
};

const countTotalDuration = (data) => {
  let total = 0;
  for (let movie of data) {
    total = (movie.isAlreadyWatched === true) ? total + movie.runtime : total;
  }
  return total;
};

const countFrequency = (arr) => {
  let frequencyCounter = {};
  for (let val of arr) {
    frequencyCounter[val] = (frequencyCounter[val] || 0) + 1;
  }
  return frequencyCounter;
};

const collectGenres = (data) => {
  let genresCollection = [];
  for (let movie of data) {
    for (let genre of movie.genre) {
      genresCollection.push(genre);
    }
  }
  return genresCollection;
};

const getTopGenre = (movies) => {
  let arr = collectGenres(movies);
  let genresObj = countFrequency(arr);
  let count = 0;
  let genre = ``;
  for (let key in genresObj) {
    if (genresObj[key] > count) {
      count = genresObj[key];
      genre = key;
    }
  }
  return genre;
};

export const createStatsTemplate = (movies, profile) => {
  const {rating, avatar} = profile;
  const ratingCapitalized = capitalizeEveryFirstChar(rating);
  const totalWatchedMovies = countWatchedMovies(movies);
  const {hours, minutes} = convertSecondsToHoursMinutes(countTotalDuration(movies));
  const topGenre = capitalizeChar(getTopGenre(movies));

  return `<section class="statistic">
  <p class="statistic__rank">
    Your rank
    <img class="statistic__img" src="images/${avatar}@2x.png" alt="Avatar" width="35" height="35">
    <span class="statistic__rank-label">${ratingCapitalized}</span>
  </p>

  <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
    <label for="statistic-all-time" class="statistic__filters-label">All time</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
    <label for="statistic-today" class="statistic__filters-label">Today</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
    <label for="statistic-week" class="statistic__filters-label">Week</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
    <label for="statistic-month" class="statistic__filters-label">Month</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
    <label for="statistic-year" class="statistic__filters-label">Year</label>
  </form>

  <ul class="statistic__text-list">
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">You watched</h4>
      <p class="statistic__item-text">${totalWatchedMovies} <span class="statistic__item-description">movies</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${hours}<span class="statistic__item-description">h</span>${minutes}<span class="statistic__item-description">m</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Top genre</h4>
      <p class="statistic__item-text">${topGenre}</p>
    </li>
  </ul>

  <div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000"></canvas>
  </div>

</section>`;
};
