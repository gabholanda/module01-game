class Monster {
  constructor(name, health, energy, attack, speed, width, height) {
    this.name = name;
    this.health = health;
    this.energy = energy;
    this.attack = attack;
    this.speed = speed;
    this.width = width;
    this.height = height;
    this.x = 1000;
    this.y = Math.floor(Math.random() * 500);

  }
  attack() {
    return this.attack;
  }
}
let delay = 3000;
class Dragon extends Monster {
  constructor(name, health, energy, attack, speed, width, height) {
    super(name, health, energy, attack, speed, width, height)
  }
  pathFinder(player) {
    let context = canvas.context;
    monsterImg.src = `./monsters/dragon/walking_41x30_42x30_42x28_44x27_44x30_41x30_41x33_41x34_41x34_41x30.png`
    if (player.x > this.x) {
      this.x += 1;
      context.drawImage(monsterImg, 100, 45, 41, 30, this.x, this.y, 150, 100);
    }
    else if (player.x < this.x) {
      this.x -= 1;
      context.drawImage(monsterImg, this.x, this.y, 150, 100)
    }
    if (player.y >= this.y + 30) {
      this.y += 1;
      context.drawImage(monsterImg, this.x, this.y, 150, 100)
    } else if (player.y <= this.y + 30) {
      this.y -= 1;
      context.drawImage(monsterImg, this.x, this.y, 150, 100)
    }
  }
  attackDrag(player) {
    let context = canvas.context;
    while (delay >= 3000) {
      console.log(delay);
      delay -= 1;
      monsterImg.src = `./monsters/dragon/atack_41x30_41x33_43x30_45x30_47x30_47x30_50x30_47x30_47x30_47x30_47x30.png`
      context.drawImage(monsterImg, 0, 30, 41, 35, this.x, this.y, 150, 100);
      context.fillRect(this.x - 500, this.y + 30, 500, 50);
      if (player.x > this.x - 525) {
        player.receiveDamage(20);
      }
    }
    delay = 3000;
  }
}