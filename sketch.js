var mushroom, game_over, bg, button_down, button_up, coin, ghost, gun1_bullet, gun2_bullet, gun1, gun2, w_gun1, w_gun2, life, monster1, bgCopy, bg1, bg2, bg3
var monster2, obstacles, sword, w_sword, start, bgm, mode, m, lifeRemain, coinNum, grass, grass1, button1, obstacle_down, obstacleCopy, grass_down, grassCopy, plantCopy
var theCanvas, start_flicking, state, firstPlay, monster1Copy, difficulty_selected, monster_count, monster2_count, end, win, bgSpeed, bg1X, bg2X, monster2Copy, time, health_kit_count
const gravity = 0.2

var sword_s, gear_s, bounce_s, coin_s, button_s, laser_s, cannon_s, kill_s, kill1_s, heart_s
var jumpMode
var medication
var bull1_cost
var bull2_cost
var plant1, plant2, plant3
var healthkit_array=[]
var coin_array=[];
var mons1_array=[];
var mons2_array=[];
var bull1_array=[];
var bull2_array=[];
var life_array=[];
var coin_display_array=[];
var collectedCoin_array = [];

function preload() {
  heart_s = loadSound("media/heart.wav")
  kill1_s = loadSound("media/kill1.wav")
  kill_s = loadSound("media/kill.wav")
  sword_s = loadSound("media/sword.wav")
  gear_s = loadSound("media/gear.mp3")
  bounce_s = loadSound("media/bounce.wav")
  coin_s = loadSound("media/coin.mp3")
  button_s = loadSound("media/button.mp3")
  laser_s = loadSound("media/laser.mp3")
  cannon_s = loadSound("media/cannon.wav")
  plant1 = loadImage("media/plant1.PNG")
  plant2 = loadImage("media/plant2.PNG")
  plant3 = loadImage("media/plant3.PNG")
  medication = loadImage("media/health_kit.PNG")
  game_over = loadSound("media/game_over.wav")
  mushroom = loadImage("media/mushroom.PNG")
  bg1 = loadImage("media/background.PNG")
  bg2 = loadImage("media/background3.PNG")
  bg3 = loadImage("media/background2.PNG")
  button_down = loadImage("media/button_down.PNG")
  button_up = loadImage("media/button_up.PNG")
  coin = loadImage("media/coin.PNG")
  ghost = loadImage("media/ghost.PNG")
  gun1_bullet = loadImage("media/gun1_bullet.PNG")
  gun2_bullet = loadImage("media/gun2_bullet.PNG")
  gun1 = loadImage("media/gun1.PNG")
  gun2 = loadImage("media/gun2.PNG")
  grass_up = loadImage("media/grass.PNG")
  grass_down = loadImage("media/grass_down.PNG")
  w_gun1 = loadImage("media/w_gun.PNG")
  w_gun2 = loadImage("media/w_gun2.PNG")
  life = loadImage("media/life.PNG")
  monster1 = loadImage("media/monster1.PNG")
  monster2 = loadImage("media/monster2.PNG")
  obstacle_up = loadImage("media/obstacles.PNG")
  obstacle_down = loadImage("media/obstacles_down.PNG")
  sword = loadImage("media/sword.PNG")
  w_sword = loadImage("media/w_sword.PNG")
  start = loadImage("media/start.png")
  bgm = loadSound("media/bgm.wav")
}

function setup() {
  theCanvas = createCanvas(1000, 500)
  theCanvas.parent("#canvas")
  theCanvas.style('display', 'block')
  theCanvas.style('margin', 'auto')

  noiseDetail(24)

  difficulty_selected = false
  start_flicking = 0
  firstPlay = true;

  mushroomCopy = mushroom

  monster1Copy = monster1
  monster2Copy = monster2

  grassCopy = grass_up
  buttonCopy = button_up
  obstacleCopy = obstacle_up
  bgCopy = bg1


  coin_collected = 0



  var decide = random(0,3)
  if (decide >= 0 && decide < 1){
      plantCopy = plant1
  }
  else if (decide >= 1 && decide < 2){
      plantCopy = plant2
  }
  else if (decide >= 2 && decide < 3){
      plantCopy = plant3
  }

  //count the time lapsing
  time = 0

  //0 game not start
  //1 game start
  //2 game pause
  //3 game end win
  //4 game end lose
  state = 0

  //if the game has ended
  //0 for not
  //1 for end
  end = 0

  //0 for not win
  //1 for win
  win = 0

  //difficulty
  //0 easy
  //1 medium
  //2 infernal
  //mode = 0

  bull1_cost=0
  bull2_cost=0

  //1 coin for 10 laser gun bullets
  //1 coin for 1 cannon gun bullets
  //number of coin get collected
  coinNum = 0

  //not jumping
  jumpMode = false

  bgSpeed = 2

  bg1X = 0
  bg2X = 3000

  for (var i=0;i<3;i++){
    life_array.push(new Life(18+i*life.width+5, 17))
  }

  m = new Mr_mushroom(3, 350)

  var coins = random(3, 5)
  for (var i=0;i<coins;i++){
    coin_array.push(new Coin())
  }

  //200
  grass1 = new Grass(random(180, 250), 365+15)

  //350
  button1 = new Button(random(320, 450), 425)

  //500
  obstacle1 = new Obstacle(random(500, 700), 385)

  p1 = new Plant(random(750,900), 250)

}

function draw(){

  //console.log(state)
  background(255)
  imageMode(CORNER)

  switchStatus()

  if (bgCopy == bg1){
    console.log(1)
  }

  if (bgCopy == bg2){
    console.log(2)
  }

  if (bgCopy == bg3){
    console.log(3)
  }


  image(bgCopy, bg1X, 0)
  //rect(bg1X, 0, 3040, 500)

  if (bg1X<=-3000){
    bg1X = bg2X+3000
  }
  image(bgCopy, bg2X, 0)
  if (bg2X<=-3000){
    bg2X = bg1X+3000
  }
  bg1X-=bgSpeed
  bg2X-=bgSpeed  

  //text(mouseX+"   "+mouseY, mouseX, mouseY)


  if (win == 1){
    state = 3
  }

  //1 game started
  //morning
  if (state == 1){
    game_state1();
  }

  //evening
  else if (state == 5){
    game_state1();
  }

  //night
  else if (state == 6){
    game_state1();
  }

  else if (state == 2 && difficulty_selected == true){
    stroke("brown")
    fill("purple")
    strokeWeight(6)
    textSize(70)
    text("Click Again to Continue", 180, 250);
    if(mouseIsPressed){
      state = 1
    }
  }

  else if (state == 2 && difficulty_selected == false){
    stroke("purple")
    fill("brown")
    strokeWeight(3)
    textSize(40)
    text("Please Select your difficulty", 250, 250);
  }

  //0 game not started
  else if (state == 0){
    if (bgm.isPlaying()==false && mouseIsPressed){
      bgm.play();
    }
    start_button()
  }


  else if (state == 3){
    if (bgm.isPlaying()==false){
      bgm.play()
    }
    stroke("brown")
    fill("purple")
    strokeWeight(6)
    textSize(80)
    text("YOU WIN!", 300, 250)
  }

  else if(state == 4){
    stroke("red")
    strokeWeight(6)
    textSize(70)
    text("  Try another time!", 180, 250)
    if (game_over.isPlaying()== false && end == 0){
      game_over.play()
      end = 1
    }
  }
}


function start_button(){
  start_flicking++;
  if (start_flicking <30){
    imageMode(CENTER);
    image(start,486,266);
  }
  if (start_flicking >50){
    start_flicking = 0;
  }
}

function mousePressed(){
  if (mouseX > 375 && mouseY < 600 && mouseY > 190 && mouseY < 350){
    state = 2
  }
}

function pause(){

  state = 2
}


function updateMenu(theMenu){
    // get the value of the menu
    var menuValue = theMenu.value;
  
    // use the value in some computation
    if (menuValue == 'e') {
      mode = 0;
      state = 1;
    }

    else if (menuValue == 'm') {
      mode = 1;
      state = 1;
    }

    else if (menuValue == 'd') {
      mode = 2;      
      state = 1;

    }

    if (difficulty_selected == false){
        setDifficulty()
        difficulty_selected = true;
    }

}

function setDifficulty(){
    //choosing the mode
    if (mode == 0){
      monster_count = 2
      health_kit_count = 1
      monster2_count = 0
    }
    else if (mode == 1){
      monster_count = 4
      health_kit_count = 2
      monster2_count = 1

    }
    else if (mode == 2){
      monster_count = 10
      health_kit_count = 3
      monster2_count = 3
    }

    for (var i=0;i<health_kit_count;i++){
      healthkit_array.push(new HealthKit())
    }

    for (var i=0;i<monster_count;i++){
      mons1_array.push(new Monster1())
    }

    for (var i=0;i<monster2_count;i++){
      mons2_array.push(new Monster2())
    }
}

function game_state1(){

  stroke("purple")
  strokeWeight(1)
  textSize(15)

  //text("'g' for the laster gun, 's' for sword, 'n' for cannon. Press 'o' to fire",10,35)

  m.display()
  bulletCheck1()
  bulletCheck2()
  grass1.display()
  button1.display()
  obstacle1.display()

  if (bgCopy == bg3){
    p1.display()
    plantCheck()
  }

  //display health_kit
  for(var i=0;i<healthkit_array.length;i++){
    healthkit_array[i].display()
    if (dist(m.x, m.y, healthkit_array[i].x, healthkit_array[i].y)<=80){
      healthkit_array[i].regenerate()
    }
  }

  //display life
  for(var i=0;i<life_array.length;i++){

    life_array[i].display()

  }

  //text(coinNum, 50,50)
  for (var i = 0;i<coinNum;i++){
    image(coin, 23+i*coin.width,50)
  }

  //display the coin and check if mrmushroom has collected the coin
  for (var i=0;i<coin_array.length;i++){
    coin_array[i].display()

    //if collected the coin
    if (dist(coin_array[i].x, coin_array[i].y, m.x, m.y)<=mushroom.width){
      coin_array[i].collected = 1
    }
  }

  monArray(1)
  monArray(2)
  /*
  for (var i=0;i<coin_display_array.length;i++){
    //coin_display_array[i].display()
  }
  */
}


class Mr_mushroom{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.speed = 3;
    this.jumpPower = 0
  }

  display(){
    //jump

    //on grass
    if (keyIsDown(87) && jumpMode == false && m.x+mushroom.width>=grass1.x+20 && m.x+mushroom.width<=grass1.x+grass_up.width-5 && m.y<= grass1.y){
      if (bounce_s.isPlaying()==false){
        bounce_s.play()
      }
      this.y = grass1.y - mushroom.height
      jumpMode = true
      this.jumpPower = -10
    }


    //on anything else
    else if (keyIsDown(87) && jumpMode == false){
      jumpMode = true
      this.jumpPower = -5
    }

    if (jumpMode){
      this.y+=this.jumpPower
      this.jumpPower+=gravity


      if (this.y>=350){
        this.y = 350
        jumpMode = false
        this.jumpPower = 0
      }

    }

    if(keyIsDown(65)){
      this.x -= this.speed
    }
    if(keyIsDown(68)){
      this.x += this.speed
    }

    

    this.x = constrain(this.x, 0, width);
    imageMode(CORNER);
    image(mushroomCopy, this.x, this.y);
  }
}

class Plant{
  constructor(x, y){
    this.x = x
    this.y = y+95
    this.life = 8
    this.status = 1
  }
  display(){
    if (this.status == 1){
      fill(200,20,15, 200)
      rect(this.x-40, this.y-30, this.life*10, 5)
      imageMode(CENTER)
      image(plantCopy, this.x, this.y)
    }
  }
  disappear(){
    this.status = 0
  }

  regenerate(){
    this.status = 1
  }
}

class Life{
  constructor(x, y){
    this.x = x
    this.y = y
    this.dis = 0
  }
  display(){
    if (this.dis == 0){
      image(life, this.x, this.y)
    }
  }
  disappear(){
    this.dis = 1
  }
}

class HealthKit{
  constructor(){
    this.x=random(1500,3500)
    this.y = random(38, 250)
    this.speed = random(2, 5)
  }

  display(){
    imageMode(CENTER)
    image(medication, this.x, this.y)
    imageMode(CORNER)
    this.x-=this.speed
    if (this.x <-50){
      this.x=random(1500,3000)
      this.y = random(38, 250)
    }
  }

  regenerate(){
      var l = 0
      if (l == 0){
        heart_s.play()
      }
      this.x=random(1500,3000)
      this.y = random(38, 250)
      if (life_array.length == 0){
        l = 1
      }

      else {
        l = life_array.length
      }
      life_array.push(new Life(18+(l-1)*life.width+5, 17))
  }
}

class G2_bullet {
  constructor(x){
    this.speed = 3
    //403
    this.y = m.y+60
    this.x = x+20
    //0 not hit
    //1 hit
    this.hit = 0
    bull2_cost++
  }

  display(){ 
    if(this.hit == 0){
      image(gun2_bullet, this.x, this.y)
      this.x+=this.speed
    }
  }

  disappear(){
    this.hit = 1
  }
}

class G1_bullet {
  constructor(x){
    this.speed = 5
    this.y = m.y+50
    this.x = x+10
    //0 not hit
    //1 hit
    this.hit = 0
    bull1_cost++
  }

  display(){ 
    if(this.hit == 0){
      image(gun1_bullet, this.x, this.y)
      this.x+=this.speed
    }
  }

  disappear(){
    this.hit = 1
  }
}

class Monster1 {

  constructor(){
    this.x = random(200, 1000)
    this.y = 400 

    this.xFactor = random(1000,2000)
    this.yFactor = random(0,1000)
    //1 live
    //0 dead
    this.status = 1
    this.life = 2
  }

  display(){
    if (this.status == 1){
      fill(255,0,10, 200)
      rect(this.x-20, this.y-50, this.life*10, 5)
      imageMode(CENTER)
      image(monster1Copy, this.x, this.y)
      imageMode(CORNER)
      this.xSpeed = map(noise(this.xFactor),0,1,-0.9,0.5)
      this.ySpeed = map(noise(this.yFactor),0,1,-0.16,0.2)
      if (this.x < 0 ){
        this.x = width-monster1.width
      }

      this.x += this.xSpeed
      this.y += this.ySpeed

      this.y = constrain(this.y, 336, 430)

      this.xFactor+=0.01
      this.yFactor+=0.01
    }

    else if (this.status == 0){
      image(ghost, this.x, this.y)
      this.y -= 5
    }
  }

  disappear(){
    if (this.status == 1){
      coinNum+=2
      kill_s.play()
    }
    this.status = 0
  }
}

class Monster2 {

  constructor(){
    this.x = random(400, 800)
    this.y = 380

    this.xFactor = random(2000,3000)
    this.yFactor = random(0,1000)
    //1 live
    //0 dead
    this.status = 1
    this.life = 5
  }

  display(){
    if (this.status == 1){
      fill(255,0,10, 200)
      rect(this.x-80, this.y-100, this.life*20, 10)
      imageMode(CENTER)
      image(monster2Copy, this.x, this.y)
      imageMode(CORNER)
      this.xSpeed = map(noise(this.xFactor),0,1,-0.9,0.9)
      this.ySpeed = map(noise(this.yFactor),0,1,-0.16,0.1)
      if (this.x < 0 ){
        this.x = width-monster2.width
      }


      this.x += this.xSpeed
      this.y += this.ySpeed

      this.y = constrain(this.y, 370, 385)

      this.xFactor+=0.01
      this.yFactor+=0.01
    }

    else if (this.status == 0){
      image(ghost, this.x, this.y, ghost.width+30, ghost.height+30)
      this.y -= 5
    }
  }

  disappear(){
    if (this.status == 1){
      coinNum+=5
      kill1_s.play()
    }
    this.status = 0
  }
}

class Button{
  constructor(x, y){
    this.x = x
    this.y = y
    this.mode = 0
  }
  display() {
    if (m.x+mushroom.width>=this.x && m.x+mushroom.width<=this.x+obstacle_up.width && dist(m.x, m.y, this.x, this.y)<= mushroom.height){
      if (this.mode == 0){
        button_s.play()
        gear_s.play()
      }
      this.mode = 1
    }

    if (this.mode == 0){
      buttonCopy = button_up
    }
    else if (this.mode == 1){
      buttonCopy = button_down
      obstacleCopy = obstacle_down
      obstacle1.y = 420
      obstacle1.hurt = 0
    }
    image(buttonCopy, this.x, this.y)
  }
}

class Obstacle{
  constructor(x, y){
    this.x = x
    this.y = y
    this.hurt = 1
  }
  display(){
    if (this.hurt == 1){
      if (dist(this.x, this.y, m.x, m.y)<=mushroom.width){
        console.log("true")
        m.x-=80
        if (life_array.length == 0){
          state = 4
        }
        else{
          life_array.splice(life_array.length-1, 1)
        }
      }
    }
    image(obstacleCopy, this.x, this.y)
  }
}


class Grass{
  constructor(x, y){
    this.x = x
    this.y = y
    this.w = grass_up.width-30
    this.h = grass_up.height-15
  }
  display(){
    image(grassCopy, this.x, this.y, this.w, this.h)
  }
}

class Coin{
  constructor(){
    this.x = random(50,1000)
    this.y = random(280, 400)
    this.dis = 0
    this.collected = 0
    this.count = false
    this.location = 0
  }

  display(){
    if(this.dis == 0){
      image(coin, this.x, this.y)
    }

    if (this.collected == 1){
      if (this.count ==  false){
        if (coin_s.isPlaying() == false){
          coin_s.play()
        }
        coinNum++
        //buildCoinDisplay()
        this.location = coinNum
        this.count = true
      }

      /*
      this.x = 23 + (this.location-1)*coin.width
      this.y = 50
      */
      this.disappear()
    }
  }
  disappear(){
    this.dis = 1
  }
}

class CoinDisplay{
  constructor(x, y){
    this.x = x
    this.y = y
    this.dis = 0
  }

  display(){
    if (this.dis == 0){
      image(coin, this.x, this.y)
    }
  }

  disappear(){
    this.dis = 1
  }
}

function keyPressed(){
  //using laser gun to shot bullet1
  if(keyIsDown(79) && mushroomCopy == w_gun1){
    // && coinNum > -1
    if (bull1_array.length < 2 && coinNum>0){
      bull1_array.push(new G1_bullet(m.x + mushroom.width));
      laser_s.play()
      coinNum--
    }
  }

  //using cannon to shot bullet2
  if(keyIsDown(79) && mushroomCopy == w_gun2){
    // && coinNum > -1
    if (bull2_array.length < 1 && coinNum>0){
      bull2_array.push(new G2_bullet(m.x + mushroom.width));
      cannon_s.play()
      coinNum--
    }
  }

  if (keyIsDown(67) && dist(m.x, m.y, p1.x, p1.y)<=80){
    if (mons1_array.length == 0 && mons2_array.length == 0){
        win = 1
    }
  }

  if(keyIsDown(71) && mushroomCopy != w_gun1){
    mushroomCopy = w_gun1
  }
  else if(keyIsDown(71) && mushroomCopy == w_gun1){
    mushroomCopy = mushroom
  }

  if(keyIsDown(83) && mushroomCopy != w_sword){
    mushroomCopy = w_sword
  }

  else if(keyIsDown(83) && mushroomCopy == w_sword){
    mushroomCopy = mushroom
  }

  if(keyIsDown(78) && mushroomCopy != w_gun2){
    mushroomCopy = w_gun2
  }

  else if(keyIsDown(78) && mushroomCopy == w_gun2){
    mushroomCopy = mushroom
  }

}

function buildCoinDisplay(){

  coin_display_array.push(new CoinDisplay(23 + (coinNum-1)*coin.width), 50)
}

function plantCheck(){
  var p = p1

  console.log("ok!")
  console.log(p)
  //display bullet1 and see if it hits the monster
  for(var i=0;i<bull1_array.length;i++){
    if (bull1_array.length!=0 && p.status!=0 &&dist(bull1_array[i].x, bull1_array[i].y, p.x, p.y)<=80){
      console.log("checked!")
      p.life-=1
      if (p.life <0){
        p.disappear()
      }
      bull1_array[i].disappear()
    }

    //remove used bullets
    if (bull1_array[i].hit == 1){
      bull1_array.splice(i,1)
      i=i-1
    }
  }

  //display bullet2 and see if it hits the monster
  for(var i=0;i<bull2_array.length;i++){
    if (bull2_array.length!=0 && p.status!=0 && dist(bull2_array[i].x, bull2_array[i].y, p.x, p.y)<=80){
      p.life-=1
      if (p.life <0){
        p.disappear()
      }
      bull2_array[i].disappear()
    }
    
    //remove used bullets
    if (bull2_array[i].hit == 1){
      bull2_array.splice(i,1)
      i=i-1
    }
  }
}

function bulletCheck1(){

  //display bullet1 and see if it hits the monster
  for(var i=0;i<bull1_array.length;i++){

    bull1_array[i].display();
    //check if the monsters are hitted
    for (var j=0; j<mons1_array.length;j++){
      if (bull1_array.length!=0 && mons1_array[j].status!=0 && dist(bull1_array[i].x, bull1_array[i].y, mons1_array[j].x, mons1_array[j].y)<=20){
        mons1_array[j].life-=1
        if (mons1_array[j].life<0){
          mons1_array[j].disappear()
        }
        bull1_array[i].disappear()
      }
    }

    //remove used bullets
    if (bull1_array[i].hit == 1){
      bull1_array.splice(i,1)
      i=i-1
    }
  }
  //remove bullets outside of the screen
  for(var i=0;i<bull1_array.length;i++){
    if (bull1_array.length != 0 && bull1_array[i].x > width){
      bull1_array.splice(i,1)
      i=i-1
    }
  }
  //display bullet1 and see if it hits the monster
  for(var i=0;i<bull2_array.length;i++){

    bull2_array[i].display();
    //check if the monsters are hitted
    for (var j=0; j<mons1_array.length;j++){
      if (bull2_array.length!=0 && mons1_array[j].status!=0 && dist(bull2_array[i].x, bull2_array[i].y, mons1_array[j].x, mons1_array[j].y)<=50){
        mons1_array[j].life-=3
        if (mons1_array[j].life<0){
          mons1_array[j].disappear()
        }
        bull2_array[i].disappear()
      }
    }

    //remove used bullets
    if (bull2_array[i].hit == 1){
      bull2_array.splice(i,1)
      i=i-1
    }
  }
  //remove bullets outside of the screen
  for(var i=0;i<bull2_array.length;i++){
    if (bull2_array.length != 0 && bull2_array[i].x > width){
      bull2_array.splice(i,1)
      i=i-1
    }
  }
}


function bulletCheck2(){

  //display bullet1 and see if it hits the monster
  for(var i=0;i<bull1_array.length;i++){

    bull1_array[i].display();
    //check if the monsters are hitted
    for (var j=0; j<mons2_array.length;j++){
      if (bull1_array.length!=0 && mons2_array[j].status!=0 && dist(bull1_array[i].x, bull1_array[i].y, mons2_array[j].x, mons2_array[j].y)<=40){
        mons2_array[j].life-=0.5
        if (mons2_array[j].life<0){
          mons2_array[j].disappear()
        }
        bull1_array[i].disappear()
      }
    }

    //remove used bullets
    if (bull1_array[i].hit == 1){
      bull1_array.splice(i,1)
      i=i-1
    }
  }
  //remove bullets outside of the screen
  for(var i=0;i<bull1_array.length;i++){
    if (bull1_array.length != 0 && bull1_array[i].x > width){
      bull1_array.splice(i,1)
      i=i-1
    }
  }
  //display bullet1 and see if it hits the monster
  for(var i=0;i<bull2_array.length;i++){

    bull2_array[i].display();
    //check if the monsters are hitted
    for (var j=0; j<mons2_array.length;j++){
      if (bull2_array.length!=0 && mons2_array[j].status!=0 && dist(bull2_array[i].x, bull2_array[i].y, mons2_array[j].x, mons2_array[j].y)<=50){
        mons2_array[j].life-=2
        if (mons2_array[j].life<0){
          mons2_array[j].disappear()
        }
        bull2_array[i].disappear()
      }
    }

    //remove used bullets
    if (bull2_array[i].hit == 1){
      bull2_array.splice(i,1)
      i=i-1
    }
  }
  //remove bullets outside of the screen
  for(var i=0;i<bull2_array.length;i++){
    if (bull2_array.length != 0 && bull2_array[i].x > width){
      bull2_array.splice(i,1)
      i=i-1
    }
  }
}


function monArray(num){
  var name

  if (num == 1){
    name = mons1_array
  }

  else if (num == 2){
    name = mons2_array    
  }

  else{
    return
  }

    //display the monster and see if mrmushroom has touched the monsters
  for (var i=0;i<name.length;i++){
    name[i].display()

    if (m.x+mushroom.width>=name[i].x && m.x+mushroom.width<=name[i].x+monster1.width && m.y<name[i].y && dist(m.x, m.y, name[i].x, name[i].y) <= mushroom.width+monster1.width){
      name[i].disappear()
    }

    if(name[i].status != 0 && dist(m.x, m.y, name[i].x, name[i].y) <= mushroom.width+monster1.width-10){
      m.x -= 80
      if (life_array.length == 0){
        state = 4
      }
      else{
        life_array.splice(life_array.length-1, 1)
      }
    }
    //using sword
    if (mushroomCopy == w_sword){
      if (name.length!=0 && dist(m.x, m.y, name[i].x, name[i].y)<=150 && keyIsDown(79)){
        if (sword_s.isPlaying() == false){
            sword_s.play()
        }
        name[i].life-=0.1
        if (name[i].life<0){
          name[i].disappear()
        }
      }
    }


    //remove dead monster
    if (name[i].y<-50){
      name.splice(i,1)
      i=i-1
    }
  }
}

function switchStatus(){
  var check = true
  if (mons1_array.length != 0 || mons2_array.length != 0){
    check = false
  }


  if (check == true && m.x>=width && bgCopy == bg1){
    for (var i=0;i<monster_count+2;i++){
      mons1_array.push(new Monster1())
    }
    for (var i=0;i<monster2_count+1;i++){
      mons2_array.push(new Monster2())
    }

    coins = random(5, 10)
    for (var i=0;i<coins;i++){
      coin_array.push(new Coin())
    }
    //200
    grass1 = new Grass(random(200, 270), 365+15)
    //350
    button1 = new Button(random(500, 800), 425)
    //500
    obstacle1 = new Obstacle(random(340, 420), 385)
    obstacleCopy = obstacle_up

    bgCopy = bg2
    m.x = 3
  }

  else if (check == true && m.x>=width && bgCopy == bg2){
    for (var i=0;i<monster_count+3;i++){
      mons1_array.push(new Monster1())
    }
    for (var i=0;i<monster2_count+2;i++){
      mons2_array.push(new Monster2())
    }

    coins = random(5, 10)
    for (var i=0;i<coins;i++){
      coin_array.push(new Coin())
    }
        //200
    grass1 = new Grass(random(500, 680), 365+15)
    //350
    button1 = new Button(random(350, 430), 425)
    //500
    obstacle1 = new Obstacle(random(200, 290), 385)
    obstacleCopy = obstacle_up
    bgCopy = bg3
    m.x = 3
  }
}





