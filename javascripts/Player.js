class Player {
  constructor(job, health, mana, strength, agility, intelligence, width, height) {
    this.job = job;
    this.health = health;
    this.mana = mana;
    this.strength = strength;
    this.agility = agility;
    this.intelligence = intelligence;
    this.skill = [];
    this.width = width;
    this.height = height;
    this.x = 500;
    this.y = 250;
    this.delay = 150;
  }
  attack() {
    if (this.job === 'Warrior')
      return this.strength * 1.5;
    else if (this.job === 'Archer')
      return Math.floor(this.strength * 0.5 + this.agility * 0.7);
    else if (this.job === 'Wizard')
      return this.intelligence * 1.5;
    else if (this.job === 'Summoner')
      return this.intelligence * 2;
  }
  skillSet() {
    if (this.job === 'Wizard')
      this.skill = ['Fire Explosion', 'Ice Wave'];
    else if (this.job === 'Warrior')
      this.skill = ['Sword Energy']
  }
  receiveDamage(damage) {
    let context = canvas.context;
    this.health -= damage;
    context.font = '15px Arial'
    context.fillText(`-${damage}`, this.x, this.y - 10)
    console.log(this.health);
  }
  updatePlayer() {
    playerImg.src = './players/Warrior/Move_Set/Warrior_walking_frame1.png'
    let context = canvas.context;
    context.drawImage(playerImg, this.x, this.y, 30, 45)
  }
  move(e) {

    if (player.x <= 50) {
      player.x = 55;
    } else if (player.x >= 950) {
      player.x = 945;
    } else if (player.y <= 50) {
      player.y = 55;
    } else if (player.y >= 450) {
      player.y = 445;
    } else {
      switch (e.keyCode) {
        case 37: // Left
          player.x -= 5
          break;
        case 38: // Up
          player.y -= 5
          break;
        case 39: // Right
          let context = canvas.context;
          playerImg.src = `./players/Warrior/Move_Set/warrior_12x17.png`;
          player.x += 5;
          context.drawImage(playerImg, 0, 0, 12, 17, this.x, this.y, 30, 45);
          break;
        case 40: // Down
          player.y += 5;
          break;
        default:
          break;
      }
    }
  }
  drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(img,
                  frameX * width, frameY * height, width, height,
                  canvasX, canvasY, scaledWidth, scaledHeight);
  }
  
  init() {
    drawFrame(0, 0, 0, 0);
    drawFrame(1, 0, scaledWidth, 0);
    drawFrame(0, 0, scaledWidth * 2, 0);
    drawFrame(2, 0, scaledWidth * 3, 0);
  }
}