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
var feedbackDiv;

var analysisToDesignArrow;
var designToImplementationArrow;
var implementationToTestingArrow;
var testingToAnalysisArrow;
var feedbackArrow;

$(document).ready(function() {
  analysisDiv = $('#analysis');
  designDiv = $('#design');
  implementationDiv = $('#implementation');
  testingDiv = $('#testing');
  feedbackDiv = $('#feedback-text');

  analysisToDesignArrow = $('#analysis-design');
  designToImplementationArrow = $('#design-implementation');
  implementationToTestingArrow = $('#implementation-testing');
  testingToAnalysisArrow = $('#testing-analysis');
  feedbackArrow = $('#feedback');

  window.onresize = function() {
    createArrow(analysisToDesignArrow, analysisDiv, designDiv, 1);
    createArrow(designToImplementationArrow, designDiv, implementationDiv, 2);
    createArrow(implementationToTestingArrow, implementationDiv, testingDiv, 3);
    createArrow(testingToAnalysisArrow, testingDiv, analysisDiv, 4);

    //createFeedbackArrow(feedbackArrow, feedbackDiv);
  }
});

/**
 * 
 * Based on defining a 90 degree curve as a partial ellipse:
 * start: (x1,y1)
 * curve: (x2-x1,y2-y1) will make it have endpoints perpendicular to the boxes
 * end: (x2,y2)
 */
function createArrow(arrow, from, to, rotation) {
  var fromLocation = from.offset();
  var toLocation = to.offset();

  var line = "M";
  var start = [0,0];
  var curve = [0,0];
  var end = [0,0];
  var endpointOffset = [0,0]; // To account for the arrowhead
  switch(rotation) {
    case(1):
      endpointOffset = [0, -13];
      start = [(fromLocation.left + from.width()), (fromLocation.top + from.height() / 2)];
      end = [(toLocation.left + to.width() / 2 + endpointOffset[0]), (toLocation.top + endpointOffset[1])];
      break;
    case(2):
      endpointOffset = [13, 0];
      start = [(fromLocation.left + from.width() / 2), (fromLocation.top + from.height())];
      end = [(toLocation.left + to.width() + endpointOffset[0]), (toLocation.top + to.height() / 2 + endpointOffset[1])];
      break;
    case(3):
      endpointOffset = [0, 13];
      start = [(fromLocation.left), (fromLocation.top + from.height() / 2)];
      end = [(toLocation.left + to.width() / 2 + endpointOffset[0]), (toLocation.top + to.height() + endpointOffset[1])];
      break;
    case(4):
      endpointOffset = [-13, 0];
      start = [(fromLocation.left + from.width() / 2), (fromLocation.top)];
      end = [(toLocation.left + endpointOffset[0]), (toLocation.top + to.height() / 2 + endpointOffset[1])];
      break;
  }

  curve = [end[0] - start[0], end[1] - start[1]];
  line += start[0] + "," + start[1] + " A" + curve[0] + "," + curve[1];
  line += " 0 0,1 "; // Boolean flags, constant
  line += end[0] + "," + end[1];

  arrow.attr('d', line);
}

function createFeedbackArrow() {

}
