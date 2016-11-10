
// FUNCTIONAL UNIT
function FunctionalUnit(name, type, latency) {
    this.type = type;
    this.name = name;
    this.latency = latency;

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
    this.instructions = [];
    this.functionalUnits = [];
    this.CLK = 0;
}

//Initialize the functional units
ScoreBoard.prototype.initialize = function(
    Integer_Count, Integer_Latency,
    Add_Count, Add_Latency,
    Mult_Count, Mult_Latency,
    Div_Count, Div_Latency,
    Load_Count, Load_Latency,
    Store_Count, Store_Latency) {
    this.functionalUnits = [];

    for (count = 1; count <= Integer_Count; count++) {
        this.functionalUnits.push(new FunctionalUnit('INT'+count, 'INT', Integer_Latency));
    }
    for (count = 1; count <= Add_Count; count++) {
        this.functionalUnits.push(new FunctionalUnit('ADD'+count, 'ADD', Add_Latency));
    }
    for (count = 1; count <= Mult_Count; count++) {
        this.functionalUnits.push(new FunctionalUnit('MULT'+count, 'MULT', Mult_Latency));
    }
    for (count = 1; count <= Div_Count; count++) {
        this.functionalUnits.push(new FunctionalUnit('DIV'+count, 'DIV', Div_Latency));
    }
    for (count = 1; count <= Load_Count; count++) {
        this.functionalUnits.push(new FunctionalUnit('LOAD'+count, 'LOAD', Load_Latency));
    }
    for (count = 1; count <= Store_Count; count++) {
        this.functionalUnits.push(new FunctionalUnit('STORE'+count, 'STORE', Store_Latency));
    }
}

ScoreBoard.prototype.loadInstructions = function() {
    //TODO: Parse the instructions in
    this.instructions = [];
    this.CLK = 0;
}


ScoreBoard.prototype.next = function() {
    // Update
}

s = ScoreBoard();
s.next();