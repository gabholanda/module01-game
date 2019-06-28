class Monster {
  constructor(name, health, energy, damage, speed, width, height) {
    this.name = name;
    this.health = health;
    this.energy = energy;
    this.damage = damage;
    this.speed = speed;
    this.width = width;
    this.height = height;
    //Random Y Position 
    this.x = 1000;
    this.y = Math.floor(Math.random() * 500);
    //All Monster Flags
    this.isAttacking = false;
    this.isWalking = true;
    this.direction = true;
    //Monster ----
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 1;
    this.scale = 2;
    //Monster ATTACK MOVE----
    this.attackIndex = 0;
    this.tickCountAttack = 0;
    this.ticksPerFrameAttack = 1;
  }
  attack() {
    return this.attack;
  }
  receiveDamage(damage) {
    this.health -= damage;
    canvas.context.fillText(`-${damage}`, this.x, this.y - 20)
  }
  levelUp() {
    for (let i = 0; i < player.level; i++) {
      this.health = Math.ceil(this.health * 1.3);
      this.damage = Math.ceil(this.damage * 1.2);
    }
  }
  interface() {
    canvas.context.fillStyle = 'rgb(199, 45, 18)';
    canvas.context.fillText(`HP: ${this.health}`, this.x - 5, this.y - 10)
  }
}

// DRAGON ==============================
class Dragon extends Monster {
  constructor(name, health, energy, damage, speed) {
    super(name, health, energy, damage, speed)
    //Dragon MOVE----
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 5;
    this.scale = 2;
    //Dragon ATTACK MOVE----
    this.attackIndex = 0;
    this.tickCountAttack = 0;
    this.ticksPerFrameAttack = 10;
    //DRAGON ATTACK RAY-----
    this.rayIndex = 0;
    this.tickCountRay = 0;
    this.ticksPerFrameRay = 2;
    this.exp = 1000;
  }
  attack(damage) {
    player.receiveDamage(damage);
  }
  pathFinder() {
    dragonImg.src = `./monsters/dragon/walking_47x34.png`;
    if (player.x > this.x) { //MOVE TO THE RIGHT
      this.x += this.speed;
      this.direction = true;
    }
    else if (player.x < this.x) { // MOVE TO THE LEFT
      this.x -= this.speed;
      this.direction = false;
    }
    // TURN RIGHT
    if (this.direction) {
      if (player.y >= this.y + 15) {
        this.y += this.speed;
      } else if (player.y <= this.y + 15) {
        this.y -= this.speed;
      }

    } else { // TURN LEFT
      if (player.y >= this.y + 15) {
        this.y += this.speed;
      } else if (player.y <= this.y + 15) {
        this.y -= this.speed;
      }
    }
  }
  collide() {
    if (this.direction) {
      if (this.x + 80 >= player.x
        && this.x <= player.x
        && this.y - 30 <= player.y
        && this.y + 50 >= player.y) {
        this.attack(Math.floor(this.damage / 2));
        player.x += 20;
      }
    } else {
      if (this.x + 100 >= player.x
        && this.x <= player.x
        && this.y - 30 <= player.y
        && this.y + 50 >= player.y) {
        this.attack(Math.floor(this.damage / 2));
        player.x -= 20;
      }
    }
  }
  update() {
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < 9) {
        // Go to the next frame
        this.frameIndex += 1;
      } else if (true) {
        this.frameIndex = 0;
      }
    };
  }

  render() {
    if (this.direction) {
      canvas.context.drawImage(dragonImg,
        this.frameIndex * 470 / 10,
        0,
        47, 34,
        this.x, this.y,
        47 * this.scale, 34 * this.scale);
    } else {
      canvas.context.drawImage(dragonImg,
        this.frameIndex * 470 / 10,
        34,
        47, 34,
        this.x, this.y,
        44 * this.scale, 34 * this.scale);
    }
  }

  updateAttackMove() {
    this.tickCountAttack += 1;
    if (this.tickCountAttack > this.ticksPerFrameAttack) {
      this.tickCountAttack = 0;
      if (this.attackIndex < 2) {
        // Go to the next frame
        this.attackIndex += 1;
      } else if (true) {
        this.attackIndex = 0;
        this.isAttacking = false;
        this.isWalking = true;
      }
    }
    this.tickCountRay += 1;
    if (this.tickCountRay > this.ticksPerFrameRay) {
      this.tickCountRay = 0;
      if (this.rayIndex < 4) {
        // Go to the next frame
        this.rayIndex += 1;
      } else if (true) {
        this.rayIndex = 0;
        this.isAttacking = false;
        this.isWalking = true;
      }
    }
  }
  renderAttackMove() {
    dragonImg.src = `./monsters/dragon/atack_50x30.png`;
    dragonAttack.src = `./monsters/dragon/RAIO_37x16.png`;
    // DRAGON ATTACK RIGHT =======================
    if (this.direction) {
      canvas.context.drawImage(dragonImg,
        this.attackIndex * 550 / 11,
        0,
        50, 30,
        this.x, this.y,
        50 * this.scale, 30 * this.scale);

      //Dragon Attack Anm
      if (this.attackIndex === 2) {
        for (let i = 1; i <= 5; i++) {
          canvas.context.drawImage(dragonAttack,
            37 * Math.floor(Math.random() * 4),
            0,
            37, 16,
            this.x + 80, this.y + 12, // connect all lasers
            37 * this.scale * 2 * 2 * 2, 16 * this.scale);
          this.attack(Math.floor(this.damage / 20));
        }
      }
    }
    // DRAGON ATTACK LEFT ============================
    else {
      canvas.context.drawImage(dragonImg,
        this.attackIndex * 550 / 11,
        30,
        50, 30,
        this.x, this.y,
        50 * this.scale, 30 * this.scale);

      //Dragon Attack Anm
      if (this.attackIndex === 2) {
        for (let i = 1; i <= 5; i++) {
          canvas.context.drawImage(dragonAttack,
            37 * Math.floor(Math.random() * 4),
            16,
            37, 16,
            this.x - 590, this.y + 12,
            37 * this.scale * 2 * 2 * 2, 16 * this.scale);

          this.attack(Math.floor(this.damage / 15));
        }
      }

    }
  }
}

// SNAKE ===============================
class Snake extends Monster {
  constructor(name, health, energy, damage, speed) {
    super(name, health, energy, damage, speed)
    this.x = 0;
    // Snake MOVE----
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 2;
    this.scale = 2;
    // Snake ATTACK MOVE----
    this.attackIndex = 0;
    this.tickCountAttack = 0;
    this.ticksPerFrameAttack = 2;
    this.exp = 500;
  }
  attack(damage) {
    player.receiveDamage(damage);
  }
  pathFinder(player) {
    snakeImg.src = `./monsters/snake/walking_41x25.png`;
    if (player.x > this.x) { //MOVE TO THE RIGHT
      this.x += 1;
      this.direction = true;
    }
    else if (player.x < this.x) { // MOVE TO THE LEFT
      this.x -= 1;
      this.direction = false;
    }
    // TURN RIGHT
    if (this.direction) {
      if (player.y >= this.y + 15) {
        this.y += 1;
      } else if (player.y <= this.y + 15) {
        this.y -= 1;
      }

    } else { // TURN LEFT
      if (player.y >= this.y + 15) {
        this.y += 1;
      } else if (player.y <= this.y + 15) {
        this.y -= 1;
      }
    }
  }
  collide() {
    if (this.direction) {
      if (this.x + 80 >= player.x
        && this.x <= player.x
        && this.y - 30 <= player.y
        && this.y + 50 >= player.y) {
        this.attack(Math.floor(this.damage / 2));
        player.x += 20;
      }
    } else {
      if (this.x + 100 >= player.x
        && this.x <= player.x
        && this.y - 30 <= player.y
        && this.y + 50 >= player.y) {
        this.attack(Math.floor(this.damage / 2));
        player.x -= 20;
      }
    }
  }
  update() {
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < 7) {
        // Go to the next frame
        this.frameIndex += 1;
      } else if (true) {
        this.frameIndex = 0;
      }
    };
  }
  render() {
    if (this.direction) {
      canvas.context.drawImage(snakeImg,
        this.frameIndex * 328 / 8,
        0,
        41, 25,
        this.x, this.y,
        41 * this.scale, 25 * this.scale);
    } else {
      canvas.context.drawImage(snakeImg,
        this.frameIndex * 328 / 8,
        25,
        41, 25,
        this.x, this.y,
        41 * this.scale, 25 * this.scale);
    }
  }
  updateAttackMove() {
    this.tickCountAttack += 1;
    if (this.tickCountAttack > this.ticksPerFrameAttack) {
      this.tickCountAttack = 0;
      if (this.attackIndex < 8) {
        // Go to the next frame
        this.attackIndex += 1;
      } else if (true) {
        this.attackIndex = 0;
        this.isAttacking = false;
        this.isWalking = true;
      }
    }
  }
  renderAttackMove() {
    snakeImg.src = `./monsters/snake/atack_49x34.png`;
    if (this.direction) {
      canvas.context.drawImage(snakeImg,
        this.attackIndex * 441 / 9,
        0,
        49, 34,
        this.x, this.y,
        49 * this.scale, 34 * this.scale);
      if (this.attackIndex === 6) {
        this.attack(this.damage);
      }
    } else {
      canvas.context.drawImage(snakeImg,
        this.attackIndex * 441 / 9,
        34,
        49, 34,
        this.x, this.y,
        49 * this.scale, 34 * this.scale);
      if (this.attackIndex === 7) {
        this.attack(this.damage);
      }
    }
  }
}

// GIANT BEE ===========================
class GiantBee extends Monster {
  constructor(name, health, energy, damage, speed) {
    super(name, health, energy, damage, speed)
    // GIANT BEE MOVE----
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 2;
    this.scale = 2;
    // GIANT BEE ATTACK MOVE----
    this.attackIndex = 0;
    this.tickCountAttack = 0;
    this.ticksPerFrameAttack = 2;
    this.exp = 350;
  }
  attack(damage) {
    player.receiveDamage(damage);
  }
  pathFinder(player) {
    giantBeeImg.src = `./monsters/giante bee/walking_56x45.png`;
    if (player.x > this.x) { //MOVE TO THE RIGHT
      this.x += this.speed;
      this.direction = true;
    }
    else if (player.x < this.x) { // MOVE TO THE LEFT
      this.x -= this.speed;
      this.direction = false;
    }
    // TURN RIGHT
    if (this.direction) {
      if (player.y >= this.y + 15) {
        this.y += this.speed;
      } else if (player.y <= this.y + 15) {
        this.y -= this.speed;
      }

    } else { // TURN LEFT
      if (player.y >= this.y + 15) {
        this.y += this.speed;
      } else if (player.y <= this.y + 15) {
        this.y -= this.speed;
      }
    }
  }
  collide() {
    if (this.direction) {
      if (this.x + 80 >= player.x
        && this.x <= player.x
        && this.y - 30 <= player.y
        && this.y + 50 >= player.y) {
        this.attack(Math.floor(this.damage / 2));
        player.x += 20;
      }
    } else {
      if (this.x + 100 >= player.x
        && this.x <= player.x
        && this.y - 30 <= player.y
        && this.y + 50 >= player.y) {
        this.attack(Math.floor(this.damage / 2));
        player.x -= 20;
      }
    }
  }
  update() {
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < 3) {
        // Go to the next frame
        this.frameIndex += 1;
      } else if (true) {
        this.frameIndex = 0;
      }
    };
  }
  render() {
    if (this.direction) {
      canvas.context.drawImage(giantBeeImg,
        this.frameIndex * 224 / 4,
        0,
        56, 45,
        this.x, this.y,
        56 * this.scale, 45 * this.scale);
    } else {
      canvas.context.drawImage(giantBeeImg,
        this.frameIndex * 224 / 4,
        45,
        56, 45,
        this.x, this.y,
        56 * this.scale, 45 * this.scale);
    }
  }
  updateAttackMove() {
    this.tickCountAttack += 1;
    if (this.tickCountAttack > this.ticksPerFrameAttack) {
      this.tickCountAttack = 0;
      if (this.attackIndex < 3) {
        // Go to the next frame
        this.attackIndex += 1;
      } else if (true) {
        this.attackIndex = 0;
        this.isAttacking = false;
        this.isWalking = true;
      }
    }
  }
  renderAttackMove() {
    giantBeeImg.src = `monsters/giante bee/atack_70x49.png`;
    if (this.direction) {
      canvas.context.drawImage(giantBeeImg,
        this.attackIndex * 280 / 4,
        0,
        70, 49,
        this.x, this.y,
        70 * this.scale, 49 * this.scale);
      if (this.attackIndex === 3) {
        this.attack(this.damage);
      }
    } else {
      canvas.context.drawImage(giantBeeImg,
        this.attackIndex * 280 / 4,
        49,
        70, 49,
        this.x, this.y,
        70 * this.scale, 49 * this.scale);
      if (this.attackIndex === 3) {
        this.attack(this.damage);
      }
    }
  }
}

// GOBLIN ==============================
class Goblin extends Monster {
  constructor(name, health, energy, damage, speed) {
    super(name, health, energy, damage, speed)
    this.x = 0;
    // GOBLIN MOVE----
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 10;
    this.scale = 2;
    // GOBLIN ATTACK MOVE----
    this.attackIndex = 0;
    this.tickCountAttack = 0;
    this.ticksPerFrameAttack = 1;
    this.exp = 100;
  }
  attack(damage) {
    player.receiveDamage(damage);
  }
  pathFinder(player) {
    goblinImg.src = `./monsters/goblin/walking_10x15.png`;
    if (player.x - 10 > this.x) { //MOVE TO THE RIGHT
      this.x += this.speed;
      this.direction = true;
    }
    else if (player.x + 10 < this.x) { // MOVE TO THE LEFT
      this.x -= this.speed;
      this.direction = false;
    } else { // TURN LEFT
      if (player.y >= this.y + 15) {
        this.y += this.speed;
      } else if (player.y <= this.y + 15) {
        this.y -= this.speed;
      }
    }
  }
  collide() {
    if (this.direction) {
      if (this.x + 20 >= player.x
        && this.x - 20 <= player.x
        && this.y - 15 <= player.y
        && this.y + 15 >= player.y) {
        this.attack(Math.floor(this.damage / 2));
        player.x += 20;
      }
    } else {
      if (this.x + 20 >= player.x
        && this.x - 10 <= player.x
        && this.y - 15 <= player.y
        && this.y + 15 >= player.y) {
        this.attack(Math.floor(this.damage / 2));
        player.x -= 20;
      }
    }
  }
  update() {
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < 1) {
        // Go to the next frame
        this.frameIndex += 1;
      } else if (true) {
        this.frameIndex = 0;
      }
    };
  }
  render() {
    if (this.direction) {
      canvas.context.drawImage(goblinImg,
        this.frameIndex * 20 / 2,
        0,
        10, 15,
        this.x, this.y,
        10 * this.scale, 15 * this.scale);
    } else {
      canvas.context.drawImage(goblinImg,
        this.frameIndex * 20 / 2,
        15,
        10, 15,
        this.x, this.y,
        10 * this.scale, 15 * this.scale);
    }
  }
  updateAttackMove() {
    this.tickCountAttack += 1;
    if (this.tickCountAttack > this.ticksPerFrameAttack) {
      this.tickCountAttack = 0;
      if (this.attackIndex < 4) {
        // Go to the next frame
        this.attackIndex += 1;
      } else if (true) {
        this.attackIndex = 0;
        this.isAttacking = false;
        this.isWalking = true;
      }
    }
  }
  renderAttackMove() {
    goblinImg.src = `monsters/goblin/atack_18x15.png`;
    if (this.direction) {
      canvas.context.drawImage(goblinImg,
        this.attackIndex * 90 / 5,
        0,
        18, 15,
        this.x, this.y,
        18 * this.scale, 15 * this.scale);
      if (this.attackIndex === 4) {
        this.attack(this.damage);
      }
    } else {
      canvas.context.drawImage(goblinImg,
        this.attackIndex * 90 / 5,
        15,
        18, 15,
        this.x, this.y,
        18 * this.scale, 15 * this.scale);
      if (this.attackIndex === 4) {
        this.attack(this.damage);
      }
    }
  }
}

// SLIME ===============================
class Slime extends Monster {
  constructor(name, health, energy, damage, speed) {
    super(name, health, energy, damage, speed)
    this.x = 0;
    // SLIME MOVE----
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 5;
    this.scale = 2;

    // SLIME ATTACK MOVE----
    this.attackIndex = 0;
    this.tickCountAttack = 0;
    this.ticksPerFrameAttack = 5;
    this.exp = 20;
  }
  attack(damage) {
    player.receiveDamage(damage);
  }
  pathFinder(player) {
    slimeImg.src = `./monsters/slimes/walking_13x13.png`;
    if (player.x > this.x) { //MOVE TO THE RIGHT
      this.x += this.speed;
      this.direction = true;
    }
    else if (player.x < this.x) { // MOVE TO THE LEFT
      this.x -= this.speed;
      this.direction = false;
    }
    // TURN RIGHT
    if (this.direction) {
      if (player.y >= this.y) {
        this.y += this.speed;
      } else if (player.y <= this.y) {
        this.y -= this.speed;
      }

    } else { // TURN LEFT
      if (player.y >= this.y) {
        this.y += this.speed;
      } else if (player.y <= this.y) {
        this.y -= this.speed;
      }
    }
  }
  collide() {
    if (this.direction) {
      if (this.x + 20 >= player.x
        && this.x - 20 <= player.x
        && this.y - 30 <= player.y
        && this.y + 50 >= player.y) {
        this.attack(Math.floor(this.damage / 2));
        player.x += 20;
      }
    } else {
      if (this.x + 20 >= player.x
        && this.x - 10 <= player.x
        && this.y - 30 <= player.y
        && this.y + 50 >= player.y) {
        this.attack(Math.floor(this.damage / 2));
        player.x -= 20;
      }
    }
  }
  update() {
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < 2) {
        // Go to the next frame
        this.frameIndex += 1;
      } else if (true) {
        this.frameIndex = 0;
      }
    };
  }
  render() {
    if (this.direction) {
      canvas.context.drawImage(slimeImg,
        this.frameIndex * 39 / 3,
        0,
        13, 13,
        this.x, this.y,
        13 * this.scale, 13 * this.scale);
    } else {
      canvas.context.drawImage(slimeImg,
        this.frameIndex * 39 / 3,
        13,
        13, 13,
        this.x, this.y,
        13 * this.scale, 13 * this.scale);
    }
  }
  updateAttackMove() {
    this.tickCountAttack += 1;
    if (this.tickCountAttack > this.ticksPerFrameAttack) {
      this.tickCountAttack = 0;
      if (this.attackIndex < 7) {
        // Go to the next frame
        this.attackIndex += 1;
      } else if (true) {
        this.attackIndex = 0;
        this.isAttacking = false;
        this.isWalking = true;
      }
    }
  }
  renderAttackMove() {
    slimeImg.src = `./monsters/slimes/atack_18x16.png`;
    if (this.direction) {
      canvas.context.drawImage(slimeImg,
        this.attackIndex * 144 / 8,
        0,
        18, 16,
        this.x, this.y,
        18 * this.scale, 16 * this.scale);
    } else {
      canvas.context.drawImage(slimeImg,
        this.attackIndex * 144 / 8,
        16,
        18, 16,
        this.x, this.y,
        18 * this.scale, 16 * this.scale);
    }
  }
}
class SlimeGlob extends Slime {
  constructor(x, y, damage, speed, direction) {
    super();
    this.x = x;
    this.y = y;
    this.damage = damage;
    this.speed = speed;
    this.direction = direction;
  }
  attack(damage) {
    player.receiveDamage(damage);
  }
  move() {
    if (this.direction) {
      this.x += this.speed;
    }
    else {
      this.x -= this.speed;
    }
  }
  collide() {
    if (this.direction) {
      if (this.x + 20 >= player.x
        && this.x - 20 <= player.x
        && this.y - 40 <= player.y
        && this.y + 10 >= player.y) {
        this.attack(Math.floor(this.damage / 2));
        return true;
      }
      if (this.x >= 1000) {
        return true
      }
    } else {
      if (this.x + 20 >= player.x
        && this.x - 10 <= player.x
        && this.y - 40 <= player.y
        && this.y + 10 >= player.y) {
        this.attack(Math.floor(this.damage / 2));
        return true;
      }
      if (this.x <= 0) {
        return true
      }
    }
    return false;
  }
  update() {
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < 0) {
        // Go to the next frame
        this.frameIndex += 1;
      } else if (true) {
        this.frameIndex = 0;
      }
    };
  }
  render() {
    slimeGlobImg.src = `./monsters/slimes/ball_4x4.png`;
    if (this.direction) {
      canvas.context.drawImage(slimeGlobImg,
        0,
        0,
        2, 2,
        this.x, this.y,
        2 * this.scale * 2, 2 * this.scale * 2);
    } else {
      canvas.context.drawImage(slimeGlobImg,
        0,
        3,
        2, 2,
        this.x, this.y,
        2 * this.scale * 2, 2 * this.scale * 2);
    }
  }
}

