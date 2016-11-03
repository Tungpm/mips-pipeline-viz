/////////////
// CONSTANTS
/////////////

BASE_WIDTH = 960;
BASE_HEIGHT = 600;

/////////////
// VARIABLES
/////////////

title = "Mips Pipeline Vizualization"
clkStr = "Clock: 0";
clk = 0;

// 5 Instructions
instrF = "addiu $zero $zero $zero";
instrD = "addiu $zero $zero $zero";
instrE = "addiu $zero $zero $zero";
instrM = "addiu $zero $zero $zero";
instrW = "addiu $zero $zero $zero";

// Color dictionary
colorDict = {};

function getColor(instr) {
	if (!(instr in colorDict)) {
		colorDict[instr] = color("hsb(" + Math.floor(Math.random() * 360) + ", 100%, 50%)");
	}
	return colorDict[instr]
}

/////////
// CODES
/////////

function preload() {
	myFont = loadFont('assets/OpenSans-Regular.ttf');
}

/* Creates the smodules */
function setup() {

	// Ratio
	RATIO = window.innerWidth/BASE_WIDTH;

	// Texts
	fill('#FFFFFF');
	textFont(myFont);

	// Create the canvas
  myCanvas = createCanvas(window.innerWidth, window.innerHeight);
	myCanvas.parent("sketch-holder");
  background(255);

  // Set colors
  fill(70, 101, 192, 127);
  //stroke(127, 63, 120);
	noStroke();
}


function draw() {
	background(255);

	// Forward and Backward Buttons
  rect(840 * RATIO, 350* RATIO, 40* RATIO, 20* RATIO); // Backward
  rect(885* RATIO, 350* RATIO, 40* RATIO, 20* RATIO); // Forward
  textSize(20* RATIO);
  fill(70, 101, 192, 127);
  text("<", 855* RATIO, 365* RATIO); // Fetch
  text(">", 900* RATIO, 365* RATIO); // Fetch

	//rect(x,   y,  w,  h );
  rect(40* RATIO, 80* RATIO, 20* RATIO, 250* RATIO); // PC pipeline register
	rect(220* RATIO, 80* RATIO, 20* RATIO, 250* RATIO); // FD pipline register
	rect(400* RATIO, 80* RATIO, 20* RATIO, 250* RATIO); // DE pipeline register
	rect(580* RATIO, 80* RATIO, 20* RATIO, 250* RATIO); // EM pipeline register
	rect(760* RATIO, 80* RATIO, 20* RATIO, 250* RATIO); // MW pipeline register

	// All boxes
	fill(getColor(instrF));
  rect(80* RATIO, 150* RATIO, 120* RATIO, 100* RATIO); // Fetch

	fill(getColor(instrD));
  rect(260* RATIO, 150* RATIO, 120* RATIO, 100* RATIO); // Decode

	fill(getColor(instrE));
  rect(440* RATIO, 150* RATIO, 120* RATIO, 100* RATIO); // Execute

	fill(getColor(instrM));
  rect(620* RATIO, 150* RATIO, 120* RATIO, 100* RATIO); // Memory

	fill(getColor(instrW));
  rect(800* RATIO, 150* RATIO, 120* RATIO, 100* RATIO); // Write

	// Title
	textSize(32*RATIO);
	fill(0, 0, 0);
	text(title, 280* RATIO, 40* RATIO); // Fetch

  // Stage instructions
	textSize(10 * RATIO);
	fill(999, 999, 999);
	text(instrF, 85* RATIO, 200* RATIO); // Fetch

	fill(999, 999, 999);
	text(instrD, 265* RATIO, 200* RATIO); // Decode

	fill(999, 999, 999);
	text(instrE, 445* RATIO, 200* RATIO); // Execute

	fill(999, 999, 999);
	text(instrM, 625* RATIO, 200* RATIO); // Memory
	
	fill(999, 999, 999);
	text(instrW, 805* RATIO, 200* RATIO); // Write

	textSize(20 * RATIO);
	fill(999, 999, 999);
	text(clkStr, 30* RATIO,30* RATIO); // Write
	}

function mousePressed() {
  clear(); // resets the diagram
  // Check which button was pressed
  btnHeight = 20 * RATIO;
  btnWidth = 40 * RATIO;
  prevX = 840 * RATIO;
  prevY = 350 * RATIO;
  nextX = 885 * RATIO;
  nextY = 350 * RATIO;
  if (inRange(prevX,prevY,btnWidth,btnHeight)) { // prev clicked
  	// Updating the clock
  	clk = clk - 1;
  	clkStr = "Clock: "+clk;
  } else if (inRange(nextX,nextY,btnWidth,btnHeight)) {
  	// Updating the clock
  	clk = clk + 1;
  	clkStr = "Clock: "+clk;
  }

	// Grab the new information from the new clock cycle
	var new_info = getInfo(clk);
	instrF = new_info[1];
	instrD = new_info[2];
	instrE = new_info[3];
	instrM = new_info[4];
	instrW = new_info[5];
}

function inRange(x,y,w,h) {
  if ( (mouseX>x & mouseX<(x+w)) & (mouseY>y & mouseY<(y+h)) ) {
  	return true;
  } else {
  	return false;
  }
}

function submitInfo() {
	input_element = document.getElementById("pipeline_info").value;
	parseInfo(input_element);
}

function onResize() {

	// Resize the HTML
	//canvasElement = document.getElementById("sketch-holder");
	//canvasElement.
	// Resize P5
	RATIO = window.innerWidth/BASE_WIDTH;
	try {
		myCanvas.resizeCanvas(window.innerWidth, window.innerHeight, noRedraw = false);
	} catch (e) {
		console.log("CATCH!")
	}
}