
// Game STart
let start = false;
let end = false;
let pause = false;
// Background
let bgImg = new Image();
let chooseClass = new Image();
bgImg.src = './images/map.png';
chooseClass.src = './images/MENU.png';
let bgMusic;
const bs = true;
bs = "true";
// Sound
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  }
  this.stop = function () {
    this.sound.pause();
  }
}
// Class Choice + Player Setup
let classChosen = true;
let warrior = false;
let warriorSkill = false;
let swordBlast;

let wizard = false;

let archer = false;
let arrowImg = new Image();
let arrows = [];

let summoner = false;
let summonSkill = false;
let summonMode = 1;
let blueSpirit;


let player;
let manaRegen = 0;
let playerImg = new Image();
let playerAttack = new Image();

// Load all Monster images
let dragonImg = new Image();
let dragonAttack = new Image();

let snakeImg = new Image();
let giantBeeImg = new Image();
let goblinImg = new Image();

let slimeImg = new Image();
let slimeGlobImg = new Image();

let monsters = []
let globs = []
// Creates next Monster Wave
function waveGenerator() {
  if (monsters.length === 0) {
    wave += 1;
    player.levelUp();
    for (let i = 0; i < 5; i++) {
      let selector = Math.floor(Math.random() * 5);
      switch (selector) {
        case 0:
          monsters.push(new Dragon('Dragon', 1500, 50, 100, 1));
          break;
        case 1:
          monsters.push(new Snake('Snake', 1250, 100, 125, 2));
          break;
        case 2:
          monsters.push(new GiantBee('Giant Bee', 1000, 100, 75, 1));
          break;
        case 3:
          monsters.push(new Goblin('Goblin', 500, 100, 150, 2));
          break;
        case 4:
          monsters.push(new Slime('Slime', 350, 100, 75, 1));
          break;
        default:
          break;
      }
    }
    monsters.forEach(monster => {
      monster.levelUp();
    })
  }
}
//Canvas Setup
let canvas = new Canvas();
let gameOver = new Image();
let wave = 0;
window.onload = function () {
  canvas.init();
  canvas.update();
};
gameOver.src = './images/GameOver.png';

// Start Game Box
let getCanvas = document.getElementById('canvas');
getCanvas.addEventListener("click", (e) => {
  const pos = {
    x: e.clientX,
    y: e.clientY
  };
  if (pos.x > 1050 && pos.x < 1150 && pos.y > 245 && pos.y < 270 && !start) {
    canvas.start();
    start = true;
    classChosen = false;
  }
});
// Class Choice Menu
let getClass = document.getElementById('canvas');
getClass.addEventListener("click", (e) => {
  const pos = {
    x: e.clientX,
    y: e.clientY
  };
  if (!classChosen) {
    if (pos.x > 350 && pos.x < 450 && pos.y > 100 && pos.y < 240 && !warrior && start) {
      warrior = true;
      player = new Warrior('Warrior', 20000, 100, 150, 100, 1);
      classChosen = true;
    } else if (pos.x > 560 && pos.x < 660 && pos.y > 100 && pos.y < 240 && !wizard && start) {
      wizard = true;
      player = new Wizard('Wizard', 16000, 300, 10, 100, 250);
      classChosen = true;
    } else if (pos.x > 350 && pos.x < 450 && pos.y > 250 && pos.y < 390 && !summoner && start) {
      summoner = true;
      player = new Summoner('Summoner', 18000, 100, 10, 100, 350);
      classChosen = true;
    } else if (pos.x > 560 && pos.x < 660 && pos.y > 250 && pos.y < 390 && !archer && start) {
      archer = true;
      player = new Archer('Archer', 15000, 100, 200, 105, 25);
      classChosen = true;
    }

  }
});

// ========= GAME LOOP ================
function updateGameLoop() {
  if (!classChosen) {
    canvas.updatePreBegin();
  }
  if (pause) {
    canvas.updatePause();
  }
  if (warrior && !pause ||
    wizard && !pause ||
    summoner && !pause ||
    archer && !pause) {
    waveGenerator();
    canvas.update();
    monsters.forEach((monster, index) => {
      monster.collide();
      monster.interface();
      if (monster.health <= 0) {
        monsters.splice(index, 1);
      }
      if (monster.name === 'Dragon') {
        if (player.y === monster.y + 15) {
          monster.isWalking = false;
          monster.renderAttackMove();
          monster.updateAttackMove();
        } else if (!monster.isAttacking) {
          monster.pathFinder(player);
          monster.update();
          monster.render();
        }
      }
      else if (monster.name === 'Snake') {
        if (
          player.x <= monster.x + 100
          && player.x >= monster.x - 25
          && player.y >= monster.y - 20
          && player.y <= monster.y + 30) {
          monster.isWalking = false;
          monster.renderAttackMove();
          monster.updateAttackMove();
        } else if (!monster.isAttacking) {
          monster.pathFinder(player);
          monster.update();
          monster.render();
        }
      } else if (monster.name === 'Giant Bee') {
        if (
          player.x <= monster.x + 100
          && player.x >= monster.x - 25
          && player.y >= monster.y - 20
          && player.y <= monster.y + 30) {
          monster.isWalking = false;
          monster.renderAttackMove();
          monster.updateAttackMove();
        } else if (!monster.isAttacking) {
          monster.pathFinder(player);
          monster.update();
          monster.render();
        }
      } else if (monster.name === 'Goblin') {
        if (
          player.x <= monster.x + 40
          && player.x >= monster.x - 20
          && player.y >= monster.y - 20
          && player.y <= monster.y + 30) {
          monster.isWalking = false;
          monster.renderAttackMove();
          monster.updateAttackMove();
        } else if (!monster.isAttacking) {
          monster.pathFinder(player);
          monster.update();
          monster.render();
        }
      } else if (monster.name === 'Slime') {
        if (player.y >= monster.y - 9 &&
          player.y <= monster.y + 10) {
          monster.isWalking = false;
          monster.renderAttackMove();
          monster.updateAttackMove();
          if (monster.attackIndex === 7) {
            monster.attackIndex = 0;
            globs.push(new SlimeGlob(monster.x - 5, monster.y + 2,
              monster.damage, 2, monster.direction))
          }
        } else if (!monster.isAttacking) {
          monster.pathFinder(player);
          monster.update();
          monster.render();
        }
      }
    })
    globs.forEach((slimeGlobs, index) => {
      slimeGlobs.render();
      slimeGlobs.move();
      if (slimeGlobs.collide()) {
        globs.splice(index, 1);
      }
    })
    //Ending Conditions
    if (player.health <= 0) {
      bgMusic.stop();
      end = true;
    }
    document.onkeydown = (e) => {
      if (e.keyCode === 13 && !pause) {
        pause = true;
      } else if (e.keyCode === 13 && pause) {
        pause = false;
      }
      if (!end) {
        player.playerKeyBinds(e);
      }
    }
    //  Warrior Loop
    if (warrior) {
      if (warriorSkill) {
        if (swordBlast.collided) {
          swordBlast.update();
        }
        swordBlast.render();
        swordBlast.move();
      }
      if (player.mana < player.maxMana) {
        manaRegen += 1;
        if (manaRegen % 45 === 0) {
          player.mana += 1;
          manaRegen = 0;
        }
      }
    }
    // Archer Loop
    else if (archer) {
      arrows.forEach((arrow, index) => {
        arrow.render();
        arrow.move();
        if (arrow.collide()) {
          arrows.splice(index, 1);
        }
      })
      if (player.mana < player.maxMana) {
        manaRegen += 1;
        if (manaRegen % 15 === 0) {
          player.mana += 1;
          manaRegen = 0;
        }
      }
    }
    // Summoner Loop
    else if (summoner) {
      if (summonSkill) {
        if (summonMode === 1) {
          blueSpirit.updateCreation();
        } else if (summonMode === 2) {
          blueSpirit.update();
          blueSpirit.move();
        }
        if (blueSpirit.collided) {
          blueSpirit.updateAttack();
        }
        blueSpirit.render();
      }
      if (player.mana < player.maxMana) {
        manaRegen += 1;
        if (manaRegen % 3 === 0) {
          player.mana += 1;
          manaRegen = 0;
        }
      }
    }
    // Wizard Loop
    else {
      if (player.mana < player.maxMana) {
        manaRegen += 1;
        if (manaRegen % 15 === 0) {
          player.mana += 1;
          manaRegen = 0;
        }
      }
    }

    if (player.isWalking) {
      player.render();
      player.animationReset();
    } else if (player.isAttacking) {
      player.updateAttackMove();
      player.renderAttackMove();
    }
    player.interface();
  }
  if (end) {
    canvas.gameOver();
  } else {
    requestAnimationFrame(updateGameLoop);
  }
}
