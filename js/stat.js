'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 20;
var FONT_GAP = 16;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var BAR_MAX_HEIGHT = 150;
var BAR_TOP = 7;
var barHeight = CLOUD_HEIGHT - GAP - FONT_GAP - GAP;
var pointX = BAR_GAP + BAR_WIDTH;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + GAP + pointX * i, CLOUD_Y + GAP + barHeight);
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP + pointX * i, CLOUD_Y + GAP + FONT_GAP * 3 + BAR_MAX_HEIGHT - (BAR_MAX_HEIGHT * times[i]) / maxTime - BAR_TOP);
    ctx.fillStyle = players[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(240,' + Math.random().toFixed(2) * 100 + '%, 50%)';
    ctx.fillRect(CLOUD_X + GAP + pointX * i, CLOUD_Y + GAP + FONT_GAP * 3 + BAR_MAX_HEIGHT - (BAR_MAX_HEIGHT * times[i]) / maxTime, BAR_WIDTH, (BAR_MAX_HEIGHT * times[i]) / maxTime);
  }

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 160, 30);
  ctx.fillText('Список результатов:', 160, 50);
};
