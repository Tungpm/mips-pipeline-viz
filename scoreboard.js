
// FUNCTIONAL UNIT
function FunctionalUnit(type, name) {
    this.type = type;
    this.name = name;

    this.isBusy = false;
    this.op = 0;
    this.f_i = "";
    this.f_j = "";
    this.f_k = "";

    this.q_j = null;
    this.q_k = null;
    this.r_j = true;
    this.r_k = true;
}

// INSTRUCTION
function Instruction(instr) {
    // Parsing the components of the instruction
    //TODO: Change to actual parsing
    this.type = "ADDUI";
    this.f_i = "F3";
    this.f_j = "F1";
    this.f_k = "F2";

    this.functionalUnit = null;
    this.issueTime = 0;
    this.readTime = 0;
    this.executeCompleteTime = 0;
    this.writeTime = 0;
}

// SCOREBOARD
function ScoreBoard() {
    this.instructions = new Array();
    this.functionalUnits = new Array();

}

ScoreBoard.prototype.next = function() {
    // Update
}

s = ScoreBoard();
s.next();