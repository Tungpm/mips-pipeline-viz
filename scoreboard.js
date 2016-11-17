
// FUNCTIONAL UNIT
var FunctionalUnit = function (name, type, latency) {
    this.type = type;
    this.name = name;
    this.latency = latency;
    this.instr = null;

    this.isBusy = (this.instr == null)?false:true;
    this.op = (this.instr == null)?"":this.instr.type;
    this.f_i = (this.instr == null)?"":this.instr.f_i;
    this.f_j = (this.instr == null)?"":this.instr.f_j;
    this.f_k = (this.instr == null)?"":this.instr.f_k;

    this.q_j = null;
    this.q_k = null;
    this.r_j = ((this.f_j == "")?"":((this.q_j == null)?true:false));
    this.r_k = ((this.f_k == "")?"":((this.q_k == null)?true:false));
}

// INSTRUCTION
var Instruction = function (instr) {
    // Parsing the components of the instruction
    //TODO: Change to actual parsing
    var pieces_arr = getInstructionPieces(instr);

    this.type = pieces_arr[0];
    this.f_i = pieces_arr[1];
    this.f_j = pieces_arr[2];
    this.f_k = pieces_arr[3];

    this.functionalUnit = null;
    this.issueTime = 0;
    this.readTime = 0;
    this.executeCompleteTime = 0;
    this.writeTime = 0;
}

// SCOREBOARD
var ScoreBoard = function() {
    this.instructions = [];
    this.functionalUnits = [];
    this.clk = 0;
}

//Initialize the functional units
ScoreBoard.prototype.initialize = function() {
    this.functionalUnits = [];


    /* Get the number of FU units to make */
    var Integer_Count = parseInt($("#cInt").val());
    var Add_Count = parseInt($("#cAdd").val());
    var Mult_Count = parseInt($("#cMult").val());
    var Div_Count = parseInt($("#cDiv").val());
    var Load_Count = parseInt($("#cLoad").val());
    var Store_Count = parseInt($("#cStore").val());

    var Integer_Latency = parseInt($("#latInt").val());
    var Add_Latency = parseInt($("#latAdd").val());
    var Mult_Latency = parseInt($("#latMult").val());
    var Div_Latency = parseInt($("#latDiv").val());
    var Load_Latency = parseInt($("#latLoad").val());
    var Store_Latency = parseInt($("#latStore").val());


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

ScoreBoard.prototype.displayFU = function() {
    /* Construct HTML for FU status table */
    var FUStatusHTML = "<table class='FUStatusTable'>";
    FUStatusHTML += "<tr>";
    FUStatusHTML += "<th>Time</th>";
    FUStatusHTML += "<th>Name</th>";
    FUStatusHTML += "<th>Busy</th>";
    FUStatusHTML += "<th>Op</th>";
    FUStatusHTML += "<th>Fi</th>";
    FUStatusHTML += "<th>Fj</th>";
    FUStatusHTML += "<th>Fk</th>";
    FUStatusHTML += "<th>Qj</th>";
    FUStatusHTML += "<th>Qk</th>";
    FUStatusHTML += "<th>Rj</th>";
    FUStatusHTML += "<th>Rk</th>";
    FUStatusHTML += "</tr>";

    // loop each functional unit to generate
    for (var i=0; i < this.functionalUnits.length; i++) {
        var unit = this.functionalUnits[i];
        FUStatusHTML += "<tr>";
        if (unit.isBusy) {
            FUStatusHTML += "<td></td><td>" + unit.name + "</td><td>" + unit.isBusy + "</td><td>" + unit.op +
                "</td><td>" + unit.f_i + "</td><td>" + unit.f_j + "</td><td>" + unit.f_k +
                "</td><td>" + ((unit.q_j == null) ? "" : unit.q_j.name) + "</td><td>" + ((unit.q_k == null) ? "" : unit.q_k.name) +
                "</td><td>" + unit.r_j + "</td><td>" + unit.r_k + "</td>";
        } else {
            FUStatusHTML += "<td></td><td>"+ unit.name + "</td><td>" + unit.isBusy +
                "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>";
        }
        FUStatusHTML += "</tr>";
    }
    FUStatusHTML += "</table>";
    /* Add HTML */
    $(".FUStatusContainer").html(FUStatusHTML);

    $("#clock").html("Clock: "+s.clk);
}
ScoreBoard.prototype.next = function() {
    // Update
    this.clk = this.clk + 1;


    // Display updated things
    this.displayFU();
}


function InitFUTable() {
    s = new ScoreBoard();
    s.initialize();
    s.displayFU();
}

function InitInstrStatusTable() {

}
function clockForward() {
    s.next();
}

function clockBack() {

}


var s = new ScoreBoard();
s.displayFU();