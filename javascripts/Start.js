
//Game STart
let start = false;
let end = false;
//BG Image
let bgImg = new Image();
//Player Img
let monsterImg = new Image;
let monster = new Dragon('Dragon', 200, 400, 50, 10, 100, 75);
let playerImg = new Image;
let player = new Player('Warrior', 1000000, 20, 30, 15, 0, 25, 30);
let canvas = new Canvas();
// canvas.start();


//Map Collision Limit
document.onkeydown = (e) => {
  if (!end) {
  player.move(e)
  }
}
let getCanvas = document.getElementById('canvas');
getCanvas.addEventListener("click", (e) => {
  const pos = {
    x: e.clientX,
    y: e.clientY
  };
  if (pos.x > 458 && pos.x < 608 && pos.y > 208 && pos.y < 308 && !start) {
    canvas.start();
    start = true;
  }
});
