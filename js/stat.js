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

var renderCloud = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color || '#000000';
  ctx.fillRect(x, y, width, height);
};

var renderText = function (ctx, text, x, y, color, font) {
  ctx.font = font || '16px PT Mono';
  ctx.fillStyle = color || '#000000';
  ctx.fillText(text, x, y);
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
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#fff');

  ctx.fillStyle = '#000';

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var x = CLOUD_X + GAP + pointX * i;
    var y = CLOUD_Y + GAP + FONT_GAP * 3 + BAR_MAX_HEIGHT - (BAR_MAX_HEIGHT * times[i]) / maxTime;

    renderText(ctx, players[i], x, CLOUD_Y + GAP + barHeight);
    renderText(ctx, Math.round(times[i]), x, y - BAR_TOP);

    renderCloud(ctx, x, y, BAR_WIDTH, (BAR_MAX_HEIGHT * times[i]) / maxTime, players[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(240,' + Math.random().toFixed(2) * 100 + '%, 50%)');
  }

  renderText(ctx, 'Ура вы победили!', 160, 30);
  renderText(ctx, 'Список результатов:', 160, 50);
};
