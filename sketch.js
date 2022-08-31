var player
var playerImg
var playerImg2
var fundo
var backGroundImg
var stoneWall
var stoneWallVertical
var stoneWallVerticalImg
var stoneWallImg
var star
var starImg
var candycane
var candycaneImg 
var ground
var groundImg
var restartImg
var placar=0

var JOGAR = 1;
var ENCERRAR = 0;
var estadoJogo = JOGAR;
var reiniciar;

function preload(){
backGroundImg = loadImage("game images/background 1.png")
playerImg = loadImage("game images/monster-left.png")
playerImg2 = loadImage("game images/monster.gif")
stoneWallImg = loadImage("game images/wall.png")
stoneWallVerticalImg = loadImage("game images/vertical wall.png")
groundImg = loadImage("game images/floor2.jpg")
restartImg = loadImage("game images/restart.png")

}
function setup() {
  createCanvas(1000, 600);
  fundo = createSprite(500,300,1000,600)
  fundo.addImage(backGroundImg)
  fundo.scale=0.3 
fundo.velocityX=-4 


reiniciar = createSprite(500,300,100,60);
reiniciar.addImage("restart",restartImg)
reiniciar.scale=0.3

reiniciar.visible = false;

  player = createSprite(50,500,50,50)
  player.addImage("right",playerImg2)
  player.scale=0.4
  player.setCollider("rectangle",0,0,300,500)







  ground = createSprite(0,590,2000,10)
  ground.addImage(groundImg)
  ground.scale=2
  ground.velocityX=-4


obstacles=new Group(); 
}

function draw() {
 background("red") 




edges = createEdgeSprites();




if (estadoJogo === JOGAR){
  player.velocityY = player.velocityY + 0.8
if(keyDown("space") && player.y >= 450) {
  player.velocityY = -21;
}
placar = frameCount
if (fundo.x < -50){
  fundo.x = fundo.width/7;
} 
if(obstacles.isTouching(player)){
  estadoJogo = ENCERRAR;
}
 gerarObstaculos();
if (ground.x < -50){
  ground.x = ground.width/5;
player.velocityY = player.velocityY + 0.8
}
}else if (estadoJogo === ENCERRAR) {

  reiniciar.visible = true;
  

  ground.velocityX = 0;
  player.velocityY = 0;
  fundo.velocityX=0;
  obstacles.setVelocityXEach(0);
  obstacles.setLifetimeEach(-1);
  if(mousePressedOver(reiniciar)) {
    reset();
  }
}



player.collide(ground);
player.collide(edges);
  

 

  drawSprites(); 
     textSize(20)
  text("Pontuação: "+ placar, 0,50);

}
function gerarObstaculos() {
  if(frameCount % 100 === 0) {
    var obstaculo = createSprite(900,450,10,40);

    obstaculo.velocityX =-12;
    
//testando scale para os dois obstaculos (falta criar os obstaculos ainda)
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstaculo.addImage(stoneWallImg);
      obstaculo.scale=0.3
      obstaculo.y=525
      obstaculo.setCollider("rectangle",0,0,1000,400)
              break;
      case 2: obstaculo.addImage(stoneWallVerticalImg);
        obstaculo.scale = 0.5;
   
        obstaculo.setCollider("rectangle",0,0,100,300)
              break;

      default: break;
    }
                
      
        obstaculo.lifetime = 300;
        
        obstacles.add(obstaculo);
      }
    }
    function reset(){
      estadoJogo = JOGAR;
   
      reiniciar.visible = false;
      
      obstacles.destroyEach();
      ground.velocityX=-4
      fundo.velocityX=-4
      placar = 0;
      frameCount=0;
      player.y=500
      
    }
