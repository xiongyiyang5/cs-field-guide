const dragula = require('./../../../../node_modules/dragula/dragula');
const mathjs = require('mathjs');
const sprintf = require('sprintf-js').sprintf;
const vsprintf = require('sprintf-js').vsprintf;

const ROW_TEMPLATE = "%s & %s & %s";
const MATRIX_TEMPLATE = "\\begin{bmatrix} %s \\\\ %s \\\\ %s \\end{bmatrix}";
const EXPANDED_ROW_TEMPLATE = "%sx + %sy + %sz";

m1 = mathjs.matrix([
  [mathjs.cos(toRadians(45)),0,mathjs.sin(toRadians(45))],
  [0,1,0],
  [-mathjs.sin(toRadians(45)),0,mathjs.cos(toRadians(45))]
]);
m2 = mathjs.matrix([[10,0,0],[0,10,0],[0,0,10]]);

v1 = mathjs.matrix([[10], [0], [0]]);

var matrices = [m1, m2];
var vectors = [v1];

var currentMatricesOrder = [m1, m2];
var currentVectorsOrder = [v1];


// only show equations once they are rendered
var mjaxURL  = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML,Safe.js';
// load mathjax script
$.getScript(mjaxURL, function() {
    // mathjax successfully loaded, let it render
    showOutput();
});


$(document).ready(function() {
  $('#add-matrix-from-input').click(addMatrix);
  $('#add-vector-from-input').click(addVector);
  $('.dismiss-eqtn').click(dismissEquation);
});


/**
 * Add a new matrix to the calculation
 */
function addMatrix() {
  matrixArray = getMatrix();
  matrix = mathjs.matrix(matrixArray);
  matrices.push(matrix);
  currentMatricesOrder.push(matrix);
  matrixString = formatMatrix(matrixArray, ROW_TEMPLATE);
  appendInput('matrix', matrixString);
  resetModalMatrices();
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'matrix-' + matrices.length]);
  showOutput();
  showEquations();
}


/**
 * Gets matrix entries from modal and returns a matrix in array form
 */
function getMatrix() {
  row0 = [
    Number($('#matrix-row-0-col-0').val()),
    Number($('#matrix-row-0-col-1').val()),
    Number($('#matrix-row-0-col-2').val()),
  ];

  row1 = [
    Number($('#matrix-row-1-col-0').val()),
    Number($('#matrix-row-1-col-1').val()),
    Number($('#matrix-row-1-col-2').val()),
  ];

  row2 = [
    Number($('#matrix-row-2-col-0').val()),
    Number($('#matrix-row-2-col-1').val()),
    Number($('#matrix-row-2-col-2').val()),
  ];

  return [row0, row1, row2];
}


/**
 * Puts matrix in LaTeX format to be correctly rendered by MathJax
 */
function formatMatrix(matrix, rowTemplate) {
  row0 = vsprintf(rowTemplate, matrix[0]);
  row1 = vsprintf(rowTemplate, matrix[1]);
  row2 = vsprintf(rowTemplate, matrix[2]);

  return sprintf(MATRIX_TEMPLATE, row0, row1, row2);
}

/** Remove zeros if they are insignificant.
 *  i.e only remove zeros if they are not the only number in the row
 */
function simplifyResult(matrix, vector) {
  var result = [];
  for (i=0; i < 3; i++) {
    row = "";
    // below variables to determine whether or not to prefix with '+'
    var hasX = false;
    var hasY = false;
    var hasZ = false;
    if (!(matrix[i][0] == 0)) {
      row += matrix[i][0] + 'x';
      hasX = true;
    }
    if (!(matrix[i][1] == 0)) {
      if (hasX) {
        row += ' + '
      }
      row += matrix[i][1] + 'y';
      hasY = true;
    }
    if (!(matrix[i][2] == 0)) {
      if (hasX || hasY) {
        row += ' + '
      }
      row += matrix[i][2] + 'z';
      hasZ = true;
    }
    // if the value isn't zero and either an x, y or z value exists
    if (!(vector[i] == 0) && (hasX || hasY || hasZ)) {
      row += ' + ' + vector[i];
    } else if (!(hasX || hasY || hasZ)) {
      row += vector[i];
    }
    if (row == "") {
      row = "0";
    }
    result[i] = row;
  }
  return sprintf(MATRIX_TEMPLATE, result[0], result[1], result[2]);
}


/**
 * Add a new vector to the calculation
 */
function addVector() {
  vectorArray = [
    [Number($('#vector-row-0').val())],
    [Number($('#vector-row-1').val())],
    [Number($('#vector-row-2').val())]
  ];
  vector = mathjs.matrix(vectorArray);
  vectors.push(vector);
  currentVectorsOrder.push(vector);
  vectorString = sprintf(MATRIX_TEMPLATE, vectorArray[0], vectorArray[1], vectorArray[2]);
  appendInput('vector', vectorString);
  showOutput();
  resetModalMatrices();
}


/**
 * Appends either a new matrix or vector to the DOM
 */
function appendInput(type, inputHtml) {
  var $newContainerDiv = $("<div>").addClass('row draggable content border rounded m-1');
  var $newInputDiv = $("<div>").addClass('col invisible ' + type);
  var $closeButton = $('<button type="button" class="close dismiss-eqtn" aria-label="Close">');
  $closeButton.append($('<span aria-hidden="true">&times;</span>'));
  $newContainerDiv.append($closeButton);
  $newInputDiv.html(inputHtml);
  $newContainerDiv.append($newInputDiv);
  $('#' + type + '-input-container').append($newContainerDiv);
  // add event handler for close button
  $('.dismiss-eqtn').click(dismissEquation);
  if (type == 'vector') {
    $closeButton.addClass('vector');
    $closeButton.attr('id', 'close-vector-' + vectors.length);
    $newInputDiv.attr('id', 'vector-' + vectors.length);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'vector-' + vectors.length]);
  } else {
    $closeButton.attr('id', 'close-matrix-' + matrices.length);
    $newInputDiv.attr('id', 'matrix-' + matrices.length);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'matrix-' + matrices.length]);
  }
}


/* Set the matrices in modal to the default values */
function resetModalMatrices() {
  // reset to default values of modal matrices
  $('#matrix-row-0-col-0').val(1);
  $('#matrix-row-0-col-1').val(0);
  $('#matrix-row-0-col-2').val(0);

  $('#matrix-row-1-col-0').val(0);
  $('#matrix-row-1-col-1').val(1);
  $('#matrix-row-1-col-2').val(0);

  $('#matrix-row-2-col-0').val(0);
  $('#matrix-row-2-col-1').val(0);
  $('#matrix-row-2-col-2').val(1);

  $('#vector-row-0').val(1);
  $('#vector-row-1').val(0);
  $('#vector-row-2').val(0);
}


/**
 * Displays the output of calculations
 */
function showOutput() {
  // If output container is showing, hide it while mathjax renders.
  if (!$('#output-container').hasClass('invisible')) {
    $('#output-container').addClass('invisible');
  }
  var result = calculateOutput();
  var matrix = result[0];
  var vector = result[1];
  var matrixRows = matrixToArray(matrix);
  var vectorRows = matrixToArray(vector);

  matrixString = formatMatrix(matrixRows, ROW_TEMPLATE);
  vectorString = sprintf(MATRIX_TEMPLATE, vectorRows[0], vectorRows[1], vectorRows[2]);
  expandedMatrixString = formatMatrix(matrixRows, EXPANDED_ROW_TEMPLATE);
  simplifiedMatrixString = simplifyResult(matrixRows, vectorRows);

  $('#matrix-output').html(matrixString);
  $('#vector-output').html(vectorString);
  $('#expanded-matrix').html(expandedMatrixString);
  $('#vector-copy').html(vectorString);
  $('#simplified-matrix').html(simplifiedMatrixString);
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, "output-container"]);
  showEquations();
}


/**
 * Calculates result of matrix multiplication and vector addition.
 * Returns array containing a matrix and a vector.
 */
function calculateOutput() {
  var matrixResult = mathjs.zeros(3, 3);
  var vectorResult = mathjs.zeros(3, 1);

  if (currentMatricesOrder.length == 1) {
    matrixResult = currentMatricesOrder[0];
  } else if (currentMatricesOrder.length > 1) {
    // 2 or more matrices
    matricesCopy = currentMatricesOrder.slice(); // copy list for multiplying in place
    matrixResult = multiplyMatrices(matricesCopy);
  }

  if (currentVectorsOrder.length == 1) {
    vectorResult = currentVectorsOrder[0];
  } else if (currentVectorsOrder.length > 1) {
    // 2 or more vectors
    vectorsCopy = currentVectorsOrder.slice(); // copy list for adding in place
    vectorResult = addVectors(vectorsCopy);
  }

  return [matrixResult, vectorResult];
}


/**
 * Multiply matrices together and return result
 */
function multiplyMatrices(m) {
  var multiply = true;
  while (multiply) {
    if (m.length == 2) {
      multiply = false;
      return mathjs.multiply(m[0], m[1]);
    } else {
      result = mathjs.multiply(m[0], m[1]);
      // remove the first matrix in array
      m.shift();
      // replace the new first element in array with result
      m[0] = result;
    }
  }
}


/**
 * Add vectors together and return result
 */
function addVectors(v) {
  var add = true;
  while (add) {
    if (v.length == 2) {
      add = false;
      return mathjs.add(v[0], v[1]);
    } else {
      result = mathjs.add(v[0], v[1]);
      v.shift();
      v[0] = result;
    }
  }
}


/**
 * Defines drag and drop events
 */
$(function() {
  var matrix_list = $('.containers').toArray();
  var drake = dragula(matrix_list, {
    accepts: function(el, target, source, sibling) {
      // Don't allow dragging of vectors to matrices container and vice versa
      return target.id === source.id;
    }
  });
  drake.on('drag', function(el, source) {
    scrollable = false;
  });
  drake.on('drop', (matrix, target_container, source_container, sibling) => {
    var matrixId = matrix.children[0].id;
    var matrixInfo = getEqtnInfoFromId(matrixId);
    var matrixIndex = matrixInfo[1] - 1;

    var type = matrixInfo[0]; // matrix and sibling will be of same type
    if (sibling == null) {
      // matrix has been inserted last
      if (type == 'matrix') {
        var siblingIndex = matrices.length - 1;
      } else {
        var siblingIndex = vectors.length - 1;
      }
    } else {
      var siblingId = sibling.children[0].id;
      var siblingInfo = getEqtnInfoFromId(siblingId);
      var siblingIndex = siblingInfo[1] - 1;  
    }

    if (type == 'matrix') {
      var tmp = currentMatricesOrder[matrixIndex];
      currentMatricesOrder[matrixIndex] = currentMatricesOrder[siblingIndex];
      currentMatricesOrder[siblingIndex] = tmp;
    } else {
      // vector
      var tmp = currentVectorsOrder[matrixIndex];
      currentVectorsOrder[matrixIndex] = currentVectorsOrder[siblingIndex];
      currentVectorsOrder[siblingIndex] = tmp;
    }
    showOutput();
    scrollable = true;
  });
});


/**
 * Converts mathjs matrix to an Array
 */
function matrixToArray(matrix) {
  var matrixArray = [[], [], []];

  matrix.forEach(function (value, index, m) {
    i = index[0];
    j = index[1];
    // round to 2dp
    matrixArray[i][j] = mathjs.round(value, 2);
  });

  return matrixArray;
}


/**
 * Only show equations once they are rendered
 */
function showEquations() {
  MathJax.Hub.Queue(
    function () {
      $('.invisible').removeClass('invisible');
      // stop buttons jumping around on load
      $('#add-matrices-btns').removeClass('d-none');
  });
}


/**
 * Converts degrees to radians
 */
function toRadians(angle) {
  return angle * (Math.PI / 180);
}


/**
 * Gets the type of equation (matrix or vector) and the equation number.
 * The equation number represents the order it was added in.
 * E.g the third matrix added will be number 3, the second vector added will be number 2 etc.
 */
function getEqtnInfoFromId(id) {
  // id is of form close-matrix-1 or close-vector-1.
  // split by '-' and get the type (matrix or vector) and number.
  idSplit = id.split('-');
  eqtnType = idSplit[1]; // get type
  eqtnNum = Number(idSplit[2]); // get the number
  return [eqtnType, eqtnNum];
}


/**
 * Removes equation and updates output to match
 */
function dismissEquation() {
  button = $(this)[0];
  eqtnInfo = getEqtnInfoFromId(button.id);

  eqtnType = eqtnInfo[0]; // type
  eqtnNum = eqtnInfo[1]; // number of button that was clicked

  // eqtnNum identifies the equation to remove, minus one to convert to an index so we can remove it from the array
  toRemoveIndex = eqtnNum - 1;
  // remove from appropriate array
  if (eqtnType == 'matrix') {
    matrices.splice(toRemoveIndex, 1);
    // need to also remove it from order array
    var eqtn = matrices[toRemoveIndex];
    var orderIndex = currentMatricesOrder.indexOf(eqtn); // find index
    currentMatricesOrder.splice(orderIndex, 1);
  } else {
    vectors.splice(toRemoveIndex, 1);
    // need to also remove it from order array
    var eqtn = vectors[toRemoveIndex];
    var orderIndex = currentVectorsOrder.indexOf(eqtn); // find index
    currentVectorsOrder.splice(orderIndex, 1);
  }
  // remove DOM element
  $(this)[0].parentNode.remove();
  // re-calculate and show output
  showOutput();
}
