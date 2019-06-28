class Canvas {
  constructor() {
    this.frames = 0;
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('id', 'canvas');
    this.canvas.width = 1200;
    this.canvas.height = 500;
    this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.context.font = '15px upheavtt';
  }
  start() {
    bgMusic = new sound('./music/Megaman X5 - X vs Zero Intense Symphonic Metal Cover.mp3');
    bgMusic.play();
    window.requestAnimationFrame(updateGameLoop);
  }
  init() {
    this.context.fillStyle = 'rgb(74, 59, 65)'
    this.context.fillRect(1000, 0, 200, 500);
    this.context.fillStyle = 'rgb(209, 194, 54)';
    this.context.fillText('Heroes Ironbattle', 1030,150);
    this.context.fillText('Start Game', 1050, 255);
    this.context.fillText('Use arrow keys to move', 1010, 350);
    this.context.fillText('Z and X to attack', 1020, 400)
    this.context.fillText('Summoner has no X', 1020, 420)
  }
  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  // stop() {     ### NOT WORKING ###
  //   window.cancelAnimationFrame(run);
  // }
  update() {
    this.context.drawImage(bgImg, 0, 0);
  }
  updatePreBegin() {
    this.context.drawImage(chooseClass, 250, 0, 500, 400);
  }
  updatePause() {
    this.context.fillStyle = 'rgba(46, 48, 51, 0.02)'
    this.context.fillRect(0, 0, 1000, 500);
    this.context.fillStyle = 'rgb(216, 230, 229)';
    this.context.fillText('PAUSED',500,250)
  }
  gameOver() {
    this.clear();
    this.context.drawImage(gameOver, 0, 0, 1000, 500);
  }
}