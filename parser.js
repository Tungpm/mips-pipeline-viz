/**
 * Created by Son Pham on 11/2/2016.
 */

// Dummy array
DUMMY_ARRAY = ["0", "N/A", "N/A", "N/A", "N/A", "N/A"]
DUMMY_INSTR_TYPE = ["0", "N/A", "N/A", "N/A", "N/A", "N/A"]

// Variable to store all pipeline info
var infoArray;
var instrTypeArray;

function parseInfo(data) {
  // Split by line
  var lines = data.split(/\n/);
  var len = lines.length;
  infoArray = new Array(len);
  instrTypeArray = new Array(len);

  // Loop through all the line
  for (var lineNum = 0; lineNum < len; lineNum++) {
    var line = lines[lineNum];
    line = line.trim();

    // Loop through all the inst
    var line_data = line.split("|");
    var instr_data = new Array(6);

    // Store the data and convert it to MIPS
    if (line_data.length > 1) {
      for (var i = 1; i <= 5; i++) {
        line_data[i] = convertHexToMips(line_data[i]);
        instr_data[i] = line_data[i].split(" ")[0];
      }
    }

    infoArray[lineNum] = line_data;
    instrTypeArray[lineNum] = instr_data;
  }
  infoLength = len;
}

function getInfo(clock_cycle) {
  try {
    return infoArray[clock_cycle];
  } catch (e) {
    // If there is a bug, return dummy array
    return DUMMY_ARRAY;
  }
}

function getInstrTypeInfo(clock_cycle) {
  try {
    return instrTypeArray[clock_cycle];
  } catch (e) {
    return DUMMY_INSTR_TYPE;
  }
}