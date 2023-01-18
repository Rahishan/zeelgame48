var bg,bgimg
var ground1,ground2,invisibleGround
var monkeyRunning,monkeyStanding,monkey
var playButton,playButtonImg  
var gameState="start"
var obstacle,obstacleImg1,obstacleImg2
var fruits, fruit1, fruit2,fruit3,fruit4,fruit5 
var winningSound, losingSound, jumpSound, collectSound, hitSound, playSound
var fruitGroup,obstacleGroup
var distance=0
var fruitsCollected =0
var gameOver,gameOverImg
var restart,restartImg



function preload(){
  titleImg=loadImage("title.png")
 bgimg=loadImage("./Monkey go Happy files/jungle.jpg")
 monkeyRunning=loadAnimation("./Monkey go Happy files/Monkey_01.png","./Monkey go Happy files/Monkey_02.png",
 "./Monkey go Happy files/Monkey_03.png","./Monkey go Happy files/Monkey_04.png",
 "./Monkey go Happy files/Monkey_05.png", "./Monkey go Happy files/Monkey_06.png",
 "./Monkey go Happy files/Monkey_07.png","./Monkey go Happy files/Monkey_08.png",
 "./Monkey go Happy files/Monkey_09.png","./Monkey go Happy files/Monkey_10.png");
 monkeyStanding=loadAnimation("./Monkey go Happy files/Monkey_10.png")
 playButtonImg=loadImage("gamestart.png")
 obstacleImg1=loadImage("monsters.png")
 obstacleImg2=loadImage("./Monkey go Happy files/stone.png")
 fruit1=loadImage("apple.png")
 fruit2=loadImage("banana.png")
 fruit3=loadImage("grape.png")
 fruit4=loadImage("mango.png")
 fruit5=loadImage("orange.png")
 winningSound=loadSound("winning.mp3")
 losingSound=loadSound("losing.wav")
 jumpSound=loadSound("jumping.wav")
 collectSound=loadSound("collect.wav")
 hitSound=loadSound("hitobstacle.wav")
 playSound=loadSound("playbutton.wav")
 gameOverImg=loadImage("gameover.png")
 restartImg=loadImage("restart.png")
}

function setup() {
createCanvas(windowWidth,windowHeight)

bg=createSprite(width/2,height/2,width,height)
bg.addImage(bgimg)
bg.scale=3
bg.x=width/2
bg.velocityX=0

ground1=createSprite(windowWidth/2,windowHeight-10,windowWidth,50)
ground1.shapeColor="grey"

ground2=createSprite(windowWidth/2,windowHeight-5,windowWidth,10)
ground2.shapeColor="brown"

invisibleGround=createSprite(windowWidth/2,windowHeight-10,windowWidth,20)
invisibleGround.shapeColor="black"
invisibleGround.visible=false

title=createSprite(windowWidth/2,55,50,50)
title.addImage(titleImg)
title.scale=1.4

monkey=createSprite(80,windowHeight-90,50,50)
monkey.addAnimation("running",monkeyRunning)
monkey.addAnimation("standing",monkeyStanding)
monkey.scale=0.2

monkeyRunning.playing=false
monkeyRunning.looping=false
monkeyRunning.frameDelay=0

playButton=createSprite(windowWidth/2,windowHeight/2,50,50)
playButton.addImage(playButtonImg)
playButton.scale=1.4
playButton.visible=true   

gameOver = createSprite(width/2,height/2- 50);
gameOver.addImage(gameOverImg);
gameOver.scale=1.4

restart = createSprite(width/15,55);
restart.addImage(restartImg);
restart.scale=0.3

gameOver.visible = false;
restart.visible = false;

fruitGroup=new Group()
obstacleGroup= new Group()
}

function draw() {
  background("green")
  drawSprites();

  textSize(20)
  fill("white")
  text("Distance:"+distance,width-200,50)
  text("Fruits Collected:"+fruitsCollected,width-200,75)

  if(gameState==="start"){
   monkey.changeAnimation("standing",monkeyStanding)
   if(mousePressedOver(playButton)){
     gameState="play"
     playSound.play()
   }
  }
 
  if(gameState==="play"){
    monkey.changeAnimation("running",monkeyRunning)
   distance=distance+Math.round(frameCount/80);
   
   bg.velocityX=-4
   playButton.visible=false 
   
 
   if(bg.x<0){
     bg.x=width/2
   }
 
  if((keyDown("SPACE")) && monkey.y  >= height/2) {
     jumpSound.play() 
     monkey.velocityY = -10;
      
   }
   
   monkey.velocityY = monkey.velocityY + 0.8
   if(monkey.isTouching(fruitGroup)){
    fruitGroup.remove(fruitGroup[0])
   
      fruitsCollected+=1
     
      collectSound.play()
   }

   if(monkey.isTouching(obstacleGroup)){
    gameState="end"
    losingSound.play()
 }
 
   spawnObstacles()
   spawnFruits()
  }
 
  if(gameState==="end"){
    monkey.changeAnimation("standing",monkeyStanding)
    gameOver.visible = true;
    restart.visible = true;
    bg.velocityX=0
    fruitGroup.setVelocityXEach(0)
    obstacleGroup.setVelocityXEach(0)
    fruitGroup.setLifetimeEach(-1)
    obstacleGroup.setLifetimeEach(-1)
    if( keyDown("SPACE") || mousePressedOver(restart)) {      
      reset();
  }
   

   
    
  }
  monkey.collide(invisibleGround)
}
function spawnFruits() {
  if(frameCount % 60 === 0) {
    var fruits = createSprite(width,Math.round(random(height-100,height/2-300)),20,30);
    fruits.setCollider('circle',0,0,100)
    fruits.debug = false
  
    fruits.velocityX = -6
  
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: fruits.addImage(fruit1);
              break;
      case 2: fruits.addImage(fruit2);
              break;
      case 3: fruits.addImage(fruit3);
              break;
      case 4: fruits.addImage(fruit4);
              break;
      case 5: fruits.addImage(fruit5);
              break;
    }
               
    fruits.scale = 0.3;
    fruits.lifetime = width/6;
    fruitGroup.add(fruits)
   
  }
}

function spawnObstacles() {
  if(frameCount % 80 === 0) {
    var obstacle = createSprite(width-50,height-80,20,30);
    obstacle.setCollider('circle',0,0,45)
    obstacle.debug = true
  
    obstacle.velocityX = -6 
  
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacleImg1);
              obstacle.scale = 0.5;
                     break;
     case 2: obstacle.addImage(obstacleImg2);
              obstacle.scale = 0.3;
                      break;
      default:break 
    }
           
    obstacle.lifetime = width/6;
    

    obstacleGroup.add(obstacle)
  }
}

function reset(){
  gameState = "start";
  gameOver.visible = false;
  restart.visible = false;
  playButton.visible=true
  
  obstacleGroup.destroyEach();
  fruitGroup.destroyEach();
  
  monkey.changeAnimation("standing",monkeyStanding);
  
  score = 0;
  
}
