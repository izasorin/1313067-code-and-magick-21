'use strict';

const GAP = 10;
const PLAYER_NAME = `Вы`;

const CLOUD = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 10
};

const COLOR = {
  CLOUD: `#ffffff`,
  TEXT: `#000000`,
  CLOUD_SHADOW: `rgba(0, 0, 0, 0.7)`,
  PLAYER_BAR: `rgba(255, 0, 0, 1)`
};

const TEXT = {
  FONT: `16px PT Mono`,
  HEIGHT: 10,
  BASELINE: `hanging`,
  CAPTION: `Ура вы победили!`,
  CONTENT: `Список результатов:`
};

const BAR = {
  WIDTH: 40,
  MAX_HEIGHT: -150,
  GAP: 50,
};


const renderCloud = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD.WIDTH, CLOUD.HEIGHT);
};

const renderMessage = (ctx, x, y, text) => {
  ctx.fillStyle = COLOR.TEXT;
  ctx.font = TEXT.FONT;
  ctx.textBaseline = TEXT.BASELINE;
  ctx.fillText(text, x, y);
};

const getMaxElement = (arr) => {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

const getRandomNumber = (min = 0, max = 90) => Math.floor(min + Math.random() * (max - min));

const getRandomColor = () => `hsl(250, ` + getRandomNumber() + `%, 50%)`;

const getStatisticCoordsX = (i) => CLOUD.X + BAR.GAP - GAP + (BAR.WIDTH + BAR.GAP) * i;

const getPlayerBarColor = (players) => {
  return (players === PLAYER_NAME) ? COLOR.PLAYER_BAR : getRandomColor();
};

window.renderStatistics = (ctx, players, times) => {
  renderCloud(ctx, CLOUD.X + GAP, CLOUD.Y + GAP, COLOR.CLOUD_SHADOW);
  renderCloud(ctx, CLOUD.X, CLOUD.Y, COLOR.CLOUD);
  renderMessage(ctx, CLOUD.X + GAP * 2, CLOUD.Y + GAP * 2, TEXT.CAPTION);
  renderMessage(ctx, CLOUD.X + GAP * 2, CLOUD.Y + GAP * 2 + GAP * 2, TEXT.CONTENT);

  const maxTime = getMaxElement(times);

  for (let i = 0; i < players.length; i++) {
    let barHeight = times[i] * BAR.MAX_HEIGHT / maxTime;

    ctx.fillStyle = COLOR.TEXT;
    ctx.font = TEXT.FONT;
    ctx.textBaseline = TEXT.BASELINE;
    ctx.fillText(players[i], getStatisticCoordsX(i), CLOUD.HEIGHT - GAP * 2);
    ctx.fillText(Math.ceil(times[i]), getStatisticCoordsX(i), CLOUD.HEIGHT - BAR.GAP - Math.abs(barHeight));

    ctx.fillStyle = getPlayerBarColor(players[i]);

    ctx.fillRect(getStatisticCoordsX(i), CLOUD.HEIGHT - GAP * 2 - TEXT.HEIGHT, BAR.WIDTH, barHeight);
  }
};
