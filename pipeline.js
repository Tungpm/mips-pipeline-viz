title = "Mips Pipeline Vizualization"

instrF = "addiu $zero $zero $zero"
instrD = "addiu $zero $zero $zero"
instrE = "addiu $zero $zero $zero"
instrM = "addiu $zero $zero $zero"
instrW = "addiu $zero $zero $zero"

clk = 0;

clkStr = "Clock: 0"

/* Creates the smodules */
function setup() {


// Create the canvas
  createCanvas(960, 400);
  background(200);s

  // Set colors
  fill(70, 101, 192, 127);
  stroke(127, 63, 120);

//rect(x,   y,  w,  h );
  rect(40, 80, 20, 250); // PC pipeline register
  
  rect(80, 150, 120, 100); // Fetch

  rect(220, 80, 20, 250); // FD pipline register
 
  rect(260, 150, 120, 100); // Decode

  rect(400, 80, 20, 250); // DE pipeline register

  rect(440, 150, 120, 100); // Execute

  rect(580, 80, 20, 250); // EM pipeline register

  rect(620, 150, 120, 100); // Memory

  rect(760, 80, 20, 250); // MW pipeline register

  rect(800, 150, 120, 100); // Write

// Title
	textSize(32);
	fill(0, 0, 0);
	text(title, 280, 40); // Fetch


  // Stage instructions
	textSize(10);
	fill(999, 999, 999);
	text(instrF, 85, 200); // Fetch

	fill(999, 999, 999);
	text(instrD, 265, 200); // Decode

	fill(999, 999, 999);
	text(instrE, 445, 200); // Execute

	fill(999, 999, 999);
	text(instrM, 625, 200); // Memory
	
	fill(999, 999, 999);
	text(instrW, 805,200); // Write

	textSize(20);
	fill(999, 999, 999);
	text(clkStr, 30,30); // Write
	

}



function draw() {
	  background(200);

  // Set colors
  fill(70, 101, 192, 127);
  stroke(127, 63, 120);
	//rect(x,   y,  w,  h );
  rect(40, 80, 20, 250); // PC pipeline register
  
  rect(80, 150, 120, 100); // Fetch

  rect(220, 80, 20, 250); // FD pipline register
 
  rect(260, 150, 120, 100); // Decode

  rect(400, 80, 20, 250); // DE pipeline register

  rect(440, 150, 120, 100); // Execute

  rect(580, 80, 20, 250); // EM pipeline register

  rect(620, 150, 120, 100); // Memory

  rect(760, 80, 20, 250); // MW pipeline register

  rect(800, 150, 120, 100); // Write

// Title
	textSize(32);
	fill(0, 0, 0);
	text(title, 280, 40); // Fetch


  // Stage instructions
	textSize(10);
	fill(999, 999, 999);
	text(instrF, 85, 200); // Fetch

	fill(999, 999, 999);
	text(instrD, 265, 200); // Decode

	fill(999, 999, 999);
	text(instrE, 445, 200); // Execute

	fill(999, 999, 999);
	text(instrM, 625, 200); // Memory
	
	fill(999, 999, 999);
	text(instrW, 805,200); // Write

	textSize(20);
	fill(999, 999, 999);
	text(clkStr, 30,30); // Write
	}





function mousePressed() {
  clear()
  clk = clk + 1;
  clkStr = "Clock: "+clk;

}



function parseInstructions() {

}
