var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score, survialTime;
var ground;


var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {


  //Monkey
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  //Banana
  bananaImage = loadImage("banana.png");
  //Obstacle
  obstacleImage = loadImage("obstacle.png");

}


function setup() {
  createCanvas(400, 400);

  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  TimeGroup = createGroup();

  monkey = createSprite(50, 250, 10, 10);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(70, 350, 800, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;

  score = 0;
  survialTime = 0;

}

function draw() {

  background(180);

  stroke("black");
  fill("black");
  textSize(20);

  text("Survial Time:" + survialTime, 100, 50);

  stroke("black");
  fill("black");
  textSize(20);
  text("Score:" + score, 300, 100);

    monkey.collide(ground);
    if (gameState === PLAY) {
    monkey.changeAnimation("running", monkey_running);

    survialTime = Math.ceil(frameCount / frameRate());


    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

      if (keyDown("space")) {
      monkey.velocityY = -12;
    }

    if (bananaGroup.isTouching(monkey)) {
      bananaGroup.destroyEach();
      score = score + 1;
    }

    monkey.velocityY = monkey.velocityY + 0.8;
    obstacleGroup.setLifetimeEach(-1);

    food();
    obstacles();


    if (obstacleGroup.isTouching(monkey)) {

      gameState = END;

    }
  }
  
  if (gameState === END) {
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    survialTime.visible = false;
    ground.velocityX=0;

    stroke("red");
    fill("red");
    textSize(30);
    text("Game Over", 110, 200);

    stroke("black");
    fill("black");
    textSize(30);
    text("Monkey is dead", 100, 240);
  }
  
  drawSprites();
}

function food() {
  if (frameCount % 150 === 0) {
    banana = createSprite(400, 350, 40, 10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120, 200));
    banana.scale = 0.1;

    banana.velocityX = -3;
    banana.lifetime = 200;

    bananaGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(250, 325, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1;
    obstacleGroup.add(obstacle);
  }

}