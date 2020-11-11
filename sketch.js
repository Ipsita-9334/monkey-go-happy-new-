var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var ground, groundImg;
var FoodGroup, obstacleGroup;
var score = 0;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);

  ground = createSprite(300,350,600,10);
  console.log(ground)
  ground.visible = false;
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;

  bananaGroup = new Group();
  obstaclesGroup = new Group();
}


function draw() {
   background(180);

   stroke("white")
   textSize(20);
   fill("white");
   text("Score:" +score,450,50);

    stroke("black")
    textSize(20);
    fill("white");
    survivalTime = Math.ceil(frameCount/frameRate())
    text("Survival Time: "+ survivalTime, 100,50);
  
  
  if(gameState === PLAY){
   
        if (monkey.isTouching(bananaGroup)){   
           score = score + 2;
           bananaGroup.destroyEach();
        }
    
    
        if(keyDown("space")){
           monkey.velocityY = -12;

        }
        monkey.velocityY = monkey.velocityY + 0.9;
    


       if(monkey.isTouching(obstaclesGroup)){
            gameState = END;
        }   

        spawnFruits();
        spawnObstacles();

        monkey.collide(ground);
    
  }
  else if(gameState === END){

    ground.velocityX = 0;
    monkey.velocityY = 0;
    

    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0); 

    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLefetimeEach(-1);

    
  }
  
   
  
 
  
  
  drawSprites();
}

function spawnFruits(){
  if(frameCount % 80 === 0){
    var banana = createSprite(600,200,70,20);
     banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 200;
    banana.velocityX = -4;
     
    bananaGroup.add(banana)
  }
  
  
}

function spawnObstacles(){
   if(frameCount % 100 === 0){
    obstacles = createSprite(600,315,70,20);
    obstacles.addImage(obstaceImage);
    obstacles.scale = 0.1;
     obstacles.lifetime = 200;
     obstacles.velocityX = -4;

   obstaclesGroup.add(obstacles)
   }
  
}
