/**
 * A class to avoid performing DRY.
 * @public {string} name Robot's name. Can only be set once. 
 * @public {number} health Robot's remaining health.
 * @public {number} attack Robot's attack power.
 */
class Robot {
  constructor(name, health, attack) {
    this._data = {
      name: name,
      health: health,
      attack: attack
    };
  }

  get name() {
    return this._data.name;
  }

  set name(name) {
    if(!this._data.name) {
      this._data.name = name;
    } else {
      console.log('Robot\'s name may only be set once.')
    }
  }
  
  get health() {
    return this._data.health;
  }
  set health(health) {
    health = health >= 0 ? health : 0;
    const isZero = health === 0;
    this._data.health = health;
    if(isZero) {
      console.log(`${this.name} has died!`);
    } else {
      console.log(`${this.name} has ${this.health} left`);
    }
  }

  get isAlive() {
    return this._data.health >= 1 ? true : false;
  }

  get attack() {
    return this._data.attack
  }
  set attack(attack) {
    this._data.attack = attack >= 0 ? attack : 0;
  }

  aliveCheck(anotherRobot) {
    if(!this.isAlive) {
      console.log(`${this.name} is dead, so they cannot perform that action.`);
      return false;
    } else if(!anotherRobot.isAlive) {
      console.log(`${anotherRobot.name} is dead, so ${this.name} cannot do that to them.`);
      return false;
    }

    return true;
  }

  hit(anotherRobot) {
    if(!this.aliveCheck(anotherRobot)) {
      return;
    }
    anotherRobot.health = anotherRobot.health - this.attack;
  }
}

const player = new Robot('Jon', 100, 10);
const enemy = new Robot('Roberto', 50, 12);

function fight() {
  console.log('Welcome to Robot Gladiators!');
  player.hit(enemy)
  player.hit(enemy)
  player.hit(enemy)
  player.hit(enemy)
  player.hit(enemy)
}

fight();
