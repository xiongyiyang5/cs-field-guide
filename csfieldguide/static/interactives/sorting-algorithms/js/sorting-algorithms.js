const dragula = require('./../../../../node_modules/dragula/dragula');
const urlParameters = require('../../../js/third-party/url-parameters.js');

// globals
var comparisons = 0;
var lastLeftImage;
var lastRightImage;
var emptyWeight = -1;
var dataType = null;
const DATA_WEIGHTS = [0, 1, 2, 3, 4, 5, 6, 7]; // weights of the images, used for comparisons

$(document).ready(function() {
  if (urlParameters.getUrlParameter("peek") == "true") {
    $('#eye-icons').removeClass('d-none');
    $('.dashed-box, #eye-open').bind('touchstart', mobileEndPeek); // For mobile
  }
  dataType = urlParameters.getUrlParameter("data");
  if (dataType == "sorted" || dataType == "reverse") {
    $('#reshuffle-button').addClass('d-none');
  }

  var imagesToSort = document.getElementsByClassName('sorting-box');
  // shuffle the weights and assign them to each image
  var shuffledWeights = shuffle(DATA_WEIGHTS);
  for (var i = 0; i < imagesToSort.length; i++) {
    var image = imagesToSort[i];
    image.dataset.weight = shuffledWeights[i];
  }
  var method = urlParameters.getUrlParameter("method");
  var button = document.getElementById('toggle-second-row');
  button.innerText = gettext("Show second row of boxes");
  if (method == "quick") {
    toggleSecondRow();
  }
});

/**
 * Defines draging and button handlers
 */
$(function() {
  var imageList = $('.dashed-box').toArray();
  var drake = dragula(imageList);
  drake.on('drop', (image, targetContainer, sourceContainer) => {
    // If an image is dragged on top of another image..
    if (targetContainer.children.length == 2) {
        swap(image, targetContainer, sourceContainer);
    }
    document.getElementById('check-order-result-text-feedback').innerHTML = "<br>";
    compareWeights();
  });
  $('#check-sorted-button').on('click', checkOrder);
  $('#toggle-second-row').on('click', toggleSecondRow);
  $('#reset-button').on('click', reset);
  $('#reshuffle-button').on('click', reshuffle);
  $('#eye-icons').hover(showPeek, hidePeek);
});

/**
 * Returns a shuffled copy of the given array, the result depends on the value of the global dataType
 */
function shuffle(array) {
  var clone = array.slice(0);
  if (dataType == "sorted") {
    return clone;
  } else if (dataType == "almost") {
    return slightShuffle(clone);
  } else if (dataType == "reverse") {
    return clone.reverse();
  } else /* random */ {
    return fisherYates(clone);
  }
}

/** 
 * Shuffle function adapted from https://bost.ocks.org/mike/shuffle
 */
function fisherYates(array) {
  var elementIndex = array.length;
  var randomIndex;
  var currentElement;

  while (elementIndex) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * elementIndex--);

    // And swap it with the current element
    currentElement = array[elementIndex];
    array[elementIndex] = array[randomIndex ];
    array[randomIndex ] = currentElement;
  }

  return array;
}

/**
 * Swaps a couple of numbers in array, so that it is nearly sorted, but not
 */
function slightShuffle(array) {
  var shuffles = 1;
  var swapA;
  var swapB;
  var temp;
  for (var i=0; i < shuffles; i++) {
    swapA = Math.floor(Math.random() * array.length);
    swapB = Math.floor(Math.random() * array.length);
    while (swapA == swapB) {
      // Probability of this taking a noticable amount of time is too small to worry about
      swapB = Math.floor(Math.random() * array.length);
    }
    temp = array[swapA];
    array[swapA] = array[swapB];
    array[swapB] = temp;
  }

  return array;
}

/**
 * Swaps the image in the target container and the image in the source container
 */
function swap(image, targetContainer, sourceContainer) {
  // save the original image in targetContainer to a temp var
  temp = targetContainer.children[0];
  // image is original image in sourceContainer. Swap the images.
  targetContainer.appendChild(image);
  sourceContainer.appendChild(temp);
}

/**
 * Does the comparison between items in the two weight containers
 */
function compareWeights() {
  var leftWeightDiv = document.getElementById('left-weight-content');
  var rightWeightDiv = document.getElementById('right-weight-content');
  var leftWeight = getDataWeight(leftWeightDiv);
  var rightWeight = getDataWeight(rightWeightDiv);

  // check if left and right are empty
  if (leftWeight == emptyWeight && rightWeight == emptyWeight) {
    rotateIndicator('up');
  } else {
    if (leftWeight > rightWeight) { // left is heavier
      rotateIndicator('left');
    } else if (rightWeight > leftWeight) { // right is heavier
      rotateIndicator('right');
    }
    if (leftWeight != emptyWeight && rightWeight != emptyWeight) {
      countComparisons();
    }
  }
}

/**
 * Rotates the arrow appropriately
 */
function rotateIndicator(direction) {
  // point to the heaviest box
  indicator = document.getElementById('scale');
  if (direction == 'left') {
    indicator.classList.remove('point-up');
    indicator.classList.remove('point-right');
    indicator.classList.add('point-left');
  } else if (direction == 'up') {
    indicator.classList.remove('point-left');
    indicator.classList.remove('point-right');
    indicator.classList.add('point-up');
  } else { //right
    indicator.classList.remove('point-up');
    indicator.classList.remove('point-left');
    indicator.classList.add('point-right');
  }
}

/**
 * Increases the number of comparisons by 1 if it isn't the comparison made immediately previous
 */
function countComparisons() {
  leftImage = document.getElementById('left-weight-content').children[0];
  rightImage = document.getElementById('right-weight-content').children[0];
  if ((leftImage != lastLeftImage) || (rightImage != lastRightImage)) {
    comparisons += 1
    fmts = gettext("Number of comparisons: %(comparisons)s");
    s = interpolate(fmts, {comparisons: comparisons}, true);
    document.getElementById('comparison-counter-text').innerText = s;
    lastLeftImage = leftImage;
    lastRightImage = rightImage;
  }
}

/**
 * Displays a message depending on the order of images in the sorted image row
 */
function checkOrder() {
  var orderedBoxesRow = document.getElementById('sorting-algorithms-interactive-item-sorted-row');
  if (orderedBoxesRow.getElementsByTagName("img").length != 8) {
    s = gettext("You need to sort all the boxes before checking!");
    $('#check-order-result-text-feedback').html(s);
  } else {
    var orderedBoxes = orderedBoxesRow.children;
    var sorted = true;
    for (var i = 0; i < orderedBoxes.length; i++) {
      element = orderedBoxes[i];
      var weight = getDataWeight(element);
      if (weight != i) {
        sorted = false;
      }
    }
    if (sorted) {
      s = colour(gettext("The boxes are in order, congratulations!"), true);
      $('#check-order-result-text-feedback').html(s);
    } else {
      s = colour(gettext("The boxes are not in order, try again!"), false);
      $('#check-order-result-text-feedback').html(s);
    }
  }
}

/**
 * Toggles the display of a second row of boxes, useful for quick/merge sort etc
 */
function toggleSecondRow() {
  var row = document.getElementById('sorting-algorithms-interactive-item-unsorted-row-2');
  var button = document.getElementById('toggle-second-row');
  row.classList.toggle('d-flex');
  if (row.classList.contains('d-flex')) {
    s = gettext("Hide second row of boxes");
  } else {
    s = gettext("Show second row of boxes");
    var imagesToMove = row.getElementsByTagName('img');
    var emptyBoxes = $('#sorting-algorithms-interactive-item-unsorted-row-1 > div:not(:has(*))').toArray();
    while (imagesToMove.length > 0) {
      emptyBoxes[0].appendChild(imagesToMove[0]);
      emptyBoxes.shift();
    }
  }
  button.innerText = s;
}

/**
 * Returns the weight associated with the given element(image)
 */
function getDataWeight(element) {
  var dataWeight = emptyWeight;
  // If the box is not empty
  if (element.hasChildNodes()) {
    dataWeight = element.children[0].dataset.weight;
  }
  return dataWeight;
}

/**
 * Returns text, but included in a <span> element with class=correct or incorrect
 * depending on the boolean isGood
 */
function colour(text, isGood) {
  return '<span class="' + ((isGood)? 'correct':'incorrect') + '">' + text + '</span>';
}

/**
 * Returns all images to their original locations, weights intact, and resets
 * the number of comparisons made
 */
function reset() {
  resetRow = document.getElementById('sorting-algorithms-interactive-item-unsorted-row-1').children;
  for (var i=0; i < resetRow.length; i++) {
    $("#img-" + i).appendTo(resetRow[i]);
  }

  comparisons = 0;
  lastLeftImage = null;
  lastRightImage = null;
  var fmts = gettext("Number of comparisons: %(comparisons)s");
  var s = interpolate(fmts, {comparisons: comparisons}, true);
  document.getElementById('comparison-counter-text').innerText = s;
  $('#check-order-result-text-feedback').html('<br>');
}

/**
 * Returns all images to their original locations, weights reshuffled, and resets
 * the number of comparisons made
 */
function reshuffle() {
  reset();

  var imagesToSort = document.getElementsByClassName('sorting-box');
  var shuffledWeights = shuffle(DATA_WEIGHTS);
  for (var i = 0; i < imagesToSort.length; i++) {
    var image = imagesToSort[i];
    image.dataset.weight = shuffledWeights[i];
  }
}

/**
 * Shows the values behind each sorting box
 */
function showPeek() {
  $('#eye-closed').addClass('d-none');
  $('#eye-open').removeClass('d-none');

  revealWeights($('#sorting-algorithms-interactive-item-unsorted-row-1'));
  revealWeights($('#sorting-algorithms-interactive-item-unsorted-row-2'));
  revealWeights($('#sorting-algorithms-interactive-item-scales'));
  revealWeights($('#sorting-algorithms-interactive-item-sorted-row'));
}

/**
 * Hides the values behind each sorting box
 */
function hidePeek() {
  $('#eye-open').addClass('d-none');
  $('#eye-closed').removeClass('d-none');

  $('.item-weight').appendTo($('#image-store'));
  $('.sorting-box').css('opacity', '1');
}

/**
 * On mobile there is not 'hover', you must click the eye to toggle the functionality.
 * This function ends the peek by triggering 'mouseleave' on the peek eye symbol
 */
function mobileEndPeek() {
  $('#eye-icons').trigger('mouseleave');
}

function revealWeights(boxesRow) {
  var boxes = boxesRow.children();
  var content;
  var image;
  var weight;
  for (var i=0; i < boxes.length; i++) {
    content = boxes.eq(i);
    if (content.children().length > 0) {
      // There is an image inside, there should never be more than one
      weight = (content.children().eq(0).attr('data-weight'));
      image = $('#number-' + (parseInt(weight) + 1));
      content.prepend(image);
    }
  }
  $('.sorting-box').css('opacity', '0.2');
}
