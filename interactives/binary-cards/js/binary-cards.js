"use strict";

$(document).ready(function () {
    // Settings for interactive
    var binaryValueSettings = {
        BASE: Number(getUrlParameter('base')) || 2,
        DIGITS: Number(getUrlParameter('digits')) || 8,
        OFFSET: Number(getUrlParameter('offset')) || 0
    }

    $('#interactive-binary-cards').on('click', '.binary-card', function(event) {
        $(this).toggleClass('flipped');
        updateDotCount();
    });

    // Create cards within container and update count
    createCards(binaryValueSettings);
    updateDotCount();
});


// Sets up the cards for the interactive
function createCards(settings) {
    var cardContainer = $('#interactive-binary-cards-container');

    var value = Math.pow(settings.BASE, settings.DIGITS + settings.OFFSET - 1);

    // Iterate through card values
    for (var digit = settings.DIGITS; digit > 0; digit--) {
        cardContainer.append(createCard(value));
        value /= settings.BASE;
    }
};


// Returns the HTML for a card for a given value
function createCard(value) {
    var cardContainer = $("<div class='binary-card-container'></div>");
    var card = $("<div class='binary-card'></div>");
    cardContainer.append(card);
    var front = $("<div class='binary-card-side binary-card-front'></div>");
    front.append(createDots(value));
    front.append($("<div class='binary-card-number'>" + createCardLabel(value) + "</div>"));
    card.append(front);
    card.append($("<div class='binary-card-side binary-card-back'></div>"));
    card.data("value", value);
    return cardContainer;
};


// Returns a canvas object with the given number of dots drawn on it
function createDots(dots) {
    var canvas = document.createElement('canvas');
    canvas.width = 120;
    canvas.height = 120;
    var context = canvas.getContext('2d');
    context.imageSmoothingEnabled = true;

    var sizes = calculateDotGridSize(dots);
    var gridRows = sizes[0] + 1;
    var gridRowWidth = canvas.height / gridRows;
    var gridCols = sizes[1] + 1;
    var gridColWidth = canvas.width / gridCols;
    var dotSize = Math.min(gridRowWidth, gridColWidth) * 0.4;
    var dotStartAngle = Math.PI * 0.5;
    var dotFinishAngle = Math.min(Math.PI * 2, Math.PI * 2 * dots) + dotStartAngle;
    for (var row = 1; row < gridRows; row++) {
        for (var col = 1; col < gridCols; col++) {
            context.beginPath();
            context.arc(col * gridColWidth, row * gridRowWidth, dotSize, dotStartAngle, dotFinishAngle, false);
            if (dots < 1) {
                context.lineTo(col * gridColWidth, row * gridRowWidth);
            }
            context.closePath();
            context.fill();
        }
    }
    return canvas;
};


// Returns the HTML for the card label to represent a given
// value. Decimals are represented as fractions.
function createCardLabel(value) {
    var label;
    if (value < 1) {
        label = '<sup>1</sup>&frasl;<sub>' + 1 / value + '</sub>';
    } else {
        label = value
    }
    return label
}


// Returns an array containing the [rows, columns]
// to optimally display the grid of dots for the given
// given number of dots
function calculateDotGridSize(dots) {
    var sizes;
    if (dots >= 2) {
        var factors = [];
        for (var i = 1; i <= Math.floor(Math.sqrt(dots)); i += 1) {
            if (dots % i === 0) {
                factors.push(i);
                if (dots / i !== i) {
                    factors.push(dots / i);
                }
            }
        }
        factors.sort(function(a, b){return a - b;});  // numeric sort
        var middleArrayIndex = factors.length / 2;

        if (middleArrayIndex % 1) {
            sizes = new Array(factors[middleArrayIndex - 0.5], factors[middleArrayIndex - 0.5]);
        } else {
            sizes = new Array(factors[middleArrayIndex], factors[middleArrayIndex - 1]);
        }
    } else {
        sizes = [1, 1];
    }
    return sizes;
};


// Counts the number of dots on the cards
function updateDotCount() {
    var dotCount = 0;
    $('#interactive-binary-cards-container').children().each(function(cardPosition, card) {
        var card = $(card.children[0]);
        if (!card.hasClass('flipped')) {
            dotCount += card.data("value");
        }
    });

    var dotText = $('#dot-decimal-count');
    if (dotCount == 1) {
        dotText.html('1 dot is visible');
    } else {
        dotText.html(dotCount + ' dots are visible');
    }
};


// From jquerybyexample.net/2012/06/get-url-parameters-using-jquery.html
function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
