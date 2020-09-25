'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 10;
const CLOUD_COLOR = `#ffffff`;
const CLOUD_SHADOW_COLOR = `rgba(0, 0, 0, 0.7)`;
const BAR_WIDTH = 40;
const BAR_MAX_HEIGHT = -150;
const BAR_GAP = 50;
const PLAYER_BAR_COLOR = `rgba(255, 0, 0, 1)`;
const PLAYER_NAME = `Вы`;
const FONT = `16px PT Mono`;
const TEXT_COLOR = `#000000`;
const TEXT_HEIGHT = 10;

const renderCloud = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const renderMessage = (ctx, x, y, text) => {
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = FONT;
  ctx.textBaseline = `hanging`;
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

const getRandomNumber = () => Math.floor(Math.random() * 90);

window.renderStatistics = (ctx, players, times) => {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);
  renderMessage(ctx, CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2, `Ура вы победили!`);
  renderMessage(ctx, CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2 + GAP * 2, `Список результатов:`);

  const maxTime = getMaxElement(times);

  for (let i = 0; i < players.length; i++) {
    let barHeight = times[i] * BAR_MAX_HEIGHT / maxTime;

    ctx.fillStyle = TEXT_COLOR;
    ctx.font = FONT;
    ctx.textBaseline = `hanging`;
    ctx.fillText(players[i], CLOUD_X + BAR_GAP - GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - GAP * 2);
    ctx.fillText(Math.ceil(times[i]), CLOUD_X + BAR_GAP - GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - BAR_GAP - Math.abs(barHeight));

    if (players[i] === PLAYER_NAME) {
      ctx.fillStyle = PLAYER_BAR_COLOR;
    } else {
      ctx.fillStyle = `hsl(250, ` + getRandomNumber() + `%, 50%)`;
    }
    ctx.fillRect(CLOUD_X + BAR_GAP - GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - GAP * 2 - TEXT_HEIGHT, BAR_WIDTH, barHeight);
  }
};
