class Wizard extends Player {
  constructor(job, health, mana, strength, agility, intelligence) {
    super(job, health, mana, strength, agility, intelligence)
    this.x = 500;
    this.y = 250;
    // All Wizard Flags
    this.direction = true;
    this.isAttacking = false;
    this.isWalking = true;
    this.skill = true;
    // Wizard Movement----
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 1;
    this.scale = 2;

    // Wizard ATTACK MOVE----
    this.attackIndex = 0;
    this.tickCountAttack = 0;
    this.ticksPerFrameAttack = 1;
  }
  attack(e) {
    if (e.keyCode === 90 && this.mana >= 40) {
      this.isAttacking = true;
      this.isWalking = false;
      this.skill = true;
      this.updateAttackMove();
    } else if (e.keyCode === 88 && this.mana >= 20) {
      this.isAttacking = true;
      this.isWalking = false;
      this.skill = false;
      this.updateAttackMove();
    }
  }
  dealDamage() {
    // ======== Explosion HITBOX ==================
    if (this.skill) {
      if (this.direction) {
        monsters.forEach(monster => {
          player.x + 140 <= monster.x
            && player.x + 250 >= monster.x
            && player.y - 36 <= monster.y
            && player.y + 36 >= monster.y
            ? monster.receiveDamage(this.intelligence * 2) : false;
        })
      } else {
        monsters.forEach(monster => {
          player.x - 140 >= monster.x
            && player.x - 280 <= monster.x
            && player.y - 36 <= monster.y
            && player.y + 36 >= monster.y
            ? monster.receiveDamage(this.intelligence * 2) : false;
        })
      }
    }
    // ================= ICE WAVE HIT BOX =========================
    else {
      if (this.direction) {
        monsters.forEach(monster => {
          if (player.x <= monster.x
            && player.x + 160 >= monster.x
            && player.y - 26 <= monster.y
            && player.y + 26 >= monster.y) {
            monster.receiveDamage(Math.floor(this.intelligence * 1.25))
            monster.x += 30;
          }
        })
      } else {
        monsters.forEach(monster => {
          if (player.x >= monster.x
            && player.x - 230 <= monster.x
            && player.y - 26 <= monster.y
            && player.y + 26 >= monster.y) {
            monster.receiveDamage(Math.floor(this.intelligence * 1.25))
            monster.x -= 30;
          }
        })
      }
    }
  }
  receiveDamage(damage) {
    this.health -= damage;
    canvas.context.fillText(`-${damage}`, this.x, this.y - 10)
  }
  manaCost() {
    if (this.skill) {
      this.mana -= 40;
      if (this.mana <= 0) {
        this.mana = 0;
      }
    } else {
      this.mana -= 20;
      if (this.mana <= 0) {
        this.mana = 0;
      }
    }
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
      if (this.frameIndex < 4 - 1) {
        // Go to the next frame
        this.frameIndex += 1;
      } else if (true) {
        this.frameIndex = 0;
      }
    };
  }
  render() {
    playerImg.src = `./players/Wizard/Move_Set/Wizard_walking_11x21.png`;
    if (this.direction) {
      canvas.context.drawImage(playerImg,
        this.frameIndex * 44 / 4,
        0,
        11, 21,
        this.x, this.y,
        11 * this.scale, 21 * this.scale);
    } else {
      canvas.context.drawImage(playerImg,
        this.frameIndex * 44 / 4,
        21,
        11, 21,
        this.x, this.y,
        11 * this.scale, 21 * this.scale);
    }
  }
  updateAttackMove() {
    this.tickCountAttack += 1;
    if (this.tickCountAttack > this.ticksPerFrameAttack) {
      this.tickCountAttack = 0;
      if (this.attackIndex < 6) {
        // Go to the next frame
        this.attackIndex += 1;
      } else if (true) {
        this.attackIndex = 0;
        this.isAttacking = false;
        this.isWalking = true;
        this.manaCost();
        this.dealDamage();
      }
    };
  }
  renderAttackMove() {
    playerImg.src = `./players/Wizard/Skills/mover cetro/move_staff_37x25.png`;
    // ========================  EXPLOSION  ====================================
    if (this.skill) {
      playerAttack.src = `players/Wizard/Skills/esplosão/explsaum_32x27.png`;
      if (this.direction) {
        canvas.context.drawImage(playerImg,
          this.attackIndex * 259 / 7,
          0,
          37, 25,
          this.x - 26, this.y - 4,
          37 * this.scale, 25 * this.scale);

        //Wizard Attack Anm
        canvas.context.drawImage(playerAttack,
          this.attackIndex * 160 / 5,
          0,
          32, 27,
          this.x + 200, this.y,
          32 * this.scale, 27 * this.scale
        )
      } else {
        canvas.context.drawImage(playerImg,
          this.attackIndex * 259 / 7,
          25,
          37, 25,
          this.x - 26, this.y - 4,
          37 * this.scale, 25 * this.scale);

        //Wizard Attack ANM L
        canvas.context.drawImage(playerAttack,
          this.attackIndex * 160 / 5,
          0,
          32, 27,
          this.x - 232, this.y,
          32 * this.scale, 27 * this.scale
        )
      }
    }
    // =================== END EXPLOSION  ===========================================

    // =================== START ICE WAVE ===========================================
    else {
      playerAttack.src = `players/Wizard/Skills/gelo/gelo_58x26.png`;
      if (this.direction) {
        canvas.context.drawImage(playerImg,
          this.attackIndex * 259 / 7,
          0,
          37, 25,
          this.x - 26, this.y - 4,
          37 * this.scale, 25 * this.scale);

        //Wizard Attack Anm R
        canvas.context.drawImage(playerAttack,
          this.attackIndex * 290 / 5,
          0,
          58, 26,
          this.x - 50, this.y - 5,
          58 * this.scale * 2, 26 * this.scale
        )
      } else {
        canvas.context.drawImage(playerImg,
          this.attackIndex * 259 / 7,
          25,
          37, 25,
          this.x - 26, this.y - 4,
          37 * this.scale, 25 * this.scale);

        //Wizard Attack ANM L
        canvas.context.drawImage(playerAttack,
          this.attackIndex * 290 / 5,
          26,
          58, 26,
          this.x - 158, this.y - 5,
          58 * this.scale * 2, 26 * this.scale
        )
      }
    }
    // =================== END ICE WAVE ===========================================
  }
  animationReset() {
    this.attackIndex = 0;
  }
}