# CMY Mixer Interactive

**Author:** Jack Morgan

**Modified By:** Alasdair Smith

This interactive is used to create colours using CMY values.

## URL Parameters

- `hex=true|false (default=false)`: if `true`, sets the interactive to display values in hexadecimal (0 - FF) rather than decimal (0 - 255).
- `hide-selector=true|false (default=false)`: If `true`, hides the option to choose between decimal and hexadecimal notations.

## Required files

The interactive loads from a base website template which includes a JavaScript file containing jQuery, Bootstrap, and a few other utilities and polyfills.
See `static/js/website.js` for a full list.
This interactive also requires nouislider.
Its licence is listed in `LICENCE-THIRD-PARTY` with a full copy available in the `third-party-licences` directory.
