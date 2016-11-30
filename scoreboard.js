
// FUNCTIONAL UNIT
var FunctionalUnit = function (name, type, latency) {
    this.type = type;
    this.name = name;
    this.latency = latency;

    this.instr = null;
    this.reading = false;
    this.executing = false;
    this.writing = false;
    this.clearing = false;
    this.time = 0;

    this.q_j = null;
    this.q_k = null;
}

FunctionalUnit.prototype.isBusy = function(){return((this.instr == null)?false:true);}
FunctionalUnit.prototype.op = function(){return((this.instr == null)?"":this.instr.op);}
FunctionalUnit.prototype.f_i = function(){return((this.instr == null)?"":this.instr.f_i);}
FunctionalUnit.prototype.f_j = function(){return((this.instr == null)?"":this.instr.f_j);}
FunctionalUnit.prototype.f_k = function(){return((this.instr == null)?"":this.instr.f_k);}
FunctionalUnit.prototype.r_j = function(){return(((this.f_j() == "")?"":((this.q_j == null)?true:false)));}
FunctionalUnit.prototype.r_k = function(){return(((this.f_k() == "")?"":((this.q_k == null)?true:false)));}

// INSTRUCTION
var Instruction = function (instr) {
    // Parsing the components of the instruction
    var pieces_arr = getInstructionPieces(instr);

    this.op = pieces_arr[0];
    this.f_i = pieces_arr[1];
    this.f_j = pieces_arr[2];
    this.f_k = pieces_arr[3];

    this.functionalUnit = null;
    this.issueTime = 0;
    this.readTime = 0;
    this.executeCompleteTime = 0;
    this.writeTime = 0;
}

Instruction.prototype.getType = function() { return(((this.op in instToFU)? instToFU[this.op] : "INT")); }

// SCOREBOARD
var ScoreBoard = function() {
    this.instructions = [];
    this.functionalUnits = [];

    this.instruction_toBeIssued = 0;
    this.FUdict = {'INT':[], 'ADD':[], 'MULT':[], 'DIV':[], 'LOAD':[], 'STORE':[]};
    this.clk = 0;
}

//Initialize the functional units
ScoreBoard.prototype.loadFU = function() {

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
        var type = 'INT';
        var unit = new FunctionalUnit(type+count, type, Integer_Latency);
        this.FUdict[type].push(unit);
        this.functionalUnits.push(unit);
    }
    for (count = 1; count <= Add_Count; count++) {
        var type = 'ADD';
        var unit = new FunctionalUnit(type+count, type, Add_Latency);
        this.FUdict[type].push(unit);
        this.functionalUnits.push(unit);
    }
    for (count = 1; count <= Mult_Count; count++) {
        var type = 'MULT';
        var unit = new FunctionalUnit(type+count, type, Mult_Latency);
        this.FUdict[type].push(unit);
        this.functionalUnits.push(unit);
    }
    for (count = 1; count <= Div_Count; count++) {
        var type = 'DIV';
        var unit = new FunctionalUnit(type+count, type, Div_Latency);
        this.FUdict[type].push(unit);
        this.functionalUnits.push(unit);
    }
    for (count = 1; count <= Load_Count; count++) {
        var type = 'LOAD';
        var unit = new FunctionalUnit(type+count, type, Integer_Latency);
        this.FUdict[type].push(unit);
        this.functionalUnits.push(unit);
    }
    for (count = 1; count <= Store_Count; count++) {
        var type = 'STORE';
        var unit = new FunctionalUnit(type+count, type, Integer_Latency);
        this.FUdict[type].push(unit);
        this.functionalUnits.push(unit);
    }
}

ScoreBoard.prototype.loadInst = function() {
    this.CLK = 0;

    /* Get the inputed instructions */
    var inputText = $(".instructs").val();
    /* Parse the instructions */
    var instructs = inputText.split("\n");
    
    for (var l=0; l < instructs.length; l++) {           
        this.instructions.push(new Instruction(instructs[l]));
    }
    

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
        if (unit.isBusy()) {
            FUStatusHTML += "<td>" + unit.time + "</td><td>" + unit.name + "</td><td>" + unit.isBusy() +
                "</td><td>" + unit.op() + "</td><td>" + unit.f_i() + "</td><td>" + unit.f_j() + "</td><td>" + unit.f_k() +
                "</td><td>" + ((unit.q_j == null) ? "" : unit.q_j.name) + "</td><td>" + ((unit.q_k == null) ? "" : unit.q_k.name) +
                "</td><td>" + unit.r_j() + "</td><td>" + unit.r_k() + "</td>";
        } else {
            FUStatusHTML += "<td>" + unit.time + "</td><td>" + unit.name + "</td><td>" + unit.isBusy() +
                "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>";
        }
        FUStatusHTML += "</tr>";
    }
    FUStatusHTML += "</table>";
    /* Add HTML */
    $(".FUStatusContainer").html(FUStatusHTML);

    $("#clock").html("Clock: "+s.clk);
}

ScoreBoard.prototype.displayInst = function() {
    /* Create html for instruction status table */
    var InstructStatusHTML = "<table class='InstructStatusTable'>";
    InstructStatusHTML += "<tr>";
    InstructStatusHTML += "<th>Instruction</th>";
    InstructStatusHTML += "<th>i</th>";
    InstructStatusHTML += "<th>j</th>";
    InstructStatusHTML += "<th>k</th>";
    InstructStatusHTML += "<th>FU</th>";
    InstructStatusHTML += "<th>Issue</th>";
    InstructStatusHTML += "<th>Read</th>";
    InstructStatusHTML += "<th>Execute</th>";
    InstructStatusHTML += "<th>Write</th>";
    InstructStatusHTML += "</tr>";
    // loop through each of the inputed instructions
    for (var i=0; i < this.instructions.length; i++) {
        var inst = this.instructions[i];
        InstructStatusHTML += "<tr>";

        InstructStatusHTML += "<td>"+inst.op+"</td><td>" +
            inst.f_i+"</td><td>" + inst.f_j+"</td><td>" + inst.f_k+"</td><td>" +
            ((inst.functionalUnit == null)?"":inst.functionalUnit.name)+"</td><td>"+
            ((inst.issueTime==0)?"":inst.issueTime)+"</td><td>" + ((inst.readTime==0)?"":inst.readTime)+"</td><td>" +
            ((inst.executeCompleteTime==0)?"":inst.executeCompleteTime)+"</td><td>" +
            ((inst.writeTime==0)?"":inst.writeTime)+"</td>";
        InstructStatusHTML += "</tr>";
    }
    InstructStatusHTML += "</table>";
    /* Add HTML */
    $(".InstructStatusContainer").html(InstructStatusHTML);

}

ScoreBoard.prototype.next = function() {
    //Update
    //Clock
    this.clk = this.clk + 1;

    var Inst = this.instructions;
    var FU = this.functionalUnits;

    //Clear functional unit - stage after write
    for (var i = 0; i<FU.length; i++) {
        var fu = FU[i];
        if ((fu.isBusy())&&(fu.clearing)) {
            fu.clearing = false;
            fu.instr = null;
            fu.time = 0;
            fu.q_j = null;
            fu.q_k = null;
        }
    }

    //Write
    for (var i = 0; i<FU.length; i++) {
        var fu = FU[i];
        if ((fu.isBusy())&&(fu.writing)) {
            var write_instr = fu.instr;
            //Check for Hazard - WAR
            hasHazard = false;
            for (var j = 0; j<FU.length; j++) {
                var readFu = FU[j];
                if ((readFu.instr == null)||(readFu.instr.issueTime > write_instr.issueTime)) {
                    continue;
                }
                if ((readFu.isBusy())&& ((write_instr.f_i == readFu.f_j())||(write_instr.f_i == readFu.f_k()))) {
                    hasHazard = true;
                    break;
                }
            }
            if (!hasHazard) {
                write_instr.writeTime = this.clk;
                write_instr.functionalUnit.writing = false;
                write_instr.functionalUnit.clearing = true;

            }
        }
    }

    //Execute
    for (var i = 0; i<FU.length; i++) {
        var fu = FU[i];
        if ((fu.isBusy()) && (fu.executing)) {
            fu.time = fu.time+1;
            if (fu.time >= fu.latency) {
                //Done executing
                var instr = fu.instr;
                instr.executeCompleteTime = this.clk;
                fu.executing = false;
                fu.writing = true;
            }
        }
    }

    //Read
    for (var i = 0; i<FU.length; i++) {
        var fu = FU[i];
        if ((fu.isBusy())&&(fu.reading)) {
            var read_instr = fu.instr;
            //Check for Hazard - RAW
            hasHazard = false;
            for (var j = 0; j<FU.length; j++) {
                var write_fu = FU[j];
                if ((write_fu.instr == null)||(write_fu.instr.issueTime > read_instr.issueTime)) {
                    continue;
                }
                if ((write_fu.isBusy())&&((write_fu.f_i() == read_instr.f_j) || (write_fu.f_i() == read_instr.f_k))) {
                    hasHazard = true;
                    break;
                }
            }
            if (!hasHazard) {
                read_instr.readTime = this.clk;
                read_instr.functionalUnit.reading = false;
                read_instr.functionalUnit.executing = true;
            }
        }
    }

    //Issue
    var issueInst = Inst[this.instruction_toBeIssued];
    var hasHazard = false;
    //First instruction in line waiting to be issued
    //Check instructions running for WAW hazard
    if (issueInst != null) {
        for (var i = 0; i<FU.length; i++) {
            var fu = FU[i];
            if (fu.instr == null) {
                continue;
            }
            if ((fu.isBusy())&& (fu.f_i() == issueInst.f_i)) {
                hasHazard = true;
                break;
            }
        }
    }

    //Check functional units for structural hazards
    if ((!hasHazard) && (issueInst != null)) {
        var inst_type = issueInst.getType();
        for (var i = 0; i < this.FUdict[inst_type].length; i++) {
            fu = this.FUdict[inst_type][i];
            if (!fu.isBusy()) {
                //If not busy then we can issue
                this.instruction_toBeIssued += 1;

                fu.instr = issueInst;
                fu.reading = true;
                issueInst.functionalUnit = fu;
                issueInst.issueTime = this.clk;
                break;
            }
            //If no FU is available then structural hazard, can't be issued
        }
    }

    // Display updated things
    this.displayFU();
    this.displayInst();
}

function Initialize() {
    $(".errorBox").html("");
    s = new ScoreBoard();

    //Functional Units
    s.loadFU();
    s.displayFU();

    //Instructions
    try {
        s.loadInst();
    } catch (e) {
        $(".errorBox").html("Error in the Instruction List");
    }

    s.displayInst();
}

function clockForward() {
    s.next();
}

function clockBack() {

}

var instToFU = {
    'add.d':'ADD', 'sub.d':'ADD', 'mul.d':'MULT', 'div.d':'DIV', 'l.d':'LOAD', 's.d':'STORE'
};
var s = new ScoreBoard();
s.displayFU();
