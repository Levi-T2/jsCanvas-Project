import './style.css'
// @ts-ignore Ignored due to useless VScode yap
import { resources } from './src/Resource.js';
import { Sprite } from './src/Sprite.js';

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

const draw = () => {
  const sky = resources.images.sky;
  if (sky.isLoaded) {
    ctx.drawImage(sky.image, 0, 0)
  }

  const ground = resources.images.ground;
  if (ground.isLoaded) {
    ctx.drawImage(ground.image, 0, 0)
  }

  const hero = new Sprite({
    resource: resources.images.hero,
    hFrames: 3,
    vFrames: 8,
    frame: 1
  })
}

setInterval(() => {
  draw()
}, 400)

// import { setupCounter } from './counter.js'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))