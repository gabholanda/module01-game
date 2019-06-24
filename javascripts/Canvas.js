class Canvas {
  constructor() {
    this.frames = 0;
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('id', 'canvas');
    this.canvas.width = 1000;
    this.canvas.height = 500;
    this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.context.fillRect(450, 200, 150, 100);
    this.context.fillStyle = 'red'
    this.context.font = '16px Arial'
    this.context.fillText('Start Game', 485, 255)
  }
  start() {
    // call updateGameArea() every 20 milliseconds
    // this.interval = setInterval(updateGameLoop, 20);
    window.requestAnimationFrame()
  }
  init() {
    bgImg.src = './images/map.png'
    this.context.drawImage(bgImg, 0, 0);

  }
  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  stop() {
    clearInterval(this.interval);
  }
  update() {
    bgImg.src = './map.png'
    this.context.drawImage(bgImg, 0, 0);
  }
}

function updateGameLoop() {
  canvas.update();
  if (player.y === monster.y + 30) {
    monster.attackDrag(player)
  } else {
    monster.pathFinder(player);
  }
  if (player.health <= 0) {
    end = true;
    canvas.stop();
  }
  player.updatePlayer();
}