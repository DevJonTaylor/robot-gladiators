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

  damage(amount) {
    this.health -= amount;
  }
}

class Game {
  constructor(player, enemy) {
    this.player = player;
    this.playerMoney = 10;
    this.enemy = enemy;

    showText(_WELCOME_ALERT_);
  };

  start() {
    if(this.startRound()) {

    }
  }

  robotStats(robotNumber, robot, extra = '') {
    const arr = [
      `ROBOT ${robotNumber}`,
      `NAME: ${robot.name}`,
      `HEALTH: ${robot.health}`
    ]
    if(extra) arr.push(extra);
    return arr.join('\n');
  }

  displayStatus() {
    const robot1 = this.robotStats(1, this.player, `MONEY: ${this.playerMoney}`);
    const robot2 = this.robotStats(2, this.enemy);
    return `${robot1}\n\n${robot2}`;
  }

  startRound() {
    showText(this.displayStatus());
    this.fight();
    showText(this.displayStatus());
  }

  attack(robot1, robot2) {
    showText(`${robot1.name} hits ${robot2.name} for ${robot1.attack}`);
    robot2.damage(robot1.attack);
  }
  
  fight() {
    this.attack(this.player, this.enemy);
    this.attack(this.enemy, this.player);
  }
}

const _PLAYER_NAME_PROMPT_ = 'What is your robot\'s name?';
const _WELCOME_ALERT_ = 'Welcome to Robot Gladiator!';

const _DEV_MODE_ = true;

const playerName = promptText(_PLAYER_NAME_PROMPT_, 'Jon');
const player = new Robot(playerName, 100, 10);
const enemy = new Robot('Roberto', 50, 12);
const game = new Game(player, enemy);

function showText(msg) {
  !_DEV_MODE_ ? window.alert(msg) : console.log(msg);
}

function promptText(msg, _default = 'null') {
  return !_DEV_MODE_ ? window.prompt(msg) : _default; 
}

function boolText(msg, _default = false) {
  return !_DEV_MODE_ ? window.confirm(msg) : _default;
}

game.start();