//Pollock Maker
//Jun Chen. May 2018
//Inspired by Hanax's artistic drawing p5js demo
//https://github.com/hanax/p5js-demos

//variables
var colorR;
var colorG;
var colorB;
var diam;
//empty array for storing the positions of mouseX and mouseY for drawing lines
var positionStore;

//initial setup
function setup() {
  createCanvas(800, 800);
  colorR = random(150, 255);
  colorG = random(150, 255);
  colorB = random(150, 255);
  diam = 10;
  positionStore = [];
  background(255, 235, 214);
}

function draw() {

  //if mouse is held down, then circles are drawn
  if (mouseIsPressed) {
    noStroke();

    //randomized color is pulled for these circles
    fill(colorR, colorG, colorB);
    ellipseMode(CENTER);

    //circle will be drawn at the location of the mouse
    ellipse(mouseX, mouseY, diam);

    if (positionStore.length > 0) {

      //line color will follow the randomized color generated upon mouse click
      stroke(colorR, colorG, colorB);

      //set variable lastX and lastY to store mouseX and mouseY positions and
      //draw line beggining at lastX, lastY ending in mouseX and mouseY
      var lastX = positionStore[positionStore.length - 1][0];
      var lastY = positionStore[positionStore.length - 1][1];
      strokeWeight(diam);
      line(lastX, lastY, mouseX, mouseY);

      //for the all the positions recorded,
      //draw line with using the last two stored positions
      //reset new lastX and lastY to its last position of mouseX and mouseY
      for (var i = 0; i < positionStore.length - 2; i++) {
        var lastX = positionStore[positionStore.length - 1][0];
        var lastY = positionStore[positionStore.length - 1][1];
      }
    }

    //if diameter of circle is less than or equal to 20 but greater than 3,
    //decrease diameter by .1 till 3
    if (diam <= 20 && diam > 3) {
      diam -= .2;
    }

    //stores positions of the mouseX and mouseY as an array in the positionStore array
    positionStore.push([mouseX, mouseY]);
  }
}

//whenever mouse is clicked the color randomized,
//but they still all depend on each other so that it's always kept in the pastel looking range
function mouseClicked() {
  //generate random color for red mix

  colorR = random(0, 255);
  //if red number is greater than 150, then keep green low by max out random number with red number
  if (colorR > 150) {
    colorG = random(0, colorR);

    //else if red is high then keep blue low by maxing out blue color with green number
  } else {
    colorB = random(0, colorG);
  }

  // resetting the diam to 10 and array to empty for the next mouseClick
  diam = 10;
  positionStore = [];
}

//things I still want to add but can't figure out
//make small ink splash effect upon mouse click -
//preferrably randomized too, but can I make randomized ink splash yet it's dependent on my circle?
//as mouse stops, the line automatically make another splash mark -
//if difference of position of lastX and lastY and mouseX and mouseY is less than a certain amount
//then diam should increase, so that would be reflected as the speed of the mouse by the user,
//but at what speed should the diam increase to show? I tried using a while loop
//and my code would just keep crashing... :(