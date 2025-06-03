/**
 * weapp-qrcode
 * 微信小程序生成二维码工具
 */

var QRCode = require('./qrcode.js');

function drawQrcode(options) {
  options = options || {};
  options = Object.assign({
    width: 200,
    height: 200,
    canvasId: 'qrcode',
    text: '',
    typeNumber: -1,
    correctLevel: QRCode.CorrectLevel.H,
    background: '#ffffff',
    foreground: '#000000'
  }, options);

  if (!options.text) {
    console.error('weapp-qrcode: 请设置 text 参数');
    return;
  }

  var qrcode = new QRCode({
    text: options.text,
    width: options.width,
    height: options.height,
    typeNumber: options.typeNumber,
    correctLevel: options.correctLevel,
    background: options.background,
    foreground: options.foreground
  });

  var ctx = options._this ? wx.createCanvasContext(options.canvasId, options._this) : wx.createCanvasContext(options.canvasId);
  
  // draw background
  ctx.setFillStyle(options.background);
  ctx.fillRect(0, 0, options.width, options.height);

  // draw qrcode
  var cells = qrcode.getCells();
  var cellSize = options.width / cells.length;
  var cellOffset = Math.floor(cellSize);

  cells.forEach(function (row, rowIndex) {
    row.forEach(function (cell, cellIndex) {
      if (cell) {
        ctx.setFillStyle(options.foreground);
        ctx.fillRect(cellIndex * cellSize, rowIndex * cellSize, cellOffset, cellOffset);
      }
    });
  });

  ctx.draw();
}

module.exports = {
  drawQrcode: drawQrcode
}; 