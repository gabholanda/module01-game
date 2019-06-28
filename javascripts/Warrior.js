class Warrior extends Player {
  constructor(job, health, mana, strength, agility, intelligence) {
    super(job, health, mana, strength, agility, intelligence)
    this.x = 500;
    this.y = 250;
    // All Warrior Flags
    this.direction = true;
    this.isAttacking = false;
    this.isWalking = true;
    this.skill = true;
    // Warrior Movement----
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 0;
    this.scale = 2;

    // Warrior ATTACK MOVE----
    this.attackIndex = 0;
    this.tickCountAttack = 0;
    this.ticksPerFrameAttack = 4;
  }
  attack(e) {
    if (e.keyCode === 90) {
      this.isAttacking = true;
      this.isWalking = false;
      this.skill = true;
      this.updateAttackMove();
    } else if (e.keyCode === 88 && this.mana >= 100) {
      this.isAttacking = true;
      this.isWalking = false;
      this.skill = false;
      warriorSkill = true
      Blast();
      this.manaCost();
      this.updateAttackMove();
    }
  }
  dealDamage() {
    // ======== FATAL STRIKE HITBOX ==================
    if (this.skill) {
      if (this.direction) {
        monsters.forEach(monster => {
          player.x <= monster.x
            && player.x + 40 >= monster.x
            && player.y - 36 <= monster.y
            && player.y + 36 >= monster.y
            ? monster.receiveDamage(this.strength * 1.5) : false;
        })
      }
      else {
        monsters.forEach(monster => {
          player.x >= monster.x
            && player.x - 140 <= monster.x
            && player.y - 36 <= monster.y
            && player.y + 36 >= monster.y
            ? monster.receiveDamage(this.strength * 1.5) : false;
        })
      }
    }
  }
  manaCost() {
    if (!this.skill) {
      this.mana -= 100;
      if (this.mana <= 0) {
        this.mana = 0;
      }
    }
  }
  receiveDamage(damage) {
    this.health -= damage;
    canvas.context.fillText(`-${damage}`, this.x - 15, this.y - 16)
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
    playerImg.src = `players/Warrior/Move_Set/Warrior_Actions_59x37.png`;
    if (this.direction) {
      canvas.context.drawImage(playerImg,
        this.frameIndex * 354 / 6,
        0,
        59, 37,
        this.x - 59, this.y - 37,
        59 * this.scale, 37 * this.scale);
    } else {
      canvas.context.drawImage(playerImg,
        this.frameIndex * 354 / 6,
        37,
        59, 37,
        this.x - 59, this.y - 37,
        59 * this.scale, 37 * this.scale);
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
        this.dealDamage();
      }
    };
  }
  renderAttackMove() {

    // ========================  FATAL STRIKE  ====================================
    if (this.skill) {
      if (this.direction) {
        canvas.context.drawImage(playerImg,
          this.attackIndex * 354 / 6,
          74,
          59, 37,
          this.x - 59, this.y - 37,
          59 * this.scale, 37 * this.scale);

      } else {
        canvas.context.drawImage(playerImg,
          this.attackIndex * 354 / 6,
          111,
          59, 37,
          this.x - 59, this.y - 37,
          59 * this.scale, 37 * this.scale);
      }
    }
    // =================== END FATAL STRIKE  ===========================================
    // =================== START SWORDBLAST ===========================================
    else {
      if (this.direction) {
        canvas.context.drawImage(playerImg,
          this.attackIndex * 354 / 6,
          74,
          59, 37,
          this.x - 59, this.y - 37,
          59 * this.scale, 37 * this.scale);
        if (this.attackIndex === 6) {
          warriorSkill = true;
        }
      } else {
        canvas.context.drawImage(playerImg,
          this.attackIndex * 354 / 6,
          111,
          59, 37,
          this.x - 59, this.y - 37,
          59 * this.scale, 37 * this.scale);
        if (this.attackIndex === 6) {
          warriorSkill = true;
        }
      }
    }
    // =================== END SWORDBLAST ===========================================
  }
  animationReset() {
    this.attackIndex = 0;
  }
}


class SwordBlast {
  constructor(x, y, damage, speed, direction) {
    this.x = x;
    this.y = y;
    this.damage = damage;
    this.speed = speed;
    this.direction = direction;

    // SwordBlast Frames
    this.frameIndex = 1;
    this.tickCount = 0;
    this.ticksPerFrame = 0;
    this.scale = 2;
    this.collided = false;
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
    // Monster Collisions
    monsters.forEach(monster => {
      if (this.direction) {
        if (this.x + 20 >= monster.x
          && this.x - 20 <= monster.x
          && this.y - 75 <= monster.y
          && this.y >= monster.y) {
          monster.receiveDamage(Math.floor(this.damage / 2));
          this.collided = true;
          return this.collided;
        }
      } else {
        if (this.x + 20 >= monster.x
          && this.x - 100<= monster.x
          && this.y - 75 <= monster.y
          && this.y >= monster.y) {
          monster.receiveDamage(Math.floor(this.damage / 2));
          //warriorSkill = false;
          this.collided = true;
          return this.collided;
        }
      }
    })
    // Off-Canvas limit Collision
    if (this.x >= 1000) {
      warriorSkill = false;
      this.collided = true;
      return this.collided;
    }
    if (this.x <= 0) {
      warriorSkill = false;
      this.collided = true;
      return this.collided;
    }
    return this.collided;
  }
  update() {
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < 3) {
        // Go to the next frame
        this.frameIndex += 1;
      } else if (true) {
        warriorSkill = false;
        this.frameIndex = 1;
        this.collided = false;
      };
    }
  }
  render() {
    playerAttack.src = `./players/Warrior/Skills/rajada_12x30.png`;
    if (this.collide()) {
      if (this.direction) {
        canvas.context.drawImage(playerAttack,
          this.frameIndex * 36 / 4,
          0,
          12, 30,
          this.x, this.y - 37,
          12 * this.scale, 30 * this.scale);
      } else {
        canvas.context.drawImage(playerAttack,
          this.frameIndex * 36 / 4,
          30,
          12, 30,
          this.x, this.y - 37,
          12 * this.scale, 30 * this.scale);
      }
    } else {
      if (this.direction) {
        canvas.context.drawImage(playerAttack,
          0,
          0,
          12, 30,
          this.x + 35, this.y - 35,
          12 * this.scale, 30 * this.scale);
      } else {
        canvas.context.drawImage(playerAttack,
          0,
          30,
          12, 30,
          this.x - 55, this.y - 35,
          12 * this.scale, 30 * this.scale);
      }
    }
  }
}

function Blast() {
  swordBlast = new SwordBlast(player.x, player.y,
    player.strength * 3, Math.floor(player.agility / 8), player.direction);
}