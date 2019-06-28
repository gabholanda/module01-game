class Summoner extends Player {
  constructor(job, health, mana, strength, agility, intelligence) {
    super(job, health, mana, strength, agility, intelligence)
    this.x = 500;
    this.y = 250;
    // All Summoner Flags
    this.direction = true;
    this.isAttacking = false;
    this.isWalking = true;
    // Summoner Movement----
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 2;
    this.scale = 2;

    // Summoner ATTACK MOVE----
    this.attackIndex = 0;
    this.tickCountAttack = 0;
    this.ticksPerFrameAttack = 4;
  }
  attack(e) {
    if (e.keyCode === 90 && !summonSkill && this.mana >= 100) {
      this.isAttacking = true;
      this.isWalking = false;
      this.updateAttackMove();
    }
  }
  receiveDamage(damage) {
    this.health -= damage;
    canvas.context.fillText(`-${damage}`, this.x, this.y)
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
      this.isWalking = true;
      switch (e.keyCode) {
        case 37: // Left
          player.x -= Math.floor(this.agility / 10);
          this.direction = false;
          player.update();
          break;
        case 38: // Up
          player.y -= Math.floor(this.agility / 10);
          player.update();
          break;
        case 39: // Right
          player.x += Math.floor(this.agility / 10);
          this.direction = true;
          player.update();
          break;
        case 40: // Down
          player.y += Math.floor(this.agility / 10);
          player.update();
          break;
        default:
          break;
      }
    }
  }
  manaCost() {
      this.mana -= 100;
      if (this.mana <= 0) {
        this.mana = 0;
      }
    }
  update() {
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < 5) {
        // Go to the next frame
        this.frameIndex += 1;
      } else if (true) {
        this.frameIndex = 0;
      }
    };
  }
  render() {
    playerImg.src = `./players/Summoner/Move_Set/walking_12x18.png`;
    if (this.direction) {
      canvas.context.drawImage(playerImg,
        this.frameIndex * 72 / 6,
        0,
        12, 18,
        this.x, this.y,
        12 * this.scale, 18 * this.scale);
    } else {
      canvas.context.drawImage(playerImg,
        this.frameIndex * 72 / 6,
        18,
        12, 18,
        this.x, this.y,
        12 * this.scale, 18 * this.scale);
    }
  }
  updateAttackMove() {
    this.tickCountAttack += 1;
    if (this.tickCountAttack > this.ticksPerFrameAttack) {
      this.tickCountAttack = 0;
      if (this.attackIndex < 5) {
        // Go to the next frame
        this.attackIndex += 1;
      } else if (true) {
        this.attackIndex = 0;
        this.isAttacking = false;
        this.isWalking = true;
        summonSkill = true;
        this.manaCost();
        Summon()
      }
    };
  }
  renderAttackMove() {

    // ========================  SUMMON BLUE SPIRIT  ====================================
    playerImg.src = `players/Summoner/Skills/summoning/summoning_15x18.png`
    if (this.direction) {
      canvas.context.drawImage(playerImg,
        this.attackIndex * 90 / 6,
        0,
        15, 18,
        this.x, this.y,
        15 * this.scale, 18 * this.scale);

    } else {
      canvas.context.drawImage(playerImg,
        this.attackIndex * 90 / 6,
        18,
        15, 18,
        this.x, this.y,
        15 * this.scale, 18 * this.scale);
    }
    // =================== END SUMMON BLUE SPIRIT  ===========================================
  }
  animationReset() {
    this.attackIndex = 0;
  }
}


class BlueSpirit {
  constructor(x, y, damage, speed, direction) {
    this.x = x;
    this.y = y;
    this.damage = damage;
    this.speed = speed;
    this.direction = direction;
    // BlueSpirit Frames -----
    this.frameIndex = 1;
    this.tickCount = 0;
    this.ticksPerFrame = 5;
    this.scale = 2;
    this.collided = false;
    // BlueSpirit ATTACK MOVE ----
    this.attackIndex = 0;
    this.tickCountAttack = 0;
    this.ticksPerFrameAttack = 4;
    // BlueSpirit CREATION MOVE -----
    this.creationIndex = 0;
    this.tickCountCreation = 0;
    this.ticksPerFrameCreation = 10;
  }
  move() {
    if (this.direction) {
      this.x += this.speed;
    }
    else {
      this.x -= this.speed;
    }
    // Monster Collisions
    monsters.forEach(monster => {
      if (this.direction) {
        if (this.x + 50 >= monster.x
          && this.x - 50 <= monster.x
          && this.y - 40 <= monster.y
          && this.y + 40 >= monster.y) {
          this.collided = true;
          summonMode = 3;
        }
      } else {
        if (this.x + 50 >= monster.x
          && this.x - 50 <= monster.x
          && this.y - 40 <= monster.y
          && this.y + 40 >= monster.y) {
          this.collided = true;
          summonMode = 3;
        }
      }
    })
    // Off-Canvas limit Collision
    if (this.x >= 1000) {
      summonSkill = false;
      this.collided = true;
    }
    if (this.x <= 0) {
      summonSkill = false;
      this.collided = true;
    }
  }
  collide() {
    // Monster Collisions
    monsters.forEach(monster => {
      if (this.direction) {
        if (this.x + 50 >= monster.x
          && this.x - 50 <= monster.x
          && this.y - 100 <= monster.y
          && this.y + 100 >= monster.y) {
          monster.receiveDamage(Math.floor(this.damage));
        }
      } else {
        if (this.x + 50 >= monster.x
          && this.x - 50 <= monster.x
          && this.y - 100 <= monster.y
          && this.y + 100 >= monster.y) {
          monster.receiveDamage(Math.floor(this.damage));
        }
      }
    })
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
        this.collided = false;
      };
    }
  }
  updateCreation() {
    this.tickCountCreation += 1;
    if (this.tickCountCreation > this.ticksPerFrameCreation) {
      this.tickCountCreation = 0;
      if (this.creationIndex < 3) {
        // Go to the next frame
        this.creationIndex += 1;
      } else if (true) {
        this.creationIndex = 0;
        summonMode = 2;
      };
    }
  }
  updateAttack() {
    this.tickCountAttack += 1;
    if (this.tickCountAttack > this.ticksPerFrameAttack) {
      this.tickCountAttack = 0;
      if (this.attackIndex < 3) {
        // Go to the next frame
        this.attackIndex += 1;
      } else if (true) {
        this.attackIndex = 0;
        summonMode = 1;
        summonSkill = false;
        this.collide();
      };
    }
  }
  render() {
    // RENDER BLUE SPIRIT EXPLOSION --------------------
    if (summonMode === 3) {
      playerAttack.src = `players/Summoner/Skills/summon_move_set/png atk/atack_17x16.png`;
      if (this.direction) {
        canvas.context.drawImage(playerAttack,
          this.attackIndex * 102 / 6,
          0,
          17, 16,
          this.x, this.y - 20,
          17 * this.scale * 2, 16 * this.scale * 2);
      } else {
        canvas.context.drawImage(playerAttack,
          this.attackIndex * 102 / 6,
          16,
          17, 16,
          this.x, this.y,
          17 * this.scale * 2, 16 * this.scale * 2);
      } // RENDER BLUE SPIRIT WALKING -------------------
    } else if (summonMode === 2) {
      playerAttack.src = `./players/Summoner/Skills/summon_move_set/png walk/walking_14x16.png`;
      if (this.direction) {
        canvas.context.drawImage(playerAttack,
          this.frameIndex * 56 / 4,
          0,
          14, 16,
          this.x + 25, this.y,
          14 * this.scale, 16 * this.scale);
      } else {
        canvas.context.drawImage(playerAttack,
          this.frameIndex * 56 / 4,
          16,
          14, 16,
          this.x - 25, this.y,
          14 * this.scale, 16 * this.scale);
      }
    } // RENDER BLUE SPIRIT BORNING -------------------
    else {
      playerAttack.src = `./players/Summoner/Skills/creation/creation_13x16.png`;
      if (this.direction) {
        canvas.context.drawImage(playerAttack,
          this.creationIndex * 104 / 8,
          0,
          13, 16,
          this.x + 20, this.y + 6,
          13 * this.scale, 16 * this.scale);
      } else {
        canvas.context.drawImage(playerAttack,
          this.creationIndex * 104 / 8,
          16,
          13, 16,
          this.x - 20, this.y + 6,
          13 * this.scale, 16 * this.scale);
      }
    }
  }
}
// let playerImg = new Image();
// let playerAttack = new Image()

function Summon() {
  blueSpirit = new BlueSpirit(player.x, player.y,
    player.intelligence * 3, Math.floor(player.agility / 18), player.direction);
}