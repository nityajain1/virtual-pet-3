var dog,dogimg;
var database,position;
var milk,milkimage;
var button1,button2;
var foodObj;
var fedTime,lastFed;
var gameState,readState;

function preload()
{
  dogimg = loadImage("images/dogImg.png");
  milkimage = loadImage("images/Milk.png");
}

function setup() {
  createCanvas(800, 700);
  dog = createSprite(400,350,20,20);
  dog.addImage(dogimg); 
  dog.scale = 0.1;

  milk = createSprite(100,200,20,20);
  milk.addImage(milkimage);
  milk.scale = 0.1;



  database = firebase.database();
    var dogposition = database.ref("pet/positions");

    dogposition.on("value",readop); 

    foodObj = new Food();

}


function draw() {  
  background("lightpink");
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });
  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  });
  if(gameState!="Hungry"){
    fedTime.hide();
    addFood.hide();
    dog.remove();
  }else{
    fedTime.show();
    addFood.show();
    dog.addImage(sadDog);
  }
  function update(state){
    database.ref('/').update({
      gameState:state
    })}
    bedroom() {
      background(bedroom,550,550);
    }
    garden() {
      background(garden,550,550);
    }
    washroom() {
      background(washroom,550,550);
    }
    currentTime = hour();
    if(currentTime==(lastFed+1)){
      update("Playing");
      foodObj.garden();
    }else if(currentTime==(lastFed+2)){
      update("Sleeping");
      foodObj.bedroom();
    }else if (currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
      update("Bathing");
      foodObj.washroom();
    }else{
      update("Hungry");
      foodObj.display();
    }
  

  

  
  drawSprites();
  

}
function readop(data){
  position = data.val();
  dog.x = position.x;
  dog.y = position.y;
}




