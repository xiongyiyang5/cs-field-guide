// Adapted from http://refreshless.com/nouislider/examples/#section-colorpicker

CMY_Mixer = {};

$(document).ready(function () {
  CMY_Mixer.minimum = 0
  CMY_Mixer.maximum = 255

  CMY_Mixer.sliders = document.getElementsByClassName('interactive-cmy-mixer-slider');
  CMY_Mixer.result = document.getElementById('interactive-cmy-mixer-result');

  for ( var i = 0; i < CMY_Mixer.sliders.length; i++ ) {
    noUiSlider.create(CMY_Mixer.sliders[i], {
      start: Math.floor(Math.random() * CMY_Mixer.maximum),
      step: 1,
      connect: "lower",
      orientation: "horizontal",
      range: {
        'min': CMY_Mixer.minimum,
        'max': CMY_Mixer.maximum
      },
      format: wNumb({
        decimals: 0
      }),
      pips: {
        mode: 'count',
    		values: 9,
    		density: 9,
		    stepped: true
    	}
    });

    // Bind the color changing function
    // to the slide event.
    CMY_Mixer.sliders[i].noUiSlider.on('slide', setColor);
  }

  // Update display
  setColor();
});


function setColor(){
	// Get the slider values,
	// stick them together.
  var cmy_as_rgb = cmy_to_rgb(CMY_Mixer.sliders[0].noUiSlider.get(),
                              CMY_Mixer.sliders[1].noUiSlider.get(),
                              CMY_Mixer.sliders[2].noUiSlider.get());
	var color = 'rgb(' +
		cmy_as_rgb[0] + ',' +
		cmy_as_rgb[1] + ',' +
		cmy_as_rgb[2] + ')';

	// Fill the color box.
	CMY_Mixer.result.style.background = color;
	CMY_Mixer.result.style.color = color;

  // Set text for labels
  $('#interactive-cmy-mixer-cyan-value').text(CMY_Mixer.sliders[0].noUiSlider.get());
  $('#interactive-cmy-mixer-magenta-value').text(CMY_Mixer.sliders[1].noUiSlider.get());
  $('#interactive-cmy-mixer-yellow-value').text(CMY_Mixer.sliders[2].noUiSlider.get());
}

function cmy_to_rgb(c, m, y){
    var
    r = 255 - c,
    g = 255 - m,
    b = 255 - y;
    return [r,g,b];
}
