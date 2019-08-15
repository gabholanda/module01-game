class Player {
  constructor(job, health, mana, strength, agility, intelligence) {
    this.job = job;
    this.health = health;
    this.maxHealth = health;
    this.mana = mana;
    this.maxMana = mana;
    this.strength = strength;
    this.agility = agility;
    this.intelligence = intelligence;
  }
  receiveExp(monster) {
    this.receivedExp = monster.exp;
    if (this.receivedExp >= this.needExp) {
      this.receivedExp = 0;
      this.needExp = Math.ceil(this.needExp * 1.5);
      this.levelUp();
    }
  }
  interface() {
    canvas.context.fillStyle = 'rgb(74, 59, 65)';
    canvas.context.fillRect(1000, 0, 200, 500);
    canvas.context.font = '18px upheavtt'
    canvas.context.fillStyle = 'rgb(216, 230, 229)';
    canvas.context.fillText(`WAVE: ${wave}`, 1050, 50);
    canvas.context.fillStyle = 'rgb(44, 65, 230)';
    canvas.context.fillText(`MANA:`, 1010, 180);
    canvas.context.fillText(`${this.mana} / ${this.maxMana}`, 1050, 200);
    canvas.context.fillStyle = 'rgb(222, 97, 20)';
    canvas.context.fillText(`STR: ${this.strength}`, 1010, 300);
    canvas.context.fillStyle = 'rgb(151, 199, 40)';
    canvas.context.fillText(`AGI: ${this.agility}`, 1010, 320);
    canvas.context.fillStyle = 'rgb(187, 28, 199)';
    canvas.context.fillText(`INT: ${this.intelligence}`, 1010, 340);
    canvas.context.fillStyle = 'rgb(199, 45, 18)';
    canvas.context.fillText(`HEALTH:`, 1010, 140)
    canvas.context.fillText(`${this.health} / ${this.maxHealth}`, 1050, 160)
  }
}

