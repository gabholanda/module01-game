class Archer extends Player {
  constructor(job, health, mana, strength, agility, intelligence) {
    super(job, health, mana, strength, agility, intelligence)
    this.x = 500;
    this.y = 250;
    // All Archer Flags
    this.direction = true;
    this.isAttacking = false;
    this.isWalking = true;
    this.skill = true;
    // Archer Movement----
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 2;
    this.scale = 2;

    // Archer ATTACK MOVE----
    this.attackIndex = 0;
    this.tickCountAttack = 0;
    this.ticksPerFrameAttack = 1;

    // Archer ARROW SHOWER----
    this.showerMove = 0;
    this.tickCountShowerMove = 0;
    this.ticksPerFrameShowerMove = 1;
    this.showerIndex = 0;
    this.tickCountShower = 0;
    this.ticksPerFrameShower = 2;
  }
  attack(e) {
    if (e.keyCode === 90) {
      this.isAttacking = true;
      this.isWalking = false;
      this.skill = true;
      this.updateAttackMove();
    } else if (e.keyCode === 88) {
      this.isAttacking = true;
      this.isWalking = false;
      this.skill = false;
      this.updateAttackMove();
    }
  }
  dealDamage() {
    // ======== SHOOT ARROW  ==================
    if (this.skill) {
      arrows.push(new Arrow(this.x, this.y + 10,
        Math.ceil(this.strength * 0.4 + this.agility * 0.7),
        Math.ceil(this.agility / 8), this.direction))
    }
    // ================= ARROW SHOWER HITBOX =========================
    else {
      if (this.direction) {
        monsters.forEach(monster => {
          player.x + 140 <= monster.x
            && player.x + 250 >= monster.x
            && player.y - 36 <= monster.y
            && player.y + 36 >= monster.y
            ? monster.receiveDamage(Math.ceil(this.strength * 0.3 + this.agility * 0.4))
            : false;
        })
      } else {
        monsters.forEach(monster => {
          player.x - 140 >= monster.x
            && player.x - 280 <= monster.x
            && player.y - 36 <= monster.y
            && player.y + 36 >= monster.y
            ? monster.receiveDamage(Math.ceil(this.strength * 0.3 + this.agility * 0.4))
            : false;
        })
      }
    }
  }
  manaCost() {
    if (!this.skill) {
      this.mana -= 10;
      if (this.mana <= 0) {
        this.mana = 0;
      }
    }
  }
  receiveDamage(damage) {
    this.health -= damage;
    canvas.context.fillText(`-${damage}`, this.x, this.y - 10)
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
          player.x -= Math.floor(this.agility / 9);
          this.direction = false;
          player.update();
          break;
        case 38: // Up
          player.y -= Math.floor(this.agility / 9);
          player.update();
          break;
        case 39: // Right
          player.x += Math.floor(this.agility / 9);
          this.direction = true;
          player.update();
          break;
        case 40: // Down
          player.y += Math.floor(this.agility / 9);
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
    playerImg.src = `./players/Archer/Move_Set/walking_15x17.png`;
    if (this.direction) {
      canvas.context.drawImage(playerImg,
        this.frameIndex * 90 / 6,
        0,
        15, 17,
        this.x, this.y,
        15 * this.scale, 17 * this.scale);
    } else {
      canvas.context.drawImage(playerImg,
        this.frameIndex * 90 / 6,
        17,
        15, 17,
        this.x, this.y,
        15 * this.scale, 17 * this.scale);
    }
  }

  updateAttackMove() {
    if (this.skill) {
      this.tickCountAttack += 1;
      if (this.tickCountAttack > this.ticksPerFrameAttack) {
        this.tickCountAttack = 0;
        if (this.attackIndex < 10) {
          // Go to the next frame
          if (this.attackIndex === 4) {
            this.dealDamage();
          }
          this.attackIndex += 1;
        } else if (true) {
          this.attackIndex = 0;
          this.isAttacking = false;
          this.isWalking = true;
        }
      };
    } else if (this.mana >= 10) {
      // Arrow Shower Move Animation Start
      this.tickCountShowerMove += 1;
      if (this.tickCountShowerMove > this.ticksPerFrameShowerMove) {
        this.tickCountShowerMove = 0;
        if (this.showerMove < 3) {
          // Go to the next frame
          this.showerMove += 1;
        } else if (true) {
          this.showerMove = 0;
        }
      }
      // Arrow Shower Animation Start
      this.tickCountShower += 1;
      if (this.tickCountShower > this.ticksPerFrameShower) {
        this.tickCountShower = 0;
        if (this.showerIndex < 6) {
          // Go to the next frame
          this.showerIndex += 1
          this.manaCost();
          this.dealDamage();
        } else if (true) {
          this.showerIndex = 0;
          this.isAttacking = false;
          this.isWalking = true;
        }
      };
    } else {
      this.showerMove = 0;
      this.showerIndex = 0;
      this.isAttacking = false;
      this.isWalking = true;
    }
  }
  renderAttackMove() {

    // ======================== SHOOT ARROW  ====================================
    if (this.skill) {
      playerImg.src = `players/Archer/Skills/atack1_19x17.png`;
      if (this.direction) {
        canvas.context.drawImage(playerImg,
          this.attackIndex * 209 / 11,
          0,
          19, 17,
          this.x, this.y,
          19 * this.scale, 17 * this.scale);

      } else {
        canvas.context.drawImage(playerImg,
          this.attackIndex * 209 / 11,
          17,
          19, 17,
          this.x, this.y,
          19 * this.scale, 17 * this.scale);
      }
    } else {
      playerImg.src = `./players/Archer/Skills/atack2_18x17.png `;
      playerAttack.src = `players/Archer/Skills/golden_chower_32x32.png`
      if (this.direction) {
        canvas.context.drawImage(playerImg,
          this.showerMove * 72 / 4,
          0,
          18, 17,
          this.x, this.y,
          18 * this.scale, 17 * this.scale);

        canvas.context.drawImage(playerAttack,
          this.showerIndex * 226 / 7,
          0,
          32, 32,
          this.x + 200, this.y - 15,
          32 * this.scale, 32 * this.scale);

      } else {
        canvas.context.drawImage(playerImg,
          this.showerMove * 72 / 4,
          17,
          18, 17,
          this.x, this.y,
          18 * this.scale, 17 * this.scale);

        canvas.context.drawImage(playerAttack,
          this.showerIndex * 226 / 7,
          0,
          32, 32,
          this.x - 200, this.y - 15,
          32 * this.scale, 32 * this.scale);
      }
    }
    // =================== END FATAL STRIKE  ===========================================
    // =================== START SWORD ENERGY ===========================================
    // =================== END ICE WAVE ===========================================
  }
  animationReset() {
    this.attackIndex = 0;
    this.showerIndex = 0;
    this.showerMove = 0;
  }
}
class Arrow extends Archer {
  constructor(x, y, damage, speed, direction) {
    super();
    this.x = x;
    this.y = y;
    this.damage = damage;
    this.speed = speed;
    this.direction = direction;
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
          && this.y - 40 <= monster.y
          && this.y + 40 >= monster.y) {
          monster.receiveDamage(Math.floor(this.damage / 2));
        }
      } else {
        if (this.x + 20 >= player.x
          && this.x - 10 <= player.x
          && this.y - 40 <= player.y
          && this.y + 40 >= player.y) {
          monster.receiveDamage(Math.floor(this.damage / 2));
        }
      }
    })
    // Off-Canvas limit Collision
    if (this.x >= 1000) {
      return true;
    }
    if (this.x <= 0) {
      return true;
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
    arrowImg.src = `./players/Archer/Skills/flecha_8x3.png`;
    if (this.direction) {
      canvas.context.drawImage(arrowImg,
        0,
        0,
        8, 3,
        this.x, this.y,
        8 * this.scale * 2, 3 * this.scale * 2);
    } else {
      canvas.context.drawImage(arrowImg,
        0,
        3,
        8, 3,
        this.x, this.y,
        8 * this.scale * 2, 3 * this.scale * 2);
    }
  }
}