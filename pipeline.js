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
instrF = "addiu $zero $zero $zero"; instrTypeF = "addiu";
instrD = "addiu $zero $zero $zero"; instrTypeD = "addiu";
instrE = "addiu $zero $zero $zero"; instrTypeE = "addiu";
instrM = "addiu $zero $zero $zero"; instrTypeM = "addiu";
instrW = "addiu $zero $zero $zero"; instrTypeW = "addiu";

RegWriteD = "0";
MemtoRegD = "0";
MemWriteD = "0";
ALUControlD = "0000";
ALUSrcD = "0";
RegDstD = "0";
BranchD = "0";

RegWriteE = "0";
MemtoRegE = "0";
MemWriteE = "0";
ALUControlE = "0000";
ALUSrcE = "0";
RegDstE = "0";

RegWriteM = "0";
MemtoRegM = "0";
MemWriteM = "0";

RegWriteW = "0";
MemtoRegW = "0";

infoLength = 0;

// Animation controller
animating = false;

// Color dictionary
colorDict = {};

function getColor(instr) {
	if (!(instr in colorDict)) {
		colorDict[instr] = color("hsb(" + Math.floor(Math.random() * 360) + ", 100%, 60%)");
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

CLOCK_STRING_SIZE = 18;
CLOCK_STRING_Y = 33;

CONTROL_Y = 90;
CONTROL_TEXT_SIZE = 12;
CONTROL_TEXT_Y = 120;
CONTROL_COLOR = 245;

PC_PIPELINE_HEIGHT = 180;
PC_PIPELINE_Y = 180;
PIPELINE_HEIGHT = 280;
PIPELINE_Y = 0;
PIPELINE_COLOR = 245;

MODULE_Y = 210;
MODULE_HEIGHT = 100;
MODULE_WIDTH = 100;
MODULE_TEXT_SIZE = 35;
MODULE_TEXT_Y = 273;
MODULE_COLOR = 230;

INSTRUCTION_Y = 290;
INSTRUCTION_HEIGHT = 20;
INSTRUCTION_WIDTH = 100;

TEXT_Y = 303;
TEXT_SIZE = 8;

BUTTON_Y = 38;
BUTTON_COLOR = 245;
BUTTON_TEXT_COLOR = 22;

// CONTROL WIRES
WIRE_NAME = 7;
WIRE_NAME_OFF = 2;
RED = "#E12D0F";
BLUE = "#000000";

function draw() {
	background(255);

	// Clock cycle string
	fill(0, 0, 0);
	textSize(CLOCK_STRING_SIZE * RATIO);
	text(clkStr, 30* RATIO,CLOCK_STRING_Y* RATIO); // Write

	// Forward and Backward Buttons

	//rect(840 * RATIO, 350* RATIO, 40* RATIO, 20* RATIO); // Backward
	//rect(885* RATIO, 350* RATIO, 40* RATIO, 20* RATIO); // Forward
	textSize(20* RATIO);
	fill(BUTTON_COLOR);
	rect(840 * RATIO, 21 * RATIO, 40* RATIO, 20 * RATIO); // PC pipeline register
	rect(885 * RATIO, 21 * RATIO, 40* RATIO, 20 * RATIO); // FD pipline register
	fill(70, 101, 192, 127);
	text("<", 855* RATIO, BUTTON_Y* RATIO); // Fetch
	text(">", 900* RATIO, BUTTON_Y* RATIO); // Fetch

	// All boxes
	noStroke();
	fill(MODULE_COLOR);
	rect((90 + MODULE_WIDTH / 2)* RATIO, MODULE_Y * RATIO, MODULE_WIDTH / 2 * RATIO, MODULE_HEIGHT * RATIO); // Fetch
	rect((270 + MODULE_WIDTH / 2) * RATIO , MODULE_Y * RATIO, MODULE_WIDTH / 2 * RATIO, MODULE_HEIGHT * RATIO); // Decode
	rect(450* RATIO, MODULE_Y * RATIO, MODULE_WIDTH * RATIO, MODULE_HEIGHT * RATIO); // Execute
	rect((630 + MODULE_WIDTH / 2) * RATIO, MODULE_Y * RATIO, MODULE_WIDTH / 2 * RATIO, MODULE_HEIGHT * RATIO); // Memory
	rect(810* RATIO, MODULE_Y * RATIO, MODULE_WIDTH / 2 * RATIO, MODULE_HEIGHT * RATIO); // Write

	noFill();
	strokeWeight(0.8 * RATIO);
	stroke(51);
	rect(90* RATIO, MODULE_Y* RATIO, MODULE_WIDTH* RATIO, MODULE_HEIGHT* RATIO); // Fetch
	rect(270* RATIO, MODULE_Y* RATIO, MODULE_WIDTH* RATIO, MODULE_HEIGHT* RATIO); // Decode
	rect(450* RATIO, MODULE_Y* RATIO, MODULE_WIDTH* RATIO, MODULE_HEIGHT* RATIO); // Execute
	rect(630* RATIO, MODULE_Y* RATIO, MODULE_WIDTH* RATIO, MODULE_HEIGHT* RATIO); // Memory
	rect(810* RATIO, MODULE_Y* RATIO, MODULE_WIDTH* RATIO, MODULE_HEIGHT* RATIO); // Write

	// Box wires:
	strokeWeight(0.8 * RATIO);
	stroke(51);
	line((90 + MODULE_WIDTH) * RATIO, (MODULE_Y + MODULE_HEIGHT / 2) * RATIO, (90 + MODULE_WIDTH + 80) * RATIO, (MODULE_Y + MODULE_HEIGHT / 2) * RATIO); // Fetch wire
	line((150 + MODULE_WIDTH) * RATIO, (MODULE_Y + MODULE_HEIGHT / 2) * RATIO, (150 + MODULE_WIDTH) * RATIO, (MODULE_Y + MODULE_HEIGHT * 2 / 3) * RATIO); // Fetch wire 2
	line((150 + MODULE_WIDTH) * RATIO, (MODULE_Y + MODULE_HEIGHT * 2 / 3) * RATIO, (170 + MODULE_WIDTH) * RATIO, (MODULE_Y + MODULE_HEIGHT * 2 / 3) * RATIO); // Fetch wire 3
	line((270 + MODULE_WIDTH) * RATIO, (MODULE_Y + MODULE_HEIGHT / 3) * RATIO, (270 + MODULE_WIDTH + 80) * RATIO, (MODULE_Y + MODULE_HEIGHT / 3) * RATIO); // Decode wire 1
	line((270 + MODULE_WIDTH) * RATIO, (MODULE_Y + MODULE_HEIGHT / 3 * 2) * RATIO, (270 + MODULE_WIDTH + 80) * RATIO, (MODULE_Y + MODULE_HEIGHT / 3 * 2) * RATIO); // Decode wire 2
	line((450 + MODULE_WIDTH) * RATIO, (MODULE_Y + MODULE_HEIGHT / 2) * RATIO, (450 + MODULE_WIDTH + 80) * RATIO, (MODULE_Y + MODULE_HEIGHT / 2) * RATIO); // Execution wire
	line((335 + MODULE_WIDTH) * RATIO, (MODULE_Y + MODULE_HEIGHT + 10) * RATIO, (515 + MODULE_WIDTH) * RATIO, (MODULE_Y + MODULE_HEIGHT + 10) * RATIO); // Execution wire 2
	line((335 + MODULE_WIDTH) * RATIO, (MODULE_Y + MODULE_HEIGHT + 10) * RATIO, (515 + MODULE_WIDTH) * RATIO, (MODULE_Y + MODULE_HEIGHT + 10) * RATIO); // Execution wire 3
	line((335 + MODULE_WIDTH) * RATIO, (MODULE_Y + MODULE_HEIGHT + 10) * RATIO, (335 + MODULE_WIDTH) * RATIO, (MODULE_Y + MODULE_HEIGHT / 3 * 2) * RATIO); // Execution wire 4
	line((630 + MODULE_WIDTH) * RATIO, (MODULE_Y + MODULE_HEIGHT / 2) * RATIO, (630 + MODULE_WIDTH + 80) * RATIO, (MODULE_Y + MODULE_HEIGHT / 2) * RATIO); // Mem wire
	line((515 + MODULE_WIDTH) * RATIO, (MODULE_Y + MODULE_HEIGHT / 2) * RATIO, (515 + MODULE_WIDTH) * RATIO, (MODULE_Y + MODULE_HEIGHT + 10) * RATIO); // Mem wire 2

	// All box texts
	textSize(MODULE_TEXT_SIZE * RATIO);
	noStroke();
	fill(22);
	text("IF", 130 * RATIO, MODULE_TEXT_Y* RATIO); // Fetch
	text("DE", 294 * RATIO, MODULE_TEXT_Y* RATIO); // Decode
	text("EX", 480 * RATIO, MODULE_TEXT_Y* RATIO); // Execute
	text("MEM", 639 * RATIO, MODULE_TEXT_Y* RATIO); // Memory
	text("WB", 829 * RATIO, MODULE_TEXT_Y* RATIO); // Write

	// All instruction boxes
	noStroke();
	fill(getColor(instrTypeF));
	rect(90* RATIO, INSTRUCTION_Y* RATIO, INSTRUCTION_WIDTH* RATIO, INSTRUCTION_HEIGHT* RATIO); // Fetch

	fill(getColor(instrTypeD));
	rect(270* RATIO, INSTRUCTION_Y* RATIO, INSTRUCTION_WIDTH* RATIO, INSTRUCTION_HEIGHT* RATIO); // Decode

	fill(getColor(instrTypeE));
	rect(450* RATIO, INSTRUCTION_Y* RATIO, INSTRUCTION_WIDTH* RATIO, INSTRUCTION_HEIGHT* RATIO); // Execute

	fill(getColor(instrTypeM));
	rect(630* RATIO, INSTRUCTION_Y* RATIO, INSTRUCTION_WIDTH* RATIO, INSTRUCTION_HEIGHT* RATIO); // Memory

	fill(getColor(instrTypeW));
	rect(810* RATIO, INSTRUCTION_Y* RATIO, INSTRUCTION_WIDTH* RATIO, INSTRUCTION_HEIGHT* RATIO); // Write

	//rect(x,   y,  w,  h );
	strokeWeight(0.8 * RATIO);
	stroke(51);
	fill(PIPELINE_COLOR);
	rect(40 * RATIO, PC_PIPELINE_Y* RATIO, 20* RATIO, PC_PIPELINE_HEIGHT * RATIO); // PC pipeline register
	rect(220* RATIO, 80* RATIO, 20* RATIO, PIPELINE_HEIGHT * RATIO); // FD pipline register
	rect(400* RATIO, 80* RATIO, 20* RATIO, PIPELINE_HEIGHT * RATIO); // DE pipeline register
	rect(580* RATIO, 80* RATIO, 20* RATIO, PIPELINE_HEIGHT * RATIO); // EM pipeline register
	rect(760* RATIO, 80* RATIO, 20* RATIO, PIPELINE_HEIGHT * RATIO); // MW pipeline register

	// Stage instructions
	textSize(TEXT_SIZE * RATIO);
	noStroke();
	fill(255);
	text(instrF, 95* RATIO, TEXT_Y* RATIO); // Fetch
	text(instrD, 275* RATIO, TEXT_Y* RATIO); // Decode
	text(instrE, 455* RATIO, TEXT_Y* RATIO); // Execute
	text(instrM, 635* RATIO, TEXT_Y* RATIO); // Memory
	text(instrW, 815* RATIO, TEXT_Y* RATIO); // Write

	// Control Unit and text
	textSize(CONTROL_TEXT_SIZE * RATIO);
	fill(CONTROL_COLOR);
	strokeWeight(0.8 * RATIO);
	stroke(51);
	rect(270* RATIO, CONTROL_Y * RATIO, 50* RATIO, 100* RATIO); // Decode
	noStroke();
	fill(22)
	text("Control\nUnit", 275* RATIO, CONTROL_TEXT_Y * RATIO);

	RED = getColor(instrTypeD);
	strokeWeight(1 * RATIO);
	stroke(RegWriteD == "1" ? RED : BLUE); line(320 * RATIO, 103 * RATIO, 400 * RATIO, 103 * RATIO);
	stroke(MemtoRegD == "1" ? RED : BLUE); line(320 * RATIO, 115 * RATIO, 400 * RATIO, 115 * RATIO);
	stroke(MemWriteD == "1" ? RED : BLUE); line(320 * RATIO, 127 * RATIO, 400 * RATIO, 127 * RATIO);
	stroke(check_zero(ALUControlD) ? BLUE : RED); line(320 * RATIO, 139 * RATIO, 400 * RATIO, 139 * RATIO);
	stroke(ALUSrcD == "1" ? RED : BLUE); line(320 * RATIO, 151 * RATIO, 400 * RATIO, 151 * RATIO);
	stroke(RegDstD == "1" ? RED : BLUE); line(320 * RATIO, 163 * RATIO, 400 * RATIO, 163 * RATIO);
	stroke(BranchD == "1" ? RED : BLUE); line(320 * RATIO, 175 * RATIO, 375 * RATIO, 175 * RATIO);

	// Control wires E
	RED = getColor(instrTypeE);
	stroke(RegWriteE == "1" ? RED : BLUE); line(420 * RATIO, 103 * RATIO, 580 * RATIO, 103 * RATIO);
	stroke(MemtoRegE == "1" ? RED : BLUE); line(420 * RATIO, 115 * RATIO, 580 * RATIO, 115 * RATIO);
	stroke(MemWriteE == "1" ? RED : BLUE); line(420 * RATIO, 127 * RATIO, 580 * RATIO, 127 * RATIO);
	stroke(check_zero(ALUControlE) ? BLUE : RED); line(420 * RATIO, 139 * RATIO, 475 * RATIO, 139 * RATIO);
	stroke(ALUSrcE == "1" ? RED : BLUE); line(420 * RATIO, 151 * RATIO, 475 * RATIO, 151 * RATIO);
	stroke(RegDstE == "1" ? RED : BLUE); line(420 * RATIO, 163 * RATIO, 475 * RATIO, 163 * RATIO);

	RED = getColor(instrTypeM);
	// Control wires M
	stroke(RegWriteM == "1" ? RED : BLUE); line(600 * RATIO, 103 * RATIO, 760 * RATIO, 103 * RATIO);
	stroke(MemtoRegM == "1" ? RED : BLUE); line(600 * RATIO, 115 * RATIO, 760 * RATIO, 115 * RATIO);
	stroke(MemWriteM == "1" ? RED : BLUE); line(600 * RATIO, 127 * RATIO, 655 * RATIO, 127 * RATIO);

	// Control wires W
	RED = getColor(instrTypeW);
	stroke(RegWriteW == "1" ? RED : BLUE); line(780 * RATIO, 103 * RATIO, 835 * RATIO, 103 * RATIO);
	stroke(MemtoRegW == "1" ? RED : BLUE); line(780 * RATIO, 115 * RATIO, 835 * RATIO, 115 * RATIO);

	// Control wires D
	RED = getColor(instrTypeD);
	strokeWeight(0);
	textSize(WIRE_NAME * RATIO);
	textStyle(RegWriteD == "1" ? BOLD : NORMAL); fill(RegWriteD == "1" ? RED : BLUE); text("RegWriteD", (320 + WIRE_NAME_OFF) * RATIO, (103 - WIRE_NAME_OFF) * RATIO);
	textStyle(MemtoRegD == "1" ? BOLD : NORMAL); fill(MemtoRegD == "1" ? RED : BLUE); text("MemToRegD", (320 + WIRE_NAME_OFF) * RATIO, (115 - WIRE_NAME_OFF) * RATIO);
	textStyle(MemWriteD == "1" ? BOLD : NORMAL); fill(MemWriteD == "1" ? RED : BLUE); text("MemWriteD", (320 + WIRE_NAME_OFF) * RATIO, (127 - WIRE_NAME_OFF) * RATIO);

	fill(check_zero(ALUControlD) ? BLUE : RED);
	text("ALUControlD", (320 + WIRE_NAME_OFF) * RATIO, (139 - WIRE_NAME_OFF) * RATIO);
	//text(ALUControlD, (365 + WIRE_NAME_OFF) * RATIO, (139 - WIRE_NAME_OFF) * RATIO);

	textStyle(ALUSrcD == "1" ? BOLD : NORMAL); fill(ALUSrcD == "1" ? RED : BLUE); text("ALUSrcD", (320 + WIRE_NAME_OFF) * RATIO, (151 - WIRE_NAME_OFF) * RATIO);
	textStyle(RegDstD == "1" ? BOLD : NORMAL); fill(RegDstD == "1" ? RED : BLUE); text("RegDstD", (320 + WIRE_NAME_OFF) * RATIO, (163 - WIRE_NAME_OFF) * RATIO);
	textStyle(BranchD == "1" ? BOLD : NORMAL); fill(BranchD == "1" ? RED : BLUE); text("BranchD", (320 + WIRE_NAME_OFF) * RATIO, (175 - WIRE_NAME_OFF) * RATIO);

	RED = getColor(instrTypeE);
	textStyle(RegWriteE == "1" ? BOLD : NORMAL); fill(RegWriteE == "1" ? RED : BLUE); text("RegWriteE", (420 + WIRE_NAME_OFF) * RATIO, (103 - WIRE_NAME_OFF) * RATIO);
	textStyle(MemtoRegE == "1" ? BOLD : NORMAL); fill(MemtoRegE == "1" ? RED : BLUE); text("MemToRegE", (420 + WIRE_NAME_OFF) * RATIO, (115 - WIRE_NAME_OFF) * RATIO);
	textStyle(MemWriteE == "1" ? BOLD : NORMAL); fill(MemWriteE == "1" ? RED : BLUE); text("MemWriteE", (420 + WIRE_NAME_OFF) * RATIO, (127 - WIRE_NAME_OFF) * RATIO);

	fill(check_zero(ALUControlE) ? BLUE : RED);
	text("ALUControlE", (420 + WIRE_NAME_OFF) * RATIO, (139 - WIRE_NAME_OFF) * RATIO);
	//text(ALUControlE, (465 + WIRE_NAME_OFF) * RATIO, (139 - WIRE_NAME_OFF) * RATIO)

	textStyle(ALUSrcE == "1" ? BOLD : NORMAL); fill(ALUSrcE == "1" ? RED : BLUE); text("ALUSrcE", (420 + WIRE_NAME_OFF) * RATIO, (151 - WIRE_NAME_OFF) * RATIO);
	textStyle(RegDstE == "1" ? BOLD : NORMAL); fill(RegDstE == "1" ? RED : BLUE); text("RegDstE", (420 + WIRE_NAME_OFF) * RATIO, (163 - WIRE_NAME_OFF) * RATIO);

	RED = getColor(instrTypeM);
	textStyle(RegWriteM == "1" ? BOLD : NORMAL); fill(RegWriteM == "1" ? RED : BLUE); text("RegWriteM", (600 + WIRE_NAME_OFF) * RATIO, (103 - WIRE_NAME_OFF) * RATIO);
	textStyle(MemtoRegM == "1" ? BOLD : NORMAL); fill(MemtoRegM == "1" ? RED : BLUE); text("MemToRegM", (600 + WIRE_NAME_OFF) * RATIO, (115 - WIRE_NAME_OFF) * RATIO);
	textStyle(MemWriteM == "1" ? BOLD : NORMAL); fill(MemWriteM == "1" ? RED : BLUE); text("MemWriteM", (600 + WIRE_NAME_OFF) * RATIO, (127 - WIRE_NAME_OFF) * RATIO);

	RED = getColor(instrTypeW);
	textStyle(RegWriteW == "1" ? BOLD : NORMAL); fill(RegWriteW == "1" ? RED : BLUE); text("RegWriteW", (780 + WIRE_NAME_OFF) * RATIO, (103 - WIRE_NAME_OFF) * RATIO);
	textStyle(MemtoRegW == "1" ? BOLD : NORMAL); fill(MemtoRegW == "1" ? RED : BLUE); text("MemToRegW", (780 + WIRE_NAME_OFF) * RATIO, (115 - WIRE_NAME_OFF) * RATIO);

	// Title
	strokeWeight(0);
	textSize(32*RATIO);
	fill(0, 0, 0);
	text(title, 280* RATIO, 40* RATIO); // Fetch
}

function mousePressed() {
	clear(); // resets the diagram
	// Check which button was pressed
	btnHeight = 20 * RATIO;
	btnWidth = 40 * RATIO;
	prevX = 840 * RATIO;
	prevY = 21 * RATIO;
	nextX = 885 * RATIO;
	nextY = 21 * RATIO;
	if (inRange(prevX,prevY,btnWidth,btnHeight) && (clk > 0)) { // prev clicked
		// Updating the clock
		clk = clk - 1;
		clkStr = "Clock: "+clk;
	} else if (inRange(nextX,nextY,btnWidth,btnHeight) && (clk < infoLength)) {
		// Updating the clock
		clk = clk + 1;
		clkStr = "Clock: "+clk;
	}

	// Grab the new information from the new clock cycle
	var new_info = getInfo(clk);
	var new_instr_info = getInstrTypeInfo(clk);
	instrF = new_info[1]; instrTypeF = new_instr_info[1];
	instrD = new_info[2]; instrTypeD = new_instr_info[2];
	instrE = new_info[3]; instrTypeE = new_instr_info[3];
	instrM = new_info[4]; instrTypeM = new_instr_info[4];
	instrW = new_info[5]; instrTypeW = new_instr_info[5];

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