/**
 * JS for setting up the SVG arrows
 * loosely based on:
 * https://stackoverflow.com/questions/6278152/drawing-a-connecting-line-between-two-elements
 * and:
 * https://stackoverflow.com/questions/20037122/draw-an-arrow-between-two-divs
 */

var analysisDiv;
var designDiv;
var implementationDiv;
var testingDiv;

var analysisToDesignArrow;
var designToImplementationArrow;
var implementationToTestingArrow;

var designToAnalysisArrow;
var implementationToDesignArrow;
var testingToImplementationArrow;

var notAllowedTopArrow;
var notAllowedMidArrow;
var notAllowedBotArrow;
var notAllowedDiv;

$(document).ready(function() {
  analysisDiv = $('#analysis');
  designDiv = $('#design');
  implementationDiv = $('#implementation');
  testingDiv = $('#testing');
  analysisToDesignArrow = $('#analysis-design');
  designToImplementationArrow = $('#design-implementation');
  implementationToTestingArrow = $('#implementation-testing');
  designToAnalysisArrow = $('#design-analysis');
  implementationToDesignArrow = $('#implementation-design');
  testingToImplementationArrow = $('#testing-implementation');
  notAllowedTopArrow = $('#not-allowed-1');
  notAllowedMidArrow = $('#not-allowed-2');
  notAllowedBotArrow = $('#not-allowed-3');
  notAllowedDiv = $('#not-allowed-label');

  window.onresize = function() {
    createArrow(analysisToDesignArrow, analysisDiv, designDiv, false);
    createArrow(designToImplementationArrow, designDiv, implementationDiv, false);
    createArrow(implementationToTestingArrow, implementationDiv, testingDiv, false);
  
    createArrow(designToAnalysisArrow, designDiv, analysisDiv, true);
    createArrow(implementationToDesignArrow, implementationDiv, designDiv, true);
    createArrow(testingToImplementationArrow, testingDiv, implementationDiv, true);

    createNotAllowedArrow(notAllowedTopArrow, notAllowedDiv, designDiv, analysisDiv, 1);
    createNotAllowedArrow(notAllowedMidArrow, notAllowedDiv, implementationDiv, designDiv, 2);
    createNotAllowedArrow(notAllowedBotArrow, notAllowedDiv, testingDiv, implementationDiv, 3);

  }
});

function createArrow(arrow, from, to, isUp) {
  var fromLocation = from.offset();
  var toLocation = to.offset();

  var line;
  if (!isUp) {
    line = "M" + (fromLocation.left + from.width() + 2) + "," + (fromLocation.top + from.height() / 2); // +2 to align it properly
    line += " L" + (toLocation.left + to.width() / 2) + "," + (fromLocation.top + from.height() / 2);
    line += " L" + (toLocation.left + to.width() / 2) + "," + (toLocation.top - 12); // -12 to subtract the size of the arrow
  } else {
    line = "M" + (fromLocation.left) + "," + (fromLocation.top + from.height() / 2);
    line += " L" + (toLocation.left + to.width() / 2) + "," + (fromLocation.top + from.height() / 2);
    line += " L" + (toLocation.left + to.width() / 2) + "," + (toLocation.top + to.height() + 14); // +14 to subtract the size of the arrow
  }
  arrow.attr('d', line);
}

function createNotAllowedArrow(arrow, from, toLower, toUpper, stage) {
  var fromLocation = from.offset();
  var toLowerLocation = toLower.offset();
  var toUpperLocation = toUpper.offset();

  var line = "M";
  var offset = [0, 0]; // To subtract the size of the arrow
  switch(stage) {
    case(1):
      // Start the arrow from the top center
      line += (fromLocation.left + from.width() / 2) + "," + (fromLocation.top);
      offset = [10, 20];
      break;
    case(2):
      // Start the arrow from the top right
      // Offset to bring it closer to the text
      line += (fromLocation.left + from.width() * 0.85);
      line += "," + (fromLocation.top + from.height() / 4);
      offset = [-15, 0];
      break;
    case(3):
      // Start the arrow from the middle right
      // Offset to bring it closer to the text
      line += (fromLocation.left + from.width() * 0.85);
      line+= "," + (fromLocation.top + from.height() / 2);
      offset = [-15, -10];
      break;
    default:
      console.log("Strange value entered as stage number")
  }
  // Aim at the turning point of the arrow
  line += " L" + (toUpperLocation.left + toUpper.width() / 2 + offset[0]) + "," + (toLowerLocation.top + toLower.height() / 2 + offset[1]);
  arrow.attr('d', line);
}
