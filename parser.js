/**
 * Created by Son Pham on 11/2/2016.
 */

// Dummy array
DUMMY_ARRAY = ["0", "N/A", "N/A", "N/A", "N/A", "N/A"]

// Variable to store all pipeline info
var infoArray;

function parseInfo(data) {
  // Split by line
  var lines = data.split(/\n/);
  var len = lines.length;
  infoArray = new Array(len);
  console.log(infoArray);

  // Loop through all the line
  for (var lineNum = 0; lineNum < len; lineNum++) {
    var line = lines[lineNum];
    line = line.trim();

    // Loop through all the inst
    var line_data = line.split("|");

    // Store the data and convert it to MIPS
    if (line_data.length > 1) {
      for (var i = 1; i <= 5; i++) {
        line_data[i] = convertHexToMips(line_data[i]);
      }
    }

    infoArray[lineNum] = line_data;
    console.log(infoArray);
  }

  // Print the array to learn what is going on
}

function getInfo(clock_cycle) {
  try {
    return infoArray[clock_cycle];
  } catch (e) {
    // If there is a bug, return dummy array
    return DUMMY_ARRAY;
  }
}