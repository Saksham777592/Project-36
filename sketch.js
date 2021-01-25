var player;
var normalDog, happyDog;
var database;

function preload() {
  normalDog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(800, 700); 
  database = firebase.database();

  food = new Food();
 
  player = createSprite(200, 200, 25, 25);
  player.addImage(normalDog);
  player.scale = 0.5;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);


  feedButton = createButton('Feed Me');
  feedButton.position(200, 200);
  feedButton.size(50, 25);
  feedButton.mousePressed(feedDog);

  addFoodButton = createButton('Add Food');
  addFoodButton.position(200, 275);
  addFoodButton.size(50, 25);
  addFoodButton.mousePressed(addFood);
}


function draw() {  
  background(46, 139, 87);

  fill('white');
  text(foodStock, 700, 100);

  

  drawSprites();
}

function readStock(data) {
  foodStock = data.val();
  food.updateFoodStock(foodStock);
}


function feedDog() {
  //added the happy dog image
  player.addImage(happyDog);

  //each time the food is being used we are updating it in our javascipt object
  food.updateFoodStock(food.getFoodStock()-1);
 
  //updating the food into database
  database.ref('/').update({
    Food: food.getFoodStock(),
    FeedTime: hour()
  });
}

function addFood() {
  //whenever we press the addfood button we want the food to increase
  foodStock++;
  database.ref('/').update({
    Food: foodStock
  });
}

