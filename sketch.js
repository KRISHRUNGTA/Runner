var trex, trex_running, edges,ground,groundimage,invisibleGround,clouds,cloudImage,obstacle,ob1,ob2,ob3,ob4,ob5,ob6,score=0,gameState="play",cloudgroup,obstaclegroup,trex_Collided,gameover,restart,gameoverImage,restartImage,jumpsound,crashsound,milestone;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png", "trex4.png")
groundimage=loadImage("ground2.png")
  cloudImage=loadImage("cloud.png")
  ob1=loadImage("obstacle1.png")
   ob2=loadImage("obstacle2.png")              
  ob3=loadImage("obstacle3.png")
  ob4=loadImage("obstacle4.png")
  ob5=loadImage("obstacle5.png")
  ob6=loadImage("obstacle6.png")
  trex_Collided=loadAnimation("trex_collided.png")
  gameoverImage=loadImage("gameOver.png")
  restartImage=loadImage("restart.png")
  jumpsound=loadSound("jump.mp3")
  crashsound=loadSound("die.mp3")
  milestone=loadSound("checkPoint.mp3")
  
}



function setup(){
  createCanvas(windowWidth,windowHeight);
  
  
  //console.info("This is an information");
  //console.warn("This is the warning");
  //console.error("This is an error");
  
  
  //trex
  trex= createSprite(50,height-35,20,40);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("collided",trex_Collided);
  trex.debug=true
 trex.setCollider("circle",0,0,40);
  
  //making ground
  ground=createSprite(windowWidth/2,height-20,600,20);
  //ground.velocityX= -10;
  ground.addImage("ground",groundimage);
  edges= createEdgeSprites();
  
  restart=createSprite(windowWidth/2,windowHeight/2)
  restart.addImage("restart",restartImage)
  restart.scale=0.5;
  restart.visible=false;
  
  gameover=createSprite(windowWidth/2,windowHeight/3)
  gameover.addImage("gameover",gameoverImage);
  gameover.visible=false;

invisibleGround=createSprite(300,height-10,600,10);
invisibleGround.visible=false;
obstaclegroup=createGroup();
cloudgroup=createGroup();
  
}


function draw(){
  //console.time();
  background("white");
  if(gameState==="play"){
    //console.log(trex.y);
    
    if(score%100===0 && score>0){
      milestone.play()
      //ground.velocityX=ground.velocityX-1
    }
    ground.velocityX=-10-score/100
    
  //to jump trex

  if((touches.length>0||keyDown("space")) && trex.y>height-40 ){
    
    trex.velocityY= -13;
    jumpsound.play()
    
  }
  
    // gravity
  trex.velocityY =trex.velocityY +0.8;
  
  //infinite scrolling of ground 
  if(ground.x<0){
    ground.x=ground.width/2;
  }
    spawnclouds()
  spawnobstacle()
    
    score=Math.round(getFrameRate()/60)+score
    
  
  
    if(trex.isTouching(obstaclegroup)){
    gameState="Over";
      crashsound.play()
       }
  }
  
  else if(gameState==="Over"){
    ground.velocityX=0;
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    obstaclegroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
    trex.changeAnimation("collided",trex_Collided);
    trex.velocityY=0;
    restart.visible=true;
    gameover.visible=true;
    
    if(mousePressedOver(restart)||touches.length>0){
      reset() 
}
    
  }

  
 // console.count();
  
  //console.log(frameRate());
  
  
  trex.collide(invisibleGround)
  
  
  drawSprites();
  //console.timeEnd();

  
  
  //score=frameCount
  text("score"+score,windowWidth-100,20)
  
  
}

function reset(){
  gameState="play";
  score=0;
  restart.visible=false;
  gameover.visible=false;
  cloudgroup.destroyEach();
  obstaclegroup.destroyEach();
  trex.changeAnimation("running",trex_running);
  
  
}

function spawnclouds(){
  
                       
  if(frameCount%60==0){
    clouds=createSprite(windowWidth,100,40,10);
    clouds.y=Math.round(random(5,height/2))
  clouds.velocityX=ground.velocityX;
    clouds.addImage("clouds",cloudImage)
    clouds.scale=0.9;
    clouds.depth=trex.depth;
    trex.depth=trex.depth+1;
  console.log(clouds.x);
    clouds.lifetime=windowWidth/clouds.velocityX;
    cloudgroup.add(clouds);
  }
  
}

function spawnobstacle(){
  if(frameCount%60==0){
    obstacle=createSprite(windowWidth,height-35,50,50);
    obstacle.velocityX=ground.velocityX;
    obstaclegroup.add(obstacle);
    
    var randN=Math.round(random(1,6))
    
    switch(randN){
      case 1:
        obstacle.addImage(ob1);
        break;
        
        
         case 2:
        obstacle.addImage(ob2);
        break;
        
         case 3:
        obstacle.addImage(ob3);
        break;
        
        case 4:
        obstacle.addImage(ob4);
        break;
        
        case 5:
        obstacle.addImage(ob5);
        break;
        
         case 6:
        obstacle.addImage(ob6);
        break;
        
    }
 obstacle.scale=0.5;
    obstacle.lifetime=windowWidth/obstacle.velocityX;
  }
  
  
}