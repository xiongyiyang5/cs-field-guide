var starting_num_guesses;
var num_guesses;
var target;
var complete = false;
var start_level;
var end_level;
var current_level;
var num_boxes;
var sorted;

window.addEventListener("DOMContentLoaded", function() {
	var url_string = window.location.href;
    // var url = new URL(url_string);
	setInterfaceParameters(url_string);
	console.log(num_boxes);
	console.log(sorted);

    if (sorted == 'true') {
    	sorted = gettext('Sorted');
    } else if (sorted == 'false') {
    	sorted = gettext('Random');
    }

    // fill in the rules
	document.getElementById('interactive-searching-algorithms-num-boxes').innerText = num_boxes;
	document.getElementById('interactive-searching-algorithms-num-guesses').innerText = num_guesses;
	document.getElementById('interactive-searching-algorithms-order').innerText = sorted

	target = Math.floor(Math.random() * Math.floor(num_boxes));
	// create box elements and assign random weights
	var box_div = document.getElementById('interactive-searching-algorithms-boxes');
	for (var i = 0; i < num_boxes; i++) {
		var random_square_number = Math.floor(Math.random() * Math.floor(15));
		var weight = Math.floor(Math.random() * Math.floor(999)) + 1;
		var src_string = colourful_box_images[random_square_number];
		
		var img_div = document.createElement('div');

		var img_weight = document.createElement('p');
		img_weight.classList.add('interactive-searching-algorithms-box-weight');
		img_weight.innerText = weight;

		var img_number = document.createElement('p');
		img_number.classList.add('interactive-searching-algorithms-box-number');
		img_number.innerText = gettext('Box') + ' ' + (i+1);

		var img_element = document.createElement('img');
		img_element.setAttribute('src', src_string);
		img_element.setAttribute('data-weight', weight);
		img_element.addEventListener("click", fadeBox);
		
		img_div.appendChild(img_element);
		img_div.appendChild(img_weight);
		img_div.appendChild(img_number);
		box_div.appendChild(img_div);

		if (i == target) {
			target = weight;
		}
	}

	document.getElementById('interactive-searching-algorithms-target').innerText = target;
});

function setInterfaceParameters(url_string) {
	// console.log(url);
	var url = new URL(url_string);
	num_boxes = url.searchParams.get('num-boxes'); // get num boxes parameter
    sorted = url.searchParams.get('sorted'); // get sorted/not sorted parameter
    starting_num_guesses = url.searchParams.get('num-guesses'); // get num guesses parameter
    num_guesses = starting_num_guesses;
    start_level = url.searchParams.get('start-level');
    current_level = url.searchParams.get('end-level');
    current_level = start_level;

	console.log(sorted);
    console.log(num_boxes);
}

function fadeBox(event) {
	var clicked_img = event.srcElement;
	var img_weight = clicked_img.nextElementSibling;
	clicked_img.classList.add('fade');
	img_weight.classList.add('show');
	decreaseGuessCount();
	if (target == img_weight.innerText) {
		console.log('win!');
		complete = true;
		// if current level < end level
		// http://localhost:81/en/interactives/searching-algorithms/?num-boxes=7&num-guesses=6&order=random&level=1
		// build query string and call function to get new parameters
		// hide rules
		document.getElementById('interactive-searching-algorithms-default-rules').classList.add('hide-message');
		// show winning message
		var num_guesses_used = starting_num_guesses - num_guesses;
		document.getElementById('interactive-searching-algorithms-found').classList.remove('hide-message');
		document.getElementById('interactive-searching-algorithms-found').classList.add('show-message');
		document.getElementById('interactive-searching-algorithms-num-guesses-used').innerText = num_guesses_used;
	}
	
}

function decreaseGuessCount() {
	num_guesses -= 1;
	if (num_guesses == 0) { // if no more guesses then hide the rules and display no guesses left message
		var default_rules = document.getElementById('interactive-searching-algorithms-default-rules');
		var no_guesses_left_message = document.getElementById('interactive-searching-algorithms-no-guesses');
		default_rules.classList.add('hide-message');
		no_guesses_left_message.classList.add('show-message');
	} else {
		document.getElementById('interactive-searching-algorithms-num-guesses').innerText = num_guesses;
	}
}
