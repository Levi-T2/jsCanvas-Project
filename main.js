import './style.css'
import { resources } from './src/Resource.js';
import { Sprite } from './src/Sprite.js';
import { Vector2 } from './src/Vector2.js';
import { GameLoop } from './src/GameLoop.js';
import { DOWN, Input, LEFT, RIGHT, UP } from './src/Input.js';
import { gridCells, isSpaceFree } from './src/helpers/Grid.js';
import { moveTowards } from './src/helpers/MoveTowards.js';
import { walls } from './src/levels/level1.js';

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

const skySprite = new Sprite({
  resource: resources.images.sky, // Corresponds to the image that we want to draw.
  frameSize: new Vector2(320, 180) // Needs the frameSize of the canvas, which is why we have our vector2.
})

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180)
})

const hero = new Sprite({
  resource: resources.images.hero,
  frameSize: new Vector2(32, 32),
  hFrames: 3,
  vFrames: 8,
  frame: 1, // This value will change the frame from the sprite sheet that the hero is drawn from.
  position: new Vector2(gridCells(6), gridCells(5)) // User our grid cell helper allows for better positioning of the hero.
})

const heroDestinationPosition = hero.position.duplicate();

const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32)
})

const input = new Input();

const update = () => {
  // Updating entities in the game.

  const distance = moveTowards(hero, heroDestinationPosition, 1);
  const hasArrived = distance <= 1;
  // Attempt to move again if the hero is at his position.
  if (hasArrived) {
    tryMove();
  }
};

const tryMove = () => {

  if (!input.direction) {
    return;
  }

  let nextX = heroDestinationPosition.x;
  let nextY = heroDestinationPosition.y;
  const gridSize = 16;

  if (input.direction === DOWN) {
    nextY += gridSize;
    hero.frame = 0;
  }
  if (input.direction === UP) {
    nextY -= gridSize;
    hero.frame = 6;
  }
  if (input.direction === LEFT) {
    nextX -= gridSize;
    hero.frame = 9;
  }
  if (input.direction === RIGHT) {
    nextX += gridSize;
    hero.frame = 3;
  }
  // This if check evaluates wether or not there is a wall present, if it finds one it doesn't update the position of our hero.
  if (isSpaceFree(walls, nextX, nextY)) {
    heroDestinationPosition.x = nextX;
    heroDestinationPosition.y = nextY;
  }
}

const draw = () => {
  skySprite.drawImage(ctx, 0, 0)
  groundSprite.drawImage(ctx, 0, 0)

  // These variables below center the hero in the cell; like centering text in a div.
  const heroOffset = new Vector2(-8, -21);
  const heroPosX = hero.position.x + heroOffset.x;
  const heroPosY = hero.position.y + 1 + heroOffset.y;

  shadow.drawImage(ctx, heroPosX, heroPosY)
  hero.drawImage(ctx, heroPosX, heroPosY);
}

const gameLoop = new GameLoop(update, draw)
gameLoop.start()
