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

RegWriteD = "0";
MemtoRegD = "0";
MemWriteD = "0";
ALUControlD = "0";
ALUSrcD = "0";
RegDstD = "0";
BranchD = "0";

RegWriteE = "0";
MemtoRegE = "0";
MemWriteE = "0";
ALUControlE = "0";
ALUSrcE = "0";
RegDstE = "0";

RegWriteM = "0";
MemtoRegM = "0";
MemWriteM = "0";

RegWriteW = "0";
MemtoRegW = "0";

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

////////////////////
// Drawing functions
////////////////////

CONTROL_Y = 90
MODULE_Y = 220
TEXT_Y = 275
PIPELINE_HEIGHT = 320

// CONTROL WIRES
WIRE_NAME = 7
WIRE_NAME_OFF = 2;
RED = "#E12D0F";
BLUE = "#000000"
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
  rect(40 * RATIO, 80* RATIO, 20* RATIO, PIPELINE_HEIGHT * RATIO); // PC pipeline register
	rect(220* RATIO, 80* RATIO, 20* RATIO, PIPELINE_HEIGHT * RATIO); // FD pipline register
	rect(400* RATIO, 80* RATIO, 20* RATIO, PIPELINE_HEIGHT * RATIO); // DE pipeline register
	rect(580* RATIO, 80* RATIO, 20* RATIO, PIPELINE_HEIGHT * RATIO); // EM pipeline register
	rect(760* RATIO, 80* RATIO, 20* RATIO, PIPELINE_HEIGHT * RATIO); // MW pipeline register

	// All boxes
	fill(getColor(instrF));
  rect(80* RATIO, MODULE_Y* RATIO, 120* RATIO, 100* RATIO); // Fetch

	fill(getColor(instrD));
  rect(260* RATIO, MODULE_Y* RATIO, 120* RATIO, 100* RATIO); // Decode

	fill(getColor(instrE));
  rect(440* RATIO, MODULE_Y* RATIO, 120* RATIO, 100* RATIO); // Execute

	fill(getColor(instrM));
  rect(620* RATIO, MODULE_Y* RATIO, 120* RATIO, 100* RATIO); // Memory

	fill(getColor(instrW));
  rect(800* RATIO, MODULE_Y* RATIO, 120* RATIO, 100* RATIO); // Write


	// Control Unit
	fill(70, 101, 192, 127);
	rect(260* RATIO, CONTROL_Y* RATIO, 60* RATIO, 100* RATIO); // Decode
	text("Control\nUnit", 260* RATIO, CONTROL_Y * RATIO);

	// Control wires D
	textSize(WIRE_NAME * RATIO);
	fill(RegWriteD == "1" ? RED : BLUE); text("RegWriteD", (320 + WIRE_NAME_OFF) * RATIO, (103 - WIRE_NAME_OFF) * RATIO);
	fill(MemtoRegD == "1" ? RED : BLUE); text("MemToRegD", (320 + WIRE_NAME_OFF) * RATIO, (115 - WIRE_NAME_OFF) * RATIO);
	fill(MemWriteD == "1" ? RED : BLUE);text("MemWriteD", (320 + WIRE_NAME_OFF) * RATIO, (127 - WIRE_NAME_OFF) * RATIO);
	fill(ALUControlD == "1" ? RED : BLUE);text("ALUControlD", (320 + WIRE_NAME_OFF) * RATIO, (139 - WIRE_NAME_OFF) * RATIO);
	fill(ALUSrcD == "1" ? RED : BLUE); text("ALUSrcD", (320 + WIRE_NAME_OFF) * RATIO, (151 - WIRE_NAME_OFF) * RATIO);
	fill(RegDstD == "1" ? RED : BLUE); text("RegDstD", (320 + WIRE_NAME_OFF) * RATIO, (163 - WIRE_NAME_OFF) * RATIO);
	fill(BranchD == "1" ? RED : BLUE); text("BranchD", (320 + WIRE_NAME_OFF) * RATIO, (175 - WIRE_NAME_OFF) * RATIO);

	fill(RegWriteE == "1" ? RED : BLUE); text("RegWriteE", (420 + WIRE_NAME_OFF) * RATIO, (103 - WIRE_NAME_OFF) * RATIO);
	fill(MemtoRegE == "1" ? RED : BLUE); text("MemToRegE", (420 + WIRE_NAME_OFF) * RATIO, (115 - WIRE_NAME_OFF) * RATIO);
	fill(MemWriteE == "1" ? RED : BLUE); text("MemWriteE", (420 + WIRE_NAME_OFF) * RATIO, (127 - WIRE_NAME_OFF) * RATIO);
	fill(ALUControlE == "1" ? RED : BLUE); text("ALUControlE", (420 + WIRE_NAME_OFF) * RATIO, (139 - WIRE_NAME_OFF) * RATIO);
	fill(ALUSrcE == "1" ? RED : BLUE); text("ALUSrcE", (420 + WIRE_NAME_OFF) * RATIO, (151 - WIRE_NAME_OFF) * RATIO);
	fill(RegDstE == "1" ? RED : BLUE); text("RegDstE", (420 + WIRE_NAME_OFF) * RATIO, (163 - WIRE_NAME_OFF) * RATIO);

	fill(RegWriteM == "1" ? RED : BLUE); text("RegWriteM", (600 + WIRE_NAME_OFF) * RATIO, (103 - WIRE_NAME_OFF) * RATIO);
	fill(MemtoRegM == "1" ? RED : BLUE); text("MemToRegM", (600 + WIRE_NAME_OFF) * RATIO, (115 - WIRE_NAME_OFF) * RATIO);
	fill(MemWriteM == "1" ? RED : BLUE); text("MemWriteM", (600 + WIRE_NAME_OFF) * RATIO, (127 - WIRE_NAME_OFF) * RATIO);

	fill(RegWriteW == "1" ? RED : BLUE); text("RegWriteW", (780 + WIRE_NAME_OFF) * RATIO, (103 - WIRE_NAME_OFF) * RATIO);
	fill(MemtoRegW == "1" ? RED : BLUE); text("MemToRegW", (780 + WIRE_NAME_OFF) * RATIO, (115 - WIRE_NAME_OFF) * RATIO);

	strokeWeight(1 * RATIO);
	stroke(RegWriteD == "1" ? RED : BLUE); line(320 * RATIO, 103 * RATIO, 400 * RATIO, 103 * RATIO);
	stroke(MemtoRegD == "1" ? RED : BLUE); line(320 * RATIO, 115 * RATIO, 400 * RATIO, 115 * RATIO);
	stroke(MemWriteD == "1" ? RED : BLUE); line(320 * RATIO, 127 * RATIO, 400 * RATIO, 127 * RATIO);
	stroke(ALUControlD == "1" ? RED : BLUE); line(320 * RATIO, 139 * RATIO, 400 * RATIO, 139 * RATIO);
	stroke(ALUSrcD == "1" ? RED : BLUE); line(320 * RATIO, 151 * RATIO, 400 * RATIO, 151 * RATIO);
	stroke(RegDstD == "1" ? RED : BLUE); line(320 * RATIO, 163 * RATIO, 400 * RATIO, 163 * RATIO);
	stroke(BranchD == "1" ? RED : BLUE); line(320 * RATIO, 175 * RATIO, 375 * RATIO, 175 * RATIO);

	// Control wires E
	stroke(RegWriteE == "1" ? RED : BLUE); line(420 * RATIO, 103 * RATIO, 580 * RATIO, 103 * RATIO);
	stroke(MemtoRegE == "1" ? RED : BLUE); line(420 * RATIO, 115 * RATIO, 580 * RATIO, 115 * RATIO);
	stroke(MemWriteE == "1" ? RED : BLUE); line(420 * RATIO, 127 * RATIO, 580 * RATIO, 127 * RATIO);
	stroke(ALUControlE == "1" ? RED : BLUE); line(420 * RATIO, 139 * RATIO, 475 * RATIO, 139 * RATIO);
	stroke(ALUSrcE == "1" ? RED : BLUE); line(420 * RATIO, 151 * RATIO, 475 * RATIO, 151 * RATIO);
	stroke(RegDstE == "1" ? RED : BLUE); line(420 * RATIO, 163 * RATIO, 475 * RATIO, 163 * RATIO);

	// Control wires M
	stroke(RegWriteM == "1" ? RED : BLUE); line(600 * RATIO, 103 * RATIO, 760 * RATIO, 103 * RATIO);
	stroke(MemtoRegM == "1" ? RED : BLUE); line(600 * RATIO, 115 * RATIO, 760 * RATIO, 115 * RATIO);
	stroke(MemWriteM == "1" ? RED : BLUE); line(600 * RATIO, 127 * RATIO, 655 * RATIO, 127 * RATIO);

	// Control wires W
	stroke(RegWriteW == "1" ? RED : BLUE); line(780 * RATIO, 103 * RATIO, 835 * RATIO, 103 * RATIO);
	stroke(MemtoRegW == "1" ? RED : BLUE); line(780 * RATIO, 115 * RATIO, 835 * RATIO, 115 * RATIO);

	// Title
	strokeWeight(0);
	textSize(32*RATIO);
	fill(0, 0, 0);
	text(title, 280* RATIO, 40* RATIO); // Fetch

  // Stage instructions
	textSize(10 * RATIO);
	fill(999, 999, 999);
	text(instrF, 85* RATIO, TEXT_Y* RATIO); // Fetch

	fill(999, 999, 999);
	text(instrD, 265* RATIO, TEXT_Y* RATIO); // Decode

	fill(999, 999, 999);
	text(instrE, 445* RATIO, TEXT_Y* RATIO); // Execute

	fill(999, 999, 999);
	text(instrM, 625* RATIO, TEXT_Y* RATIO); // Memory

	fill(999, 999, 999);
	text(instrW, 805* RATIO, TEXT_Y* RATIO); // Write

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

	RegWriteD = new_info[6];
	MemtoRegD = new_info[7];
	MemWriteD = new_info[8];
	ALUControlD = new_info[9];
	ALUSrcD = new_info[10];
	RegDstD = new_info[11];
	BranchD = new_info[12];

	RegWriteE = new_info[13];
	MemtoRegE = new_info[14];
	MemWriteE = new_info[15];
	ALUControlE = new_info[16];
	ALUSrcE = new_info[17];
	RegDstE = new_info[18];

	RegWriteM = new_info[19];
	MemtoRegM = new_info[20];
	MemWriteM = new_info[21];

	RegWriteW = new_info[22];
	MemtoRegW = new_info[23];
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