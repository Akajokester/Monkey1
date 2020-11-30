var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){ 
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  

  stop=loadAnimation("sprite_0.png","sprite_1.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
  back=loadImage("ju.PNG");
  
  lines = loadImage("line.PNG")
}



function setup() {
  createCanvas(600, 600);
    ground = createSprite(220,260,200,200)
    ground.addImage(back)
    ground.scale=0.7;
  
  
    monkey = createSprite(50,520,20,50);
    monkey.addAnimation("running", monkey_running);
    monkey.scale = 0.17;

    obstaclesGroup = createGroup();
    foodGroup = createGroup();
  
    li = createSprite(300,580)
    li.addImage(lines)
    li.scale=1.2
    li.visible=false
  
    score=0
  
 
}



function draw() {
  background(180)
  if(gameState===PLAY){
  ground.velocityX = -3
    if(monkey.isTouching(foodGroup)){
  foodGroup.destroyEach();
  score=score+1
    }
  
  if (ground.x < 0){
  ground.x = 590
  }
  if(keyDown("space")&& monkey.y >= 521.81) {
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.4
  monkey.collide(li);
  monkey.lifetime=100
    
    if(monkey.isTouching(obstaclesGroup)){
      gameState=END
    }
    
  eat();
  rock();
    
  }
  else if(gameState===END){
    obstaclesGroup.setVelocityXEach(0)
     foodGroup.setVelocityXEach(0)
    ground.velocityX=0
     foodGroup.setLifetimeEach(-1);
     obstaclesGroup.setLifetimeEach(-1);
    monkey.lifetime=-1
    monkey.velocityY=0
  foodGroup.destroyEach();
  obstaclesGroup.destroyEach();

  }
  
  drawSprites();  
  text("Score : "+ score, 300,50)
}

function eat(){
    if (frameCount % 140 === 0) {
    food = createSprite(600,100,40,10);
    food.y = Math.round(random(330,490));
    food.addImage(bananaImage);
    food.scale = 0.1;
    food.velocityX = -4;
    
     //assign lifetime to the variable
    food.lifetime = 150;
   
    //adding food to the group
   foodGroup.add(food);
    }
}

function rock(){
      if (frameCount % 150 === 0) {
    obstacle = createSprite(600,100,40,10);
    obstacle.y = Math.round(random(520,560));
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -6;
    
     //assign lifetime to the variable
    obstacle.lifetime = 100;
   
    obstacle.setCollider("circle",0,0,160);
    //adding food to the group
   obstaclesGroup.add(obstacle);
    }
  if (monkey.isTouching(obstaclesGroup)){
    obstaclesGroup.velocityX=0
  }
}



