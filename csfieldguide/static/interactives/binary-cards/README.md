# Binary Cards Interactive

**Author:** Jack Morgan
**Modified by:** Courtney Bracefield, Alasdair Smith

This interactive is created to teach binary numbers, and emulates the Binary Cards CS Unplugged activity.

## Usage

The interactive shows the cards with dots from **128** to **1** by default (128, 64, 32, 16, 8, 4, 2, 1), however these can be configured by the following parameters:

- `base=value` - Where `value` is the number base to use (default is 2 i.e. binary).
- `cards=value` OR `digits=value` - Where `value` is the number of cards to display (default is 8, minimum is 1). If both are given then the value of `cards` is used.
- `offset=value` - Where `value` is the amount to offset the displayed cards (default is 0). Using a positive number will show the placings from the `cards` + `offset` value, for the number of given cards. For example, using a base of `10`, cards as `3`, and offset as `2` will show the 100,000, 10,000, 1,000, and 100 placings. Using a negative number for the `value` will display floating point numbers.
- `start=sides` - Where `sides` is a sequence of `W` and `B` characters, to state the sides that should be displayed when the interactive starts. The first letter states whether the first card (on the left) should be white (`W`) or black (`B`), the second letter stands for the second card. Therefore the number of letters should match the number of cards used.
- `input=value` - Where `value` is `true` or `false` (default is true). Indicates whether or not to display the input box that lets users choose how many cards are displayed.

### Input box drawback

To avoid several display problems the maximum number of cards that can be displayed is limited to 16 or the value of the `cards`/`digits` parameter &ndash; whichever is highest.

### Examples

- `?base=16&cards=4` - Shows the first 4 cards of base 16 (hexadecimal).
- `?cards=4&offset=-2` - Shows 4 cards of base 2 (binary). 2, 1, 0.5 and 0.25. The input box will allow any number of cards up to 16.
- `?cards=64` - Shows 64 cards of base 2 (binary). The input box will allow any number of cards up to 64.
- `?cards=5&start=BBBBB` - Shows 5 cards of base 2 (binary), with all sides showing black to start.
- `?cards=2&start=BBBWW` - Here the number of cards is less than the length of the start parameter. The cards parameter will always take precedence, therefore 2 cards with sides with their sides set to white will be shown to start. The next 3 hidden cards to the left will have their sides set to black.
- `?cards=4&start=BB` - Here the number of cards is more than the length of the start parameter. The cards parameter will always take precedence, therefore 4 cards will be displayed, with their sides set to WWBB.

To use these parameters, the interactive must be used in either `whole-page` or `iframe` mode.

## Required files

The interactive loads from a base website template which includes a JavaScript file containing jQuery, Bootstrap, and a few other utilities and polyfills.
See `static/js/website.js` for a full list.
